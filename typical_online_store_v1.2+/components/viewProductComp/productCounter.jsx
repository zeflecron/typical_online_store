import React, { Component } from "react";

class ProductCounter extends Component {
  formatButton = (productInStock) => {
    if (productInStock === 0) {
      return "m-2 bg-teal-500 text-white font-bold py-2 px-4 mb-3 rounded opacity-50 cursor-not-allowed";
    } else {
      return "m-2 bg-teal-500 hover:bg-teal-400 text-white font-bold py-2 px-4 border-b-4 border-teal-700 hover:border-teal-500 rounded";
    }
  };

  render() {
    const { product, val_ctr, onIncrement, onDecrement, addToCart } =
      this.props;
    return (
      <div className="flex items-center ">
        <button
          onClick={() => onDecrement(product)}
          className={this.formatButton(product.inStock)}
        >
          -
        </button>
        <span className="text-gray-800 font-bold text-lg py-2 px-4">
          {val_ctr}
        </span>
        <button
          onClick={() => onIncrement(product)}
          className={this.formatButton(product.inStock)}
        >
          +
        </button>
        <button
          onClick={() => addToCart(product)}
          className={this.formatButton(product.inStock)}
        >
          Add to Cart
        </button>
      </div>
    );
  }
}

export default ProductCounter;
