import {
  getDoc,
  doc,
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
import { db } from "./firebase.js";
import { addToCart } from "./cart.js";

const url = window.location.href;
const urlParams = new URLSearchParams(new URL(url).search);

const id = urlParams.get("id");

const docRef = doc(db, "products", id);
const commentsRef = collection(db, "comments");

getDoc(docRef).then((doc) => {
  const product = doc.data();
  let userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
  const commentBox = document.getElementById("commentBox");
  const input = document.getElementById("addCommentInput");
  const label = document.getElementById("addCommentLabel");

  document.getElementById("thumb").querySelector("img").src = product.image;
  document.querySelector(".info h1").innerHTML = product.name;
  document.querySelector(".info h2").innerHTML = product.description;
  document.querySelector(".info h3").innerHTML = `$${product.price}`;
  document.querySelector(".info button").addEventListener("click", () => {
    addToCart(doc.id);
  });

  if (userInfo.uid) {
    commentBox.style.display = "flex";
    let inputValue = "";
    input.addEventListener("input", function (event) {
      inputValue = event.target.value;
    });

    label.addEventListener("click", function () {
      const data = {
        productId: doc.id,
        userId: userInfo.uid,
        userEmail: userInfo.email,
        content: inputValue,
      };
      if (inputValue !== "") {
        addDoc(commentsRef, data).then(() => {
          alert("Thêm bình luận thành công");
          input.value = "";
        });
      } else {
        alert("Vui lòng nhập bình luận");
      }
    });

    const q = query(collection(db, "comments"), where("productId", "==", doc.id));
    onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => {
        const comment = doc.data();
        return `
          <div class="card mb-4">
            <div class="card-body">
              <p>${comment.content}</p>
              <div class="d-flex justify-content-between">
                <div class="d-flex flex-row align-items-center">
                  <p class="small mb-0 ms-2">${comment.userEmail}</p>
                </div>
              </div>
            </div>
          </div>
        `;
      });

      document.getElementById("commentList").innerHTML = data.join("");
    });
  } else {
    commentBox.style.display = "none";
  }
});
