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

    socket.on('answerCall', ({to, answer}:any) => {
        io.to(to).emit('callAccepted', {answer})
    })

    socket.on('iceCandidate', ({to, candidate}:any) => {
        console.log(candidate, 'candidate')
        io.to(to).emit('iceSend', {candidate})
    })
})

// app.post('/api/data', (req, res) => {
// console.log(req.body);

// return res.send(200)
// })

// app.listen(3022, ()=> {
//     console.log('App listening at localhost')
// })