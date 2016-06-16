const crypto      = require('crypto')
const browserify  = require('browserify')
const join        = require('path').join
const app         = require('express')()
const route       = require('express').Router()
const levelup     = require('levelup')
const db          = levelup('./database', {valueEncoding: 'json'})

function hpass(str){
  return crypto.createHash('sha1').update(str+'9z8x7cv98zxv').digest('hex')
}


browserify()
  .add(join(__dirname, 'client.js'))
  .bundle()


const html = require('fs').readFileSync(join(__dirname,'public/index.html'))
const priv = require('fs').readFileSync(join(__dirname,'private/index.html'))
//app.use(require('serve-favicon')(join(__dirname, 'public/favicon.ico')))

//app.use(require('express').static('public'))
route.use(require('cookie-parser')())
//route.use(require('connect-timeout')('5s'))
route.use(require('body-parser').json())

//route.get('/login', (req,res)=>{})

route.get('/dot.js', (req, res)=> {
  browserify()
    .add(join(__dirname, 'client.js'))
    .bundle()
    .pipe(res)
})

route.get('/', function(req, res) {
  res.set('Content-Type', 'text/html')
  if(req.cookies && req.cookies.auth){
    res.send(priv)
  } else {
    //res.cookie('auth', true, { maxAge: 900000 })//httpOnly:true})
    res.send(html)
  }
})

route.post('/login', (req, res)=>{
  var ret = {
    result: 'bad'
  }

  if (req.body.login) {
    db.get(req.body.login, (err, val)=> {
      if (!err && req.body.pass && hpass(req.body.pass) === val.pass)
        res.cookie('auth', true, { httpOnly: true })
      res.json(ret)
    })
  } else {
    res.json(ret)
  }
})

app.use(route)
require('http').createServer(app).listen(30777)
