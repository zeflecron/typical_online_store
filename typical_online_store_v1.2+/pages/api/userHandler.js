export async function userHandler(method, data, id) {
  data = data || "";

  const url = "http://localhost:4000/users";
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
      const users = await res.json();
      return users;
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
