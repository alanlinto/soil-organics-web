import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import hash from 'bcryptjs';
import userAPI from '../../services/customer';
import './Profile.css';



function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Added useEffect and fetchUserData to manage user data fetching
    useEffect(() => {
        const userId = localStorage.getItem('UserId');
        if (userId) {
            fetchUserData(userId);
        } else {
            navigate('/signin'); // Redirect if user ID isn't found (user not logged in)
            console.log('Not Logged in');
        }
    }, [navigate]);

    const fetchUserData = async (userId) => {
        try {
            const response = await userAPI.one(userId);
            setUser(response.data);
        } catch (error) {
            console.log('Error fetching user data:', error);
            navigate('/signin'); // Redirect on fetch error
        }
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
        setSuccessMessage('');
        setErrorMessage('');
    };

    const handleDeleteUser = async () => {
        try {
            await userAPI.remove(user.id);
            setUser(null);
            sessionStorage.clear(); // Clear session storage on delete
            navigate('/signin');
        } catch (error) {
            setErrorMessage('Failed to delete user.');
        }
    };

    const handleSaveChanges = async (event) => {

        event.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');

        const newUsername = event.target.username.value.trim();
        const newEmail = event.target.email.value;
        const newAddress = event.target.address.value;
        const newPassword = event.target.password.value;

        if (!newEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)) {
            setErrorMessage('Invalid email format.');
            return;
        }

        const updatedUser = {
            id: user.id, // Make sure to send the ID for update
            username: newUsername,
            email: newEmail,
            address: newAddress
        };

        if (newPassword.length !== 0) {
            if (newPassword.length < 8) {
                setErrorMessage('Password length should be at least 8');
                return;
            }
            else
                updatedUser.password = hash.hashSync(newPassword, 10);
        }

        try {
            const response = await userAPI.update(user.id, updatedUser);
            setUser(response.data);
            setIsEditing(false);
            setSuccessMessage('Profile updated successfully!');
        } catch (error) {
            setErrorMessage('Failed to update profile.');
        }
    };

    const dateJoined = user ? new Date(user.date).toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    }) : 'Not Joined';

    return (
        <div className="parent">
            <div className="container">
                <h2>User Profile</h2>
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                {!isEditing ? (
                    <>
                        <p><strong>User Name:</strong> {user?.username}</p>
                        <p><strong>Email:</strong> {user?.email}</p>
                        <p><strong>Date of Joining:</strong> {dateJoined}</p>
                        <button onClick={handleEditToggle}>Edit</button>
                        <button onClick={handleDeleteUser}>Delete</button>
                    </>
                ) : (
                    <form onSubmit={handleSaveChanges}>
                        <label>
                            User Name:
                            <input type="text" name="username" defaultValue={user?.username} required />
                        </label>
                        <br />
                        <label>
                            Email:
                            <input type="email" name="email" defaultValue={user?.email} required />
                        </label>
                        <br />
                        <label>
                            Address:
                            <input type="text" name="address" defaultValue={user?.address} required />
                        </label>
                        <br />
                        <label>
                            Password:
                            <input type="password" name="password" />
                        </label>
                        <br />
                        <button type="submit">Save Changes</button>
                        <button type="button" onClick={handleEditToggle}>Cancel</button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default Profile;
