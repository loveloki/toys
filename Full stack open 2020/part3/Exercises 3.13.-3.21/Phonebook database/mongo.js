const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

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

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Note', noteSchema)
