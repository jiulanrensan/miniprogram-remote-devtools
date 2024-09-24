# 需要用到的命令行
* `-w` 全局安装
* `-filter` `-F` 指定某个package安装

# pnpm升级monorepo
随便参考[一遍文章](https://dev.to/vinomanick/create-a-monorepo-using-pnpm-workspace-1ebn)
1. 添加`pnpm-workspace.yaml`
```yaml
packages: 
  - 'packages/*'
```
2. 目录结构修改
目录修改如下
```md
packages
  - server 服务端
  - frontend 前端
  - common 公共
  - wechat-remote-sdk sdk
```
每个package下添加package.json
```json
{
  "name": "@miniprogram-remote-devtools/common", // 指定名称
  "version": "1.0.0", // 指定版本号
  "main": "./dist/index.js", // 入口文件
  "type": "module", // 指定模块类型
  // 导出文件
  "exports": {
    ".": "./dist/index.js"
  },
  "dependencies": {
  }
}
```
因为项目每个package依赖的ts类型有区别，所以单独声明了tsconfig.json
3. npmrc文件添加 `link-workspace-packages=true`
4. 进入server目录，添加common依赖
```json
"dependencies": {
  "@miniprogram-remote-devtools/common": "workspace:^1.0.0"
}
```
然后执行命令
```shell
pnpm -F server install
```
可以通过`pnpm-lock.yaml`观察添加本地package是否成功
```yaml
packages/server:
 dependencies:
   '@miniprogram-remote-devtools/common':
     specifier: workspace:*
     version: link:../common

packages/wechat-remote-sdk:
 dependencies:
   '@miniprogram-remote-devtools/common':
     specifier: workspace:*
     version: link:../common
```
5. 代码里引用
```ts
import { Domain } from '@miniprogram-remote-devtools/common'
```
