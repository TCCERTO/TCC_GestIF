import { Router } from 'express'
import bcrypt from 'bcrypt'
import moment from 'moment'
import Logs from '../../models/Logs'
import hasRole from '../middlewares/hasRole'
import Log from '../../utils/LogService'

const router = Router()

/* 
Validação do módulo de Reports:
Só retorna algum resultado das rotas se tiver a role cotp no perfil do usuário.
*/
router.use(hasRole('cotp'))

//roles: {$all: ["aluno"]}

router.get('/', (req, res) => {
  Logs.find({ roles: { $all: ['aluno'] } })
    .sort({ data: -1 })
    .then(logs => {
      res.send(logs)
    })
})

router.get('/stats', (req, res) => {
  Logs.find({ roles: { $all: ['aluno'] } }).then(logs => {
    const UmaSemana = new Date().getTime() - 7 * 24 * 60 * 60 * 1000
    const numLogsAlunos = logs.length
    const numTotal = logs.length
    const numResolvidoPor = logs.filter(r => r.resolvidoPor === req.user.id)
      .length
    const maisDeUmaSemana = logs.filter(
      r => r.status === 0 && new Date(r.data).getTime() < UmaSemana
    ).length
    res.send({
      numLogsAlunos,
      numTotal,
      numResolvidoPor,
      maisDeUmaSemana
    })
  })
})

router.get('/count', (req, res) => {
  Logs.aggregate([
    {
      $match: {
        data: {
          $gte: moment()
            .subtract(5, 'months')
            .toDate(),
          $lt: moment().toDate()
        },
        roles: 'aluno'
      }
    },
    {
      $group: {
        _id: {
          month: { $month: '$data' }
        },
        count: {
          $sum: 1
        }
      }
    }
  ]).then(logs => {
    const months = new Array(
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro'
    )
    const result = []
    const thisMonth = new Date().getMonth() + 1
    for (let x = thisMonth - 5; x <= thisMonth; x++) {
      let month = logs.find(r => r._id.month === x)
      if (month)
        result.push({
          month: months[x],
          count: month.count
        })
      else
        result.push({
          month: months[x],
          count: 0
        })
    }
    res.send(result)
  })
})

router.get('/count/me', (req, res) => {
  Logs.aggregate([
    {
      $match: {
        resolvidoPor: req.user.id,
        data: {
          $gte: moment()
            .subtract(5, 'months')
            .toDate(),
          $lt: moment().toDate()
        }
      }
    },
    {
      $group: {
        _id: {
          month: { $month: '$data' }
        },
        count: {
          $sum: 1
        }
      }
    }
  ]).then(logs => {
    const months = new Array(
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro'
    )
    const result = []
    const thisMonth = new Date().getMonth() + 1
    for (let x = thisMonth - 5; x <= thisMonth; x++) {
      let month = logs.find(r => r._id.month === x)
      if (month)
        result.push({
          month: months[x],
          count: month.count
        })
      else
        result.push({
          month: months[x],
          count: 0
        })
    }
    res.send(result)
  })
})

router.post('/resolve', (req, res) => {
  const { id } = req.body
  if (!id) {
    res.status(400).json({
      code: 'MISSING_FIELD_ID',
      result: {}
    })
  } else {
    Logs.update(
      { _id: id },
      {
        $set: {
          status: 1,
          dataResolvido: Date.now(),
          resolvidoPor: req.user.id
        }
      }
    )
      .then(report => {
        Log(
          'REPORT',
          'Logs resolvido por ' + req.user.name + '.',
          req.user.name,
          '#ffb641'
        )
        res.json({ status: 'SUCCESS', result: report })
      })
      .catch(err => {
        res.send({ status: 'ERROR' })
      })
  }
})

export default router
