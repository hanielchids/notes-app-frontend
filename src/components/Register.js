import React, { useState } from 'react';
import axios from 'axios';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            const response = await axios.post("http://127.0.0.1:5000/api/register/", {
                username: username,
                email: email,
                password: password,
            });
            console.log(response.data.message); // Display success message
        } catch (error) {
            console.error(error.response?.data || error.message); // Log errors
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleRegister();
                }}
            >
                <label>
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <br />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterPage;
