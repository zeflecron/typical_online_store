import React, { Component } from "react";
import ProductCounter from "./productCounter";
import Image from "next/image";
import products_img from "../public";

class Products extends Component {
  render() {
    const { products, onDecrement, onIncrement, addToCart } = this.props;

    return (
      <div className="mx-auto m-2 p-2 grid grid-cols-1 gap-10 content-start md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white mx-auto shadow-xl border-4 border-gray-400 w-80"
          >
            <Image
              src={products_img[product.image]}
              alt={product.altImage}
              layout="responsive"
              className="object-cover w-full rounded-t-lg"
            />
            <div className="rounded-b-lg">
              <div className="pl-5 text-lg font-bold border-b-2 border-t-2 border-gray-400">
                <p>{product.name}</p>
                <p>Price: ${product.price}</p>
                <p>Available: {this.formatInStock(product.inStock)}</p>
              </div>
              <ProductCounter
                onIncrement={onIncrement}
                onDecrement={onDecrement}
                addToCart={addToCart}
                product={product}
              ></ProductCounter>
            </div>
          </div>
        ))}
      </div>
    );
  }

  formatInStock = (productInStock) => {
    return productInStock === 0 ? "0 (Out of Stock)" : productInStock;
  };
}

export default Products;
