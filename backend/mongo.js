import mongoose from 'mongoose'

const connectMongo = (connectionString, env) => {
  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => console.log(`Connected to MongoDB in ${env} mode`))
    .catch(error => console.log('Error connecting to MongoDB:', error.message))
}

export default connectMongo
