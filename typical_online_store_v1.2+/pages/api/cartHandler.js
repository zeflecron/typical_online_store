import { productHandler } from "./productHandler";

export async function cartHandler(method, data, id, userId) {
  const url = "http://localhost:4000/cart";
  const resource = id !== undefined ? `${url}/${id}` : url;

  const headers = { "Content-Type": "application/json" };
  const body = JSON.stringify(data);
  const options =
    method !== "DELETE"
      ? { method: `${method}`, headers: headers, body: body }
      : { method: "DELETE" };

  // check if fetch works, if not, throw error
  function checkRes(res) {
    if (!res.ok) {
      throw `${res.status}`;
    }
  }

  try {
    // gets all cart contents of a certain user
    if (method === "GET" && userId !== undefined) {
      const res = await fetch(resource);
      checkRes(res);
      const cart = await res.json();
      let cartContents = [];

      for (let i = 0; i < cart.length; i++) {
        if (cart[i].userId === userId) {
          let data = await productHandler("GET", "", cart[i].productId);
          data.id = cart[i].id;
          data.productId = cart[i].productId;
          data.quantity = cart[i].quantity;
          delete data.description;
          delete data.inStock;
          cartContents.push(data);
        }
      }

      return cartContents;
    }
    // gets specific cart data, used in viewProductComp.jsx,
    // where dupilcates will just be added into the value instead of creating a new id
    else if (method === "GET") {
      const res = await fetch(resource);
      checkRes(res);
      const specificCart = await res.json();
      return specificCart;
    } else if (method === "POST" || method === "PUT" || method === "DELETE") {
      const res = await fetch(resource, options);
      checkRes(res);
    } else {
      console.log(
        `One of the parameters is incorrect: \n${method}\n${data}\n${id}`
      );
    }
  } catch (err) {
    // `new Error(...)` gives the `Error: ...` format
    throw new Error(err);
  }
}
