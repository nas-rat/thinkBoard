import express from 'express';
import noteRoutes from './src/Routes/noteRoutes.js';
import rateLimiter from './src/middleware/rateLimiter.js';
import cors from 'cors';
import path from 'path';


// Create an Express application
const app = express();

// Middleware
app.use(express.json());
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

//Routes
if (process.env.NODE_ENV !== 'production') {
    app.use(cors({
        origin: 'http://localhost:5173'
    }));
}

app.use(rateLimiter);
app.use('/api/notes', noteRoutes);

//If it is in production mode
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
    });
}



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});