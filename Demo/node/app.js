const express = require('express')

const bodyParser = require('body-parser') //中间件
const multer = require('multer')

const table = require('./mock/table')
const chart = require('./mock/chart')


let app = express()

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.static('dist'))

app.all('*', function(req, res, next) {//开发模式下允许跨域访问
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
    next();
});


app.get('/table',(req,res)=>{//获取最新的新闻
  res.json(table)
})

app.get('/chart',(req,res)=>{//获取最新的新闻
  res.json(chart)
})



app.listen(8888,function(){
})