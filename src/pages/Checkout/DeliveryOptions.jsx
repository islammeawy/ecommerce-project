import dayjs from "dayjs";
import { formatPrice } from "../../utils/money";

export function DeliveryOptions({ deliveryOption }) {
  return (
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
  );
}