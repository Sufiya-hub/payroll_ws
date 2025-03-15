import { WebSocketServer } from 'ws';
import { createServer } from 'http';

const PORT = process.env.PORT || 3001;

const server = createServer();
const wss = new WebSocketServer({ server });

console.log('WebSocket server is starting...');

wss.on('connection', (ws) => {
  console.log('🔗 New client connected');

  ws.on('message', (message) => {
    console.log('Received:', message.toString());

    wss.clients.forEach((client) => {
      if (client.readyState === ws.OPEN) {
        client.send(message.toString());
      }
    });
  });

  ws.on('close', () => console.log('❌ Client disconnected'));
});

server.listen(PORT, () => {
  console.log(`WebSocket server running on ws://localhost:${PORT}`);
});
