// import * as express from "express";

// const PORT = process.env.PORT || 4000

// const app = express()

// const server = app.listen(PORT, () => {
//     console.log(`listrning on ${PORT}`)
// })

console.log('hello worl')

import  express from "express";
const app = express()

const server = require('http').createServer(app)
const cors = require('cors')
// import express from 'express'


const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ['GET', "POST"]
    }
})

app.use(cors())

const PORT = process.env.PORT || 3022;

app.get('/', (req, res) => {
return res.send('server is listening')
})

server.listen(PORT, ()=> {
        console.log('App listening at loclh')
    })

io.on('connection', (socket:any) => {
    socket.emit('me', socket.id)

    socket.on('disconnect', () => {
        socket.broadcast.emit('callended')
    });

    socket.on('callUser', ({userToCall, signalData, from, name}:any) => {
        // console.log('supa bounce')
        io.to(userToCall).emit('callUser', {signal: signalData, from, name})
    })

    socket.on('answerCall', (data:any) => {
        io.to(data.to).emit('callAccepted', data.answer)
    })
})

// app.post('/api/data', (req, res) => {
// console.log(req.body);

// return res.send(200)
// })

// app.listen(3022, ()=> {
//     console.log('App listening at localhost')
// })