import mongoose from 'mongoose'

export const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: new mongoose.Types.ObjectId().toString(),
  },
  name: String,
  email: String,
})
