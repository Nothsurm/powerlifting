import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

import userRoutes from './routes/userRoutes'
import connectDB from './config/DB';

dotenv.config()

connectDB();

const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//Routes
app.use('/api/users', userRoutes)

app.listen('5000', () => {
    console.log('Server is listening on port 5000');
});

app.get("/health", async (req: Request, res: Response) => {
    res.send({ message: 'health OK' })
})