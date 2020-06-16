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

const errorHandle = (error, req, res, next) => {
  console.log('error', error.message)

  next(error)
}
app.use(errorHandle)

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

app.get('/persons', (req, res, next) => {
  Note.find({})
    .then(notes => res.json(notes))
    .catch(error => next(error))
})

app.get('/persons/:id', (req, res, next) => {
  const id = req.params.id

  Note.findById(id)
    .then(result => {
      if (result) {
        res.json(result)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))

})

app.delete('/persons/:id', (req, res, next) => {
  const id = req.params.id

  Note.findByIdAndRemove(id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/persons', (req, res, next) => {
  const body = req.body

  if (!body.number || !body.name) {
    return res.status(404).send('缺少电话号码或人名')
  }

  if (notes.find(note => note.name === body.name)) {
    return res.status(403).json({error: '存在重名，请重新编辑'})
  }

  const note = new Note({
    name: body.name,
    number: body.number,
  })

  note.save()
    .then(newNote => {
      res.json(newNote)
    })
    .catch(error => next(error))

})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log('端口开启于 3001')
})
