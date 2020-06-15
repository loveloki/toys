const express = require('express')

const app = express()

app.use(express.json())

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

app.get('/info', (req, res) => {
  const number = notes.length

  res.send(`<p>电话簿存了 ${number} 个人</p><p>${new Date()}</p>`)
})

app.get('/api/persons', (req, res) => {
  res.json(notes)
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id

  const person = notes.find(person => person.id == id)

  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id

  notes = notes.filter(note => note.id != id)

  res.json(notes)
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.number || !body.name) {
    return res.status(404).send('缺少电话号码或人名')
  }

  const note = {
    id: Math.floor(Math.random() * 10000),
    name: body.name,
    number: body.number,
  }

  notes = notes.concat(note)

  res.json(note)
})

app.listen(3001, () => {
  console.log('端口开启于 3001')
})