import React, { useState } from 'react';
import './Login.css';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link  } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      setLoginSuccess(true);

      navigate('/');
    } catch (error) {
      console.error('Login error:', error.message);
      setLoginError('Login failed. Please check your email and password.');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>LOGIN</h1>
        <label>
          Email:
          <input type="text" value={email} onChange={handleEmailChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <br />
        <button type="submit">Login</button>

        {loginError && <p className="error-message">{loginError}</p>}
        {loginSuccess && <p className="success-message">Login successful!</p>}
        <p>
          Not registered?{' '}
          <Link to="/register" className="register-link">
            Click here to register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
