import { Router } from 'express'
import withToken from './middlewares/withToken'

import auth from './auth'
import users from './users'
import reports from './reports'
import reportar from './reports/reportar'
import logs from './logs'
import install from './install'
import logsAlunos from './logsAlunos'
import logsProfessores from './logsProfessores'
import logsMonitores from './logsMonitores'
import atividadesAcessadas from './atividadesAcessadas'
import monitorias from './monitorias'
import reservas from './reservas'
import reservasAulas from './reservasAulas'
import uploads from './uploads'
import pae from './pae'
import paeNot from './paeNot'

const router = Router()

//Define rotas principais de autenticação, usuários e reports.
//Rotas com withToken(middleware) só poderão ser acessadas se autenticado.
router.use('/auth', auth)
router.use('/users', withToken, users)
router.use('/reportar', reportar)
router.use('/reports', withToken, reports)
router.use('/logs', withToken, logs)
router.use('/install', install)
router.use('/logsAlunos', withToken, logsAlunos)
router.use('/logsProfessores', withToken, logsProfessores)
router.use('/logsMonitores', withToken, logsMonitores)
router.use('/atividadesAcessadas', withToken, atividadesAcessadas)
router.use('/monitorias', monitorias)
router.use('/reservas', reservas)
router.use('/reservasAulas', withToken, reservasAulas)
router.use('/uploads', /*withToken,*/ uploads)
router.use('/pae', pae)
router.use('/paeNot', paeNot)

export default router
