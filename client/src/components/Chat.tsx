// Import các dependencies
import { useQuery } from 'react-query';

// Khai báo hàm fetch data từ API
const fetchData = async () => {
  const response = await fetch('http://localhost:3000/api/v1/chat/room',{
    method:'POST',
    body: JSON.stringify('dsds')
  });
  console.log(response)
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
};

// Component sử dụng React Query
const ChatComponent: React.FC = () => {
  // Sử dụng useQuery để gọi API
  const { data, isLoading, isError } = useQuery('chatData', fetchData);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  // Sử dụng dữ liệu từ API ở đây
  return (
    <div>
      <h1>Chat Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ChatComponent;
