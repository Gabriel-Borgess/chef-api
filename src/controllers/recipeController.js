import express from 'express';
import Recipe from '../models/Recipe.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Bem vindo a API de Receitas!');
});

router.get('/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar receitas' });
  }
});

router.get('/recipes/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await Recipe.findById(id);

    if (!recipe) {
      res.status(404).json({ error: 'Receita não encontrada' });
      return;
    }

    res.json(recipe);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar receita' });
  }
});

router.post('/recipes', async (req, res) => {
  const { body } = req;

  try {
    const createdRecipe = await Recipe.create(body);
    res.status(201).json(createdRecipe);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar receita' });
  }
});

router.put('/recipes/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedRecipe) {
      res.status(404).json({ error: 'Receita não encontrada' });
      return;
    }

    res.json(updatedRecipe);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar receita' });
  }
});

router.delete('/recipes/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(id);

    if (!deletedRecipe) {
      res.status(404).json({ error: 'Receita não encontrada' });
      return;
    }

    res.json(deletedRecipe);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir receita' });
  }
});

export default router;
