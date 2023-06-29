const socket = require('socket.io').Server;

const port = process.env.port || 8080


// const server = app.listen(port,()=>{
//     console.log(`server is running at port : ${port}`);
// })


const io = new socket(port,{cors:true});

io.on("connection",(socket)=>{

    socket.on("end",()=>{
        socket.disconnect();
    })

})