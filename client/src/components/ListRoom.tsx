// Import các dependencies
import { useQuery } from 'react-query';
import { Room } from '../interfaces';

// Khai báo hàm fetch data từ API
const fetchData = async () => {
  const response = await fetch('http://localhost:5000/api/v1/chat/rooms');
  console.log(response)
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
};

const deleteRoom = async (id:string) => {
  const response = await fetch(`http://localhost:5000/api/v1/chat/rooms/${id}`,{
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
};
const updateRoom = async (id:string, body:Room) => {
  const response = await fetch(`http://localhost:5000/api/v1/chat/rooms/${id}`,{
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  console.log(response)
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
};
// Component sử dụng React Query
const ListRoomComponent: React.FC = () => {
  // Sử dụng useQuery để gọi API
  const { data, isLoading, isError } = useQuery(
    ["listPeriod-in-salaryPeriod"],
    {
      queryFn: async () => {
        const data =
        fetchData()
        return data;
      },
      retry: false,
    });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  // Sử dụng dữ liệu từ API ở đây
  return (
    <div>
      <h1>List Room</h1>
      <ul>
        {data.map((room:any) => (
          <li key={room.id}>Room Name: <input placeholder={room.name} onBlur={(v) => updateRoom(room.id,{
            id: room.id,
            name: v.target.value
          })}/> <button onClick={() => deleteRoom(room.id)}>Delete</button></li>
        ))}
      </ul>
    </div>
  );
};

export default ListRoomComponent;
