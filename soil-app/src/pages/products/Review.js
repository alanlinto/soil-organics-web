import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import revAPI from '../../services/reveiw'
import './Review.css';

const Review = () => {
    const userId = localStorage.getItem('UserId');
    const { productId } = useParams();
    const navigate = useNavigate();
    const [review, setReview] = useState({ ratings: '', body: '' });
    const [isEdit, setEdit] = useState(false);

    useEffect(() => {
        const fetchReview = async () => {
            try {
                const data = {
                    customerId: parseInt(userId),
                    productId: parseInt(productId)
                };
                const response = await revAPI.getOne(data);
                if (response.data === null) {
                    console.log('You havent wrote any reviews');
                    setEdit(false);
                }
                else {
                    setReview({ ...review, ratings: response.data.rating, body: response.data.body });
                    setEdit(true);
                }

            } catch (error) {
                console.log('Error fetching products');
            }
        };
        if (userId === '') {
            navigate('/signin');
        }
        else {
            fetchReview(userId);
        }
    }, []);

    const handleSubmit = async () => {

        const reviews = {};
        reviews.customerId = localStorage.getItem('UserId');
        reviews.productId = parseInt(productId);
        reviews.rating = review.ratings;
        reviews.body = review.body;

        try {
            await revAPI.postReview(reviews);
            alert('Review Posted Successfully !!!');
        }
        catch (error) {
            console.error('Error Posting the review');
        }

        navigate(`/products/${productId}`);
    };

    const handleEdit = async () => {
        const data = {
            customerId: parseInt(userId),
            productId: parseInt(productId),
            rating: review.ratings,
            body: review.body
        };
        try {
            await revAPI.updateReview(data);
            alert('Successfully updated the review');
        }
        catch (error) {
            console.error('Error updating the review');
        }
        navigate(`/products/${productId}`);
    };

    const handleDel = async () => {
        const data = {
            customerId: parseInt(userId),
            productId: parseInt(productId)
        };
        try {
            await revAPI.deleteReview(data);
            alert('Successfully deleted the review');
        }
        catch (error) {
            console.error('Error deleting the review');
        }
        navigate(`/products/${productId}`);
    };
    return (
        <div className="parent">
            <div className="container">
                <h2>Post a Review</h2>
                <label>Rating</label>
                <select
                    name="ratings"
                    value={review.ratings}
                    onChange={(e) => setReview({ ...review, ratings: e.target.value })}
                    required
                >
                    <option value="">Choose Rating</option>
                    <option value="1">1 Star</option>
                    <option value="2">2 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="5">5 Stars</option>
                </select>
                <p></p>
                <label>Body:</label>
                <input
                    type="text"
                    name="body"
                    value={review.body}
                    onChange={(e) => setReview({ ...review, body: e.target.value })}
                    required
                />
                {isEdit === false ?
                    <button onClick={handleSubmit}>Submit</button>
                    :
                    <div>
                        <button onClick={handleEdit}>Edit</button>
                        <button onClick={handleDel}>Delete</button>
                    </div>
                }
            </div>
        </div>
    );
};

export default Review;