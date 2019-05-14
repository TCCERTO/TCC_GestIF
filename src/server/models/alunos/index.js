import mongoose from 'mongoose'
const Schema = mongoose.Schema

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
  disciplinas: [String],
  periodo: {
    type: String,
    required: true
  },
  turno: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  roles: [String],
  joined: { type: Date, default: Date.now }
})

export default mongoose.model('Aluno', userSchema)