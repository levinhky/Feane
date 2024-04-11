import { getDoc, doc } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
import { db } from "./firebase.js";

document.getElementById("cartCount").innerText = "(0)";

export const updateCartUi = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  document.getElementById("cartCount").innerText = `(${totalItems.toString()})`;
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
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartUi();
  });
};
