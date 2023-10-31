import 'dotenv/config'

import mongoose from 'mongoose'

export async function connect() {
  const PATH = process.env.DATABASE_URL || 'localhost'
  try {
    await mongoose.connect(PATH)
    console.log('database connected')
  } catch (error) {
    console.log('🚀 - file:  database.ts:5 ~ connect ~ error:', error)
  }
}
