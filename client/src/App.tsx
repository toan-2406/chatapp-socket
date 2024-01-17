import { useEffect, useId, useState } from 'react'
import './App.css'
import io from 'socket.io-client'
import ListRoomComponent from './components/ListRoom'
import CreateRoom from './components/CreateRoom'

function App() {
  const id = useId()
  const [message, setMessage] = useState('')
  const [room, setRoom] = useState('')
  const [messageHistory, setMessageHistory] = useState<string[]>([]);

  const joinRoom = async () => {
    try {
      const apiResponse = await fetch('http://localhost:5000/api/v1/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          room,
        }),
      });
      console.log(apiResponse)
    } catch (error:any) {
      console.error('Error:', error.message);
      console.log('An error occurred while joining the room.');
    }
  };




  return (
    <div className='App'>
       <ListRoomComponent />
       <CreateRoom/>
    </div>
  )
}

export default App
