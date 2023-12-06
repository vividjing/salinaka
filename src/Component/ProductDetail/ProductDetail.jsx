import React, { useState } from "react";
import { getHomeOne } from "../Data/Data";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetail.css";
import RecommendedProduct from "../RecommendedProduct/RecommendedProduct";
import arrowleft from "../../assets/images/arrowleft.svg";
import { useDispatch } from "react-redux";
import { addToCart, sizeSelected, colorSelected } from "../../action/action";
import gougou from "../../assets/images/gougou.svg";

export default function ProductDetail(props) {
  let [show2, setShow2] = useState(true);
  let [colorOne, setColorOne] = useState();
  let [imgSelected, setImgSelected] = useState();
  let params = useParams();
  let id = params.productId;
  let prodcutData = getHomeOne(id);
  let shopNavi = useNavigate();
  let backToShop = () => {
    shopNavi("/shop");
  };
  const colorArray = [
    "black",
    "purple",
    "#004d84",
    "#753600",
    "red",
    "#09e1b6",
    "#ff6f00",
  ];
  const dispatch = useDispatch();
  const handleAddToCart = (productId) => {
    dispatch(addToCart(productId));
  };
  const handleColorSelected = (e, index) => {
    const colorTwo = getComputedStyle(e.target).backgroundColor;
    const ImgId = e.target.id;
    imgSelected = setImgSelected(ImgId);
    dispatch(colorSelected(colorTwo));
  };
  const handleSizeSelected = (e) => {
    const sizeOne = e.target.value;
    dispatch(sizeSelected(sizeOne));
  };

  return (
    <div className="productDetailComponent">
      <div className="backButton" onClick={backToShop}>
        <img src={arrowleft} />
        <span>Back to shop</span>
      </div>

      <div className="glassDetails">
        <div className="originalPic">
          <img src={prodcutData.src} alt="" />
        </div>
        <div className="picWithBg">
          <div id="picOverLay" style={{ backgroundColor: colorSelected }}></div>
          <img src={prodcutData.src} alt="" />
        </div>
        <div className="productDetailRight">
          <p>{prodcutData.types}</p>
          <h3>{prodcutData.name}</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
            placeat similique dicta nulla praesentium deserunt. Corporis
            repellendus deleniti dolores eligendi.
          </p>
          <hr />
          <p> Lens Width and Frame Size</p>
          <select
            className="sizeSelection"
            onChange={(e, productId) => handleSizeSelected(e, productId)}
          >
            <option value="0">- Select Size -</option>
            <option value="28 mm">28 mm</option>
            <option value="36 mm">36 mm</option>
            <option value="42 mm">42 mm</option>
          </select>
          <p>Choose Color</p>
          <ul className="colorSelection">
            {colorArray.map((item, index) => {
              return (
                <li
                  id={item}
                  key={index}
                  onClick={(e, item) => handleColorSelected(e, item)}
                >
                  <img
                    style={{
                      display: item === imgSelected ? "inline" : "none",
                    }}
                    className="gougou"
                    src={gougou}
                    alt=""
                  />
                </li>
              );
            })}
          </ul>
          <h3>{`$${prodcutData.price.toFixed(2)}`}</h3>
          <button onClick={() => handleAddToCart(prodcutData.id)}>
            Add To Basket
          </button>
        </div>
      </div>
      <RecommendedProduct show2={show2} />
    </div>
  );
}
