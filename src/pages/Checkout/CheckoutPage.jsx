import "./checkoutPage.css";
import axios from "axios";
import { useState, useEffect, } from "react";
import { CheckoutHeader } from "./CheckoutHeader";
import { OrderSummary } from "./OrderSummary";
import { PaymentSummary } from "./PaymentSummary";



export function CheckoutPage({ cart }) {
  const [deliveryOption, setDeliveryOption] = useState("");
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    const fetchCheckoutData = async () => {
      try {
        const deliveryResponse = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime');

        setDeliveryOption(deliveryResponse.data);

        const paymentResponse = await axios.get('/api/payment-summary');

        setPaymentSummary(paymentResponse.data);
      }
      catch (error) {
        console.error('Error fetching checkout data:', error);
      }
    }
    fetchCheckoutData();
  }, []);


  return (
    <>
      <title>Checkout</title>
      <link rel="icon" type="image/svg+xml" href="../public/images/icons/cart-favicon.png " />
      <CheckoutHeader cart={cart} />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary cart={cart} deliveryOption={deliveryOption} />

          <PaymentSummary paymentSummary={paymentSummary} />
        </div>
      </div>
    </>
  );
}