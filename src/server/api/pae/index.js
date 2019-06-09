import { Router } from 'express'
import PaeUrl from '../../models/PaeUrl'
import hasRole from '../middlewares/hasRole'

const router = Router()

router.post('/cadNotUrl', (req, res) => {
  const { url, titulo } = req.body

  const newPaeUrl = new PaeUrl({
    url,
    titulo
  })
  newPaeUrl
    .save()
    .then(paeurl => {
      res.send(paeurl)
    })
    .catch(err => {
      res.send({ status: 'ERROR' })
    })
})

router.get('/', (req, res) => {
  PaeUrl.find({}).then(paeurl => {
    res.send(paeurl)
  })
})

router.delete('/delete', (req, res) => {
  const { id } = req.body
  PaeUrl.deleteOne({ _id: id }).then(paeurl => {
    res.send(paeurl)
  })
})

export default router
