import { Router } from 'express'
import PaeUrl from '../../models/PaeUrl'

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

export default router
