import dayjs from "dayjs";
import { formatPrice } from "../../utils/money";
import axios from "axios";

export function DeliveryOptions({ deliveryOptions = [], cartItem  , fetchCart }) {
  return (
    <div className="delivery-options">
      <div className="delivery-options-title">
        Choose a delivery option:
      </div>
      {
        deliveryOptions.map((option) => {
          let price = option.priceCents === 0 ? "FREE Shipping" : formatPrice(option.priceCents);

          const updateDeliveryOption = async() => {
            await axios.put(`/api/cart-items/${cartItem.productId}`, {
              deliveryOptionId: option.id
            });
            await fetchCart();
          }

          return (
            <div key={option.id} className="delivery-option" onClick={updateDeliveryOption}>
              <input type="radio" checked={option.id === cartItem.deliveryOptionId}
                className="delivery-option-input"
                name={`delivery-option-${cartItem.productId}`} />
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
  );
}