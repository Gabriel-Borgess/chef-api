import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
  id: String,
  title: String,
  image: String,
  description: String,
  ingredients: [String],
  instructions: [String],
  category: String,
});

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;
