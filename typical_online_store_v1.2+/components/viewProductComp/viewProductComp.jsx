import React, { Component } from "react";
import Image from "next/image";

import products_img from "../../public";
import ProductCounter from "./productCounter";
import { globalHandler } from "../../pages/api/globalHandler";
import { productHandler } from "../../pages/api/productHandler";
import { cartHandler } from "../../pages/api/cartHandler";

class ViewProductComp extends Component {
  // see addToCart for better details on all the functions
  constructor(props) {
    super(props);
    this.state = {
      product: this.props.product,
      valCtr: 0,
    };
  }

  // use this part instead of using gerServerSideProps
  // to transform it into a CSR site
  // componentDidMount() {
  //   console.log(this.state);
  // }

  handleIncrement = (product) => {
    if (this.state.valCtr !== product.inStock) {
      this.setState({ valCtr: this.state.valCtr + 1 });
    }
  };

  handleDecrement = () => {
    if (this.state.valCtr !== 0) {
      this.setState({ valCtr: this.state.valCtr - 1 });
    }
  };

  addToCart = async (product) => {
    if (this.state.valCtr !== 0) {
      let globalValues = await globalHandler("GET");
      let cartData = await cartHandler("GET");
      let cartModifyId = -1;
      let data = {
        id: globalValues.cartCtr,
        productid: product.id,
        quantity: this.state.valCtr,
      };

      // checks if product already exists in cart
      for (let i = 0; i < cartData.length; i++) {
        if (cartData[i].productid === data.productid) {
          cartModifyId = cartData[i].id;
        }
      }

      // if exists just add the quantity and using "PUT"
      if (cartModifyId !== -1) {
        let specificCartData = await cartHandler("GET", "None", cartModifyId);
        data.quantity = data.quantity + specificCartData.quantity;
        await cartHandler("PUT", data, cartModifyId);
      } else {
        await cartHandler("POST", data);
        globalValues.cartCtr = globalValues.cartCtr + 1;
        await globalHandler("PUT", globalValues);
      }

      // update global counters, product state on screen, and the product in database

      product.inStock = product.inStock - this.state.valCtr;
      this.state.valCtr = 0;
      this.setState({ product });
      await productHandler("PUT", this.state.product, product.id);
    }
  };

  // AN ATTEMPT TO USE PROMISES SO DATABASE WILL NOT BE UNSTABLE
  //   if (this.state.valCtr !== 0) {
  //     let globalValues = await globalHandler("GET");
  //     let cartData = await cartHandler("GET");
  //     let cartModifyId = -1;
  //     let data = {
  //       id: globalValues.cartCtr,
  //       productid: product.id,
  //       quantity: this.state.valCtr,
  //     };
  //     let cartPromise;

  //     // checks if product already exists in cart
  //     for (let i = 0; i < cartData.length; i++) {
  //       if (cartData[i].productid === data.productid) {
  //         cartModifyId = cartData[i].id;
  //       }
  //     }

  //     // if exists just add the quantity and using "PUT"
  //     if (cartModifyId !== -1) {
  //       let specificCartData = await cartHandler("GET", "None", cartModifyId);
  //       data.quantity = data.quantity + specificCartData.quantity;
  //       cartPromise = new Promise((resolve, reject) => {
  //         cartHandler("PUT", data, cartModifyId)
  //           .then((response) => {
  //             if (response.ok) {
  //               resolve(response);
  //             } else {
  //               reject(
  //                 new Error(
  //                   `Failed to submit data to cart. Status: ${response.status}`
  //                 )
  //               );
  //             }
  //           })
  //           .catch((err) => reject(err));
  //       });
  //     } else {
  //       cartPromise = new Promise((resolve, reject) => {
  //         cartHandler("POST", data)
  //           .then((response) => {
  //             if (response.ok) {
  //               resolve(response);
  //             } else {
  //               reject(
  //                 new Error(
  //                   `Failed to submit data to cart. Status: ${response.status}`
  //                 )
  //               );
  //             }
  //           })
  //           .catch((err) => reject(err));
  //       });
  //       globalValues.cartCtr = globalValues.cartCtr + 1;
  //       await globalHandler("PUT", globalValues);
  //     }

  //     // update global counters, product state on screen, and the product in database

  //     product.inStock = product.inStock - this.state.valCtr;
  //     this.state.valCtr = 0;
  //     this.setState({ product });

  //     const productPromise = new Promise((resolve, reject) => {
  //       productHandler("PUT", this.state.product, product.id)
  //         .then((res) => resolve(res))
  //         .catch((err) => reject(err));
  //     });
  //     try {
  //       await Promise.all([cartPromise, productPromise]);
  //     } catch (err) {
  //       console.log("there is an error");
  //     }
  //   }
  // };

  render() {
    return (
      <>
        <section className="grid grid-cols-1 m-8 bg-white shadow-xl border-4 border-gray-200 w-auto md:mx-24 lg:grid-cols-2 lg:mx-8 2xl:mx-48">
          <div>
            <Image
              src={products_img[this.state.product.image]}
              alt={this.state.product.altImage}
              layout="responsive"
              className="object-cover w-full rounded-t-lg"
            />
          </div>
          <div className="mt-2 mb-2 mr-2 pl-5 text-lg border-t-2 border-gray-400 lg:border-l-2 lg:border-t-0">
            <span className="block p-2 text-4xl font-bold ">
              {this.state.product.name}
            </span>
            <span className="block p-2 overflow-hidden">
              {this.state.product.description}
            </span>
            <span className="block p-2 font-bold">
              Price: ${this.state.product.price}
            </span>
            <span className="block p-2 font-bold">
              In Stock: {this.state.product.inStock}
            </span>
            <ProductCounter
              product={this.state.product}
              val_ctr={this.state.valCtr}
              onIncrement={this.handleIncrement}
              onDecrement={this.handleDecrement}
              addToCart={this.addToCart}
            />
          </div>
        </section>
      </>
    );
  }
}

export default ViewProductComp;
