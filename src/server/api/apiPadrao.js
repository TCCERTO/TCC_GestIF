import { Router } from 'express'
import hasRole from '../middlewares/hasRole'

const router = Router()

// Busca dados. Rota: /api/apiPadrao/
router.get('/', hasRole('novoModulo'), (req, res) => {})

// Busca dados. É possível alterar o nome da rota: /api/apiPadrao/rota2
router.get('/rota2', hasRole('novoModulo'), (req, res) => {})

// Atualiza dados.  Rota: /api/apiPadrao/rotaPatch
router.patch('/rotaPatch', hasRole('novoModulo'), (req, res) => {})

// Envia dados. Rota: /api/apiPadrao/rotaPost
router.post('/rotaPost', hasRole('novoModulo'), (req, res) => {})

// Deleta dados. Rota: /api/apiPadrao/rotaDelete
router.delete('/rotaDelete', hasRole('novoModulo'), (req, res) => {})

export default router
