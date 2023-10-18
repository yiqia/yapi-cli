#!/usr/bin/env node
"use strict";
import { program } from "commander";
import { create } from "../src/core/create.js";
import { init } from "../src/core/init.js";
import { readJsonFile } from "../src/utils/index.js";

const packageJson = await readJsonFile("package.json");

program
  .name("yapi-cli")
  .description("yapi脚手架工具，帮助通过yapi创建ts和api文件")
  .version(packageJson.version);

// 配置初始化
program.command("init").description("初始化配置").action(init);

// 文件创建
program
  .command("create")
  .description("创建ts文件")
  .option("-all, --all", "下载该项目下所有接口")
  .option("-id, --id <id>", "下载指定id接口")
  .action(create);

program.parse();
