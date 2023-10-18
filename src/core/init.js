import { copySync } from "fs-extra/esm";
import consola from "consola";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const cwd = process.cwd();


export function init() {
  try {
    const configPath = path.resolve(
      __dirname,
      "../constants/yapi-cli-config.mjs"
    );
    copySync(configPath, cwd + "/yapi-cli-config.mjs");
    consola.success("成功");
  } catch (err) {
    consola.error(err);
  }
}
