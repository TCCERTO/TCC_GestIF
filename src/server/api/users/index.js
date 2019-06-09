import { Router } from 'express'
import bcrypt from 'bcrypt'
import User from '../../models/Users'
import hasRole from '../middlewares/hasRole'
import Log from '../../utils/LogService'

const router = Router()

//lista todos os usuários da rota 'api/users/'
router.get('/', hasRole('csti'), (req, res) => {
  User.find({}).then(users => {
    res.send(users)
  })
})

//lista todos os alunos da rota 'api/users/alunosFind'
router.get('/alunosFind', hasRole('cotp'), (req, res) => {
  User.find({ roles: { $all: ['aluno'] } }).then(alunos => {
    res.send(alunos)
  })
})

//lista todos os professores da rota 'api/users/professoresFind'
router.get('/professoresFind', hasRole('cotp'), (req, res) => {
  User.find({ roles: { $all: ['professor'] } }).then(professores => {
    res.send(professores)
  })
})

//lista todos os monitores da rota 'api/users/monitoresFind'
router.get('/monitoresFind', hasRole('cotp'), (req, res) => {
  User.find({ roles: { $all: ['monitor'] } }).then(monitores => {
    res.send(monitores)
  })
})

//lista todos os alunos da rota 'api/users/alunosFindP'
router.get('/alunosFindP', hasRole('professor'), (req, res) => {
  User.find({
    roles: { $all: ['aluno'] },
    disciplina: { $all: [req.disciplina] }
  }).then(alunos => {
    res.send(alunos)
  })
})

//Atualiza os dados de um usuário na rota 'api/users/'
router.patch('/', (req, res) => {
  User.update(
    { _id: req.user.id },
    {
      $set: req.body
    }
  ).then(user => {
    res.send(user)
  })
})

//Lista os dados do usuário relativo ao token. Rota 'api/users/me'
router.get('/me', (req, res) => {
  User.findById(req.user.id)
    .then(user => {
      res.send(user)
    })
    .catch(err => {
      res.send(err)
    })
})

//Lista os dados da monitoria relativo ao token. Rota 'api/users/me1'
router.get('/me1', (req, res) => {
  User.findById(req.user.id)
    .then(user => {
      res.send(user.monitorias)
    })
    .catch(err => {
      res.send(err)
    })
})

//Lista os dados da aulas relativo ao token. Rota 'api/users/me2'
router.get('/me2', (req, res) => {
  User.findById(req.user.id)
    .then(user => {
      res.send(user.aulas)
    })
    .catch(err => {
      res.send(err)
    })
})

//Lista os dados da aulas para alunos. Rota 'api/users/aulas/:disciplina'
router.get('/aulas/:disciplina', (req, res) => {
  User.find({
    roles: { $all: ['professor'] },
    disciplina: req.params.disciplina
  })
    .then(user => {
      res.send(user)
    })
    .catch(err => {
      res.send(err)
    })
})

//Lista os dados do usuário relativo ao token. Rota 'api/users/me'
router.get('/meP', (req, res) => {
  User.findById(req.user.id)
    .then(user => {
      User.find({
        roles: { $all: ['aluno'] },
        disciplina: { $all: [user.disciplina] }
      }).then(alunos => {
        res.send(alunos)
      })
      //res.send(user)
    })
    .catch(err => {
      res.send(err)
    })
})

//Atualiza os dados do usuário relativo ao token. Rota 'api/users/me'
router.patch('/me', (req, res) => {
  if (req.body.password) {
    bcrypt.hash(req.body.password, 10).then(hash => {
      const { password, ...objSemSenha } = req.body
      User.update(
        { _id: req.user.id },
        {
          $set: { ...objSemSenha, password: hash }
        }
      ).then(user => {
        res.send(user)
      })
    })
  } else {
    User.update(
      { _id: req.user.id },
      {
        $set: req.body
      }
    ).then(user => {
      res.send(user)
    })
  }
})

