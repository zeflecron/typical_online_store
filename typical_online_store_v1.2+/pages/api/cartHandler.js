import { productHandler } from "./productHandler";

export async function cartHandler(method, data, id) {
  data = data || "";

  const url = "http://localhost:4000/cart";
  const resource = id !== undefined ? `${url}/${id}` : url;

  const headers = { "Content-Type": "application/json" };
  const body = JSON.stringify(data);
  const options =
    method !== "DELETE"
      ? { method: `${method}`, headers: headers, body: body }
      : { method: "DELETE" };

  try {
    if (method === "GET" && id === undefined) {
      const res = await fetch(resource);
      const cart = await res.json();
      let cartContents = [];

      for (let i = 0; i < cart.length; i++) {
        let data = await productHandler("GET", "", cart[i].productid);
        data.id = cart[i].id;
        data.productid = cart[i].productid;
        data.quantity = cart[i].quantity;
        delete data.description;
        delete data.inStock;
        cartContents.push(data);
      }

      return cartContents;
    } else if (method === "GET") {
      const res = await fetch(resource);
      const specificCart = await res.json();
      return specificCart;
    } else if (method === "POST" || method === "PUT" || method === "DELETE") {
      const res = await fetch(resource, options);
      console.log(res);
      return res;
    } else {
      console.log(method);
      console.log(data);
      console.log(id);
    }
  } catch (err) {
    console.log(err);
    // throw err;
  }
}
