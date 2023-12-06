import React from "react";
import RecommendedProductData from "./RecommendedProductData";
import "../FeaturedProduct/FeaturedProduct.css";
import { useState } from "react";
import { Link } from "react-router-dom";
export default function RecommendedProduct(props) {
  let datas = RecommendedProductData();
  return (
    <div className="featuredContainer">
      {props.show2 && (
        <div className="featuredTop">
          <h3> Recommended Product</h3>
          <span>See All</span>
        </div>
      )}

      <div className="featuredList">
        {datas.map((item, index) => {
          return (
            <Link to={`/product/${item.id}`} key={index}>
              <div className="featuredListDetail">
                <div className="productImg">
                  <img src={item.src} alt="" />
                </div>
                <h3>{item.name}</h3>
                <p>{item.types}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
