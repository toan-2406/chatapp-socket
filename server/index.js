const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const fs = require('fs');
const { Router } = require('express'); // Thêm phần này để sử dụng Router

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
});

const roomMessages = {};

// Tạo một Router mới
const chatRouter = Router();

// Tạo API endpoint cho đường dẫn /api/v1/chat
chatRouter.get('/', (req, res) => {
    // Xử lý logic của API ở đây
    res.json({ message: 'API version 1 - Chat' }); // Trả về JSON thay vì chuỗi văn bản
});

// Tạo API endpoint cho đường dẫn /api/v1/chat/room
chatRouter.get('/room', (req, res) => {
    // Lấy tham số từ query string
    console.log(req)
    const roomId = req.query.id;

    // Xử lý logic của API ở đây
    res.json({ message: `API version 1 - Chat Room ${roomId}` }); // Trả về JSON thay vì chuỗi văn bản
});

// Sử dụng Router tại đường dẫn /api/v1/chat
app.use('/api/v1/chat', chatRouter);

io.on('connection', (socket) => {
    console.log(`user connected: ${socket.id}`);
    
    let roomJoined = "";

    socket.on("join_room", (data) => {
        console.log(data)
        roomJoined = data;
        socket.join(roomJoined);

        const roomHistory = getRoomMessages(roomJoined);
        io.to(roomJoined).emit('receive_message_history', { history: roomHistory });
    });

    socket.on("send_message", (data) => {
        console.log(data, 'message');
        if (roomJoined) {
            io.to(roomJoined).emit('receive_message', data);
            saveMessageToRoom(roomJoined, `${data.id} - ${data.message}`);
        }
    });
});

function getRoomMessages(roomName) {
    return roomMessages[roomName] || [];
}

function saveMessageToRoom(roomName, message) {
    if (!roomMessages[roomName]) {
        roomMessages[roomName] = [];
    }

    roomMessages[roomName].push(message);
}

server.listen(3000, () => {
    console.log('server listening on port 3000');
});
