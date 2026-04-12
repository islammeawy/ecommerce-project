import { Header } from '../Components/Header.jsx'
import './NotFound.css'

export function NotFound() {
  return (
    <>
      <Header />
      <div className="not-found-container">
        <h1>404</h1>
        <p>Page not found</p>
        <a href="/" className="back-home-link">Back to Home</a>
      </div>
    </>
  )
}