const express = require('express')

const app = express()

let notes = [
  {
    id: 1,
    name: "Tom",
    number: "1115551654"
  },{
    id: 2,
    name: "Sony",
    number: "2225551654"
  },{
    id: 3,
    name: "Apple",
    number: "3335551654"
  },
]

app.get('/api/persons', (req, res) => {
  res.json(notes)
})

app.listen(3001, () => {
  console.log('端口开启于 3001')
})
