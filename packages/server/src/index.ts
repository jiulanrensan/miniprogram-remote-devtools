import express from 'express'
import http from 'http'
import dotenv from 'dotenv'
import { logger } from './middleware/logger'
import { staticServer } from './static'
import { initServer as initWebsocketServer } from './ws'
;(function main() {
  dotenv.config()
  const port = process.env.REMOTE_HOST_PORT
  const app = express()
  const httpServer = http.createServer(app)

  staticServer(app)

  app.use(logger)

  app.get('/', (req, res) => {
    res.send('Hello World!--')
  })

  initWebsocketServer({ server: httpServer })

  httpServer.listen(port, () => {
    console.log(`click to browser: http://localhost:${port}`)
  })
})()
