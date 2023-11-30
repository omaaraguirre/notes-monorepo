import mongoose from 'mongoose'
import { IS_TEST, MONGO_URI } from './config.js'

const connectMongo = () => {
  mongoose.connect(MONGO_URI)
    .then(() => console.log(`Connected to MongoDB ${IS_TEST ? '(testing)' : ''}`))
    .catch(error => console.log('Error connecting to MongoDB:', error.message))
}

export default connectMongo
