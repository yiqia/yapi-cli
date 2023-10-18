import { copySync } from "fs-extra/esm";
import consola from "consola";
import path from "path";
const cwd = process.cwd();
const currentModuleUrl = import.meta.url;
const __dirname = new URL(currentModuleUrl).pathname;

export function init() {
  try {
    const configPath = path.resolve(
      __dirname,
      "../../constants/yapi-cli-config.js"
    );
    copySync(configPath, cwd + "/yapi-cli-config.js");
    consola.success("成功");
  } catch (err) {
    consola.error(err);
  }
}
