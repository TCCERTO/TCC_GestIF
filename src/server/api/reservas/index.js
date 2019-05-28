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
      Log('RESERVA', 'Reserva feita.', null, '#ffb641')
      res.send(reserva)
    })
    .catch(err => {
      res.send({ status: 'ERROR' })
    })
})

export default router
