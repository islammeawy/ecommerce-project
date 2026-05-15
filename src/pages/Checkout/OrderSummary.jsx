import { DeliveryDate } from "./DeliveryDate";
import { DeliveryOptions } from "./DeliveryOptions";
import { CartItemDetails } from "./CartItemDetails";



export function OrderSummary({ cart = [], deliveryOptions = [] , fetchCart }) {
  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 && cart.map((cartItem) => {
        return (
          <div key={cartItem.productId} className="cart-item-container">
            <DeliveryDate cartItem={cartItem} deliveryOptions={deliveryOptions} />
            <div className="cart-item-details-grid">
              <CartItemDetails cartItem={cartItem} fetchCart={fetchCart} />

              <DeliveryOptions cartItem={cartItem} deliveryOptions={deliveryOptions}  fetchCart={fetchCart}/>
            </div>
          </div>
        );
      }
      )}
    </div>
  );
}