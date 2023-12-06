import React from "react";
import Banner from "../Banner/Banner";
import FeaturedProduct from "../FeaturedProduct/FeaturedProduct";
import RecommendedProduct from "../RecommendedProduct/RecommendedProduct";
import Footer from "../Footer/Footer";
import { useState } from "react";
export default function Home() {
  let [show, setShow] = useState(true);
  let [seeAll, setseeAll] = useState(false);
  let [show2, setShow2] = useState(true);
  return (
    <div>
      <Banner />
      <FeaturedProduct show={show} seeAll={seeAll}></FeaturedProduct>
      <RecommendedProduct show2={show2} />
      <Footer />
    </div>
  );
}
