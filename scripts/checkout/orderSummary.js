import { cart, updateDeliveryOption } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { removeFromCart, updateCheckoutQuantity } from "../../data/cart.js";
import {
  deliveryOptions,
  getDeliveryOption,
} from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { getDate } from "../utils/date.js";
import { saveToStorage } from "../../data/cart.js";

export function renderOrderSummary() {
  let cartSummaryHTML = "";
  updateCheckoutQuantity();
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const dateString = getDate(deliveryOption.deliveryDays);

    cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container js-cart-item-container-${
      matchingProduct.id
    }">
            <div class="delivery-date">Delivery date: ${dateString}</div>

            <div class="cart-item-details-grid">
              <img
                class="product-image"
                src="${matchingProduct.image}"
              />

              <div class="cart-item-details">
                <div class="product-name">
                ${matchingProduct.name}
                </div>
                <div class="product-price">${matchingProduct.getPrice()}</div>
                <div class="product-quantity js-product-quantity-${
                  matchingProduct.id
                }">
                  <span> Quantity: <span class="quantity-label js-quantity-input-update-${
                    matchingProduct.id
                  }">${cartItem.quantity}</span> </span>
                  <span class="update-quantity-link link-primary js-update-link js-update-link-${
                    matchingProduct.id
                  }" data-product-id=${matchingProduct.id}>
                    Update</span>
                  <span class="delete-quantity-link link-primary js-delete-link
                  js-delete-link-${matchingProduct.id}" data-product-id=${
      matchingProduct.id
    }>
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matchingProduct, cartItem)}
              </div>
            </div>
          </div>
    `;
  });

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = "";

    deliveryOptions.forEach((deliveryOption) => {
      const dateString = getDate(deliveryOption.deliveryDays);

      //   console.log(deliveryOption);

      const priceString =
        deliveryOption.priceCents === 0
          ? "FREE"
          : `€${formatCurrency(deliveryOption.priceCents)} -`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `
        <div class="delivery-option js-delivery-option" 
        data-product-id="${matchingProduct.id}" data-delivery-option-id="${
        deliveryOption.id
      }">
                  <input
                    type="radio"
                    ${isChecked ? "checked" : ""}
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}"
                  />
                  <div>
                    <div class="delivery-option-date">${dateString}</div>
                    <div class="delivery-option-price">${priceString} Shipping</div>
                  </div>
                </div>
        `;
    });
    return html;
  }

  document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

  console.log(cartSummaryHTML);

  function handleDelete(event) {
    console.log(event);
    const productId = event.currentTarget.dataset.productId;
    removeFromCart(productId);

    // Getting the specifica elemente/container to be removed
    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );

    container.remove();
    updateCheckoutQuantity();
    renderPaymentSummary();
  }

  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", handleDelete);
  });

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      console.log("clicked");
      console.log(element.dataset);
      const { productId, deliveryOptionId } = element.dataset;

      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });

  document.querySelectorAll(".js-update-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;

      const updateText = document.querySelector(
        `.js-update-link-${productId}`
      ).innerText;

      if (updateText === "Update") {
        let cancel = document.querySelector(`.js-delete-link-${productId}`);

        cancel.removeEventListener("click", handleDelete);
        cancel.textContent = "Cancel";
        cancel.addEventListener("click", () => {
          renderOrderSummary();
        });

        let oldSpan = document.querySelector(
          `.js-quantity-input-update-${productId}`
        );
        const number = oldSpan.innerText;
        let newSpan = document.createElement("input");
        newSpan.type = "number";
        newSpan.min = 0;
        newSpan.value = number;
        newSpan.className = `update-input js-update-input js-update-input-${productId}`;
        oldSpan.parentNode.replaceChild(newSpan, oldSpan);

        oldSpan = document.querySelector(`.js-update-link-${productId}`);

        newSpan = document.createElement("span");
        newSpan.className = "update-quantity-link link-primary js-update-input";
        newSpan.textContent = "Confirm";
        oldSpan.parentNode.replaceChild(newSpan, oldSpan);

        newSpan.addEventListener("click", () => {
          const input = document.querySelector(`.js-update-input-${productId}`);

          cart.forEach((product) => {
            console.log(product);
            if (product.productId === productId) {
              console.log(product.quantity);
              product.quantity = Number(input.value);
              console.log(product.quantity);
            }
          });
          saveToStorage();
          updateCheckoutQuantity();
          renderPaymentSummary();
          renderOrderSummary();
        });
      }

      updateCheckoutQuantity();
      renderPaymentSummary();
    });
  });
}
