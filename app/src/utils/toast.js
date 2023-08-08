import toast from 'react-hot-toast'

const showToast = (message, type = 'error') => {
  if (type === 'error') {
    toast.error(message)
  } else {
    toast.success(message)
  }
}

export default showToast
