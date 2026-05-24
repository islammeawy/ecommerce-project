import "./orders.css";
import axios from "axios";
import { useState, useEffect, Fragment } from "react";
import { Header } from "../../Components/Header";
import { OrdersGrid } from "./ordersGrid";

export function Orders( {cart , fetchCart} ) {


  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/orders?expand=products');
        setOrders(response.data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };
    fetchOrders();
  }, []);


  return (
    <>
      <title>Orders</title>
      <link rel="icon" type="image/svg+xml" href="../public/images/icons/orders-favicon.png " />
      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>
       <OrdersGrid orders={orders} fetchCart={fetchCart} />
      </div>
    </>
  );
}