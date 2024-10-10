export let cart = JSON.parse(localStorage.getItem("cart")) || [];
let timeOutIds = {}; //object to store timeOutIds for each product

export function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId, newQuantity) {
  let matchingItem;
  newQuantity = Number(newQuantity);
  console.log(newQuantity);
  cart.map((cartItem) => {
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
    });
  }

  if (timeOutIds[productId]) {
    clearTimeout(timeOutIds[productId]); //to clear the existant timeOut to re-run a new timeOut
  }

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
