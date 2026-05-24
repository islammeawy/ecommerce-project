import axios from "axios";
import { useState } from "react";

export function CartItemDetails({ cartItem, fetchCart }) {
  const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false);
  const [newQuantity, setNewQuantity] = useState(cartItem.quantity);

  const handleQuantityChange = (e) => {
    setNewQuantity(parseInt(e.target.value));
  };

  const handleUpdateQuantity = async () => {
    if (newQuantity > 0) {
      await axios.put(`/api/cart-items/${cartItem.productId}`, {
        quantity: newQuantity
      });
      await fetchCart();
      setIsUpdatingQuantity(false);
    }
  };

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
        <div className="product-quantity">
          <span>
            Quantity: {isUpdatingQuantity
            ? <input type="number" className="quantity-textbox" 
              value={newQuantity} 
              onChange={handleQuantityChange} 
              min="1"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleUpdateQuantity();
                }
                if (e.key === "Escape") {
                  setIsUpdatingQuantity(false);
                  setNewQuantity(cartItem.quantity);
                }
              }}
               />
              : <span className="quantity-label">{cartItem.quantity}</span>
            }
          </span>
          <span className="update-quantity-link link-primary" onClick={isUpdatingQuantity ? handleUpdateQuantity : () => setIsUpdatingQuantity(true)}>
            {isUpdatingQuantity ? "Save" : "Update"}
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