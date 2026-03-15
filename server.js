require('dotenv').config({ path: './.env' });

const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes")
const orderRoutes = require("./routes/orderRoutes");


// Connect to DB
connectDB();

// Middleware - communicator bw frontend and backend
app.use(express.json())


//accept req from this server only
app.use(cors({
  origin: 'https://rmww-frontend.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));


// Serve static images from /data
app.use("/images", express.static(path.join(__dirname, "data")));


// API Routes
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use("/api/products", productRoutes);
app.use('/api/orders', orderRoutes);



// working check
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
