const express = require('express');
const http = require('http');
const cors = require('cors');
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;
const authRoutes = require('./routes/auth');
const fileRoutes = require('./routes/files');
const connectDB = require('./db')

app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'] 
}));
app.use(express.json());

connectDB();

app.use('/auth',authRoutes);
app.use('/file', fileRoutes)
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});