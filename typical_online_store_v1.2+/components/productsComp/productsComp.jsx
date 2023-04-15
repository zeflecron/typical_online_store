import React, { Component } from "react";
import Image from "next/image";
import Router from "next/router";

import products_img from "../../public";

class ProductsComp extends Component {
  // see addToCart for better details on all the functions
  constructor(props) {
    super(props);
    this.state = { products: this.props.products };
  }

  viewProduct = (product) => {
    Router.push({ pathname: "/viewProduct", query: { productId: product.id } });
  };

  formatInStock = (productInStock) => {
    return productInStock === 0 ? "0 (Out of Stock)" : productInStock;
  };

  render() {
    return (
      <>
        <section className="flex flex-col min-h-screen">
          <div className="mx-auto m-2 p-2 grid grid-cols-1 gap-10 content-start md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {this.state.products.map((product) => (
              <div
                key={product.id}
                className="bg-white mx-auto w-80 border-gray-400 cursor-pointer hover:shadow-xl"
                onClick={() => this.viewProduct(product)}
              >
                <Image
                  src={products_img[product.image]}
                  alt={product.altImage}
                  layout="responsive"
                  className="object-cover w-full rounded-t-lg"
                />
                <div className="rounded-b-lg">
                  <div className="pl-5 text-lg font-bold border-t-2 border-gray-400">
                    <p>{product.name}</p>
                    <p>Price: ${product.price}</p>
                    <p>Available: {this.formatInStock(product.inStock)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </>
    );
  }
}

export default ProductsComp;
