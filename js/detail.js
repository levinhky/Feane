import { getDoc, doc } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
import { db } from "./firebase.js";

const url = window.location.href;
const urlParams = new URLSearchParams(new URL(url).search);

const id = urlParams.get("id");

const docRef = doc(db, 'products', id)

getDoc(docRef).then((doc) => {
    console.log(doc.data());
})
