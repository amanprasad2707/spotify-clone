import express from 'express';
import cors from 'cors';
import { configDotenv } from 'dotenv';
import songRouter from './src/routes/songRoute.js';
import connectDB from './src/config/mongodb.js';
import connectCloudinary from './src/config/cloudinary.js';
import albumRouter from './src/routes/albumRoute.js';

configDotenv()

// app config
const app = express();
const PORT = process.env.PORT || 3000;

// connect to database
connectDB()
connectCloudinary()

// middlewares
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use((cors()))

// initializing routes
app.use('/api/song',songRouter)
app.use('/api/album',albumRouter)
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});