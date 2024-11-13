import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
    const [input, setInput] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const navigate = useNavigate();

    const handleRegister = async () => {
        setError({ name: '', email: '', password: '', confirmPassword: '' });

        let hasError = false;
        const newError = { name: '', email: '', password: '', confirmPassword: '' };

        // Validate inputs
        if (!input.name) {
            newError.name = 'Name is required';
            hasError = true;
        } else if (input.name.length < 2 || !/^[a-zA-Z\s]+$/.test(input.name)) {
            newError.name = 'Name must be at least 2 characters long and contain only letters and spaces';
            hasError = true;
        }

        if (!input.email) {
            newError.email = 'Email is required';
            hasError = true;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.email)) {
            newError.email = 'Email is not valid';
            hasError = true;
        }

        if (!input.password) {
            newError.password = 'Password is required';
            hasError = true;
        } else if (
            input.password.length < 8 || 
            !/[A-Z]/.test(input.password) || 
            !/[a-z]/.test(input.password) || 
            !/[0-9]/.test(input.password) || 
            !/[!@#$%^&*]/.test(input.password)
        ) {
            newError.password = 'Password must be at least 8 characters long, include an uppercase letter, lowercase letter, number, and special character';
            hasError = true;
        }

        if (input.password !== input.confirmPassword) {
            newError.confirmPassword = 'Passwords do not match';
            hasError = true;
        }

        // Handle errors
        if (hasError) {
            setError(newError);
        } else {
            try {
                // Send registration data to the backend
                await axios.post('http://localhost:3001/users', {
                    name: input.name,
                    email: input.email,
                    password: input.password
                });
                navigate('/login'); // Redirect to login after successful registration
            } catch (err) {
                console.error("Registration error:", err);
                setError({ name: '', email: '', password: '', confirmPassword: 'Server error. Try again later.' });
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="container">
            <h1 className="head">Register</h1>
            <div className="input">
                <div className="ip">
                    <label>
                        Name
                        <input
                            type="text"
                            onChange={handleChange}
                            placeholder="Enter your name..."
                            value={input.name}
                            name="name"
                        />
                    </label>
                    {error.name && <p className="error">{error.name}</p>}
                </div>
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
                <div className="ip">
                    <label>
                        Confirm Password
                        <input
                            type="password"
                            onChange={handleChange}
                            placeholder="Confirm your password..."
                            value={input.confirmPassword}
                            name="confirmPassword"
                        />
                    </label>
                    {error.confirmPassword && <p className="error">{error.confirmPassword}</p>}
                </div>
            </div>
            <button onClick={handleRegister}>Register</button>
            <div className="Newuser">
                <br />
                <p>Already have an account?</p>
                <Link to="/login"> Login</Link>
            </div>
        </div>
    );
}

export default Signup;

