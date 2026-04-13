import { Home } from './pages/home'
import axios from 'axios'
import { CheckoutPage } from './pages/Checkout/CheckoutPage'
import { Orders } from './pages/orders'
import { TrackingPage } from './pages/Tracking'
import { NotFound } from './pages/NotFound'
import { Routes, Route } from 'react-router-dom'
import './pages/home.css'
import './Components/Header.css'
import { useState , useEffect } from 'react'

function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
      axios.get('/api/cart')
      .then((response) => {
        setCart(response.data);
      });
  }, []);

  return (
    <Routes>
      <Route index element={<Home cart={cart} />} />
      <Route path="/checkout" element={<CheckoutPage cart={cart} />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/tracking" element={<TrackingPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App