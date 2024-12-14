let http = require('http')
let fs = require("fs")
let server  = http.createServer((req,res) =>{

    const url = req.url;
    const method = req.method;
    if(url ==='/'){
        res.setHeader('Content-type','text/html')
        res.end(
            `
            <form action="/message" method ="POST">
            <label>Name:</label>
            <input type='text' name='username'></input>
            <button type ='submit'>Add</button>
            </form>
            `
        )
    }
    else{
           if(url ==="/message"){

            res.setHeader('Content-type','text/html')
            let datachunks = [];

            req.on('data',(chunks) =>{
                console.log(chunks)
                datachunks.push(chunks)
            })

            req.on('end',()=>{
                let combinedBuffer = Buffer.concat(datachunks)
                console.log(combinedBuffer.toString())
                let value = combinedBuffer.toString().split("=")[1]
                console.log(value)

                fs.writeFile("userData.txt",value,(err) =>{
                    res.statusCode =302;
                    res.setHeader('Location','/')
                    res.end();
                })
            })
           
        }
       
    }
   
})

server.listen(3000,()=>{
    console.log('server is running')
})