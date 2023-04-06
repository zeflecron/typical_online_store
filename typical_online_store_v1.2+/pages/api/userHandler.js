export async function userHandler(method, data, id, email) {
  data = data || "";

  const url = "http://localhost:4000/users";
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
    if (method === "GET" && email === undefined) {
      const res = await fetch(resource);
      checkRes(res);
      const users = await res.json();
      return users;
    } else if (method === "GET") {
      const res = await fetch(resource);
      const users = await res.json();

      for (let i = 0; i < users.length; i++) {
        if (users[i].email.toLowerCase() == email.toLowerCase()) {
          let user = users[i];
          return user;
        } else {
        }
      }
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
