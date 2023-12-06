import { Routes, Route } from "react-router-dom";
import React from "react";
import Home from "../Home/Home";
import Shop from "../Shop/Shop";
import Featured from "../Featured/Featured";
import Recommended from "../Recommended/Recommended";
import Product from "../Products/Product";
import ProductDetail from "../ProductDetail/ProductDetail";
import NotFound from "../NotFound/NotFound";

export default function RouterConfig() {
  return (
    <Routes>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="home" element={<Home></Home>}></Route>
      <Route path="shop" element={<Shop></Shop>}></Route>
      <Route path="featured" element={<Featured></Featured>}></Route>
      <Route path="recommended" element={<Recommended></Recommended>}></Route>
      <Route path="product" element={<Product></Product>}>
        <Route
          path=":productId"
          element={<ProductDetail></ProductDetail>}
        ></Route>
      </Route>
      {/* 无匹配路由*/}
      <Route path="*" element={<NotFound></NotFound>}></Route>
    </Routes>
  );
}
