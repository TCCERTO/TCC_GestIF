import { Router } from 'express'
import hasRole from '../middlewares/hasRole'
import { connection } from 'mongoose'

const GridFsStorage = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')
const bodyParser = require('body-parser')
const path = require('path')
const crypto = require('crypto')
const mongoose = require('mongoose')
const multer = require('multer')
const methodOverride = require('method-override')
const router = Router()
const uri =
  'mongodb+srv://tcc:bmrtcc10@cluster0-kciz5.mongodb.net/test?retryWrites=true'

mongoose.connect(uri)
var conn = mongoose.connection
Grid.mongo = mongoose.mongo
let gfs

conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo)
  gfs.collection('uploads')
})

const storage = new GridFsStorage({
  url: uri,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err)
        }
        const filename =
          file.originalname +
          '-' +
          buf.toString('hex') /*+ path.extname(file.originalname);*/
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        }
        resolve(fileInfo)
      })
    })
  }
})
/*
MongoClient.connect(uri, function(err, client) {
    //const collection = client.db('gestif').collection('users')
    // perform actions on the collection object
    const db = client.db;
    var fs = Grid(db, mongoose.mongo)
}) */
/*
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) =>{
        var ext = file.originalname.substr(file.originalname.lastIndexOf('.') + 1)
        cb(null, file.fieldname + '-' + Date.now() + file.originalname + '.' + ext)
    }
})*/
const upload = multer({ storage: storage })

// faz o upload
router.post(
  '/upload',
  /*hasRole('professor'),*/ upload.single('file'),
  (req, res, next) => {
    res.send(req.file)
  }
)

// mostra os uploads
router.get('/', (req, res) => {
  gfs.files.find().toArray((err, files) => {
    res.send(files)
  })
})

// mostra os uploads também :/
router.get('/files', (req, res) => {
  gfs.files.find().toArray((err, files) => {
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: 'Não há arquivos!'
      })
    }
    return res.json(files)
  })
})

// mostra o arquivo no navegador. Rota /api/uploads/:filename
router.get('/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'Esse arquivo não existe!'
      })
    }
    const readstream = gfs.createReadStream(file.filename)
    readstream.pipe(res)
  })
})

// /images/:filename não funciona
/*router.get('/:filename', (req,res) =>{    
  gfs.files.findOne({filename: req.params.filename}, (err, file) =>{
    if(!file || file.length === 0){
      return res.status(404).json({
        err: 'Esse arquivo não existe!'
      })
    }
    return res.json(file)
  }) 
})*/

// faz o download
router.get('/downloads/:filename', async (req, res) => {
  gfs.collection('uploads') //set collection name to lookup into

  /** First check if file exists */
  gfs.files
    .find({ filename: req.params.filename })
    .toArray(function(err, files) {
      if (!files || files.length === 0) {
        return res.status(404).json({
          responseCode: 1,
          responseMessage: 'error'
        })
      }
      // create read stream
      var readstream = gfs.createReadStream({
        filename: files[0].filename,
        root: ''
      })
      // set the proper content type
      res.set('Content-Type', 'application/octet-stream')
      // Return response
      return readstream.pipe(res)
    })
})

// apaga o arquivo
router.delete('/delete/:filename', (req, res) => {
  gfs.collection('uploads')

  gfs.files.delete(req.params.filename).catch(err => {
    res.send('err')
  })
})

export default router
