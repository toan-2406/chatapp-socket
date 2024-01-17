import { useEffect, useId, useState } from 'react'
import './App.css'
import io from 'socket.io-client'
import ChatComponent from './components/Chat'
const socket = io('http://localhost:3000')

function App() {
  const id = useId()
  const [message, setMessage] = useState('')
  const [room, setRoom] = useState('')
  const [messageHistory, setMessageHistory] = useState<string[]>([]);
  const [apiResponse, setApiResponse] = useState('');
  const sendMessage = () => {
    socket.emit('send_message', { message, room,id })
  }

  const sendJoinRoom = () => {
    if (room !== "") {
      socket.emit('join_room', room)
    }
  }
  const fetchData = async () => {
    try {
      // Sử dụng fetch để gọi API
      const response = await fetch(`http://localhost:3000/api/v1/chat/room?id=${room}`);

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      // Chuyển đổi response thành dữ liệu JSON
      const data = await response.json();
      setApiResponse(data.message);
    } catch (error:any) {
      console.error('Error:', error.message);
    }
  };
  useEffect(() => {
    // Sử dụng event 'receive_message_history' để nhận lịch sử tin nhắn khi tham gia vào phòng
    socket.on('receive_message_history', (data) => {
      setMessageHistory(data.history);
    });

    // Sử dụng event 'receive_message' để nhận tin nhắn mới
    socket.on('receive_message', (data) => {
      setMessageHistory(prevHistory => [...prevHistory, data.message]); // Thêm tin nhắn mới vào lịch sử
    });

    // Cleanup effect khi component unmount
    return () => {
      socket.off('receive_message_history');
      socket.off('receive_message');
    }
  }, [room]);

  return (
    <div className='App'>
      <div>
        <input placeholder='Enter room...' value={room} onChange={(e) => setRoom(e.target.value)} />
        <button onClick={sendJoinRoom}>Join Room</button>
      </div>
      <div>
        <input type="text" placeholder='Enter message...' value={message} onChange={(e) => setMessage(e.target.value)} />
        <button onClick={sendMessage}>Send Message</button>
      </div>
      <h1>Message:</h1>
      {/* Hiển thị lịch sử tin nhắn */}
      {messageHistory.map((msg, index) => (
        <div key={index}>{msg}</div>
      ))}
       <ChatComponent />
    </div>
  )
}

export default App
