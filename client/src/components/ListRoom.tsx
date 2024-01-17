// Import các dependencies
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Room } from '../interfaces';

const fetchRooms = async () => {
  const response = await fetch('http://localhost:5000/api/v1/chat/rooms');
  console.log(response)
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
};
const deleteRoomMutation = async (roomId: string) => {
  const response = await fetch(`http://localhost:5000/api/v1/chat/rooms/${roomId}`,{
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log(response)
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
}
const updateRoomMutation = async (updatedRoom: Room) => {
  const response = await fetch(`http://localhost:5000/api/v1/chat/rooms/${updatedRoom.id}`,{
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedRoom),
  });
  console.log(response)
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
};

// Component sử dụng React Query
const ListRoomComponent: React.FC = ({}) => {
  const { data: rooms } = useQuery('rooms', fetchRooms); 
  const queryClient = useQueryClient();

  const mutationDelete = useMutation(deleteRoomMutation, {
    onSuccess: () => {
      queryClient.invalidateQueries('rooms')
    }  
  });

  const handleDelete = (roomId:string) => {
    mutationDelete.mutate(roomId);
  }
  const mutation = useMutation(updateRoomMutation, {
    onSuccess: () => {
      queryClient.invalidateQueries('rooms')
    }
  })

  const handleUpdate = (updatedRoom:Room) => {
    mutation.mutate(updatedRoom);
  };
  return (
    <div>
      <h1>List Room</h1>
      <ul>
        {rooms?.map((room:any) => (
          <li key={room.id}>Room Name: <input defaultValue={room.name} onBlur={(v) => handleUpdate({
            ...room,
            name: v.target.value  
          })}/> <button onClick={() => handleDelete(room.id)}>Delete</button></li>
        ))}
      </ul>
    </div>
  );
};

export default ListRoomComponent;
