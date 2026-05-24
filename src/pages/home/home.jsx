import './home.css'
import { Header } from '../../Components/Header';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ProductGrid } from './ProductGrid';
import { useSearchParams } from 'react-router';

export function Home({ cart, fetchCart }) {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search') || '';

  useEffect(() => {
    console.log('Fetching home products...'); // Debugging log
    
    const getHomeProducts = async () => {
      try {
        const urlPath = search ? `/api/products?search=${search}` : '/api/products';
        const response = await axios.get(urlPath);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching home products:', error);
      }
    };

    getHomeProducts();
  }, [search]);
      
    
    


  return (
    <>
      <title>Ecommerce project</title>
      <link rel="icon" type="image/svg+xml" href="../public/images/icons/home-favicon.png " />
      <Header cart = {cart} />

      <div className="home-page">
        <ProductGrid products={products} fetchCart={fetchCart} />
      </div>
    </>
  );

}