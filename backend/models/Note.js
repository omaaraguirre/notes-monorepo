import mongoose from 'mongoose'

const noteSchema = new mongoose.Schema({ // Definir el esquema de la base de datos
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  important: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

// Transformar el objeto que se devuelve al cliente para que no se muestre el _id y se muestre id en su lugar (por defecto se muestra _id)
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id // Almacenar el _id en id
    delete returnedObject._id // Eliminar el _id
    delete returnedObject.__v // Eliminar el __v
  }
})
const Note = mongoose.model('Note', noteSchema)

export default Note
