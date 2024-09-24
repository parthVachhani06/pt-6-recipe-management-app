// src/components/RecipeList.js
import React, { useEffect, useState } from 'react';
import { fetchRecipes, deleteRecipe } from '../api'; // Ensure you're importing from the correct path
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import './RecipeList.css'; // Import custom CSS for styling

const RecipeList = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth(); // Get the authentication status

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const getRecipes = async () => {
      const data = await fetchRecipes();
      setRecipes(data);
    };
    getRecipes();
  }, []);

  const handleDelete = async (id) => {
    await deleteRecipe(id);
    setRecipes(recipes.filter((recipe) => recipe._id !== id));
  };

  return (
    <div className="recipe-list-container">
      <h1 className="text-center mb-4">Recipe List</h1>
      <button
        onClick={() => navigate('/create')}
        className="btn btn-primary mb-3"
      >
        Add Recipe
      </button>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-header">
            <tr>
              <th>Title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {recipes.map((recipe) => (
              <tr key={recipe._id}>
                <td>{recipe.title}</td>
                <td>
                  <button
                    onClick={() => handleDelete(recipe._id)}
                    className="btn btn-danger me-2"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => navigate(`/edit/${recipe._id}`)}
                    className="btn btn-warning me-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => navigate(`/recipes/${recipe._id}`)}
                    className="btn btn-info"
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecipeList;
