import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import itemAPI from '../../services/item';
import prodAPI from '../../services/product';
import './Cart.css';

const Cart = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async (userId) => {
            try {
                const response = await itemAPI.getOneItem(userId)
                const products = response.data;
                const prodDetails = [];
                for (const item of products) {
                    const newItem = {};
                    const res = await prodAPI.getbyId(item.productId);
                    newItem.id = item.id;
                    newItem.title = res.data.title;
                    newItem.image = res.data.image;
                    newItem.cost = res.data.cost;
                    newItem.qty = item.quantity;
                    prodDetails.push(newItem);
                }
                setCartItems(prodDetails);
                setLoading(false);
            } catch (error) {
                console.log('Error fetching products');
                setLoading(false);
            }
        };
        const userId = localStorage.getItem('UserId');
        if (userId !== '') {
            fetchProducts(userId);
        }
        else {
            navigate('/signin');
        }
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    const deleteItem = async (index, { id }) => {

        try {
            const response = await itemAPI.deleteById(id);
            if (response.data.message === "Cart item has been destroyed") {
                const updatedCartItems = [...cartItems];
                updatedCartItems.splice(index, 1);
                setCartItems(updatedCartItems);
            }
            else {
                console.log(response.data.message);
            }
        }
        catch (error) {
            console.log("Error deleting this cart item");
        }
    };

    const handleQuantityChange = async (index, newQty, id) => {
        const data = {
            id: id,
            qty: newQty
        };
        try {
            const response = await itemAPI.updateQty(data);
            if (response.data.message === "Item quantity updated") {
                const updatedCartItems = [...cartItems];
                updatedCartItems[index].qty = newQty;
                setCartItems(updatedCartItems);
            }
            else {
                console.log(response.data.message);
            }
        }
        catch (error) {
            console.log('Error updating the cart item');
        }
    };

    const calculateItemCost = (item) => {
        return item.qty * item.cost;
    };

    const calculateTotalCost = () => {
        return cartItems.reduce((total, item) => total + calculateItemCost(item), 0);
    };

    return (
        <div className="cart-page">
            <h1><center>Your Cart</center></h1>
            <div className="cart-items">
                {cartItems.map((item, index) => (
                    <div key={index} className="cart-item">
                        <img src={item.image} alt={item.title} className="cart-item-image" />
                        <div className="item-details">
                            <div className="item-title">{item.title}</div>
                            <div className='item-quantity'>
                                {item.qty === 1 ?
                                    <button className="quantity-button" onClick={() => deleteItem(index, { id: item.id })}>DEL</button>
                                    :
                                    <button className="quantity-button" onClick={() => handleQuantityChange(index, item.qty - 1, item.id)}>-</button>
                                }
                                <span>{item.qty}</span>
                                <button className="quantity-button" onClick={() => handleQuantityChange(index, item.qty + 1, item.id)}>+</button>
                            </div>
                            <div className="item-total-cost">${calculateItemCost(item).toFixed(2)}</div>
                        </div>
                    </div>
                ))}
            </div>
            {cartItems.length !== 0 ?
                <div>
                    <div className="total-cost">
                        <h3><center>Total Cost: ${calculateTotalCost().toFixed(2)}</center></h3>
                    </div>
                    <div>
                        <button onClick={() => { navigate('/products') }}>Continue Shopping</button>
                    </div>
                    <div><button>Proceed to Checkout</button></div>
                </div> :
                <div>
                    <h3>No Items Added So Far</h3>
                    <button onClick={() => { navigate('/products') }}>Shop for Products</button>
                </div>}
        </div>
    );
};

export default Cart;
