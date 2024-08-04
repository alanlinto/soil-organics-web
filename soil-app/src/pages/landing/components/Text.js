import React from "react";
import './Text.css'

const Text = () => {
    return (
        <div className="centered-text">
            <header>
                <h1 className="company-name">Welcome to Soil Organics</h1>
            </header>
            <main>
                <section className="introduction">
                    <p className="description">Welcome to Soil Organics! Since our establishment in 2005, we have been dedicated to providing fresh, organic foods delivered straight to our customers' doorsteps. With over 18 years of experience in the industry, we pride ourselves on offering the highest quality produce and supporting sustainable farming practices. Our mission is to make healthy eating convenient and accessible, while also fostering a deep connection to the earth and the communities we serve.</p>
                    <p className="description">Join us on our journey towards a healthier, more sustainable future, one delicious meal at a time. Together, let's nourish our bodies and our planet with every bite.</p>
                    <p className="foot">Happy Farming</p>
                </section>
            </main>
        </div>
    );
}

export default Text;