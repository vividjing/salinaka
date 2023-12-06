import React, { useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Nav.css";
import sousou from "../../assets/images/sousuo.svg";
import gouwudai from "../../assets/images/gouwudai.svg";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeAllItems,
  removeFromCart,
  searchProduct,
  searchBoxUnshow,
} from "../../action/action";

export default function Nav() {
  let [active, setActive] = useState(1);
  let [showCart, setShowCart] = useState(false);
  let [decreaseDisable, setDecreaseDisable] = useState(false);
  let [clearBasketDisable, setClearBasketDisable] = useState(false);
  const cartItems = useSelector((state) => state.cartItems);

  let toggleShowCart = () => {
    setShowCart(!showCart);
  };
  let display = showCart ? "block" : "none";

  const dispatch = useDispatch();

  const navigation = useNavigate();
  const backToHome = () => {
    navigation("/");
    dispatch(searchBoxUnshow());
    document.body.style.overflow = "auto";
  };

  const handleRemoveCart = (itemId, itemSize, itemColor) => {
    dispatch(removeFromCart(itemId, itemSize, itemColor));
  };
  const handleRemoveAll = () => {
    dispatch(removeAllItems());
  };
  const handleIncreaseQuantity = (itemId) => {
    dispatch(increaseQuantity(itemId));
  };
  const handleDecreaseQuantity = (itemId) => {
    dispatch(decreaseQuantity(itemId));
  };
  const handleSearchProduct = (e) => {
    let keyword = e.target.value;
    if (e.key === "Enter") {
      document.body.style.overflow = "hidden";
      dispatch(searchProduct(keyword));
    }
  };

  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0.0);

  return (
    <div className="navigationBar">
      <div className="imgContainer" onClick={backToHome}></div>
      <div className="navLeft">
        <div className="navLink">
          <Link
            to="/"
            onClick={() => {
              setActive(1);
              dispatch(searchBoxUnshow());
              document.body.style.overflow = "auto";
            }}
            className={active === 1 ? "active" : ""}
          >
            Home
          </Link>
          <Link
            to="/shop"
            onClick={() => {
              setActive(2);
              dispatch(searchBoxUnshow());
              document.body.style.overflow = "auto";
            }}
            className={active === 2 ? "active" : ""}
          >
            Shop
          </Link>
          <Link
            to="/featured"
            onClick={() => {
              setActive(3);
              dispatch(searchBoxUnshow());
              document.body.style.overflow = "auto";
            }}
            className={active === 3 ? "active" : ""}
          >
            Featured
          </Link>
          <Link
            to="/recommended"
            onClick={() => {
              setActive(4);
              dispatch(searchBoxUnshow());
              document.body.style.overflow = "auto";
            }}
            className={active === 4 ? "active" : ""}
          >
            Recommended
          </Link>
        </div>
      </div>
      <div className="navRight">
        <div className="searchContainer">
          <img src={sousou} alt="" className="search" />
          <div>
            <input
              onKeyUp={handleSearchProduct}
              type="text"
              placeholder=" Search product"
            />
          </div>
          <div className="shoppingBag" onClick={toggleShowCart}>
            <img src={gouwudai} alt="" className="shoppingBagImg" />
            <div
              className={cartItems.length == 0 ? "noShow" : "productQuantity"}
            >
              {cartItems.length}
            </div>
          </div>
          <div
            className="model"
            style={{ display }}
            onClick={toggleShowCart}
          ></div>
          <div
            className={
              showCart ? "shoppingCart showShoppingCart" : "shoppingCart"
            }
          >
            <div className="cartTop">
              <div>
                <span className="myBasket">My Basket </span>
                <span className="totalNumber">
                  ( {cartItems.length} {cartItems.length > 1 ? "items" : "item"}{" "}
                  )
                </span>
              </div>
              <div className="cartTopRight">
                <div onClick={toggleShowCart}>Close</div>
                <button
                  disabled={
                    cartItems.length > 0 ? decreaseDisable : !decreaseDisable
                  }
                  style={{
                    cursor: cartItems.length > 0 ? "pointer" : "not-allowed",
                    color: cartItems.length > 0 ? "#4a4a50" : "#afafaf",
                  }}
                  onClick={handleRemoveAll}
                  id="clearBasket"
                >
                  Clear Basket
                </button>
              </div>
            </div>
            {cartItems.length > 0 ? (
              cartItems.map((item) => {
                return (
                  <div className="cartMiddle" key={item.cartItemId}>
                    <div>
                      <button
                        onClick={() => handleIncreaseQuantity(item.cartItemId)}
                        id="add"
                      >
                        +
                      </button>
                      <button
                        disabled={
                          item.quantity > 1 ? decreaseDisable : !decreaseDisable
                        }
                        style={{
                          cursor: item.quantity > 1 ? "pointer" : "not-allowed",
                        }}
                        onClick={() => handleDecreaseQuantity(item.cartItemId)}
                        id="minus"
                      >
                        -
                      </button>
                    </div>

                    <div className="cartImgContainer">
                      <img src={item.src} />
                    </div>
                    <div className="cartProductDetail">
                      <div className="cartProductName">{item.name}</div>
                      <div className="cartProductStyle">
                        <div>
                          <p className="small">Quantity</p>
                          <p>{item.quantity}</p>
                        </div>
                        <div>
                          <p className="small">Size</p>
                          <p>{item.size == 0 ? "28 mm" : item.size}</p>
                        </div>
                        <div>
                          <p className="small"> Color</p>
                          <p
                            className="color"
                            style={{
                              backgroundColor:
                                item.color == "transparent"
                                  ? "black"
                                  : item.color,
                            }}
                          ></p>
                        </div>
                      </div>
                    </div>
                    <div className="price"> ${item.price.toFixed(2)}</div>
                    <div
                      className="cartClose"
                      onClick={() =>
                        handleRemoveCart(item.id, item.size, item.color)
                      }
                    >
                      x
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="emptyBasket"> Your basket is empty </div>
            )}

            <div className="cartBottom">
              <div className="checkOut">
                <p id="amount">Subtotal Amount:</p>
                <p id="totalPrice">${totalPrice.toFixed(2)}</p>
              </div>
              <div
                style={{
                  cursor: cartItems.length > 0 ? "pointer" : "not-allowed",
                  color: cartItems.length > 0 ? "" : "#afafaf",
                  backgroundColor: cartItems.length > 0 ? "" : "#878787",
                }}
                className="checkOutButton"
              >
                {" "}
                CHECK OUT
              </div>
            </div>
          </div>
        </div>

        <button className="active">Sign Up</button>
        <button>Sign In</button>
      </div>
    </div>
  );
}
