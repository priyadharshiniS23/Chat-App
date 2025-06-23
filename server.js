const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = 3000;

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('chat message', (msg) => {
        console.log('User:', msg);
        io.emit('chat message', `👤 User: ${msg}`);

        const reply = getBotReply(msg);
        setTimeout(() => {
            io.emit('chat message', `🤖 Bot: ${reply}`);
        }, 1000); // 1s delay
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

function getBotReply(message) {
    const text = message.toLowerCase();
    if (text.includes('hello')) return 'Hello! How can I assist you?';
    if (text.includes('how are you')) return "I'm a bot, but thanks for asking!";
    if (text.includes('bye')) return 'Goodbye! Talk to you soon.';
    return 'I didn’t understand that. Try saying "hello"!';
}

http.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
