function importAll(r) {
  let images = {};
  r.keys().map((item) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

// make sure `/.png/` is not a string, instead a regex
const products_img = importAll(require.context("./products", false, /.png/));

export default products_img;
