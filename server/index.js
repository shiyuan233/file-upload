const express = require('express')
const http = require('http')
var bodyParser = require('body-parser') //加载中间件
//form表单需要的中间件。
var mutipart = require('connect-multiparty')

const app = express()

//设置跨域访问
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

var mutipartMiddeware = mutipart()
//临时文件的储存位置
app.use(mutipart({ uploadDir: './temp_file' }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
//加入这个配置，则在req请求对象上会多出来一个属性：body(可通过req.body来获取表单POST请求体数据了)
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.post('/post', mutipartMiddeware, (req, res) => {
  console.log('req.files数据：', req.files)
  console.log('post数据：', req.body)
  //返回结果
  res.json(JSON.stringify({ code: 200, data: '成功' }))
})

app.post('/get', (req, res) => {
  //返回结果
  res.end(JSON.stringify({ code: 200, data: 'get' }))
})

// app.use(function (req, res) {
//   res.setHeader('Content-Type', 'text/plain')
//   res.write('404\n')
//   res.end(JSON.stringify(req.body, null, 2))
// })
const server = http.createServer(app)
const PORT = 3001
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))

server.timeout = 1000 * 60 * 10 // 10 min
