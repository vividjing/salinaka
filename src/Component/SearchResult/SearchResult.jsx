import React from "react";
import { useState } from "react";
import "../Shop/Shop.css";
import "./SearchResult.css";
import { Link } from "react-router-dom";
import { addToCart, searchBoxUnshow } from "../../action/action";
import { useDispatch } from "react-redux";
import check from "../../assets/images/check.svg";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";

export default function Search() {
  const cartItemData = useSelector((state) => state.cartItems);

  let filterData = useSelector((state) => state.filterData);
  const boxData = useSelector((state) => state.reminderBox);
  let searchBoxshow = useSelector((state) => state.searchShow);
  let keywords = useSelector((state) => state.keyword);

  const dispatch = useDispatch();
  const handleAddToCart = (e, filtedItemId) => {
    e.stopPropagation();
    console.log("button");
    dispatch(addToCart(filtedItemId));
  };

  const detailInfoHandler = () => {
    dispatch(searchBoxUnshow(false));
    document.body.style.overflow = "auto";
  };
  return (
    <div
      className="searchResultModal"
      style={{ display: searchBoxshow ? "block" : "none" }}
    >
      <div className="searchResultContainer">
        <div
          className="noResult"
          style={{ display: filterData.length > 0 ? "none" : "block" }}
        >
          No product found
        </div>
        <div style={{ display: filterData.length > 0 ? "block" : "none" }}>
          <h4 className="searchTitle">
            Found {filterData.length} product with keyword {keywords}
          </h4>
          <div className="shopContainer">
            <div className="shopList">
              {filterData.map((item, index) => {
                const productId = item.id;
                return (
                  <div className="shopListDetail" key={index}>
                    <div className="shopListDetailModal">
                      <div
                        id={productId}
                        style={{
                          display: cartItemData.find(
                            (item) => item.id === productId
                          )
                            ? "block"
                            : "none",
                        }}
                        className="cartCheckMark"
                      >
                        <img src={check} alt="" />
                      </div>
                      <div className="shopListDetailContent">
                        <Link to={`/product/${item.id}`}>
                          <div
                            onClick={detailInfoHandler}
                            className="shopListDetailTop"
                          >
                            <div className="shopImg">
                              <img src={item.src} alt="" />
                            </div>
                            <h3>{item.name}</h3>
                            <p>{item.types}</p>
                            <h4>${item.price.toFixed(2)}</h4>
                          </div>
                        </Link>

                        <button onClick={(e) => handleAddToCart(e, item.id)}>
                          Add To Basket
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
