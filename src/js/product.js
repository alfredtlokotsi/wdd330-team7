// src/js/product.js
import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

async function addToCartHandler(event) {
  // Get the button that was clicked
  const button = event?.target || document.getElementById("addToCart");
  
  if (!button) {
    console.error("Add to Cart button not found.");
    alert("Error: Button not found");
    return;
  }

  const productId = button.dataset.id;

  if (!productId) {
    alert("No product ID found on button.");
    console.error("Missing data-id attribute.");
    return;
  }

  try {
    console.log(`Attempting to add product ${productId} to cart...`);
    
    const product = await dataSource.findProductById(productId);
    console.log('Product found, adding to cart:', product);

    // Get existing cart - FIX: Ensure it's always an array
    let cart = getLocalStorage("so-cart");
    
    // Check if cart is actually an array, if not, initialize as empty array
    if (!Array.isArray(cart)) {
      console.warn('Cart was not an array, resetting to empty array. Value was:', cart);
      cart = [];
    }
    
    console.log(`Current cart has ${cart.length} items`);

    // Add product
    cart.push(product);
    console.log(`Cart now has ${cart.length} items`);

    // Save
    setLocalStorage("so-cart", cart);
    console.log('Cart saved successfully!');

    // Show success message on the page
    const statusEl = document.getElementById('status');
    if (statusEl) {
      statusEl.textContent = `✅ ${product.Name} added to cart! (${cart.length} items total)`;
      statusEl.style.display = 'block';
      statusEl.style.background = '#4CAF50';
      statusEl.style.color = 'white';
      statusEl.style.padding = '10px';
      statusEl.style.borderRadius = '4px';
      setTimeout(() => {
        statusEl.style.display = 'none';
      }, 3000);
    } else {
      alert(`✅ ${product.Name} added to cart! (${cart.length} items total)`);
    }

  } catch (err) {
    console.error('Error in addToCartHandler:', err);
    const statusEl = document.getElementById('status');
    if (statusEl) {
      statusEl.textContent = `❌ Error: ${err.message}`;
      statusEl.style.display = 'block';
      statusEl.style.background = '#f44336';
      statusEl.style.color = 'white';
      statusEl.style.padding = '10px';
      statusEl.style.borderRadius = '4px';
    } else {
      alert(`❌ Unable to add product to cart: ${err.message}`);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded, looking for addToCart button...");
  const button = document.getElementById("addToCart");
  
  if (button) {
    console.log("Button found, adding event listener");
    button.addEventListener("click", addToCartHandler);
  } else {
    console.warn("Add to Cart button not found on this page");
  }
});