import React, { useState } from "react";
import Banner2 from "../Banner/Banner2";
import FeaturedProduct from "../FeaturedProduct/FeaturedProduct";

export default function Featured() {
  let [show, setShow] = useState(false);
  let [seeAll, setseeAll] = useState(true);
  let [name, setName] = useState("feature");
  return (
    <div>
      <Banner2 name={name} />
      <FeaturedProduct show={show} seeAll={seeAll} />
    </div>
  );
}
