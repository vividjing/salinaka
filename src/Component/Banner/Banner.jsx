import React from "react";
import "./Banner.css";
import { useNavigate } from "react-router-dom";

export default function Banner() {
  const navigation = useNavigate();

  const goToShop = () => {
    navigation("/shop");
  };
  return (
    <div className="bannerContainer">
      <div className="bannerLeft">
        <h2>
          <span>See</span> everything with
          <span> Clarity </span>
        </h2>
        <p>
          Buying eyewear should leave you happy and good-looking, with money in
          your pocket. Glasses, sunglasses, and contacts—we’ve got your eyes
          covered.
        </p>
        <div className="shoppingButton" onClick={goToShop}>
          Shop Now -{">"}
        </div>
      </div>
      <div className="glassImg"></div>
    </div>
  );
}
