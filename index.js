const express = require('express')
const app = express()

const bodyParser = require('body-parser');
const db = require('./db')
const userouter = require('./routes/user')

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.set('views', './views') // specify the views directory
app.set('view engine', 'pug') // register the template engine
const port = 3000


app.get('/', (req, res) => {
  res.render('index',{
      ten:'nguyendoanhung'
  });
})
app.use('/users',userouter)

app.listen(port, () => {
  console.log('localhost:'+port)
})