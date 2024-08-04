import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigation() {

    const [user, setUser] = useState('');

    useEffect(
        () => {
            setUser(localStorage.getItem('UserId'));

        },
        [user]
    );

    const handleOut = () => {
        localStorage.setItem('UserId', '');
        setUser('');
        alert('Logged out successfully');
    };
    return (
        <div>

            {user === '' ?
                <nav id="navbar">
                    <ul>
                        <li><Link to="/diet-plans">DIET-PLANS</Link></li>
                        <li><Link to="/products">PRODUCTS</Link></li>
                        <li><Link to="/diet-plans">SEARCH</Link></li>
                        <li><Link to="/diet-plans">ABOUT US</Link></li>

                        <li><button><Link to="/signin">SIGN IN</Link></button></li>
                        <li><button><Link to="/signup">SIGN UP</Link></button></li>
                    </ul>
                </nav>
                :
                <nav id="navbar">
                    <ul>
                        <li><Link to="/diet-plans">DIET-PLANS</Link></li>
                        <li><Link to="/products">PRODUCTS</Link></li>
                        <li><Link to="/diet-plans">SEARCH</Link></li>
                        <li><Link to="/diet-plans">ABOUT US</Link></li>
                        <li><Link to="/cart-items">CART</Link></li>
                        <li><Link to="/profile">PROFILE</Link></li>
                        <li><button onClick={handleOut}>SIGN OUT</button></li>
                    </ul>
                </nav>
            }

        </div>
    );
}

export default Navigation;