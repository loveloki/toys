const mongoose = require('mongoose')

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://demo:${password}@cluster0-e4fbv.azure.mongodb.net/note-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useFindAndModify: true })
  .then(result => {
    console.log('连接到 MongoDB 数据库')
  })
  .catch(error => {
    console.log('链接数据库失败', error.message)
  })

const noteSchema = new mongoose.Schema({
  name: String,
  number: Number,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  name: name,
  number: number,
})

const showAll = () => {
  Note.find({}).then(notes => {
    notes.forEach(note => console.log(note))
    mongoose.connection.close()
  })
}

const addNew = () => {
  note.save().then(result => {
    console.log(`${name} ${number} saved!`)
    mongoose.connection.close()
  })
}

if (name && number) {
  addNew()
} else {
  showAll()
}
