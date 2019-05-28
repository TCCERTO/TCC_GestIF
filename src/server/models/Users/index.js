import mongoose from 'mongoose'
const Schema = mongoose.Schema

const monitoriaSchema = new Schema({
  //Mapeando su-doc service simples.
  diaSemana: { type: String },
  hora: { type: String }
})

const monitoria = new Schema(monitoriaSchema)

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  disciplina: {
    type: String
  },
  periodo: {
    type: String
  },
  turno: {
    type: String
  },
  roles: [String],
  //monitorias: [monitoria],
  monitorias: [String],
  password: {
    type: String,
    required: true,
    select: false
  },
  joined: { type: Date, default: Date.now }
})

export default mongoose.model('User', userSchema)
