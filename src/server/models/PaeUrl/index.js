import mongoose from 'mongoose'
const Schema = mongoose.Schema

const paeurlSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  titulo: {
    type: String,
    required: true
  },
  data: { type: Date, default: Date.now }
})

export default mongoose.model('PaeUrl', paeurlSchema)
