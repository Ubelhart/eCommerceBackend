import app from './src/app'
import parseArgs from 'minimist'
import cluster from 'cluster'
import os from 'os'
import { logger } from './src/app'
const numCPUs = os.cpus().length
const port = parseArgs(process.argv.slice(2))
const mode = parseArgs(process.argv.slice(3))

const PORT = process.env.PORT || port._[0] || 8080

const info = {
  'Argumentos de entrada': process.argv,
  'Nombre de la plataforma: ': process.platform,
  'Versión de Node: ': process.version,
  'Memoria total reservada': process.memoryUsage().heapTotal,
  'Path de ejecución': process.execPath,
  'Process id': process.pid,
  'Número de procesadores presentes en el servidor':
    mode._[0] === 'CLUSTER' ? numCPUs : 1,
  'Carpeta del proyecto': __dirname,
  Port: PORT
}

app.get('/info', (_req, res) => {
  res.json(info)
})

app.get('*', (_req, res) => {
  logger.warn('Ruta no existente')
  res.send('Ruta no existente')
})

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
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`)
    })

    console.log(`Worker ${process.pid} started`)
  }
} else {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
  })
}
