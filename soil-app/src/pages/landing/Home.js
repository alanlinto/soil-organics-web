import React, { useEffect } from "react";
import './Home.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Content from './components/Content';
import userAPI from '../../services/customer';

function Home() {
    useEffect(() => {
        const fetchUser = async (id) => {
            try {
                const response = await userAPI.one(id);
                alert(`Welcome : ${response.data.username}`);
            }
            catch (error) {
                console.log('Error retreiving information');
            }
        };
        const userId = localStorage.getItem('UserId');
        if (userId !== '') {
            fetchUser(parseInt(userId));
        }
    }, []);
    return (
        <div className="body">
            <Header />
            <Content />
            <Footer />
        </div>
    );
}

export default Home;