import { Home } from './pages/home'
import { CheckoutPage } from './pages/CheckoutPage'
import { Routes, Route } from 'react-router-dom'
import './pages/home.css'
import './pages/header.css'

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/checkout" element={<CheckoutPage />} />
    </Routes>
  )
}

export default App