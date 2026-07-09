// ProductData.mjs
export default class ProductData {
  constructor(category) {
    this.category = category;
  }

  async findProductById(id) {
    try {
      // Try to find in tents.json first
      const response = await fetch('../json/tents.json');
      if (!response.ok) throw new Error('Failed to fetch products');
      const products = await response.json();
      
      const product = products.find(p => p.Id === id);
      if (product) {
        console.log('Product found in tents.json:', product);
        return product;
      }
      
      throw new Error(`Product with ID ${id} not found`);
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }
}