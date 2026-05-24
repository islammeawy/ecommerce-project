import { Home } from './pages/home/home'
import axios from 'axios'
import { CheckoutPage } from './pages/Checkout/CheckoutPage'
import { Orders } from './pages/orders/orders'
import { TrackingPage } from './pages/tracking/Tracking'
import { NotFound } from './pages/NotFound'
import { Routes, Route } from 'react-router-dom'
import './pages/home/home.css'
import './Components/Header.css'
import { useState, useEffect } from 'react'

function App() {
  const [cart, setCart] = useState([]);
  const fetchCart = async () => {
      try {
        const response = await axios.get('/api/cart-items');
        setCart(response.data);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };

  useEffect(() => {
    fetchCart();
  }, []);

  
  return (
    <Routes>
      <Route index element={<Home cart={cart} fetchCart={fetchCart} />} />
      <Route path="/search" element={<Home cart={cart} fetchCart={fetchCart} />} />
      <Route path="/checkout" element={<CheckoutPage cart={cart} fetchCart={fetchCart} />} />
      <Route path="/orders" element={<Orders cart={cart} fetchCart={fetchCart} />} />
      <Route path="/tracking/:orderId/:productId" element={<TrackingPage cart={cart} fetchCart={fetchCart} />} />
      <Route path="*" element={<NotFound cart={cart} fetchCart={fetchCart} />} />
    </Routes>
  )
}

export default App