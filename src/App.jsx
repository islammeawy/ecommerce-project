import { Home } from './pages/home'
import { Routes , Route } from 'react-router'
import './pages/home.css'
import './pages/header.css'


function App() {
  

  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
    
  )
}


export default App
