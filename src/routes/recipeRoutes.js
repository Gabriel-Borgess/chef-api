import express from 'express';
import recipeController from '../controllers/recipeController.js';

const router = express.Router();

// Rota de Boas-Vindas (opcional)
router.get('/', (req, res) => {
  res.send('Bem-vindo à API de Receitas!');
});


router.use('/api', recipeController);

export default router;
