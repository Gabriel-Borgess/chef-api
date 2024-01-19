import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import recipeRoutes from './routes/recipeRoutes.js';

dotenv.config();

const app = express();
app.use(express.static('public'));

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI); // Conecta ao MongoDB

app.use(express.json());
app.use(cors());

app.use('/', recipeRoutes);

export default app;
