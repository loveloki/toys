const mongoose = require('mongoose')
const uniqueValidator  = require('mongoose-unique-validator')

mongoose.set('useCreateIndex', true)

const url = process.env.MONGODB_URI

mongoose.connect(url, { useNewUrlParser: true, useFindAndModify: true })
  .then(result => {
    console.log('连接到 MongoDB 数据库')
  })
  .catch(error => {
    console.log('链接数据库失败', error.message)
  })

const noteSchema = new mongoose.Schema({
  name: {type: String, minlength: 3, required: true, unique: true},
  number: {
    type: Number,
    validate: {
      validator: function(v) {
        return /\d{8}/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!phone number must be at least 8 digits`
    },
    required: true }
})

noteSchema.plugin(uniqueValidator)

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Note', noteSchema)
