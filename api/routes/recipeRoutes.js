const express = require('express');
const {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
} = require('../controllers/recipeController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(getRecipes).post(protect, createRecipe);
router.route('/:id').get(getRecipeById).put(protect, updateRecipe).delete(protect, deleteRecipe);

module.exports = router;
