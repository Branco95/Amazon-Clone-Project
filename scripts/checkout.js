import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import "../data/cart-oop.js";

async function loadPage() {
  try {
    //throw 'error1'

    //await will wait that loadProductsFetch return his promise, to move one to the next line of this function
    await loadProductsFetch();

    const value = await new Promise((resolve, reject) => {
      //throw 'error2'
      loadCart(() => {
        resolve();
        //reject('error3')
      });
    });
  } catch (error) {
    console.log("Unexpected Error. Please try again later.");
  }

  renderOrderSummary();
  renderPaymentSummary();
}
loadPage();

// Promise.all([
//   loadProductsFetch(),
//   new Promise((resolve) => {
//     loadCart(() => {
//       resolve();
//     });
//   }),
// ]).then(() => {
//   renderOrderSummary();
//   renderPaymentSummary();
// });

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
