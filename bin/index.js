#!/usr/bin/env node
"use strict";
import { program } from "commander";
import { create } from "../src/core/create.js";
import { init } from "../src/core/init.js";
// import { version } from "../package.json";

program
  .name("yapi-cli")
  .description("yapi脚手架工具，帮助通过yapi创建ts和api文件")
  // .version(version);

// 配置初始化
program.command("init").description("初始化配置").action(init);

// 文件创建
program
  .command("create")
  .description("创建ts文件")
  .option("-id, --id <id>", "下载指定id接口")
  .action(create);

program.parse();
