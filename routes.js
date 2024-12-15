const fs = require("fs")

const  requestHanlder = ((req,res) =>{
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
                    res.setHeader('Location','/read')
                    res.end();
                })
               
            })
        }
        else{
            if(url ==='/read'){
                //read from the file
                fs.readFile('userData.txt',(error,data) =>{
                    console.log(data.toString());
                    res.end(`
                    <h1>${data.toString()}</h1>
                    `);
                })
            }
        }
       
    }
   
})

module.exports = (requestHanlder)