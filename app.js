const http =  require('http')

const server = http.createServer((req,res) =>{
    res.setHeader('content-Type','text/html')
    if(req.url ==='/'){
        res.write("<h1>Hello world</h1>")
        res.end()
    }
    else if(req.url === "/home"){
        res.write("<H1>Welcome to Homepage</H1>")
        res.end()
    }
    else if(req.url === "/about"){
        res.write("<H1>Welcome to About us</H1>")
        res.end()
    }
    else if(req.url === "/node"){
        res.write("<H1>Welcome to my nodejs project</H1>")
        res.end()
    }
   else{
    res.write("<h1>Page not found</h1>")
    res.end()
   }
})
server.listen(3000)