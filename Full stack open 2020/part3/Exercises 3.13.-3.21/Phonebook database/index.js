require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Note = require('./mongo')

const app = express()

app.use(express.static('build'))

morgan.token('post-content', (req, res) => {
  return JSON.stringify(req.body)
})
morgan.format('post', `:method :url :status :res[content-length] - :response-time ms [post提交内容] :post-content`)

app.use(morgan('post'))
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

app.get('/persons', (req, res) => {
  Note.find({}).then(notes => res.json(notes))
})

app.get('/persons/:id', (req, res) => {
  const id = req.params.id

  Note.findById(id).then(result => {
    if (result) {
      res.json(result)
    } else {
      res.status(404).end()
    }
  })
})

app.delete('/persons/:id', (req, res) => {
  const id = req.params.id

  notes = notes.filter(note => note.id != id)

  res.json(notes)
})

app.post('/persons', (req, res) => {
  const body = req.body

  if (!body.number || !body.name) {
    return res.status(404).send('缺少电话号码或人名')
  }

  if (notes.find(note => note.name === body.name)) {
    return res.status(403).json({error: '存在重名，请重新编辑'})
  }

  const note = {
    id: Math.floor(Math.random() * 10000),
    name: body.name,
    number: body.number,
  }

  notes = notes.concat(note)

  res.json(note)
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log('端口开启于 3001')
})
