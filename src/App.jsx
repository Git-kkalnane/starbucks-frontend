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
import MenuDetail from './pages/menu/MenuDetail';
import OrderTracker from './pages/order/OrderTracker';
import './App.css';
import Charge from './pages/Charge';

function App() {
    return (
        <div className="app">
            <Navigation />
            <main className="page-container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/pay" element={<Pay />} />
                    <Route path="/charge" element={<Charge />} />
                    <Route path="/order" element={<Order />} />
                    <Route path="/other" element={<Other />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/mock" element={<MockPage />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="*" element={<NotFound />} />
                    <Route path="/order/shop" element={<ShopList />} />
                    <Route path="/order/shop/:id" element={<ShopDetail />} />
                    <Route path="/order/menu/:id" element={<MenuDetail />} />
                    <Route path="/order/tracking" element={<OrderTracker />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
