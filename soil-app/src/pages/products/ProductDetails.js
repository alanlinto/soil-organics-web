import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import prodAPI from '../../services/product';
import itemAPI from '../../services/item';
import revAPI from '../../services/reveiw';
import './ProductDetails.css';

const ProductDetails = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [reviews, setReviews] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await prodAPI.getbyId(productId);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }

            try {
                const reveiws = await revAPI.fecthAll(productId);
                setReviews(reveiws.data);
            }
            catch (error) {
                console.log('Failed to fetch reviews');
            }
        };

        fetchProduct();
    }, []);

    const handleAddToCart = async () => {
        const id = localStorage.getItem('UserId');
        if (id === '') {
            navigate('/signin');
        }
        else {
            const newItem = {
                customerId: id,
                productId: product.id,
                quantity: quantity
            };

            try {
                await itemAPI.addToCart(newItem);
                alert(`Successfully added ${quantity} ${product.title} for customer : ${id} to the cart`);
                navigate('/cart-items');
            }
            catch (error) {
                alert('This item failed to add to the cart');
            }
        }
    };

    return (
        <div className="product-details-page">
            <div className="cart-link-in">
                <Link to="/cart-items">My Cart</Link>
            </div>
            {product ? (
                <div className="product-details-container">
                    <div className="product-info">
                        <p><h2 className="product-name">{product.title}</h2></p>
                        <div className="product-image-container">
                            <img className="product-image-design" src={product.image} alt={product.title} />
                        </div>
                        <p className="product-description">{product.description}</p>

                        {product.type === 'special' && <p className="special-description">This product is on special !!!</p>}
                        {product.type === 'standard' && <p />}

                        <p className="product-price">Price: ${product.cost}</p>
                        <div className="product-actions">
                            <select value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))}>
                                {[...Array(10).keys()].map((number) => (
                                    <option key={number + 1} value={number + 1}>{number + 1}</option>
                                ))}
                            </select>
                            <button onClick={handleAddToCart}>Add to Cart</button>
                        </div>
                    </div>
                    <div className="product-reviews">
                        <h3>Product Reviews</h3>
                        {reviews.length !== 0 ? (
                            <div className="review-table">
                                {reviews.map(review => (
                                    <div key={review.id} className="review-block">
                                        <div className="review-header">
                                            <div className='review-name'>{review.customer}</div>
                                            <div>Rating: {review.rating}/5</div>
                                        </div>
                                        <div className="review-body">
                                            <p>{review.body}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No reviews yet.</p>
                        )}
                        <p><button onClick={() => { navigate(`/review/${productId}`) }}>Write a Review</button></p>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ProductDetails;
