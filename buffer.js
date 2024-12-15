let http = require('http')
const  routes = require("./routes")

let server  = http.createServer(routes) 

server.listen(3000,()=>{
    console.log('server is running')
})



