import "./Header.css";
import { NavLink  , useNavigate , useSearchParams} from "react-router-dom";
import { useState } from "react";

export function Header({ cart = [] }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // I need to use a different variable name since "search"
  // is already being used below.
  const searchText = searchParams.get('search');

  // || '' is a shortcut. It means if searchText does not exist
  // it will use a default value of ''.
  const [search, setSearch] = useState(searchText || '');
  const updateSearchInput = (event) => {
    setSearch(event.target.value);
  };

  const searchProducts = () => {
    navigate(`/search?search=${search}`);
  };

  let totalQuantity = 0;
  if (cart && Array.isArray(cart)) {
    cart.forEach((cartItem) => {
      totalQuantity += cartItem.quantity;
    });
  }

  return (
    <>
      <div className="header">
        <div className="left-section">
          <NavLink to="/" className="header-NavLink">
            <img className="logo"
              src="images/logo-white.png" />
            <img className="mobile-logo"
              src="images/mobile-logo-white.png" />
          </NavLink>
        </div>

        <div className="middle-section">
          <input className="search-bar" type="text" placeholder="Search" value={search} onChange={updateSearchInput} />

          <button className="search-button" onClick={searchProducts}>
            <img className="search-icon" src="images/icons/search-icon.png" />
          </button>
        </div>

        <div className="right-section">
          <NavLink to="/orders" className="orders-NavLink header-NavLink">
            <span className="orders-text">Orders</span>
          </NavLink>

          <NavLink to="/checkout" className="cart-NavLink header-NavLink">
            <img className="cart-icon" src="images/icons/cart-icon.png" />
            <div className="cart-quantity">{totalQuantity}</div>
            <div className="cart-text">Cart</div>
          </NavLink>
        </div>
      </div>
    </>
  );
}