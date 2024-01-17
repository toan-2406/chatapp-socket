import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'

const CreateRoom = () => {
    const [room, setRoom] = useState('')
    const createRoomMutation = async (roomName: string) => {
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
                    name: roomName
                }),
            });
            console.log(apiResponse)
        } catch (error:any) {
            console.error('Error:', error.message);
            console.log('An error occurred while joining the room.');
        }
      }
      
    const queryClient = useQueryClient();
  
  const mutation = useMutation(createRoomMutation, {
    onSuccess: () => {
      // Invalidate and refetch 
      queryClient.invalidateQueries('rooms') 
    },
  });
  
  const handleCreate = (roomName:string) => {
    mutation.mutate(roomName);
  }
  return (
    <div>
        <h1>CreateRoom</h1>
       <form onSubmit={() => handleCreate(room)}>
       <input type='text' placeholder='Enter room name' name='name' value={room} onChange={(v) => setRoom(v.target.value)}/> 
        <button >create</button>
       </form>
    </div>
  )
}

export default CreateRoom