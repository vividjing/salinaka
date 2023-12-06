import React from "react";
import "./Banner2.css";

export default function Banner2(props) {
  console.log(props);
  return props.name === "feature" ? (
    <div className="banner2Container">
      <div className="banner2Left">
        <h2>Featured Products</h2>
      </div>
      <div className="guyImg"></div>
    </div>
  ) : (
    <div className="banner2Container">
      <div className="banner2Left">
        <h2>Recommended Products</h2>
      </div>
      <div className="girlImg"></div>
    </div>
  );
}
