const
    express = require('express'),
    path = require('path')

const app = express()
let port = process.env.PORT || 8081
app.use(express.static(path.join(__dirname)))
//app.use(require('./client/routes')())

app.listen(port,()=>{

    console.log('server running on. \n localhost:',port)
})