import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import userAPI from '../../services/customer';
import './Signin.css';

function Signin() {
    const [user, setCredentials] = useState({ username: '', password: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCredentials(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage('');
        const req = {
            username: user.username,
            password: user.password
        }

        try {
            const response = await userAPI.signin(req);
            const output = response.data;
            // console.log(output);
            const { userId } = output;
            setMessage("Log In Successfull !!!");
            // const r = await userAPI.getSession();
            // console.log(r.data);
            localStorage.setItem('UserId', userId); //Alternative for Session Id
            navigate('/'); // Redirects to Home Page
        }
        catch (error) {
            setMessage("Error : Invalid Credentials.");
        }

    };

    return (
        <div className="parent">
            <div className="container">
                <h2>Sign In</h2>
                <form onSubmit={handleSubmit}>
                    <label>User Name:</label>
                    <input
                        type="text"
                        name="username"
                        value={user.username}
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
                    <button type="submit">Sign In</button>
                </form>
                {message && <p>{message}</p>}
                Need an Account?<Link to='/signup'>Sign up Now</Link>
            </div>

        </div>

    );
}

export default Signin;