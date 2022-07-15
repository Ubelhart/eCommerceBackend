import parseArgs from 'minimist'
import os from 'os'
import app from './AuthRoute'
import logger from '../utils/logger'
export const numCPUs = os.cpus().length
const port = parseArgs(process.argv.slice(2))
export const mode = parseArgs(process.argv.slice(3))

export const PORT = process.env.PORT || port._[0] || 8080

app.get('/', (req: any, res) => {
    if (req.user) {
        return res.json(req.user)
    }
    return res.redirect('/login')
})

app.get('/api/randoms', (req, res) => {
    const { cant } = req.query
    const parseCant: number = Number(cant) || 100000
    const numbers: number[] = []

    for (let i = 0; i < parseCant; i++) {
        numbers.push(Math.floor(Math.random() * 1000))
    }
    res.json(numbers)
})

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
