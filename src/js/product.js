import { setLocalStorage, getCart, saveCart } from "./utils.mjs";  // Changed this line
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  const cart = getCart();  // Get existing cart array
  cart.push(product);      // Add new product to array
  saveCart(cart);          // Save the array back
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);