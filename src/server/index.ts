import express from 'express'
import { logger } from './middleware/logger'
import { staticServer } from './static'
import { initWebsocketServer } from './ws'
const app = express()
const port = 3000

staticServer(app)

app.use(logger)

app.get('/', (req, res) => {
  res.send('Hello World!--')
})

initWebsocketServer()

app.listen(port, () => {
  console.log(`click to browser: http://localhost:${port}`)
})
