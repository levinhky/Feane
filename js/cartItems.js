import {
  clearCartAndCheckout,
  decreaseItemQuantity,
  increaseItemQuantity,
  removeItemFromCart,
} from "./cart.js";

const renderCartItems = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const productCartList = document.getElementById("productCartList");
  const noProduct = document.getElementById("noProduct");
  const totalCartItem = document.getElementById("totalCartItem");
  const cartItemList = document.getElementById("cartItemList");
  const cartItemsCount = document.getElementById("cartItemsCount");
  const totalPrices = document.querySelectorAll(".totalPrice");

  if (cart.length > 0) {
    const { totalItems, totalPrice } = cart.reduce(
      (acc, item) => {
        acc.totalItems += item.quantity;
        acc.totalPrice += parseFloat(item.price) * item.quantity;
        return acc;
      },
      { totalItems: 0, totalPrice: 0 }
    );

    totalCartItem.innerHTML = `Items ${cart.length}`;
    cartItemsCount.innerHTML = `${cart.length} Items`
    totalPrices.forEach((el) => (el.innerHTML = `$${totalPrice}`));

    const items = cart.map((product) => {
      return `
        <div class="row main align-items-center">
        <div class="col-2">
          <img class="img-fluid" src=${product.image} alt=${product.name} />
        </div>
        <div class="col">
          <div class="row text-muted">${product.name}</div>
          <div class="row">${product.description}</div>
        </div>
        <div class="col">
          <button data-product-id="${product.id}" id="decrease">-</button><a href="#" class="border">${product.quantity}</a
          ><button data-product-id="${product.id}" id="increase">+</button>
        </div>
        <div class="col">
         $${product.price} <button data-product-id="${product.id}" id="removeItem" class="close">&#10005;</button>
        </div>
      </div>
        `;
    });

    cartItemList.innerHTML = items.join("");

    document.getElementById("decrease").addEventListener("click", (event) => {
      const id = event.target.getAttribute("data-product-id");
      decreaseItemQuantity(id);
      window.location.reload();
    });
    document.getElementById("increase").addEventListener("click", (event) => {
      const id = event.target.getAttribute("data-product-id");
      increaseItemQuantity(id);
      window.location.reload();
    });
    document.getElementById("removeItem").addEventListener("click", (event) => {
      const id = event.target.getAttribute("data-product-id");
      removeItemFromCart(id);
      window.location.reload();
    });
    document
      .getElementById("btnCheckout")
      .addEventListener("click", () => clearCartAndCheckout());
  }

  productCartList.style.display = cart.length ? "block" : "none";
  noProduct.style.display = cart.length ? "none" : "block";
};

renderCartItems();
