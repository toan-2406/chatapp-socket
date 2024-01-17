import { useState } from 'react'

const CreateRoom = () => {
    const [room, setRoom] = useState('')
    const createRoom = async () => {
        try {
            if(room.length === 0) {
                return
            }
            const apiResponse = await fetch('http://localhost:5000/api/v1/chat/rooms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: room
                }),
            });
            console.log(apiResponse)
        } catch (error:any) {
            console.error('Error:', error.message);
            console.log('An error occurred while joining the room.');
        }
    }
  return (
    <div>
        <h1>CreateRoom</h1>
       <form onSubmit={(e)=>{
        e.preventDefault()
        createRoom()
       }}>
       <input type='text' placeholder='Enter room name' name='name' value={room} onChange={(v) => setRoom(v.target.value)}/> 
        <button >create</button>
       </form>
    </div>
  )
}

export default CreateRoom