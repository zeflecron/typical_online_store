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

  // check if fetch works, if not, throw error
  function checkRes(res) {
    if (!res.ok) {
      throw `${res.status}`;
    }
  }

  try {
    if (method === "GET") {
      const res = await fetch(resource);
      checkRes(res);
      const attributes = await res.json();
      return attributes;
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
