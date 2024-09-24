import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeById } from '../api'; // Ensure you have this API function
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './RecipeDetails.css'; // Import the CSS file for styling

const RecipeDetails = () => {
  const { id } = useParams(); // Get the recipe ID from the URL
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await getRecipeById(id); // Call the API to get recipe details
        setRecipe(data);
      } catch (error) {
        setError('Failed to fetch recipe details');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const downloadPDF = async () => {
    const input = document.getElementById('recipeContent');
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const imgWidth = 190; // Width of the image
    const pageHeight = pdf.internal.pageSize.height; // Height of the PDF page
    const imgHeight = (canvas.height * imgWidth) / canvas.width; // Height of the image
    let heightLeft = imgHeight;

    let position = 0;

    // Adding image to the PDF
    pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`${recipe.title}.pdf`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="recipe-details">
      <div className="recipe-content" id="recipeContent">
        <h1>{recipe.title}</h1>
        <p className="description">{recipe.description}</p>
        <p className="created-by">Created by: {recipe.user.username}</p>
        <h3>Ingredients</h3>
        <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <h3>Instructions</h3>
        <p>{recipe.instructions}</p>
      </div>
      <button className="download-button" onClick={downloadPDF}>
        Download PDF
      </button>
    </div>
  );
};

export default RecipeDetails;
