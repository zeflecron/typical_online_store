export async function globalHandler(method, data, id) {
  data = data || "";

  const url = "http://localhost:4000/global";
  const resource = id !== undefined ? `${url}/${id}` : url;

  const headers = { "Content-Type": "application/json" };
  const body = JSON.stringify(data);
  const options =
    method !== "DELETE"
      ? { method: `${method}`, headers: headers, body: body }
      : { method: "DELETE" };

  try {
    if (method === "GET") {
      const res = await fetch(resource);
      const attributes = await res.json();
      return attributes;
    } else if (method === "POST" || method === "PUT" || method === "DELETE") {
      const res = await fetch(resource, options);
      console.log(res);
    } else {
      console.log(method);
      console.log(data);
      console.log(id);
    }
  } catch (err) {
    console.log(err);
  }
}
