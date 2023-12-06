import {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  colorSelected,
  sizeSelected,
  searchProduct,
} from "../action/action";

import ShopData from "../Component/Shop/ShopData";
import { allProuductData } from "../Component/Data/Data";

let initialData = ShopData();
let allData = allProuductData();

const product = {
  initialData,
  cartItems: [],
  color: "transparent",
  size: "0",
  cartItemId: "",
  reminderBox: false,
  allData,
  filterData: [],
  searchShow: false,
  keyword: "",
};

const cartReducer = (state = product, action) => {
  switch (action.type) {
    case "addToCart":
      state.reminderBox = true;
      const newproduct = {
        ...state.allData.find((item) => item.id === action.payload.productId),
      };
      const time = Date.parse(new Date());

      let selectedProduct = {
        ...newproduct,
        color: state.color,
        size: state.size,
        cartItemId: time,
      };

      const { id, name, price, src, color, size, cartItemId } = selectedProduct;
      const existingItem = state.cartItems.find(
        (item) => item.id === id && item.color === color && item.size === size
      );

      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(
            (item) =>
              (item.id = id ? { ...item, quantity: item.quantity + 1 } : item)
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [
            ...state.cartItems,
            {
              id,
              name,
              price,
              src,
              quantity: 1,
              size,
              color,
              cartItemId,
            },
          ],
        };
      }
    case "removeFromCart":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) =>
            (item.id !== action.payload.itemId) |
            (item.size !== action.payload.itemSize) |
            (item.color !== action.payload.itemColor)
        ),
      };
    case "removeAllItems":
      return {
        ...state,
        cartItems: [],
      };
    case "increaseQuantity":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.cartItemId === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    case "decreaseQuantity":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.cartItemId === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };
    case "colorSelected":
      console.log(action.payload);
      return {
        ...state,
        color: (state.color = action.payload),
      };
    case "sizeSelected":
      return {
        ...state,
        size: (state.size = action.payload),
      };

    case "showMoreProduct":
      return {
        ...state,
        initialData: [...initialData, ...action.payload],
      };
    case "searchProduct":
      const filterData = state.allData.filter((item) =>
        item.name.toLowerCase().includes(action.payload.toLowerCase())
      );
      state.searchShow = true;

      return {
        ...state,
        filterData,
        keyword: action.payload,
      };
    case "searchBoxUnshow":
      let searchShow = action.payload;
      return {
        ...state,
        searchShow,
      };

    default:
      return state;
  }
};

export default cartReducer;
