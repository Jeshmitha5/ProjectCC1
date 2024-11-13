import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login({ onLogin }) {
    const [input, setInput] = useState({ email: '', password: '' });
    const [error, setError] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleLogin = async () => {
        setError({ email: '', password: '' });
        let hasError = false;
        const newError = { email: '', password: '' };

        if (!input.email) {
            newError.email = 'Email is required';
            hasError = true;
        }
        if (!input.password) {
            newError.password = 'Password is required';
            hasError = true;
        }

        if (hasError) {
            setError(newError);
        } else {
            try {
                const response = await axios.get(
                    `http://localhost:3001/users?email=${input.email}&password=${input.password}`
                );
                
                if (response.data.length > 0) {
                    localStorage.setItem('user', input.email); // Store user email in localStorage
                    onLogin(); // Update login state
                    navigate('/'); // Redirect to home
                } else {
                    setError({ email: '', password: 'Invalid email or password' });
                }
            } catch (err) {
                console.error("Login error:", err);
                setError({ email: '', password: 'Server error. Try again later.' });
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="container">
            <h1 className="head">Login</h1>
            <div className="input">
                <div className="ip">
                    <label>
                        Email
                        <input
                            type="text"
                            onChange={handleChange}
                            placeholder="Enter your email..."
                            value={input.email}
                            name="email"
                        />
                    </label>
                    {error.email && <p className="error">{error.email}</p>}
                </div>
                <div className="ip">
                    <label>
                        Password 
                        <input
                            type="password"
                            onChange={handleChange}
                            placeholder="Enter your password..."
                            value={input.password}
                            name="password"
                        />
                    </label>
                    {error.password && <p className="error">{error.password}</p>}
                </div>
            </div>
            <button onClick={handleLogin}>Login</button>
            <div className="forgot-password">
                <Link to="/forgot">Forgot Password?</Link>
            </div>
            <div className="Newuser">
                <br />
                <p>New User?</p>
                <Link to="/signup"> Create new account</Link>
            </div>
        </div>
    );
}

export default Login;



