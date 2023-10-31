import mongoose from 'mongoose'

export const eventSchema = new mongoose.Schema({
  title: String,
  location: {
    latitude: String,
    longitude: String,
  },
  date: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  description: String,
  categories: [String],
  banner: String,
  flyers: [String],
  cupons: [String],
  price: {
    type: Array,
  },
  city: String,
  participants: {
    type: Array,
    ref: 'User',
  },
})
