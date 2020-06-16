require('dotenv').config()
const cors = require('cors')
const express = require('express')
const morgan = require('morgan')
const Note = require('./mongo')

const app = express()

app.use(cors())

app.use(express.static('build'))

morgan.token('post-content', (req, res) => {
  return JSON.stringify(req.body)
})
morgan.format('post', `:method :url :status :res[content-length] - :response-time ms [post提交内容] :post-content`)

app.use(morgan('post'))
app.use(express.json())

app.get('/info', (req, res) => {
  Note.find({}).then(notes => {
    res.send(`<p>电话簿存了 ${notes.length} 个人</p><p>${new Date()}</p>`)
  })
})

app.get('/api/persons', (req, res, next) => {
  Note.find({})
    .then(notes => res.json(notes))
    .catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
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

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id

  Note.findByIdAndRemove(id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  if (!body.number || !body.name) {
    return res.status(404).send('缺少电话号码或人名')
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
app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body
  const id = req.params.id

  const note = {
    name: body.name,
    number: body.number,
  }

  Note.findByIdAndUpdate(id, note, { new: true, runValidators: true })
    .then(updateNote => {
      res.json(updateNote)
    })
    .catch(error => next(error))

})

const errorHandle = (error, req, res, next) => {
  console.log('error', error.message)

  if (error.name === 'ValidationError') {
    console.log('验证错误')
    res.status(403).send({ error: error.message})
  }

  next(error)
}
app.use(errorHandle)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log('端口开启于 3001')
})
