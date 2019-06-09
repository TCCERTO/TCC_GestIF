import { Router } from 'express'
import Reserva from '../../models/Reservas'
import Log from '../../utils/LogService'

const router = Router()

router.post('/', (req, res) => {
  const { reserva, monitor, disciplina } = req.body

  const newReserva = new Reserva({
    reserva,
    monitor,
    disciplina
  })
  newReserva
    .save()
    .then(reserva => {
      Log('RESERVA', 'Reserva feita.', null, '#FF3333')
      res.send(reserva)
    })
    .catch(err => {
      res.send({ status: 'ERROR' })
    })
})

router.get('/reservasS/:disciplina/:nome', (req, res) => {
  Reserva.find({
    monitor: req.params.nome,
    disciplina: req.params.disciplina,
    status: 0
  }).then(reserva => {
    res.send(reserva)
  })
})

router.get('/reservasA/:disciplina/:nome', (req, res) => {
  Reserva.find({
    monitor: req.params.nome,
    disciplina: req.params.disciplina,
    status: 1
  }).then(reserva => {
    res.send(reserva)
  })
})

router.post('/aplica', (req, res) => {
  const { id } = req.body
  if (!id) {
    res.status(400).json({
      code: 'MISSING_FIELD_ID',
      result: {}
    })
  } else {
    Reserva.update(
      { _id: id },
      {
        $set: {
          status: 1,
          dataAplicada: Date.now()
        }
      }
    )
      .then(Reserva => {
        res.json({ status: 'SUCCESS', result: reserva })
      })
      .catch(err => {
        res.send({ status: 'ERROR' })
      })
  }
})

router.get('/A/', (req, res) => {
  Reserva.find({ status: 1 }).then(reserva => {
    res.send(reserva)
  })
})

router.get('/S/', (req, res) => {
  Reserva.find({ status: 0 }).then(reserva => {
    res.send(reserva)
  })
})

export default router
