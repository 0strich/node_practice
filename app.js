const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

const port = 5000

app.get('/', (req, res) => {
  res.send('root route')
})

app.listen(port, () => {
  console.log(`listen on port ${port}`)
})