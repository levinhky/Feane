import {
  getDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
import { db } from "./firebase.js";

document.getElementById("cartCount").innerText = "(0)";

export const updateCartUi = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  document.getElementById("cartCount").innerText = `(${cart.length})`;
};

export const addToCart = (id) => {
  const productRef = doc(db, "products", id);

  getDoc(productRef).then((doc) => {
    const product = doc.data();
    const cartItem = {
      ...product,
      id: doc.id,
      quantity: 1,
    };
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItemIndex = cart.findIndex((item) => item.id === cartItem.id);

    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity++;
    } else {
      cart.push(cartItem);
      alert('Đã thêm sản phẩm vào giỏ hàng!')
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartUi();
  });
};

export const decreaseItemQuantity = (itemId) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const index = cart.findIndex((item) => item.id === itemId);
  if (index !== -1) {
    cart[index].quantity -= 1;
    if (cart[index].quantity === 0) {
      cart = cart.filter((item) => item.id !== itemId);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUi();
  }
};

export const increaseItemQuantity = (itemId) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const index = cart.findIndex((item) => item.id === itemId);
  if (index !== -1) {
    cart[index].quantity += 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUi();
  }
};

export const removeItemFromCart = (itemId) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((item) => item.id !== itemId);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartUi();
};

export const clearCartAndCheckout = () => {
  localStorage.removeItem("cart");
  updateCartUi();
  window.location.href = "index.html";
};

updateCartUi();
