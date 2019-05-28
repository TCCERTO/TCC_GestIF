import mongoose from 'mongoose'
const Schema = mongoose.Schema

const reservasSchema = new Schema({
  reserva: {
    type: String,
    required: true
  },
  monitor: {
    type: String,
    required: true
  },
  disciplina: {
    type: String,
    required: true
  },
  data: { type: Date, default: Date.now }
})

export default mongoose.model('Reserva', reservasSchema)
