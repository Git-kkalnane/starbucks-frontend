import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './navigation/Navigation';
import Home from './pages/Home';
import Pay from './pages/Pay';
import Charge from './pages/Charge';
import Order from './pages/Order';
import Other from './pages/Other';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Account from './pages/account/Account';
import NickNameEdit from './pages/account/NickNameEdit';
import PasswordEdit from './pages/account/PasswordEdit';
import MockPage from './pages/MockPage';
import ShopList from './pages/shop/ShopList';
import ShopDetail from './pages/shop/ShopDetail';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import MenuDetail from './pages/menu/MenuDetail';

import './App.css';

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
                    <Route path="/account" element={<Account />} />
                    <Route path="/account/nickname" element={<NickNameEdit />} />
                    <Route path="/account/password" element={<PasswordEdit />} />
                    <Route path="/mock" element={<MockPage />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="*" element={<NotFound />} />
                    <Route path="/order/shop" element={<ShopList />} />
                    <Route path="/order/shop/:id" element={<ShopDetail />} />
                    <Route path="/order/menu/:id" element={<MenuDetail />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
