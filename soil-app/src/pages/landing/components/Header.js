import React from "react";
import "./Header.css";
import Navigation from "./Navigation";

function Header() {
    return (
        <div className="header">
            <h1 className="left-text">SOIL</h1>
            <Navigation />
        </div>
    );
}

export default Header;
