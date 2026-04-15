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
    axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
      .then((response) => {
        setDeliveryOption(response.data);
      });

    axios.get('/api/payment-summary')
      .then((response) => {
        setPaymentSummary(response.data);
      });
  }, []);

  return (
    <>
      <title>Checkout</title>
      <link rel="icon" type="image/svg+xml" href="../public/images/icons/cart-favicon.png " />
      <CheckoutHeader />

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