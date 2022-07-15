import { promises as fs } from 'fs'

export default class FileContainer {
    public config
    public fs
    readonly fileName: string

    constructor(fileName: string) {
        this.fileName = fileName
        this.config = `./db/${fileName}`
        this.fs = fs
    }

    public async createIfNotExist(): Promise<Buffer | null> {
        try {
            return await fs.readFile(this.config)
        } catch (error: any) {
            if (error.code === 'ENOENT') {
                await fs.writeFile(this.config, '[]').then(() => {
                    console.log(`No existe ${this.fileName}. Archivo creado.`)
                })
                return await fs.readFile(this.config)
            }
            console.log('Hubo un error', error)
        }
        return null
    }
}
