import { formatPrice } from "../../utils/money";
import dayjs from "dayjs";
import { DeliveryOptions } from "./DeliveryOptions";


export function OrderSummary({ cart, deliveryOption }) {
  return (
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

                <DeliveryOptions deliveryOption={deliveryOption.filter((option) => option.productId === cartItem.productId)} />
              </div>
            </div>
          );
        }
        )}



    </div>
  );
}