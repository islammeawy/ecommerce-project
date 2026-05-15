import { formatPrice } from "../../utils/money";
import axios from "axios";

export function CartItemDetails({ cartItem, fetchCart }) {

  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await fetchCart();
  }
  return (
    <>
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
          <span className="delete-quantity-link link-primary"
          onClick={deleteCartItem}
          >
            Delete
          </span>
        </div>
      </div>
    </>
  );
}