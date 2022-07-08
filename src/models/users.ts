import { Schema, model } from 'mongoose'

const usersCollection = 'users'

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  age: { type: Number, required: true },
  phoneNumber: { type: String, required: true },
  avatar: { type: String, required: true }
})

const User = model(usersCollection, userSchema)

export default User
