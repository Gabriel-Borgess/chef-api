import express from 'express';
import mongoose from 'mongoose';
import sanitize from 'mongoose-sanitize';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const Recipe = mongoose.model('Recipe', {
  title: String,
  image: String,
  description: String,
  ingredients: [String],
  instructions: [String],
  category: String,
});

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.get('/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar receitas" });
  }
});

app.get('/recipes/:id', async (req, res) => {
  const recipeId = req.params.id;

  try {
    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
      res.status(404).json({ error: "Receita não encontrada" });
      return;
    }

    res.json(recipe);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar receita" });
  }
});

app.post('/recipes', async (req, res) => {
  const newRecipe = req.body;

  try {
    const createdRecipe = await Recipe.create(newRecipe);
    res.status(201).json(createdRecipe);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar receita" });
  }
});

app.put('/recipes/:id', async (req, res) => {
  const recipeId = req.params.id;

  try {
    const sanitizedBody = sanitize(req.body);
    const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, sanitizedBody, { new: true });

    if (!updatedRecipe) {
      res.status(404).json({ error: "Receita não encontrada" });
      return;
    }

    res.json(updatedRecipe);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar receita" });
  }
});

app.delete('/recipes/:id', async (req, res) => {
  const recipeId = req.params.id;

  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(recipeId);

    if (!deletedRecipe) {
      res.status(404).json({ error: "Receita não encontrada" });
      return;
    }

    res.json(deletedRecipe);
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir receita" });
  }
});

app.use(cors());

export default app;
