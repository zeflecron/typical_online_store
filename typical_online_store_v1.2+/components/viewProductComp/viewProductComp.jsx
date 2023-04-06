import React, { Component } from "react";
import Image from "next/image";
import Link from "next/link";

import { AiOutlineArrowLeft } from "react-icons/ai";

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
      messageType: "",
      message: "",
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
    try {
      if (this.state.valCtr !== 0) {
        let globalValues = await globalHandler("GET");
        let cartId = globalValues.cartCtr;
        let currentUserId = globalValues.loggedUserId;

        let cartData = await cartHandler("GET", "", undefined, currentUserId);
        let cartModifyId = -1;
        let data = {
          id: cartId,
          userId: currentUserId,
          productId: product.id,
          quantity: this.state.valCtr,
        };

        // checks if product already exists in cart
        for (let i = 0; i < cartData.length; i++) {
          if (cartData[i].productId === data.productId) {
            cartModifyId = cartData[i].id;
          }
        }

        // if exists just add the quantity and using "PUT"
        if (cartModifyId !== -1) {
          console.log(cartModifyId);
          let specificCartData = await cartHandler("GET", "None", cartModifyId);
          data.quantity = data.quantity + specificCartData.quantity;
          await cartHandler("PUT", data, cartModifyId);
        } else {
          await cartHandler("POST", data);
          globalValues.cartCtr = globalValues.cartCtr + 1;
          await globalHandler("PUT", globalValues);
        }

        // update product state on screen, and the product in database
        product.inStock = product.inStock - this.state.valCtr;
        this.state.valCtr = 0;
        this.setState({
          product,
          messageType: "success",
          message: "Item has been successfully added to cart!",
        });
        await productHandler("PUT", this.state.product, product.id);
      }
    } catch (err) {
      console.error(err);
      this.setState({
        messageType: "error",
        message: `Something is wrong. ${err}`,
      });
    }
  };

  render() {
    return (
      <>
        <section className="flex">
          <div>
            <Link
              href="/products"
              className="ml-10 mt-4 w-32 flex items-center bg-teal-500 hover:bg-teal-400 text-white text-lg font-bold py-2 px-4 border-b-4 border-teal-700 hover:border-teal-500 rounded md:ml-24 lg:ml-10 2xl:ml-48"
            >
              <AiOutlineArrowLeft className="text-2xl" />
              Return
            </Link>
          </div>
          {this.state.messageType === "error" ? (
            <div className="ml-4 mt-4 mr-10 p-4 flex items-center justify-center bg-rose-100 w-full font-latoBold text-l text-red-500 md:mr-24 lg:mr-8 2xl:mr-48">
              {this.state.message}
            </div>
          ) : this.state.messageType === "success" ? (
            <div className="ml-4 mt-4 mr-10 p-4 flex items-center justify-center bg-teal-100 w-full font-latoBold text-l text-teal-500 md:mr-24 lg:mr-8 2xl:mr-48">
              {this.state.message}
            </div>
          ) : (
            <></>
          )}
        </section>
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
