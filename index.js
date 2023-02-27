// Node server which will handle socket io
// const io = require('socket.io')(8080)  
const express = require('express');
const app = express();
const port = 8080;
app.get('/',(req,res)=>{
    res.send("Hello World!")
});
app.listen(port,()=>{
    console.log(`Example app listening at port: ${port}`);
});
const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
    cors: {
              origin: 'http://127.0.0.1:5500',
              methods: ['GET', 'POST'],
              allowedHeaders: ["my-custom-header"],
              credentials: true
            }
});


httpServer.listen(8080);
  
const user = {};

io.on('connection',socket=>{
    socket.on('new-user-joined',name=>{
        user[socket.id]=name;
        console.log(name)
        socket.broadcast.emit('user-joined',name);
        console.log(name)
    });
    
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message: message , name: user[socket.id]});
        
    });

    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',user[socket.id]);
        delete user[socket.id];
    });
});


  