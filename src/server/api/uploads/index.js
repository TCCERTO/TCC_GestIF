import { Router } from 'express'
import hasRole from '../middlewares/hasRole'
import { connection } from 'mongoose'
import Log from '../../utils/LogService'

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

var roles
var disciplina
var name

router.get('/me/:disciplina/:roles/:name', (req, res) => {
  roles = req.params.roles
  disciplina = req.params.disciplina
  name = req.params.name
})

router.get('/pae', (req, res) => {
  roles = 'pae'
  disciplina = ''
  name = ''
})

const storage = new GridFsStorage({
  url: uri,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(4, (err, buf) => {
        if (err) {
          return reject(err)
        }
        const filename =
          roles +
          disciplina +
          name +
          buf.toString('hex') +
          '-' +
          file.originalname /*+ path.extname(file.originalname);*/
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
router.post('/upload', upload.single('file'), (req, res, next) => {
  //res.send(req.file)
  res.statusCode = 302
  res.setHeader('Location', '../../')
  res.end()
})

// mostra os uploads
router.get('/', (req, res) => {
  gfs.files.find().toArray((err, files) => {
    res.send(files)
  })
})

// mostra os uploads para alunos
router.get('/a/a/:disciplina', (req, res) => {
  gfs.files
    .find({ filename: { $regex: '.*' + req.params.disciplina + '.*' } })
    .toArray((err, files) => {
      res.send(files)
    })
})

// mostra os uploads de monitores e professores
router.get('/m/p/:disciplina/:roles/:name', (req, res) => {
  gfs.files
    .find({
      filename: {
        $regex: '.*' + req.params.disciplina + '.*',
        $regex: '.*' + req.params.roles + '.*',
        $regex: '.*' + req.params.name + '.*'
      }
    })
    .toArray((err, files) => {
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

// mostra os uploads de professores
router.get('/profs', (req, res) => {
  gfs.files.find({ filename: /professor/ }).toArray((err, files) => {
    res.send(files)
  })
})

// mostra os uploads do pae
router.get('/paeU', (req, res) => {
  gfs.files.find({ filename: /pae/ }).toArray((err, files) => {
    res.send(files)
  })
})

// mostra os uploads de monitores
router.get('/monitores', (req, res) => {
  gfs.files.find({ filename: /monitor/ }).toArray((err, files) => {
    res.send(files)
  })
})

// mostra os uploads de monitores
router.get('/listas', (req, res) => {
  gfs.files.find({ filename: /monitor/ }).toArray((err, files) => {
    res.send(files)
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

// mostra o arquivo no navegador para alunos. Rota /api/uploads/:filename
router.get('/:username/alunos/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'Esse arquivo não existe!'
      })
    }
    const readstream = gfs.createReadStream(file.filename)
    readstream.pipe(res)
    Log(
      'ATIVIDADE',
      req.params.username + ' acessou a atividade ' + file.filename,
      'aluno',
      req.params.username,
      'rgb(77, 77, 255)'
    )
  })
})

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

// faz o download para alunos
router.get('/downloads/aluno/a/:username/:filename', async (req, res) => {
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
      Log(
        'ATIVIDADE',
        req.params.username +
          ' fez download da atividade ' +
          req.params.filename,
        'aluno',
        req.params.username,
        'rgb(77, 77, 255)'
      )
      // Return response
      return readstream.pipe(res)
    })
})

// apaga o arquivo
router.delete('/delete', (req, res) => {
  gfs.collection('uploads')
  const { id } = req.body
  gfs.remove({ _id: id, root: 'uploads' }).then(a => {
    res.send('Arquivo deletado')
  })
})

export default router
