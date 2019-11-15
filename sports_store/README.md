# Sports store app

Taking notes from:

```
Pro React 16 - Adam Freeman
ISBN-13 (pbk): 978-1-4842-4450-0
https://doi.org/10.1007/978-1-4842-4451-7
ISBN-13 (electronic): 978-1-4842-4451-7
```

The book's code is [hosted on GitHub](https://github.com/Apress/pro-react-16).

## Notes
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).  
**Warning**: it's not a good monorepo, take it just as a book's example refactored a bit to reflect the latest updates with the libs used.

It's composed of three parts:

- a backend with some REST endpoints, which runs with [json-server](https://github.com/typicode/json-server)
- a React app (in `src` directory)
- a GraphQL endpoint using Apollo's stuff.

### GraphQL

```graphql
query getProdById($id: ID!) {
  product(id: $id) {
    id
    name
    description
    category
    price
  }
}

query getProds($cat: String, $sort: String, $page: Int, $pageSize: Int) {
  products(category: $cat, sort: $sort, page: $page, pageSize: $pageSize) {
    totalSize
    products(sort: $sort, page: $page, pageSize: $pageSize) {
      id
      name
      category
      description
      price
    }
  }
}

{
  categories
}

query getOrders($onlyUnshipped: Boolean) {
  orders(onlyUnshipped: $onlyUnshipped) {
    totalSize
    orders(sort: "name") {
      id
      name
      email
      shipped
      products {
        quantity
        product {
          id
          name
          category
          price
        }
      }
    }
  }
}

mutation insert($product: productStore) {
  storeProduct(product: $product) {
    id
    name
  }
}

mutation update($product: productUpdate) {
  updateProduct(product: $product) {
    id
    name
    price
    category
    description
  }
}

mutation delete($id: ID!) {
  deleteProduct(id: $id) {
    name
  }
}

mutation shipOrder($id: ID!, $shipped: Boolean!) {
  shipOrder(id: $id, shipped: $shipped) {
    id
    name
  }
}
```
