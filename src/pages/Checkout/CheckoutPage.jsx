import "./checkoutPage.css";
import axios from "axios";
import { useState, useEffect, } from "react";
import { CheckoutHeader } from "./CheckoutHeader";
import { formatPrice } from '../../utils/money'
import dayjs from "dayjs";
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
          <div className="order-summary">

            {
              cart.map((cartItem) => {

                const selectedDeliveryOption = deliveryOption.find((option) => option.productId === cartItem.productId);
                return (
                  <div key={cartItem.productId} className="cart-item-container">
                    <div className="delivery-date">
                      Delivery date: {selectedDeliveryOption ? dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D') : "Loading..."}
                    </div>

                    <div className="cart-item-details-grid">
                      <img className="product-image"
                        src={cartItem.product.image} />

                      <div className="cart-item-details">
                        <div className="product-name">
                          {cartItem.product.name}
                        </div>
                        <div className="product-price">
                          {formatPrice(cartItem.product.priceCents)}
                        </div>
                        <div className="product-quantity">
                          <span>
                            Quantity: <span className="quantity-label">{cartItem.quantity}</span>
                          </span>
                          <span className="update-quantity-link link-primary">
                            Update
                          </span>
                          <span className="delete-quantity-link link-primary">
                            Delete
                          </span>
                        </div>
                      </div>

                      <div className="delivery-options">
                        <div className="delivery-options-title">
                          Choose a delivery option:
                        </div>
                        {
                          deliveryOption.map((option) => {
                            let price = option.priceCents === 0 ? "FREE Shipping" : formatPrice(option.priceCents);
                            return (
                              <div key={option.id} className="delivery-option">
                                <input type="radio" checked
                                  className="delivery-option-input"
                                  name={`delivery-option-${option.id}`} />
                                <div>
                                  <div className="delivery-option-date">
                                    {dayjs(option.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                                    
                                  </div>
                                  <div className="delivery-option-price">
                                    {price}
                                  </div>
                                </div>
                              </div>
                            );
                          })
                          }
                        
                        
                      </div>
                    </div>
                  </div>
                );
              }
              )}



          </div>

          <div className="payment-summary">
            <div className="payment-summary-title">
              Payment Summary
            </div>

            <div className="payment-summary-row">
              <div>Items ({paymentSummary ? paymentSummary.totalItems : "Loading..."}):</div>
              <div className="payment-summary-money">{paymentSummary ? formatPrice(paymentSummary.itemsTotalCents) : "Loading..."}</div>
            </div>

            <div className="payment-summary-row">
              <div>Shipping &amp; handling:</div>
              <div className="payment-summary-money">{paymentSummary ? formatPrice(paymentSummary.shippingCents) : "Loading..."}</div>
            </div>

            <div className="payment-summary-row subtotal-row">
              <div>Total before tax:</div>
              <div className="payment-summary-money">{paymentSummary ? formatPrice(paymentSummary.subtotalCents) : "Loading..."}</div>
            </div>

            <div className="payment-summary-row">
              <div>Estimated tax (10%):</div>
              <div className="payment-summary-money">{paymentSummary ? formatPrice(paymentSummary.taxCents) : "Loading..."}</div>
            </div>

            <div className="payment-summary-row total-row">
              <div>Order total:</div>
              <div className="payment-summary-money">{paymentSummary ? formatPrice(paymentSummary.totalCents) : "Loading..."}</div>
            </div>

            <button className="place-order-button button-primary">
              Place your order
            </button>
          </div>
        </div>
      </div>
    </>
  );
}