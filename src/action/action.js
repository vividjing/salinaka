export const addToCart = (productId) => ({
  type: "addToCart",
  payload: { productId },
});

export const removeFromCart = (itemId, itemSize, itemColor) => ({
  type: "removeFromCart",
  payload: { itemId, itemSize, itemColor },
});

export const removeAllItems = () => ({
  type: "removeAllItems",
});

export const increaseQuantity = (cartItemId) => ({
  type: "increaseQuantity",
  payload: cartItemId,
});

export const decreaseQuantity = (cartItemId) => ({
  type: "decreaseQuantity",
  payload: cartItemId,
});

export const colorSelected = (colorOne) => ({
  type: "colorSelected",
  payload: colorOne,
});

export const sizeSelected = (sizeOne) => ({
  type: "sizeSelected",
  payload: sizeOne,
});

export const showMoreProduct = (moreData) => ({
  type: "showMoreProduct",
  payload: moreData,
});

export const searchProduct = (keyword) => ({
  type: "searchProduct",
  payload: keyword,
});

export const searchBoxUnshow = () => ({
  type: "searchBoxUnshow",
  payload: false,
});

export const changeReminderBox = () => ({
  type: "changeReminderBox",
  payload: false,
});
