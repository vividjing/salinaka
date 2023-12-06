import React from "react";
import { useState } from "react";
import Footer from "../Footer/Footer";
import "./Shop.css";
import { Link } from "react-router-dom";
import {
  addToCart,
  changeReminderBox,
  showMoreProduct,
} from "../../action/action";
import { useDispatch } from "react-redux";
import check from "../../assets/images/check.svg";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
import guolv from "../../assets/images/guolv.svg";
import close from "../../assets/images/close.svg";
import { useEffect } from "react";

export default function Shop() {
  const moreData = [
    {
      name: "Sugat",
      types: "Betsin Maalat",
      src: "https://firebasestorage.googleapis.com/v0/b/salinaka-ecommerce.appspot.com/o/products%2Figsz61dwpUgqT51Qd1F7?alt=media&token=db2f442f-4c92-4175-b21a-be6a448bc501",
      price: 56.0,
      id: 3111,
    },
    {
      name: "Takla Green",
      types: "Sexbomb",
      src: "https://firebasestorage.googleapis.com/v0/b/salinaka-ecommerce.appspot.com/o/products%2FmrkQoZV2qlpaRWsonHtH?alt=media&token=374fabb7-24e8-4355-bc88-70fec1c2d60d",
      price: 150.0,
      id: 3112,
    },
    {
      name: "Merry Christmas",
      types: "Salt Maalat",
      src: "https://firebasestorage.googleapis.com/v0/b/salinaka-ecommerce.appspot.com/o/products%2FmrkQoZV2qlpaRWsonHtH?alt=media&token=374fabb7-24e8-4355-bc88-70fec1c2d60d",
      price: 259.0,
      id: 3113,
    },
    {
      name: "Tilis Malaput",
      types: "Betsin Maalat",
      src: "https://firebasestorage.googleapis.com/v0/b/salinaka-ecommerce.appspot.com/o/products%2FvEjSLuZ2zyCwln0LHv4K?alt=media&token=6b79fe0a-e7fa-4f23-a521-e6bad01032d0",
      price: 340.0,
      id: 3114,
    },
    {
      name: "Tilly Nolas",
      types: "Betsin Maalat",
      src: "https://firebasestorage.googleapis.com/v0/b/salinaka-ecommerce.appspot.com/o/products%2Fs3uuRu71Mon65lHohQZ1?alt=media&token=6298fb20-91d4-461a-af78-90a404f89cd7",
      price: 365.0,
      id: 3115,
    },
    {
      name: "Tilapia",
      types: "salt Maalat",
      src: "https://firebasestorage.googleapis.com/v0/b/salinaka-ecommerce.appspot.com/o/products%2FkEq31Ad5RBwmqOebNBqA?alt=media&token=75307fe0-2f8b-4a78-a82a-a4996b5ca94e",
      price: 450.0,
      id: 3116,
    },
  ];
  const cartItemData = useSelector((state) => state.cartItems);

  let shopData = useSelector((state) => state.initialData);
  let [filterData, setFilterData] = useState(shopData);
  let boxData = useSelector((state) => state.reminderBox);
  let [reminderDisplay, setReminderDisplay] = useState(boxData);
  let minPrice = filterData.reduce((min, product) => {
    return product.price < min ? product.price : min;
  }, Infinity);
  let maxPrice = filterData.reduce((max, product1) => {
    return product1.price > max ? product1.price : max;
  }, -Infinity);
  let [isDraggingLeft, setIsDraggingLeft] = useState(false);
  let [x, setX] = useState();
  let [isDraggingRight, setIsDraggingRight] = useState(false);
  let [filterDisplay, setFilterDisplay] = useState(false);
  let [left, setLeft] = useState();
  let [right, setRight] = useState();

  let [selectedMinPrice, setSelectedMinPrice] = useState(minPrice);
  let [selectedMaxPrice, setSelectedMaxPrice] = useState(maxPrice);
  let [valueDisplayLeft, setValueDisplayLeft] = useState(false);
  let [valueDisplayRight, setValueDisplayRight] = useState(false);
  let [selectedName, setSelectedName] = useState("All Brands");
  let [selectedSortMethod, setSelectedSortMethod] = useState("None");

  const dispatch = useDispatch();
  const handleAddToCart = (e, productId) => {
    e.stopPropagation();
    dispatch(addToCart(productId));
  };
  const handleMoreData = (moreData) => {
    setFilterData([...filterData, ...moreData]);
    dispatch(showMoreProduct(moreData));
    setSelectedMinPrice(56);
  };

  const handleMoreData2 = (moreData) => {
    let newFilterDataOne = [...filterData, ...moreData];
    if (selectedName === "All Brands") {
      let newFilterDataFour = newFilterDataOne.filter((item) => {
        return item.price >= selectedMinPrice && item.price <= selectedMaxPrice;
      });
      sort(newFilterDataFour);
    } else {
      console.log(selectedName);
      let nameFilterDataTwo = newFilterDataOne.filter((item) => {
        return item.types.toLowerCase() === selectedName.toLowerCase();
      });
      let newFilterDataThree = nameFilterDataTwo.filter((item) => {
        return item.price >= selectedMinPrice && item.price <= selectedMaxPrice;
      });
      sort(newFilterDataThree);
    }
  };
  const handleFilterButton = () => {
    setFilterData(shopData);
    setFilterDisplay(true);
    document.body.style.overflow = "hidden";
  };

  const handleMouseDownLeft = () => {
    setIsDraggingLeft(true);
    setValueDisplayLeft(true);
  };
  const handleMouseDownRight = () => {
    setIsDraggingRight(true);
    setValueDisplayRight(true);
  };
  const handleMouseMoveLeft = (e) => {
    let evt = e || window.event;
    let x = e.clientX;
    let slideTool = document.getElementById("slideTool");
    let x2 = slideTool.getBoundingClientRect().left;
    let newLeft = x - x2 - 10;
    if (newLeft > 320) {
      newLeft = 320;
    } else if (newLeft < 0) {
      newLeft = 0;
    }
    let newValue = Math.floor(
      minPrice + (maxPrice - minPrice) * (newLeft / 320)
    );
    setSelectedMinPrice(newValue);
    setLeft(newLeft);
  };
  useEffect(() => {
    if (isDraggingLeft) {
      document.addEventListener("mousemove", handleMouseMoveLeft);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMoveLeft);
    };
  }, [isDraggingLeft]);

  useEffect(() => {
    document.addEventListener("mouseup", () => {
      setIsDraggingLeft(false);
      setIsDraggingRight(false);
      setValueDisplayLeft(false);
      setValueDisplayRight(false);
    });
  }, []);

  const handleMouseMoveRight = (e) => {
    let evt = e || window.event;
    let x3 = e.clientX;
    let slideTool = document.getElementById("slideTool");
    let x4 = slideTool.getBoundingClientRect().left;
    let newRight = x3 - x4 - 10;
    if (newRight > 320) {
      newRight = 320;
    } else if (newRight < 0) {
      newRight = 0;
    }
    let newRightValue = Math.floor(
      minPrice + (maxPrice - minPrice) * (newRight / 320)
    );
    setSelectedMaxPrice(newRightValue);
    setRight(newRight);
  };
  useEffect(() => {
    if (isDraggingRight) {
      document.addEventListener("mousemove", handleMouseMoveRight);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMoveRight);
    };
  }, [isDraggingRight]);

  const handleFilterNameChange = (e) => {
    let selectedFilter = e.target.value;
    setSelectedName(selectedFilter);
  };

  const handleSortByChange = (e) => {
    let selectedSort = e.target.value;
    setSelectedSortMethod(selectedSort);
  };
  const sort = (filterData) => {
    if (selectedSortMethod === "Name Ascending") {
      let newFilterData1 = [...filterData].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setFilterData(newFilterData1);
    } else if (selectedSortMethod === "Name Descending") {
      let newFilterData2 = [...filterData].sort((a, b) =>
        b.name.localeCompare(a.name)
      );
      setFilterData(newFilterData2);
    } else if (selectedSortMethod === "Price HighLow") {
      let newFilterData3 = [...filterData].sort((a, b) => b.price - a.price);
      setFilterData(newFilterData3);
    } else if (selectedSortMethod === "Price LowHigh") {
      let newFilterData4 = [...filterData].sort((a, b) => a.price - b.price);
      setFilterData(newFilterData4);
    } else {
      setFilterData(filterData);
    }
  };

  const handleApplyFilter = (e) => {
    setFilterDisplay(false);
    document.body.style.overflow = "auto";
    e.stopPropagation();
    if (selectedName === "All Brands") {
      let newFilterData5 = filterData.filter((item) => {
        return item.price >= selectedMinPrice && item.price <= selectedMaxPrice;
      });
      sort(newFilterData5);
    } else {
      console.log(selectedName);
      let nameFilterData = filterData.filter((item) => {
        return item.types.toLowerCase() === selectedName.toLowerCase();
      });
      console.log(nameFilterData);
      let newFilterData = nameFilterData.filter((item) => {
        return item.price >= selectedMinPrice && item.price <= selectedMaxPrice;
      });
      console.log(newFilterData);
      sort(newFilterData);
    }
  };
  const handleResetFilter = () => {
    setSelectedName("All Brands");
    setSelectedSortMethod("None");
    setSelectedMinPrice(67);
    setSelectedMaxPrice(674);
    setFilterDisplay(false);
    setLeft(0);
    setRight(320);
    document.body.style.overflow = "auto";
  };
  const handleRemoveNameFilter = () => {
    setSelectedName("All Brands");
    let newFilterData6 = shopData.filter((item) => {
      return item.price >= selectedMinPrice && item.price <= selectedMaxPrice;
    });
    sort(newFilterData6);
  };
  const handleRemovePriceFilter = () => {
    setSelectedMinPrice(67);
    setSelectedMaxPrice(674);
    if (selectedName === "All Brands") {
      sort(shopData);
    } else {
      let nameFilterData7 = shopData.filter((item) => {
        return item.types.toLowerCase() === selectedName.toLowerCase();
      });
      sort(nameFilterData7);
    }
  };
  const handleRemoveSortFilter = (e) => {
    setSelectedSortMethod("None");
    if (selectedName === "All Brands") {
      let newFilterData5 = filterData.filter((item) => {
        return item.price >= selectedMinPrice && item.price <= selectedMaxPrice;
      });
    } else {
      console.log(selectedName);
      let nameFilterData = filterData.filter((item) => {
        return item.types.toLowerCase() === selectedName.toLowerCase();
      });
      console.log(nameFilterData);
      let newFilterData = nameFilterData.filter((item) => {
        return item.price >= selectedMinPrice && item.price <= selectedMaxPrice;
      });
    }
  };

  return (
    <div className="shopComponent">
      <div className="filterButton" onClick={handleFilterButton}>
        <span>Filters</span>
        <img src={guolv} alt="" />
      </div>
      <div
        className="filterWrapper"
        style={{ display: filterDisplay ? "block" : "none" }}
      >
        <div
          className="filterModal"
          onClick={() => {
            setFilterDisplay(false);
            document.body.style.overflow = "auto";
          }}
        ></div>
        <div className="filterContainer">
          <div className="filterTop">
            <div className="filterTopLeft">
              <div>Brand</div>
              <select onChange={handleFilterNameChange} value={selectedName}>
                <option value="All Brands">All Brands</option>
                <option value="Salt maalat">Salt maalat</option>
                <option value="Sexbomb">Sexbomb</option>
                <option value="Betsin Maalat">Betsin Maalat</option>
                <option value="Yezyow">Yezyow</option>
              </select>
            </div>
            <div className="filterTopRight">
              <div>Sort By</div>
              <select
                name=""
                id=""
                onChange={handleSortByChange}
                value={selectedSortMethod}
              >
                <option value="None">None</option>
                <option value="Name Ascending">Name Ascending A-Z</option>
                <option value="Name Descending">Name Descending Z-A</option>
                <option value="Price HighLow">Price High - Low </option>
                <option value="Price LowHigh">Price Low - High</option>
              </select>
            </div>
          </div>
          <div className="filterMiddle">
            <p>Price Range</p>
            <div className="minMaxPrice">
              <span>{selectedMinPrice}</span> <span>-</span>
              <span>{selectedMaxPrice}</span>
            </div>
            <div className="priceRangeWrapper">
              <div id="slideTool">
                <div id="slideLeft" style={{ width: left + 10 + "px" }}>
                  <div
                    id="slider1"
                    style={{ left: left < 0 ? 0 : left }}
                    onMouseDown={handleMouseDownLeft}
                  >
                    <div
                      id="value1"
                      style={{ display: valueDisplayLeft ? "block" : "none" }}
                    >
                      Value {selectedMinPrice}
                    </div>
                  </div>
                </div>
                <div id="slideRight" style={{ width: right + 10 + "px" }}>
                  <div
                    id="slider2"
                    style={{ left: right }}
                    onMouseDown={handleMouseDownRight}
                  >
                    <div
                      id="value2"
                      style={{ display: valueDisplayRight ? "block" : "none" }}
                    >
                      Value {selectedMaxPrice}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <ul className="priceRangeBottom">
              <li>
                <div className="marks">|</div>
                <div>100</div>
              </li>
              <li>
                <div className="marks">|</div>
                <div>200</div>
              </li>
              <li>
                <div className="marks">|</div>
                <div>300</div>
              </li>
              <li>
                <div className="marks">|</div>
                <div>400</div>
              </li>
              <li>
                <div className="marks">|</div>
                <div>500</div>
              </li>
              <li>
                <div className="marks">|</div>
                <div>600</div>
              </li>
            </ul>
          </div>
          <div className="filterBottom">
            <button onClick={handleApplyFilter}>Apply filters</button>
            <button onClick={handleResetFilter}>Reset filters</button>
          </div>
        </div>
      </div>

      {/* <div
        className="reminderBox"
        style={{ display: boxData ? "block" : "none" }}
      >
        Item added to basket
      </div> */}
      <div className="filterProductWrapper">
        <div className="filterProductContainer">
          <div
            className="filterResult"
            style={{
              display:
                selectedName !== "All Brands" ||
                selectedMaxPrice !== 674 ||
                (selectedMinPrice !== 67 && selectedMinPrice !== 56) ||
                selectedSortMethod !== "None"
                  ? "block"
                  : "none",
            }}
          >
            Found {filterData.length}{" "}
            {filterData.length > 1 ? "products" : "product"}
          </div>
          <div className="filterBy">
            <div
              className="filterContentWrapper"
              style={{
                display: selectedName !== "All Brands" ? "block" : "none",
              }}
            >
              <div className="filterTitle">Brand</div>
              <div className="filterByContent">
                {selectedName}{" "}
                <img onClick={handleRemoveNameFilter} src={close} alt="" />
              </div>
            </div>
            <div
              className="filterContentWrapper"
              style={{
                display:
                  selectedMaxPrice !== 674 ||
                  (selectedMinPrice !== 67 && selectedMinPrice !== 56)
                    ? "block"
                    : "none",
              }}
            >
              <div className="filterTitle">Price Range</div>
              <div className="filterByContent">
                {selectedMinPrice} - {selectedMaxPrice}{" "}
                <img onClick={handleRemovePriceFilter} src={close} alt="" />
              </div>
            </div>
            <div
              className="filterContentWrapper"
              style={{
                display: selectedSortMethod !== "None" ? "block" : "none",
              }}
            >
              <div className="filterTitle">Sort By</div>
              <div className="filterByContent">
                {selectedSortMethod}{" "}
                <img onClick={handleRemoveSortFilter} src={close} alt="" />
              </div>
            </div>
          </div>

          <div className="filterList">
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
                        <div className="shopListDetailTop">
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
        <div className="moreButton">
          <p
            onClick={() => {
              handleMoreData2(moreData);
            }}
          >
            Show More Item
          </p>
        </div>
      </div>

      <div className="shopContainer">
        <div className="shopList">
          {shopData.map((item, index) => {
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
                      <div className="shopListDetailTop">
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
        <div className="moreButton">
          <p
            onClick={() => {
              handleMoreData(moreData);
            }}
          >
            Show More Item
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
