import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './navigation/Navigation';
import Home from './pages/Home';
import Pay from './pages/Pay';
import Order from './pages/Order';
import Other from './pages/Other';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MockPage from './pages/MockPage';
import ShopList from './pages/shop/ShopList';
import ShopDetail from './pages/shop/ShopDetail';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';

import './App.css';

function App() {
    return (
        <div className="app">
            <Navigation />
            <main className="page-container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/pay" element={<Pay />} />
                    <Route path="/order" element={<Order />} />
                    <Route path="/other" element={<Other />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/mock" element={<MockPage />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="*" element={<NotFound />} />
                    <Route path="/order/shop" element={<ShopList />} />
                    <Route path="/order/shop/:id" element={<ShopDetail />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
