import { Router } from 'express'
import ReservaAula from '../../models/Reservas/reservaAula'
import Log from '../../utils/LogService'

const router = Router()

router.post('/aulasCad', (req, res) => {
  const { aluno, reserva, professor, disciplina } = req.body

  const newReserva = new ReservaAula({
    aluno,
    reserva,
    professor,
    disciplina
  })
  newReserva
    .save()
    .then(reserva => {
      Log('RESERVA', 'Reserva de aula feita.', null, '#FF3333')
      res.send(reserva)
    })
    .catch(err => {
      res.send({ status: 'ERROR' })
    })
})

router.get('/reservasS/:disciplina/:nome', (req, res) => {
  ReservaAula.find({
    professor: req.params.nome,
    disciplina: req.params.disciplina,
    status: 0
  }).then(reserva => {
    res.send(reserva)
  })
})

router.get('/reservasA/:disciplina/:nome', (req, res) => {
  ReservaAula.find({
    professor: req.params.nome,
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
    ReservaAula.update(
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

export default router
