import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import RecipeForm from './components/RecipeForm';
import AuthForm from './components/AuthForm';
import RecipeDetails from './components/RecipeDetails';
import Register from './components/Register';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
         <Route path='/' element={<AuthForm isLogin={true} />} />
          <Route path="/RecipeList" element={<RecipeList />} />
          <Route path="/create" element={<RecipeForm />} />
          <Route path="/recipes/:id" element={<RecipeDetails />} />
          <Route path="/register" element={<Register />} />
          <Route path="/edit/:id" element={<RecipeForm />} />
          <Route path="/auth" element={<AuthForm isLogin={true} />} />
          <Route path="/register" element={<AuthForm isLogin={false} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
