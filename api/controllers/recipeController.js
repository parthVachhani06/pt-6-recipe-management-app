const Recipe = require('../models/Recipe');

// Create a new recipe
exports.createRecipe = async (req, res) => {
  const { title, ingredients, instructions, cuisineType, cookingTime } = req.body;

  try {
    const recipe = await Recipe.create({
      title,
      ingredients,
      instructions,
      cuisineType,
      cookingTime,
      user: req.user._id,
    });
    res.status(201).json(recipe);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create recipe' });
  }
};

// Get all recipes
exports.getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().populate('user', 'username');
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch recipes' });
  }
};

// Get a specific recipe by ID
exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate('user', 'username');
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch recipe' });
  }
};

// Update a recipe
exports.updateRecipe = async (req, res) => {
  const { title, ingredients, instructions, cuisineType, cookingTime } = req.body;

  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    if (recipe.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    recipe.title = title;
    recipe.ingredients = ingredients;
    recipe.instructions = instructions;
    recipe.cuisineType = cuisineType;
    recipe.cookingTime = cookingTime;

    await recipe.save();
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update recipe' });
  }
};

// Delete a recipe
exports.deleteRecipe = async (req, res) => {
    try {
        // Find the recipe by ID and delete
        const recipe = await Recipe.findById(req.params.id);
    
        // If recipe not found, return 404 error
        if (!recipe) {
          return res.status(404).json({ message: 'Recipe not found' });
        }
    
        // Check if the authenticated user is the owner of the recipe
        if (recipe.user.toString() !== req.user.id) {
          return res.status(401).json({ message: 'User not authorized to delete this recipe' });
        }
    
        // Delete the recipe
        await Recipe.findByIdAndDelete(req.params.id);
    
        res.json({ message: 'Recipe removed successfully' });
    
      } catch (error) {
        console.error('Error during deletion:', error);
        res.status(500).json({ message: 'Failed to delete recipe' });
      }
    
};
