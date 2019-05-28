import mongoose from 'mongoose'
const Schema = mongoose.Schema

const logsSchema = new Schema({
  diaHora: {
    type: String,
    required: true
  }
})

export default mongoose.model('Monitoria', logsSchema)
