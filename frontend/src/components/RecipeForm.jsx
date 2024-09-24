// src/components/RecipeForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createRecipe, fetchRecipe, updateRecipe } from '../api';
import './RecipeForm.css'; // Import custom CSS for styling

const RecipeForm = () => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [cuisineType, setCuisineType] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const getRecipe = async () => {
        const data = await fetchRecipe(id);
        setTitle(data.title);
        setIngredients(data.ingredients.join(', '));
        setInstructions(data.instructions);
        setCuisineType(data.cuisineType);
        setCookingTime(data.cookingTime);
      };
      getRecipe();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const recipe = {
      title,
      ingredients: ingredients.split(',').map(ing => ing.trim()),
      instructions,
      cuisineType,
      cookingTime: parseInt(cookingTime),
    };

    if (id) {
      await updateRecipe(id, recipe);
    } else {
      await createRecipe(recipe);
    }

    navigate('/RecipeList'); // Navigate to the Recipe List after submission
  };

  return (
    <div className="recipe-form-container">
      <h1 className="text-center mb-4">{id ? 'Edit Recipe' : 'Add Recipe'}</h1>
      <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow">
        <div className="mb-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Ingredients (comma-separated)"
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="Instructions"
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            value={cuisineType}
            onChange={(e) => setCuisineType(e.target.value)}
            placeholder="Cuisine Type"
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            value={cookingTime}
            onChange={(e) => setCookingTime(e.target.value)}
            placeholder="Cooking Time (in minutes)"
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          {id ? 'Update Recipe' : 'Add Recipe'}
        </button>
      </form>
    </div>
  );
};

export default RecipeForm;
