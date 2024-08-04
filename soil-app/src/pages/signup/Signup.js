import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userAPI from '../../services/customer';
import './Signup.css';


function Signup() {
    const [user, setUser] = useState({ firstname: '', lastname: '', username: '', email: '', password: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {

        event.preventDefault();
        setMessage('');
        //check email format
        if (!user.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)) {
            setMessage('Invalid email format.');
            return;
        }
        // check length of the password
        if (user.password.length < 8) {
            setMessage('Password must be at least 8 characters long.');
            return;
        }
        user.title = user.firstname + " " + user.lastname;
        user.date = new Date().toISOString();


        try {
            const response = await userAPI.signup(user);
            if (response.data.statusCode === 404) {
                setMessage('Email or Username already exists');
            }
            else {
                setMessage('Account Created Sucessfully');
                alert('Account Created Sucessfully');
                navigate('/signin');
            }
        } catch (error) {
            console.error('Error retreiving users:', error);
            setMessage('Error: Failed to retreiving users.');
        }

    };

    return (
        <div className="parent">
            <div className="container">
                <h2>Create Account</h2>
                <form onSubmit={handleSubmit}>
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="firstname"
                        value={user.firstname}
                        onChange={handleInputChange}
                        required
                    />
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="lastname"
                        value={user.lastname}
                        onChange={handleInputChange}
                        required
                    />
                    <label>User Name:</label>
                    <input
                        type="text"
                        name="username"
                        value={user.username}
                        onChange={handleInputChange}
                        required
                    />
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleInputChange}
                        required
                    />
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleInputChange}
                        required
                    />
                    <button type="submit">Sign Up</button>
                </form>
                {message && <p>{message}</p>}
            </div></div>
    );
}

export default Signup;
