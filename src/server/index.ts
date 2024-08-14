import express from 'express'
import { logger } from './middleware/logger.js'

const app = express()
const port = 3000

app.use(logger)

app.get('/', (req, res) => {
  res.send('Hello World!--')
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})
