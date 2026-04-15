import './home.css'
import { Header } from '../../Components/Header';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ProductGrid } from './ProductGrid';

export function Home({ cart }) {
  const [products, setProducts] = useState([]);


  useEffect(() => {
    axios.get('/api/products')
      .then((response) => {
        setProducts(response.data);
      });
  }, []);


  return (
    <>
      <title>Ecommerce project</title>
      <link rel="icon" type="image/svg+xml" href="../public/images/icons/home-favicon.png " />
      <Header cart = {cart} />

      <div className="home-page">
        <ProductGrid products={products} />
      </div>
    </>
  );

}