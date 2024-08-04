import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import prodAPI from '../../services/product';
import './Products.css';


const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await prodAPI.getAll();
                setProducts(response.data);
                // console.log(products);
                setLoading(false);
            } catch (error) {
                console.log('Error fetching products');
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }
    return (
        <div className="product-page">
            <div className="cart-link">
                <Link to="/cart-items">My Cart</Link>
            </div>
            {products.map(product => (
                <Link to={`/products/${product.id}`} key={product.id}>
                    <div className={`product ${product.type === 'special' ? 'special-product' : ''}`} key={product.id}>
                        <img className="product-image" src={product.image} alt={product.title} />
                        <div className="product-details">
                            <h2 className="product-name">{product.title}</h2>
                            <p className={`product-price ${product.type === 'special' ? 'special-price' : ''}`}>
                                Price:  ${product.cost}
                            </p>
                            {product.type === 'special' && <span className="special-label">Special</span>}
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default Products;

