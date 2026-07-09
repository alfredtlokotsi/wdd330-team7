// src/js/product.js
import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  console.log("Adding product to cart:", product);
  
  // Get the existing cart (or an empty array if nothing exists)
  let cart = getLocalStorage("so-cart") || [];
  console.log("Current cart before adding:", cart);
  
  // Add the new product to the cart
  cart.push(product);
  console.log("Cart after adding:", cart);
  
  // Save the updated cart back to localStorage
  setLocalStorage("so-cart", cart);
  console.log("Cart saved to localStorage");
  
  // Show a quick notification
  alert(`${product.Name} added to cart! (${cart.length} items total)`);
}

// add to cart button event handler
async function addToCartHandler(e) {
  console.log("Add to Cart button clicked!");
  console.log("Button element:", e.target);
  console.log("Product ID from button:", e.target.dataset.id);
  
  if (!e.target.dataset.id) {
    console.error("No data-id found on button!");
    alert("Error: Product ID not found");
    return;
  }
  
  try {
    const product = await dataSource.findProductById(e.target.dataset.id);
    console.log("Product found:", product);
    addProductToCart(product);
  } catch (error) {
    console.error("Error finding product:", error);
    alert("Error adding product to cart. Please try again.");
  }
}

// Wait for DOM to load before adding event listener
document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM loaded, looking for addToCart button");
  const button = document.getElementById("addToCart");
  console.log("Add to Cart button found:", button);
  
  if (button) {
    button.addEventListener("click", addToCartHandler);
    console.log("Event listener added to button");
  } else {
    console.error("Could not find element with id 'addToCart'");
  }
});