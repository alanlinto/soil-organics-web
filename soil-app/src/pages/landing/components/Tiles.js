import React, { useState, useEffect } from 'react';
// import image from '../images/carrot.jpg';
import "./Tiles.css";

function Tiles() {

    const imagesWithPrice = [
        {
            url: "https://media.istockphoto.com/id/94929126/photo/avocados-isolated-on-white.jpg?s=612x612&w=0&k=20&c=c0BSuWnUTAkZyj-cYHKzR5dXtZWQ1_3PXcea3M92Z4I=",
            price: "$14.89/Kg"
        },
        {
            url: "https://www.veggycation.com.au/siteassets/veggycationvegetable/onion.jpg",
            price: "$4.85/Kg"
        },
        {
            url: "https://i0.wp.com/missspelts.com.au/wp-content/uploads/2022/01/Untitled-design-2022-01-03T192757-067.png?fit=500%2C500&ssl=1;",
            // url: image,
            price: "$4.25/Kg"
        },
        {
            url: "https://www.doorsteporganics.com.au/image/optimised/large/Strawberries-Cooking-250g-punnet.jpg",
            price: "$3.56/Kg"
        },
        {
            url: "https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcS3Sm8AgwtgTKupffjf0oZRuXYW1tLhhNvpFx93WKRIjrEv0_0AXhKcXDtCWHVEwA9w",
            price: "$5.75/Kg"
        },
        {
            url: "https://cdn.britannica.com/77/170677-050-F7333D51/lettuce.jpg",
            price: "$4.83/Kg"
        },
        {
            url: "https://upload.wikimedia.org/wikipedia/commons/8/89/Tomato_je.jpg",
            price: "$3.45/Kg"
        }
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + imagesWithPrice.length) % imagesWithPrice.length);
    };

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagesWithPrice.length);
    };

    useEffect(() => {
        const timer = setTimeout(nextImage, 2500);
        return () => clearTimeout(timer);
    }, [currentImageIndex]);

    return (
        <div className='centered-tile'>
            <div className="tile" id="myTile">
                <div className="ribbon">BEST SELLINGS</div>
                <img src={imagesWithPrice[currentImageIndex].url} id="image" />
                {/* {console.log("Hello")}; */}
                {/* <p id="description">AVACADO $20 per Kilo</p> */}
                <p className="price-tag">{imagesWithPrice[currentImageIndex].price}</p>
                <span className="arrow left-arrow" onClick={prevImage}>&#10094;</span>
                <span className="arrow right-arrow" onClick={nextImage}>&#10095;</span>
            </div>
        </div>
    );
}

export default Tiles;