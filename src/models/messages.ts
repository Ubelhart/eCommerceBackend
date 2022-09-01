import mongoose from 'mongoose'
import { IMessageMongo } from '../interfaces/Message'

const messagesCollection = 'messages'

export const messageSchema = new mongoose.Schema<IMessageMongo>({
    email: { type: String, required: true },
    text: { type: String, required: true },
    timestamp: { type: String, default: new Date().toString() }
})

export const Message = mongoose.model(messagesCollection, messageSchema)
