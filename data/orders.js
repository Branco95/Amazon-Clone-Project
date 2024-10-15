export const orders = JSON.parse(localStorage.getItem("orders")) || [];

export function addOrder(order) {
  orders.unshift(order); //set the order in the front of the array
  saveToStorage();
  console.log(orders);
}

function saveToStorage() {
  localStorage.setItem("orders", JSON.stringify(orders));
}
