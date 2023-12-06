import React from "react";
import FeaturedProductData from "./FeaturedProductData";
import "./FeaturedProduct.css";
import { Link } from "react-router-dom";
export default function FeaturedProduct(props) {
  let rawDatas = FeaturedProductData();

  let datas = props.seeAll
    ? rawDatas
    : rawDatas.filter(
        (item) => item.names !== "Kutu" && item.names !== "Quake OverLoad"
      );

  return (
    <div className="featuredContainer">
      {props.show && (
        <div className="featuredTop">
          <h3> Featured Product</h3>
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
                <h3>{item.names}</h3>
                <p>{item.types}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
