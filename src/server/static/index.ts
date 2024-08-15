/**
 * 静态文件服务
 */
import express from 'express'
import type { Express } from 'express'

const pathMap = {
  devtools: {
    path: 'node_modules/chrome-devtools-frontend/front_end',
    html: '/devtools_app.html'
  },
  remoteListPage: {
    path: 'src/frontend',
    html: '/remoteListPage/index.html'
  }
}
/**
 * /devtools_app.html
 */
function registerFile(app: Express, path: string) {
  app.use(express.static(path))
}

export function staticServer(app: Express) {
  Object.keys(pathMap).forEach((key) => {
    registerFile(app, pathMap[key].path)
  })
}
