import httpServer from './src/utils/chat'
import cluster from 'cluster'
import { mode, numCPUs, PORT } from './src/routes/routes'

if (mode._[0] === 'CLUSTER') {
    if (cluster.isPrimary) {
        console.log('Master cluster setting up')
        for (let i = 0; i < numCPUs; i++) {
            cluster.fork()
        }
        cluster.on('exit', (worker) => {
            console.log(`worker ${worker.process.pid} died`)
        })
    } else {
        httpServer.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`)
        })

        console.log(`Worker ${process.pid} started`)
    }
} else {
    httpServer.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`)
    })
}
