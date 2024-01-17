
export interface User {
    id: string;
    username: string;
  }
  
  export interface Message {
    id: string;
  text: string;
  author: User;
  roomId: string; 
  }
  
  export  interface Room {
    id: string;
    name: string;
    users?: User[];
    messages?: Message[];
  }