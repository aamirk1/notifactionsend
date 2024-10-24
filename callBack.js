const http = require('node:http');
const fs=require('fs')
const server = http.createServer(async(req, res) => {
  let {url,method}=req;
  try{
  if(url=='/products'&&method=='POST' ){
    let str=''
    req.on('data',chunk=>{
      console.log('hi i am  chunk event listener')
        str+=chunk.toString() 
       
    })
   req.on('end',async(chunk)=>{
      console.log('in end listerner')
      let data=JSON.parse(str)
      await fs.promises.writeFile('data.txt',str)
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({message:'data is successfully added',data:data}));
    })
   req.on('error',chunk=>{
       
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Internal Server Error' }));

     
    })
  
  }
  else if(url=='/products'){
   console.log('/inproducts')
   let data=await fs.promises.readFile('data.txt','utf-8')
   console.log('data:',data)
   res.writeHead(200, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ message: 'Data successfully fetched', data: JSON.parse(data) }));
   //res.writeHead(200, { 'Content-Type': 'application/json' });
   //res.end({message:'data is successfully fetched',data:JSON.parse(data)});
  }
  else{
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');

  }
}
catch(err){

}
 
 
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


