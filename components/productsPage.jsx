import NavBar from "./navbar";
import Products from "./products";
import React, { Component } from "react";

class ProductsPage extends Component {
  state = {
    products: [
      {
        id: 1,
        name: "Apple",
        image: "bad_apple.png",
        altImage: "apple",
        inStock: 100,
        price: 4,
        value: 0,
      },
      {
        id: 2,
        name: "Banana",
        image: "bad_banana.png",
        altImage: "banana",
        inStock: 22,
        price: 3,
        value: 0,
      },
      {
        id: 3,
        name: "Orange",
        image: "bad_orange.png",
        altImage: "orange",
        inStock: 30,
        price: 7,
        value: 0,
      },
      {
        id: 4,
        name: "Cucumber",
        image: "bad_cucumber.png",
        altImage: "cucumber",
        inStock: 71,
        price: 2.5,
        value: 0,
      },
      {
        id: 5,
        name: "Cherry",
        image: "bad_cherry.png",
        altImage: "cherry",
        inStock: 4,
        price: 10,
        value: 0,
      },
      {
        id: 6,
        name: "Carrot",
        image: "bad_carrot.png",
        altImage: "carrot",
        inStock: 10000000,
        price: 2,
        value: 0,
      },
      {
        id: 7,
        name: "Corn",
        image: "bad_corn.png",
        altImage: "corn",
        inStock: 0,
        price: 7,
        value: 0,
      },
      {
        id: 8,
        name: "Lemon",
        image: "bad_lemon.png",
        altImage: "lemon",
        inStock: 11,
        price: 13.31,
        value: 0,
      },
    ],
    total: 0,
  };

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

      // save money total in int as cents instead of decimal
      // makes it more precise than trying to fix the .0000000003 issue
      total = this.state.total + product.value * product.price * 100;
      console.log(this.state.total);
      this.setState({ total });
      this.setState({ products });
    }
  };

  render() {
    // then redivide the total by 100 before displaying it
    return (
      <React.Fragment>
        <NavBar totalProducts={this.state.total / 100} />
        <section className="flex flex-col">
          <Products
            products={this.state.products}
            onIncrement={this.handleIncrement}
            onDecrement={this.handleDecrement}
            addToCart={this.addToCart}
          />
        </section>
      </React.Fragment>
    );
  }
}

export default ProductsPage;
