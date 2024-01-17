import express from 'express';
import { initChat } from '../api/chat';
import http from 'http';
const app = express();
const router = express.Router();
const server = http.createServer(app);
const chatManager = initChat(server);

// GET: /api/v1/chat/rooms
router.get('/rooms', (req, res) => {
  const rooms = chatManager.getRooms();

  res.json(rooms);
});

// POST: /api/v1/chat/rooms
router.post('/rooms', (req, res) => {
  const { name } = req.body;
  console.log(name)
  chatManager.createRoom(name);
  res.status(201).json({ message: 'Room created successfully.' });
});

// GET: /api/v1/chat/rooms/:roomId
router.get('/rooms/:roomId', (req, res) => {
  const roomId = req.params.roomId;
  const room = chatManager.readRoom(roomId);
  if (room) {
    res.json(room);
  } else {
    res.status(404).json({ error: 'Room not found.' });
  }
});

// PUT: /api/v1/chat/rooms/:roomId
router.put('/rooms/:roomId', (req, res) => {
  const roomId = req.params.roomId;
  const updatedRoom = req.body;
  chatManager.updateRoom(roomId, updatedRoom);
  res.json({ message: 'Room updated successfully.' });
});

// DELETE: /api/v1/chat/rooms/:roomId
router.delete('/rooms/:roomId', (req, res) => {
  const roomId = req.params.roomId;
  chatManager.deleteRoom(roomId);
  res.json({ message: 'Room deleted successfully.' });
});

export default router;