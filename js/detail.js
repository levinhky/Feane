import {
  getDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
import { db } from "./firebase.js";
import { addToCart } from "./cart.js";

const url = window.location.href;
const urlParams = new URLSearchParams(new URL(url).search);

const id = urlParams.get("id");

const docRef = doc(db, "products", id);

getDoc(docRef).then((doc) => {
  const product = doc.data();

  document.getElementById("thumb").querySelector("img").src = product.image;
  document.querySelector(".info h1").innerHTML = product.name;
  document.querySelector(".info h2").innerHTML = product.description;
  document.querySelector(".info h3").innerHTML = `$${product.price}`;
  document.querySelector(".info button").addEventListener("click", () => {
    addToCart(doc.id);
  });
});
