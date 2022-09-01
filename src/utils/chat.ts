import { Server as HttpServer } from 'http'
import { Server as IOServer } from 'socket.io'
import app from '../app'
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
import Factory from '../factory'
const factory = Factory.getInstance()
const daoMessages = factory.create(process.env.DB, 'messages')

io.on('connection', async (socket) => {
    console.log('Un cliente se ha conectado')

    socket.emit('messages', await daoMessages.getMessages())
    socket.on('new-message', async (newMessage) => {
        daoMessages.postMessage(newMessage)
        io.sockets.emit('messages', await daoMessages.getMessages())
    })
})

export default httpServer
