import { formatPrice } from '../../utils/money'

export function PaymentSummary({ paymentSummary }) {
  return (
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
  );
}