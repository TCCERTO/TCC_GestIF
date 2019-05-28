import { Router } from 'express'
import withToken from './middlewares/withToken'

import auth from './auth'
import users from './users'
import reports from './reports'
import reportar from './reports/reportar'
import logs from './logs'
import install from './install'
//import alunos from './alunos'
//import professores from './professores'
import logsAlunos from './logsAlunos'
import logsProfessores from './logsProfessores'
import monitorias from './monitorias'
import reservas from './reservas'
import uploads from './uploads'
import pae from './pae'

const router = Router()

//Define rotas principais de autenticação, usuários e reports.
//Rotas com withToken(middleware) só poderão ser acessadas se autenticado.
router.use('/auth', auth)
router.use('/users', withToken, users)
router.use('/reportar', reportar)
router.use('/reports', withToken, reports)
router.use('/logs', withToken, logs)
router.use('/install', install)
//router.use('/alunos', withToken, alunos)
//router.use('/professores', withToken, professores)
router.use('/logsAlunos', withToken, logsAlunos)
router.use('/logsProfessores', withToken, logsProfessores)
router.use('/monitorias', monitorias)
router.use('/reservas', reservas)
router.use('/uploads', /*withToken,*/ uploads)
router.use('/pae', withToken, pae)

export default router
