const express = require('express')
const bodyParser = require('body-parser') //中间件
const multer = require('multer')

const getSeedActivity = require('./seedActivity')
console.log(getSeedActivity)
let app = express()

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static('qiniu'))
app.use(express.static('cache'))

app.all('*', function(req, res, next) {//开发模式下允许跨域访问
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
    next();
});

app.get('/test',(req,res)=>{ //添加一条新的新闻
  getSeedActivity.seedActivity().then(data => res.json(data))
})

app.listen(3000,function(){
})