//Cria um usuário. Rota 'api/users/'
router.post('/', hasRole('csti'), (req, res) => {
  const { name, email, password, roles } = req.body
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
      const newUser = new User({ name, email, roles, password: hash })
      User.findOne({ email }).then(result => {
        if (!result) {
          newUser.save().then(user => {
            Log(
              'USUARIO',
              user.name + ' registrado.',
              req.user.name,
              'rgb(0, 192, 239)'
            )
            res.send({
              id: user._id,
              name: user.name,
              email: user.email,
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

//Cria um aluno. Rota 'api/alunos/alunosCad'
router.post('/alunosCad', hasRole('cotp'), (req, res) => {
  const { name, email, disciplina, periodo, turno, password, roles } = req.body
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
      const newUser = new User({
        name,
        email,
        disciplina,
        periodo,
        turno,
        password: hash,
        roles
      })
      User.findOne({ email }).then(result => {
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
              disciplina: user.disciplina,
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

//Cria um professor. Rota 'api/professor/'
router.post('/professoresCad', hasRole('cotp'), (req, res) => {
  const { name, email, password, roles, disciplina } = req.body
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
      const newUser = new User({
        name,
        email,
        roles,
        disciplina,
        password: hash
      })
      User.findOne({ email }).then(result => {
        if (!result) {
          newUser.save().then(user => {
            Log(
              'PROFESSOR',
              user.name + ' registrado.',
              req.user.name,
              'rgb(0, 192, 239)'
            )
            res.send({
              id: user._id,
              name: user.name,
              email: user.email,
              roles: user.roles,
              disciplina: user.disciplina,
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

//Cria um monitor. Rota 'api/monitor/'
router.post('/monitoresCad', hasRole('cotp'), (req, res) => {
  const { name, email, password, roles, disciplina } = req.body
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
      const newUser = new User({
        name,
        email,
        roles,
        disciplina,
        password: hash
      })
      User.findOne({ email }).then(result => {
        if (!result) {
          newUser.save().then(user => {
            Log(
              'MONITOR',
              user.name + ' registrado.',
              req.user.name,
              'rgb(0, 192, 239)'
            )
            res.send({
              id: user._id,
              name: user.name,
              email: user.email,
              roles: user.roles,
              monitorias: user.monitorias,
              disciplina: user.disciplina,
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

router.post('/monitoriaCad', hasRole('monitor'), (req, res) => {
  const { monitoria } = req.body
  //const newM = new Monitoria({ diaSemana, hora })
  User.updateOne({ _id: req.user.id }, { $push: { monitorias: monitoria } })
    .then(user => {
      res.send(user)
    })
    .catch(err => {
      res.send(err)
    })
})

router.delete('/monitoriaDel', hasRole('monitor'), (req, res) => {
  const { monitoria } = req.body
  User.update(
    { _id: req.user.id },
    { $pull: { monitorias: monitoria } },
    { safe: true, multi: true }
  ).then(user => {
    res.send(user)
  })
})

router.post('/aulasCad', hasRole('professor'), (req, res) => {
  const { aula } = req.body
  User.updateOne({ _id: req.user.id }, { $push: { aulas: aula } })
    .then(user => {
      res.send(user)
    })
    .catch(err => {
      res.send(err)
    })
})

router.delete('/aulasDel', hasRole('professor'), (req, res) => {
  const { aula } = req.body
  User.update(
    { _id: req.user.id },
    { $pull: { aulas: aula } },
    { safe: true, multi: true }
  ).then(user => {
    res.send(user)
  })
})

//Atualiza os dados da monitoria na rota 'api/users/'
/*router.patch('/monitoriaEdit', (req, res) => {
  User.update(
    { _id: req.user.id },
    {
      $set: { monitorias: req.body }
    }
  ).then(user => {
    res.send(user)
  })
})*/

router.delete('/', hasRole('csti'), (req, res) => {
  const { id } = req.body
  User.deleteOne({ _id: id })
    .then(result => {
      Log(
        'USUARIO',
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

router.delete('/alunosDel', hasRole('cotp'), (req, res) => {
  const { id } = req.body
  User.deleteOne({ _id: id })
    .then(result => {
      Log('ALUNO', user.name + ' removido.', req.user.name, 'rgb(0, 192, 239)')
      res.send(result)
    })
    .catch(err => {
      res.send(err)
    })
})

router.delete('/professoresDel', hasRole('cotp'), (req, res) => {
  const { id } = req.body
  User.deleteOne({ _id: id })
    .then(result => {
      Log(
        'PROFESSOR',
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

router.delete('/monitoresDel', hasRole('cotp'), (req, res) => {
  const { id } = req.body
  User.deleteOne({ _id: id })
    .then(result => {
      Log(
        'MONITOR',
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
  User.find({ _id: req.params.id }).then(users => {
    res.send(users[0])
  })
})

router.get('/:id', hasRole('cotp'), (req, res) => {
  User.find({ _id: req.params.id }).then(users => {
    res.send(users[0])
  })
})

router.patch('/:id', hasRole('csti'), (req, res) => {
  User.update(
    { _id: req.params.id },
    {
      $set: req.body
    }
  ).then(user => {
    res.send(user)
  })
})

router.patch('/:id', hasRole('cotp'), (req, res) => {
  User.update(
    { _id: req.params.id },
    {
      $set: req.body
    }
  ).then(user => {
    res.send(user)
  })
})

export default router
