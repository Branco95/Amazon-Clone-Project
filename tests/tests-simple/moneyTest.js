import { formatCurrency } from "../scripts/utils/money.js";

console.log("Test suite : formatCurrency()");

// Test Case 1
console.log("converts cents into dollars");
if (formatCurrency(2095) === "20.95") {
  console.log("passed");
} else {
  console.log("failed");
}

// Test Case 2
console.log("works with zero");
if (formatCurrency(0) === "0.00") {
  console.log("passed");
} else {
  console.log("failed");
}

// Test Case 3
console.log("rounds up to the nearest cent");
if (formatCurrency(2000.5) === "20.01") {
  console.log("passed");
} else {
  console.log("failed");
}

// Test Case 4
console.log("rounds down to the nearest cent");
if (formatCurrency(2000.4) === "20.00") {
  console.log("passed");
} else {
  console.log("failed");
}
