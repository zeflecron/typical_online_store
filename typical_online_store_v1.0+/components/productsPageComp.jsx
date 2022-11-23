import Products from "./products";
import React, { Component } from "react";
import * as ProductData from "../data/db.json";

class ProductsPageComp extends Component {
  // see addToCart for details
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
      // copy current products
      const products = [...this.state.products];

      // get the index value of parameter product
      const index = products.indexOf(product);

      // get current total
      let total = { ...this.state.total };

      // copy only part of the product based on index
      products[index] = { ...product };

      // change stock based on parameter value
      products[index].inStock = products[index].inStock - product.value;

      // reset product value on screen and in state
      products[index].value = 0;

      //add the product cost into the total
      total = this.state.total + product.value * product.price * 100;

      // print out the PREVIOUS state before the new total
      console.log(this.state.total);

      // update the state
      this.setState({ total });
      this.setState({ products });
    }
  };

  render() {
    // redivide total by 100 before displaying it because cents are saved as int
    // int instead of float because JS have .00000003 precision issue
    return (
      <section className="flex flex-col">
        <h2 className="text-center text-2xl text-red-500">
          Counter for total money: ${this.state.total / 100}
        </h2>
        <Products
          products={this.state.products}
          onIncrement={this.handleIncrement}
          onDecrement={this.handleDecrement}
          addToCart={this.addToCart}
        />
      </section>
    );
  }
}

export default ProductsPageComp;
