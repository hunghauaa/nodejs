const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter) 

const port = 3000
app.set('views', './views') // specify the views directory
app.set('view engine', 'pug') // register the template engine
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
db.defaults({ users: []})
  .write()
app.get('/', (req, res) => {
  res.render('index',{
      ten:'nguyendoanhung'
  });
})
app.get('/users/userlist', (req,res)=>{
    res.render('users/userlist',{
        users:db.get('users').value()
    })
})
app.get('/users/search',(req,res)=>{
    var bienSearch = req.query.q
    var userSearch = db.get('users').value().filter((user)=>{
        return user.name.indexOf(bienSearch) !== -1
    }
    )
    res.render('users/userlist',{
        users:userSearch,
        values:bienSearch
    })
    console.log(db.get('users').value())
})
app.post('/users/create',(req,res)=>{
    var nameAdd = req.body;
    db.get('users').push(nameAdd).write()
    res.redirect('/users/userlist')
})
app.get('/users/create', (req,res)=>{
    res.render('users/create')
})


app.listen(port, () => {
  console.log('localhost:'+port)
})