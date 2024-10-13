const cart = {
  cartItems: undefined,
  timeOutIds: {}, //object to store timeOutIds for each product

  loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem("cart-oop")) || [
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
  },
  saveToStorage() {
    localStorage.setItem("cart-oop", JSON.stringify(this.cartItems));
  },
  updateCartQuantity() {
    let cartQuantities = 0;

    this.cartItems.forEach((cartItem) => {
      cartQuantities += cartItem.quantity;
    });

    console.log(cartQuantities);

    document.querySelector(".js-cart-quantity").innerHTML = cartQuantities;
  },
  addToCart(productId, newQuantity = 1) {
    console.log(productId);
    console.log(newQuantity);
    let matchingItem;
    newQuantity = Number(newQuantity);

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += newQuantity;
    } else {
      this.cartItems.push({
        productId,
        quantity: newQuantity,
        deliveryOptionId: "1",
      });
    }

    if (this.timeOutIds[productId]) {
      clearTimeout(this.timeOutIds[productId]); //to clear the existant timeOut to re-run a new timeOut
    }
    console.log("entrei");
    const element = document.querySelector(`.js-add-checkmark-${productId}`);
    if (element) {
      element.style.opacity = "1";
      this.timeOutIds[productId] = setTimeout(() => {
        element.style.opacity = "0";
      }, 2000);
    }
    this.saveToStorage();
  },
  getCartTotalQuantity() {
    let quantity = 0;

    this.cartItems.forEach((cartItem) => {
      quantity += cartItem.quantity;
    });

    return quantity;
  },
  updateCheckoutQuantity() {
    let cartQuantities = 0;

    this.cartItems.forEach((cartItem) => {
      cartQuantities += cartItem.quantity;
    });

    console.log(cartQuantities);

    document.querySelector(
      ".js-checkout-quantity"
    ).innerHTML = `${cartQuantities} items`;
  },
  removeFromCart(productId) {
    const newCart = [];

    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });

    this.cartItems = newCart;

    this.saveToStorage();
  },
  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        // matchingItem = cartItem;
        cartItem.deliveryOptionId = deliveryOptionId;
      }
    });

    console.log(matchingItem);

    // matchingItem.deliveryOptionId = deliveryOptionId;

    this.saveToStorage();

    console.log(cart);
  },
};

cart.loadFromStorage();

// cart.addToCart("83d4ca15-0f35-48f5-b7a3-1ea210004f2e");

console.log(cart);

