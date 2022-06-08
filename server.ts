import app from './src/app'
import parseArgs from 'minimist'

const args = parseArgs(process.argv.slice(2))

const PORT = args._[0] || 8080

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
