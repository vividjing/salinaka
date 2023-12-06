import React, { useState } from "react";
import Banner2 from "../Banner/Banner2";
import RecommendedProduct from "../RecommendedProduct/RecommendedProduct";

export default function Recommended() {
  let [name, setName] = useState("recommend");
  let [show2, setShow2] = useState(false);
  return (
    <div>
      <Banner2 />
      <RecommendedProduct show2={show2} />
    </div>
  );
}
