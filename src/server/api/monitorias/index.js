import { Router } from 'express'
import bcrypt from 'bcrypt'
import User from '../../models/Users'

const router = Router()

//Lista os dados da monitoria. Rota 'api/users/me1'
router.get('/', (req, res) => {
  User.find({ roles: { $all: ['monitor'] } })
    .then(user => {
      res.send(user)
    })
    .catch(err => {
      res.send(err)
    })
})

export default router
