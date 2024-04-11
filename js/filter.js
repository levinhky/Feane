const filterProducts = (filter) => {
  const products = document.querySelectorAll(".product");

  products.forEach((product) => {
    product.style.display = "none";
  });
  if (filter === "*") {
    products.forEach((product) => {
      product.style.display = "block";
    });
  } else {
    const filteredProducts = document.querySelectorAll(filter);
    filteredProducts.forEach((product) => {
      product.style.display = "block";
    });
  }
};

const filterItems = document.querySelectorAll(".filters_menu li");
filterItems.forEach((item) => {
  item.addEventListener("click", () => {
    filterItems.forEach((item) => {
      item.classList.remove("active");
    });
    item.classList.add("active");

    const filter = item.getAttribute("data-filter");
    filterProducts(filter);
  });
});
