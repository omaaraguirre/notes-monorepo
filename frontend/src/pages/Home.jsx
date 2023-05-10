import OpenFormButton from '../components/OpenFormButton'
import Modal from '../components/Modal'
import Notes from '../components/Notes'
import Form from '../components/Form'
import { useState } from 'react'

const Home = () => {
  const [isVisible, setIsVisible] = useState(false)

  const toggleModal = () => {
    setIsVisible(!isVisible)
  }

  return (
    <main className='w-11/12 max-w-7xl py-5'>
      <OpenFormButton toggleModal={toggleModal} />
      <Modal isVisible={isVisible} toggleModal={toggleModal}>
        <Form onFinish={toggleModal} />
      </Modal>
      <Notes />
    </main>
  )
}

export default Home
