import React, { Component } from "react";
import products_img from "../../public";
import Image from "next/image";
import { cartHandler } from "../../pages/api/cartHandler";
import { productHandler } from "../../pages/api/productHandler";

class CartComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: this.props.cart,
      total: 0,
    };
  }

  componentDidMount = async () => {
    // to calculate the total and set the cart data type
    // again, multiply everything by 100 then divide final by 100
    // to prevent float errors
    const totalPrices = this.state.cart.map(
      (cartContent) => cartContent.price * cartContent.quantity * 100
    );
    let finalTotal = totalPrices.reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);
    finalTotal = finalTotal / 100;

    this.setState({ total: finalTotal });
  };

  handleRemoveFromCart = async (cartContent) => {
    // change state for the one on screen
    let cartContentIndex = this.state.cart.indexOf(cartContent);
    let productTotalPrice =
      this.state.cart[cartContentIndex].price *
      this.state.cart[cartContentIndex].quantity *
      100;
    this.state.cart.splice(cartContentIndex, 1);
    this.setState({
      cart: this.state.cart,
      total: (this.state.total * 100 - productTotalPrice) / 100,
    });

    // remove from cart database and return the quantity back to the product stock
    let productData = await productHandler("GET", "", cartContent.productid);
    productData.inStock = productData.inStock + cartContent.quantity;
    await productHandler("PUT", productData, productData.id);
    await cartHandler("DELETE", "", cartContent.id);
  };

  render() {
    return (
      <>
        <div className="mx-auto m-2 p-2 min-h-screen">
          <div className="bg-white text-lg mx-auto flex m-2 shadow-xl border-4 border-purple-300 rounded-lg">
            <span className="flex flex-none justify-center items-center font-bold w-24">
              Image
            </span>
            <span className="flex flex-1 justify-center items-center font-bold border-l-2 border-gray-400">
              Item name
            </span>
            <span className="flex flex-1 justify-center items-center font-bold border-l-2 border-gray-400">
              Price
            </span>
            <span className="flex flex-1 justify-center items-center font-bold border-l-2 border-gray-400">
              Quantity
            </span>
            <span className="flex flex-1 justify-center items-center font-bold border-l-2 border-gray-400">
              Total
            </span>
            <span className="flex flex-1 justify-center items-center font-bold border-l-2 border-gray-400">
              {" "}
            </span>
          </div>
          {this.state.cart.map((cartContent) => (
            <div
              key={cartContent.id}
              className="bg-white text-lg mx-auto flex m-2 shadow-xl border-4 border-emerald-300 rounded-lg"
            >
              <Image
                src={products_img[cartContent.image]}
                alt={cartContent.altImage}
                layout="responsive"
                className="object-cover w-24 flex-none"
              />
              <span className="flex flex-1 justify-center items-center font-bold border-l-2 border-gray-400">
                {cartContent.name}
              </span>
              <span className="flex flex-1 justify-center items-center font-bold border-l-2 border-gray-400">
                ${cartContent.price}
              </span>
              <span className="flex flex-1 justify-center items-center font-bold border-l-2 border-gray-400">
                {cartContent.quantity}
              </span>
              <span className="flex flex-1 justify-center items-center font-bold border-l-2 border-gray-400">
                ${cartContent.price * cartContent.quantity}
              </span>
              <span className="flex flex-1 justify-center items-center font-bold border-l-2 border-gray-400">
                <button
                  onClick={() => this.handleRemoveFromCart(cartContent)}
                  className="p-4 bg-red-500 hover:bg-red-400 text-white text-lg border-b-4 border-red-700 hover:border-red-500 rounded"
                >
                  Remove from cart
                </button>
              </span>
            </div>
          ))}
          <div className="bg-white text-lg mx-auto flex 6 m-2 shadow-xl border-4 border-purple-300 rounded-lg">
            <span className="flex flex-none justify-center items-center font-bold w-24 h-24">
              {" "}
            </span>
            <span className="flex flex-1 justify-center items-center font-bold">
              Total:
            </span>
            <span className="flex flex-1 justify-center items-center"> </span>
            <span className="flex flex-1 justify-center items-center"> </span>
            <span className="flex flex-1 justify-center items-center font-bold border-l-2 border-gray-400">
              ${this.state.total}
            </span>
            <span className="flex flex-1 justify-center items-center font-bold border-l-2 border-gray-400">
              <button className="p-4 bg-teal-500 hover:bg-teal-400 text-white text-lg border-b-4 border-teal-700 hover:border-teal-500 rounded">
                Confirm purchase
              </button>
            </span>
          </div>
        </div>
      </>
    );
  }
}

export default CartComp;
