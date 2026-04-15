import { Home } from './pages/home/home'
import axios from 'axios'
import { CheckoutPage } from './pages/Checkout/CheckoutPage'
import { Orders } from './pages/orders/orders'
import { TrackingPage } from './pages/Tracking'
import { NotFound } from './pages/NotFound'
import { Routes, Route } from 'react-router-dom'
import './pages/home/home.css'
import './Components/Header.css'
import { useState, useEffect } from 'react'

function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('/api/cart');
        setCart(response.data);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    }
    fetchCart();
  }, []);

  return (
    <Routes>
      <Route index element={<Home cart={cart} />} />
      <Route path="/checkout" element={<CheckoutPage cart={cart} />} />
      <Route path="/orders" element={<Orders cart={cart} />} />
      <Route path="/tracking" element={<TrackingPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App