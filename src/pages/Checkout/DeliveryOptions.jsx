import dayjs from "dayjs";
import { formatPrice } from "../../utils/money";
import axios from "axios";

export function DeliveryOptions({ deliveryOption = [], cartItem  , fetchCart }) {
  return (
    <div className="delivery-options">
      <div className="delivery-options-title">
        Choose a delivery option:
      </div>
      {
        deliveryOption.map((option) => {
          let price = option.priceCents === 0 ? "FREE Shipping" : formatPrice(option.priceCents);

          const updateDeliveryOption = async() => {
            await axios.put(`/api/cart-items/${cartItem.productId}`, {
              deliveryOption: option.id
            });
            await fetchCart();
          }

          return (
            <div key={option.id} className="delivery-option" onClick={updateDeliveryOption}>
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
  );
}