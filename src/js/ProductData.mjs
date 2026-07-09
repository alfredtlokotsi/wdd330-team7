// src/js/ProductData.mjs
export default class ProductData {
  constructor(category) {
    this.category = category;
  }

  async findProductById(id) {
    try {
      console.log(`Looking for product with ID: ${id}`);
      
      // Use absolute path from root
      const response = await fetch('/json/tents.json');
      
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
      }
      
      const products = await response.json();
      console.log(`Loaded ${products.length} products from JSON`);
      
      const product = products.find(p => p.Id === id);
      
      if (product) {
        console.log('Product found:', product);
        return product;
      }
      
      throw new Error(`Product with ID "${id}" not found`);
      
    } catch (error) {
      console.error('Error in findProductById:', error);
      throw error;
    }
  }
}