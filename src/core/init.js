import { outputJsonSync } from "fs-extra/esm";
import consola from "consola";
const cwd = process.cwd();

export function init() {
  try {
    outputJsonSync(cwd + "/yapi-cli-config.json", {
      path: "/src/api",
      cookie: "",
      url: "",
      projectId: "",
    });
    consola.success('成功');
  } catch (err) {
    consola.error(err);
  }
}
