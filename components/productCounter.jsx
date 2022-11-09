import React, { Component } from "react";

class ProductCounter extends Component {
  render() {
    return (
      <div className="flex items-center justify-center">
        {this.props.children}
        <button
          onClick={() => this.props.onDecrement(this.props.product)}
          className={this.formatButton(this.props.product.inStock)}
        >
          -
        </button>
        <span className="text-gray-800 font-bold text-lg py-2 px-4">
          {this.props.product.value}
        </span>
        <button
          onClick={() => this.props.onIncrement(this.props.product)}
          className={this.formatButton(this.props.product.inStock)}
        >
          +
        </button>
        <button
          onClick={() => this.props.addToCart(this.props.product)}
          className={this.formatButton(this.props.product.inStock)}
        >
          Add to Cart
        </button>
      </div>
    );
  }

  formatButton = (productInStock) => {
    if (productInStock === 0) {
      return "m-2 bg-teal-500 text-white font-bold py-2 px-4 mb-3 rounded opacity-50 cursor-not-allowed";
    } else {
      return "m-2 bg-teal-500 hover:bg-teal-400 text-white font-bold py-2 px-4 border-b-4 border-teal-700 hover:border-teal-500 rounded";
    }
  };
}

export default ProductCounter;
