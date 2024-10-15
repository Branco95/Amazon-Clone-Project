import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import "../data/cart-oop.js";

Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  }),
]).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
});

// new Promise((resolve) => {
//   console.log("start promise");
//   loadProducts(() => {
//     console.log("finished loading");
//     resolve();
//   });
// }).then(() => {
//   console.log("next step");
// });

//Using callback
// loadProducts(() => {
//   loadCart(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
//   });
// });

//using Promise
// new Promise((resolve) => {
//   loadProducts(() => {
//     resolve("value1");
//   });
// })
//   .then((value) => {
//     console.log(value);
//     return new Promise((resolve) => {
//       loadCart(() => {
//         resolve();
//       });
//     });
//   })
//   .then(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
//   });

//best way to run multiple promises at the same time
// Promise.all([
//   new Promise((resolve) => {
//     loadProducts(() => {
//       resolve("value1");
//     });
//   }),
//   new Promise((resolve) => {
//     loadCart(() => {
//       resolve();
//     });
//   }),
// ]).then(() => {
//   renderOrderSummary();
//   renderPaymentSummary();
// });
