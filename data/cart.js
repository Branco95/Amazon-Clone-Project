export let cart;
let timeOutIds = {}; //object to store timeOutIds for each product

loadFromStorage();

export function getCartTotalQuantity() {
  let quantity = 0;

  cart.forEach((cartItem) => {
    quantity += cartItem.quantity;
  });

  return quantity;
}

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem("cart")) || [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      deliveryOptionId: "1",
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 2,
      deliveryOptionId: "2",
    },
  ];
}

export function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId, newQuantity = 1) {
  console.log(productId);
  console.log(newQuantity);
  let matchingItem; 
  newQuantity = Number(newQuantity);

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += newQuantity;
  } else {
    cart.push({
      productId,
      quantity: newQuantity,
      deliveryOptionId: "1",
    });
  }

  if (timeOutIds[productId]) {
    clearTimeout(timeOutIds[productId]); //to clear the existant timeOut to re-run a new timeOut
  }
  console.log("entrei");
  document.querySelector(`.js-add-checkmark-${productId}`).style.opacity = "1";

  timeOutIds[productId] = setTimeout(() => {
    document.querySelector(`.js-add-checkmark-${productId}`).style.opacity =
      "0";
  }, 2000);

  saveToStorage();
}

export function updateCartQuantity() {
  let cartQuantities = 0;

  cart.forEach((cartItem) => {
    cartQuantities += cartItem.quantity;
  });

  console.log(cartQuantities);

  document.querySelector(".js-cart-quantity").innerHTML = cartQuantities;
}

export function updateCheckoutQuantity() {
  let cartQuantities = 0;

  cart.forEach((cartItem) => {
    cartQuantities += cartItem.quantity;
  });

  console.log(cartQuantities);

  document.querySelector(
    ".js-checkout-quantity"
  ).innerHTML = `${cartQuantities} items`;
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      // matchingItem = cartItem;
      cartItem.deliveryOptionId = deliveryOptionId;
    }
  });

  console.log(matchingItem);

  // matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();

  console.log(cart);
}
