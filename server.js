// server.js
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');

   // Обработка входящих сообщений от клиента
    ws.on('message', (message) => {
    const data = JSON.parse(message);
    console.log('Received from client:', data);
    const { spawn } = require('child_process');
    const bat = spawn('cmd.exe', ['/c','start.bat']);

    // Пример: отправляем ответ обратно клиенту
    if (data.type === 'click') {
      ws.send(JSON.stringify({ message: 'Click received!', x: data.x, y: data.y }));
    }
  });

  ws.on('close', () => {
    clearInterval(interval);
    console.log('Client disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
