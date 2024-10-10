export const cart = [];

export function addToCart(productId) {
  let matchingItem;

  cart.map((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId,
      quantity: 1,
    });
  }
}

export function updateCartQuantity() {
  let cartQuantities = 0;

  cart.forEach((cartItem) => {
    cartQuantities += cartItem.quantity;
  });

  document.querySelector(".js-cart-quantity").innerHTML = cartQuantities;
}
