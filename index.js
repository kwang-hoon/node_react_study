const express = require('express')
const app = express()
const port = 5000

const mongoose = require('mongoose')
mongoose.connect('mongodb://kwanghoon:rhkdgns12@localhost:27017/?authMechanism=DEFAULT').then(() => console.log("MongoDB Connected..."))
    .catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})