import { Home } from './pages/home'
import { CheckoutPage } from './pages/CheckoutPage'
import { Orders } from './pages/orders'
import { Routes, Route } from 'react-router-dom'
import './pages/home.css'
import './Components/Header.css'

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/orders" element={<Orders />} />
    </Routes>
  )
}

export default App