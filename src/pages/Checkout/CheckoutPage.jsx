import "./checkoutPage.css";
import axios from "axios";
import { useState, useEffect, } from "react";
import { CheckoutHeader } from "./CheckoutHeader";
import { OrderSummary } from "./OrderSummary";
import { PaymentSummary } from "./PaymentSummary";



export function CheckoutPage({ cart, fetchCart }) {
  const [cartWithProducts, setCartWithProducts] = useState([]);
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    const fetchCheckoutData = async () => {
      try {
        const cartResponse = await axios.get('/api/cart-items?expand=product');
        setCartWithProducts(cartResponse.data);

        const deliveryResponse = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime');
        setDeliveryOptions(deliveryResponse.data);

        const paymentResponse = await axios.get('/api/payment-summary');
        setPaymentSummary(paymentResponse.data);
      }
      catch (error) {
        console.error('Error fetching checkout data:', error);
      }
    }
    fetchCheckoutData();
  }, [cart]);


  return (
    <>
      <title>Checkout</title>
      <link rel="icon" type="image/svg+xml" href="../public/images/icons/cart-favicon.png " />
      <CheckoutHeader cart={cart} />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary cart={cartWithProducts} deliveryOptions={deliveryOptions} fetchCart={fetchCart} />

          <PaymentSummary paymentSummary={paymentSummary} />
        </div>
      </div>
    </>
  );
}