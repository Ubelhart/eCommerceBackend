import MongoDbContainer from '../../containers/MongoDbContainer'
import { Message } from '../../models/messages'
import { IMessageMongo } from '../../interfaces/Message'

export default class MongoDbDaoMessages extends MongoDbContainer {
    constructor(config: string) {
        super(config)
    }

    public async getMessage(email: string) {
        console.log(email)
        return await Message.findOne({ email })
    }

    public async getMessages() {
        return await Message.find({})
    }

    public async postMessage(newMessage: IMessageMongo) {
        const newMessageModel = new Message(newMessage)
        return await newMessageModel.save()
    }

    public async putMessage(id: string, updatedMessage: IMessageMongo) {
        return await Message.findByIdAndUpdate(id, updatedMessage)
    }

    public async deleteMessage(id: string) {
        return await Message.findByIdAndRemove(id)
    }
}
