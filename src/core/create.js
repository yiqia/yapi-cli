import consola from "consola";
// import { readJsonSync } from "fs-extra";
import { compile } from "json-schema-to-typescript";
import axios from "axios";
import { METHOD_TO_IMPORT } from "../constants/index.js";
import {
  readConfig,
  removeRefFields,
  convertString,
  createFile,
  convertName,
  removeText,
  queryToTs,
} from "../utils/index.js";

const cwd = process.cwd();
// 读取配置
let config = {};

const headers = {
  Cookie: config.cookie,
  "Content-Type": "application/json",
};

export async function create(options) {
  config = readConfig();
  if (options.id) {
    consola.log("id", options.id);
    const info = await getApiInfo(options.id);
    await downloadTypes(info);
    return;
  } else {
    const list = await readApiList();
    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      const info = await getApiInfo(item._id);
      await downloadTypes(info);
    }
  }
}

const downloadTypes = async (info) => {
  consola.log("info.res_body", info.res_body);
  const resBody = info.res_body
    ? JSON.parse(info.res_body).properties.data || {}
    : {};
  const reqBody = info.req_body_other ? JSON.parse(info.req_body_other) : {};
  const resBodyTypeName = convertString(info.path, "Res");
  const reqBodyTypeName = convertString(info.path, "Req");
  const reqQueryType = queryToTs(
    info.req_query || [],
    convertString(info.path, "ReqQuery")
  );
  const resBodyTypes = await jsonSchemaToTs(resBody, resBodyTypeName);
  const reqBodyTypes = await jsonSchemaToTs(reqBody, reqBodyTypeName);
  const method = METHOD_TO_IMPORT[info.method];
  const apiName = convertName(info.path);
  const str = `${method}

${reqQueryType}

${reqBodyTypes}

${resBodyTypes}

/**
 * 标题: ${info.title}
 * 描述: ${info.desc}
 * 地址：${config.url}/project/${config.projectId}/interface/api/${info._id}
 */
export const ${apiName} = (data?: ${reqBodyTypeName}) =>
  ${String(info.method).toLowerCase()}<${resBodyTypeName}>("/api${
    info.path
  }", data);
  `;
  await createFile(cwd + config.path + info.path + ".ts", str);
};

// JSON Schema 转换为 TypeScript
async function jsonSchemaToTs(schema, name) {
  removeRefFields(schema);
  const ts = await compile(schema, name);
  return removeText(ts);
}

// 读取api信息
export async function getApiInfo(id) {
  const url = `${config.url}/api/interface/get?id=${id}`;
  try {
    const response = await axios.get(url, {
      headers: headers,
    });
    if (response.data && response.data.data) {
      return response.data.data;
    } else {
      consola.error("不存在api信息");
    }
  } catch (error) {
    consola.error("读取api信息失败");
    consola.error(error);
  }
}

// 读取api列表
export async function readApiList() {
  const url = `${config.url}/api/interface/list?page=1&limit=100000&project_id=${config.projectId}`;
  try {
    const response = await axios.get(url, {
      headers: headers,
    });
    if (response.data && response.data.data.list) {
      return response.data.data.list;
    } else {
      consola.error("不存在api数据");
    }
  } catch (error) {
    consola.error("读取api列表失败");
    consola.error(error);
  }
}
