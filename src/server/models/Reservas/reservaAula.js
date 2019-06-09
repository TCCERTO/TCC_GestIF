import mongoose from 'mongoose'
const Schema = mongoose.Schema

const reservasSchema = new Schema({
  status: {
    type: Number,
    default: 0
  },
  roles: {
    type: String,
    default: 'professor'
  },
  aluno: {
    type: String,
    required: true
  },
  reserva: {
    type: String,
    required: true
  },
  professor: {
    type: String,
    required: true
  },
  disciplina: {
    type: String,
    required: true
  },
  data: { type: Date, default: Date.now },
  dataAplicada: { type: Date }
})

export default mongoose.model('ReservaAula', reservasSchema)
