## yapi-ts-cli脚手架使用

### 安装

推荐全局安装

```sh
npm i -g yapi-ts-cli
```

### 查看帮助

```js
yt -h
// or
yt --help

```js
/**
yapi脚手架工具，帮助通过yapi创建ts和api文件

Options:
  -h, --help        display help for command

Commands:
  init              初始化配置
  create [options]  创建ts文件
  help [command]    display help for command
**/
```

### 使用

首先初始化配置执行

```shell
yt init
```

修改配置信息

```js
{
    path: "/src/api", // 保存目录
    cookie: "", // yapi的cookie
    url: "",  // 项目地址 例如：http://117.xx.xx.xx:3000
    projectId: "",  // 项目的id，例如：http://117.xx.xx.xx:3000/project/11/interface/api/43，这里的11就是项目id，填写11
}
```

统一创建ts文件执行
```shell
yt create
```

只创建单个文件执行
```shell
yt create -id <id>
```
