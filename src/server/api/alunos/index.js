import { Router } from 'express'
import bcrypt from 'bcrypt'
import Aluno from '../../models/Alunos'
import hasRole from '../middlewares/hasRole'
import Log from '../../utils/LogService'

const router = Router()

//lista todos os alunos da rota 'api/alunos/'
router.get('/', hasRole('csti'), (req, res) => {
  Aluno.find({}).then(alunos => {
    res.send(alunos)
  })
})

//Atualiza os dados de um usuário na rota 'api/alunos/'
router.patch('/', (req, res) => {
    Aluno.update(
    { _id: req.user.id },
    {
      $set: req.body
    }
  ).then(user => {
    res.send(user)
  })
})

//Lista os dados do usuário relativo ao token. Rota 'api/alunos/me'
router.get('/me', (req, res) => {
    Aluno.findById(req.user.id)
    .then(user => {
      res.send(user)
    })
    .catch(err => {
      res.send(err)
    })
})

//Atualiza os dados do usuário relativo ao token. Rota 'api/alunos/me'
router.patch('/me', (req, res) => {
  if (req.body.password) {
    bcrypt.hash(req.body.password, 10).then(hash => {
      const { password, ...objSemSenha } = req.body
      Aluno.update(
        { _id: req.user.id },
        {
          $set: { ...objSemSenha, password: hash }
        }
      ).then(user => {
        res.send(user)
      })
    })
  } else {
    Aluno.update(
      { _id: req.user.id },
      {
        $set: req.body
      }
    ).then(user => {
      res.send(user)
    })
  }
})

//Cria um aluno. Rota 'api/alunos/'
router.post('/', hasRole('csti'), (req, res) => {
  const { name, email, disciplinas, periodo, turno, password, roles } = req.body
  if (!name) {
    res.status(400).json({
      code: 'MISSING_FIELD_NAME',
      result: {}
    })
  } else if (!email) {
    res.status(400).json({
      code: 'MISSING_FIELD_EMAIL',
      result: {}
    })
  } else if (!password) {
    res.status(400).json({
      code: 'MISSING_FIELD_PASSWORD',
      result: {}
    })
  } else {
    bcrypt.hash(password, 10).then(hash => {
      const newUser = new Aluno({ name, email, disciplinas, periodo, turno, password: hash, roles })
      Aluno.findOne({ email }).then(result => {
        if (!result) {
          newUser.save().then(user => {
            Log(
              'ALUNO',
              user.name + ' registrado.',
              req.user.name,
              'rgb(0, 192, 239)'
            )
            res.send({             
              id: user._id,
              name: user.name,
              email: user.email,
              disciplinas: user.disciplinas,
              periodo: user.periodo,
              turno: user.turno,
              roles: user.roles,
              join_date: user.joined
            })
          })
        } else {
          res.status(400).json({
            code: 'EMAIL_IN_USE',
            result: {}
          })
        }
      })
    })
  }
})

router.delete('/', hasRole('csti'), (req, res) => {
  const { id } = req.body
  Aluno.deleteOne({ _id: id })
    .then(result => {
      Log(
        'Aluno',
        user.name + ' removido.',
        req.user.name,
        'rgb(0, 192, 239)'
      )
      res.send(result)
    })
    .catch(err => {
      res.send(err)
    })
})

router.get('/:id', hasRole('csti'), (req, res) => {
  Aluno.find({ _id: req.params.id }).then(users => {
    res.send(users[0])
  })
})

router.patch('/:id', hasRole('csti'), (req, res) => {
  Aluno.update(
    { _id: req.params.id },
    {
      $set: req.body
    }
  ).then(user => {
    res.send(user)
  })
})

export default router
