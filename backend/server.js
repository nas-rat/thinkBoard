import express from 'express';
import noteRoutes from './src/Routes/noteRoutes.js';
import rateLimiter from './src/middleware/rateLimiter.js';
import cors from 'cors';


// Create an Express application
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

//Routes
app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use(rateLimiter);
app.use('/api/notes', noteRoutes);



//PORT
const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});