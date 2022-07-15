import { createTransport } from 'nodemailer'
import logger from '../utils/logger'

const transporter = createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL,
        pass: process.env.MAIL_PASSWORD
    }
})

async function sendMail(newUser) {
    const info = await transporter.sendMail({
        from: 'Servidor de Tienda',
        port: 587,
        to: process.env.MAIL,
        subject: 'Nuevo registro',
        html: `<h1>${newUser}</h1>`
    })
    logger.info(info)
}

export default sendMail
