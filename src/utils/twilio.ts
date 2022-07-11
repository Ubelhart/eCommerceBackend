import twilio from 'twilio'
import logger from './logger'

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN

const client = twilio(accountSid, authToken)

export const sendWhatsappMessageToAdmin = async (customer: string) => {
  try {
    const message = await client.messages.create({
      body: `Nuevo pedido de ${customer}!`,
      from: `whatsapp:+14${process.env.TWILIO_NUMBER}`,
      to: `whatsapp:+54${process.env.MY_PHONE}`
    })
    logger.info(message)
  } catch (error) {
    logger.error(error)
  }
}

export const sendWhatsappMessageToCustomer = async (phone: string) => {
  try {
    const message = await client.messages.create({
      body: `Su pedido ha sido recibido y se encuentra en proceso!`,
      from: `whatsapp:+14${process.env.TWILIO_NUMBER}`,
      to: `whatsapp:+549${phone}`
    })
    logger.info(message)
  } catch (error) {
    logger.error(error)
  }
}
