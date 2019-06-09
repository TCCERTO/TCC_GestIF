import mongoose from 'mongoose'
const Schema = mongoose.Schema

const paenotSchema = new Schema({
  titulo: {
    type: String,
    required: true
  },
  conteudo: {
    type: String,
    required: true
  },
  data: { type: Date, default: Date.now }
})

export default mongoose.model('PaeNot', paenotSchema)
