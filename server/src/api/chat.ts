import { Server, Socket } from "socket.io";
import { Message, Room } from "../interfaces/ChatModel";
import http = require("http");
let io: Server;
const rooms: Room[] = [];

export function initChat(server: http.Server) {
  io = new Server(server);

  io.on("connect", (socket: Socket) => {
    socket.on("joinRoom", (roomId: string) => {
      console.log(roomId)
      const room = rooms.find((r) => r.id === roomId);
      if (room) {
        socket.join(roomId);
      }
    });

    socket.on("sendMessage", (message: Message) => {
      socket.to(message.roomId).emit("message", message);
      socket.broadcast.to(message.roomId).emit("message", message)
    });
  });

  return {
    getRooms: () => rooms,
    joinRoom: (roomId: string) => rooms.find((r) => r.id === roomId ),
    createRoom: (name: string) => {
      const newRoom: Room = {
        id: `room${rooms.length + 1}`,
        name: name,
      };
      rooms.push(newRoom);
      io.emit("roomCreated", newRoom);
    },
    readRoom: (roomId: string) => rooms.find((r) => r.id === roomId),
    updateRoom: (roomId: string, updatedRoom: Room) => {
      const index = rooms.findIndex((r) => r.id === roomId);
      if (index !== -1) {
        rooms[index] = updatedRoom;
        io.to(roomId).emit("roomUpdated", updatedRoom);
      }
    },
    deleteRoom: (roomId: string) => {
      const index = rooms.findIndex((r) => r.id === roomId);
      if (index !== -1) {
        const deletedRoom = rooms.splice(index, 1)[0];
        io.emit("roomDeleted", deletedRoom);
      }
    }
  };
}
