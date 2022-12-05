export const getProductsData = async () => {
  const res = await fetch("http://localhost:4000/products/");
  const productsData = await res.json();

  return productsData;
};
