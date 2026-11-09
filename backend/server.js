
import express from 'express';
import noteRoutes from './src/Routes/noteRoutes.js';
import rateLimiter from './src/middleware/rateLimiter.js';
import cors from 'cors';

const app = express();

// Trust the Vercel proxy for client IP identification
app.set('trust proxy', 1);

// Middleware
app.use(express.json());

// CORS is only needed for local development.
// In production, both services use the same domain.
if (process.env.NODE_ENV !== 'production') {
    app.use(cors({
        origin: 'http://localhost:5173'
    }));
}

// Rate limiter
app.use(rateLimiter);

// API routes
app.use('/api/notes', noteRoutes);

// Local development server
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

// Export Express app for Vercel
export default app;
