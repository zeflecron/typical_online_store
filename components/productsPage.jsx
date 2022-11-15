import NavBar from "./navbar";
import Products from "./products";
import React, { Component } from "react";
import * as ProductData from "../data/db.json";

class ProductsPage extends Component {
  state = ProductData;

  handleIncrement = (product) => {
    const products = [...this.state.products];
    const index = products.indexOf(product);
    products[index] = { ...product };
    if (products[index].value !== products[index].inStock) {
      products[index].value++;
    }
    this.setState({ products });
  };

  handleDecrement = (product) => {
    const products = [...this.state.products];
    const index = products.indexOf(product);
    products[index] = { ...product };
    if (products[index].value !== 0) {
      products[index].value--;
    }
    this.setState({ products });
  };

  addToCart = (product) => {
    if (product.value !== 0) {
      const products = [...this.state.products];
      const index = products.indexOf(product);
      let total = { ...this.state.total };
      products[index] = { ...product };
      products[index].inStock = products[index].inStock - product.value;
      products[index].value = 0;
      total = this.state.total + product.value * product.price * 100;
      console.log(this.state.total);
      this.setState({ total });
      this.setState({ products });
    }
  };

  render() {
    // redivide total by 100 before displaying it because cents are saved as int
    // int instead of float because JS have .00000003 precision issue
    return (
      <div>
        <NavBar totalProducts={this.state.total / 100} />
        <main>
          <section className="flex flex-col">
            <Products
              products={this.state.products}
              onIncrement={this.handleIncrement}
              onDecrement={this.handleDecrement}
              addToCart={this.addToCart}
            />
          </section>
        </main>
      </div>
    );
  }
}

export default ProductsPage;
