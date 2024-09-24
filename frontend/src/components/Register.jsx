import React, { useState } from 'react';
import { registerUser } from '../api'; // Adjust your import based on the actual file structure
import { Link, useNavigate } from 'react-router-dom';
import './Register.css'; // Import CSS for styles

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const userData = { username, email, password };
      const response = await registerUser(userData);
      console.log('User registered:', response);
      navigate('/auth');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="register-container">
      <h2>Create an Account</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <div className='mb-3 d-flex'>
           <p className='m-0 me-1'> Already you have an account? </p> <Link style={{textDecoration: 'none'}} to={'/auth'}>Login</Link>
            </div>
        <button type="submit" className="register-button">Register</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default Register;
