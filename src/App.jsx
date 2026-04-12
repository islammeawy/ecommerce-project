import { Home } from './pages/home'
import { CheckoutPage } from './pages/Checkout/CheckoutPage'
import { Orders } from './pages/orders'
import { TrackingPage } from './pages/Tracking'
import { NotFound } from './pages/NotFound'
import { Routes, Route } from 'react-router-dom'
import './pages/home.css'
import './Components/Header.css'

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/tracking" element={<TrackingPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App