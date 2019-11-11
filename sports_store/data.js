const faker = require("faker");

module.exports = function fakeData() {
  const products = [];
  const categories = ["Watersports", "Soccer", "Chess", "Running"];
  faker.seed(100);
  for (let i = 1; i <= 503; i++) {
    const category = faker.helpers.randomize(categories);
    products.push({
      id: i,
      name: faker.commerce.productName(),
      category: category,
      description: `${category}: ${faker.lorem.sentence(3)}`,
      price: Number(faker.commerce.price())
    })
  }

  return {
    categories: ['Watersports', 'Soccer', 'Chess'],
    products,
    orders: [],
  };
};
