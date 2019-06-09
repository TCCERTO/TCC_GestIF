import { Router } from 'express'
import PaeNot from '../../models/PaeNot'
import hasRole from '../middlewares/hasRole'

const router = Router()

router.post('/cadNot', (req, res) => {
  const { titulo, conteudo } = req.body

  const newPaeNot = new PaeNot({
    titulo,
    conteudo
  })
  newPaeNot
    .save()
    .then(paenot => {
      res.send(paenot)
    })
    .catch(err => {
      res.send({ status: 'ERROR' })
    })
})

router.get('/nots', (req, res) => {
  PaeNot.find({}).then(paenot => {
    res.send(paenot)
  })
})

router.delete('/delete', (req, res) => {
  const { id } = req.body
  PaeNot.deleteOne({ _id: id }).then(paeurl => {
    res.send(paeurl)
  })
})

export default router
