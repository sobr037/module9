const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;
const path = require('path');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

let connectedUsers = 0;

io.on('connection', (socket) => {
  connectedUsers++;
  io.emit('user count', connectedUsers);

  socket.on('disconnect', () => {
    connectedUsers--;
    io.emit('user count', connectedUsers);
    socket.broadcast.emit('user stopped typing');
  });

  socket.on('chat message', ({ nickname, message }) => {
    io.emit('chat message', { nickname, message });
  });

  socket.on('typing', (user) => {
    socket.broadcast.emit('user typing', user);
  });
});

http.listen(port, host, () => {
  console.log(`Socket.IO server running at http://${host}:${port}/`);
});
