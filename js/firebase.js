import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
const dbKey = "https://feane-49ad1-default-rtdb.asia-southeast1.firebasedatabase.app/";
const firebaseConfig = {
  apiKey: "AIzaSyCPO4Q_J9drsRumd-7kSf5zCsBPE77DOzI",
  authDomain: "feane-49ad1.firebaseapp.com",
  databaseURL: "https://feane-49ad1-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "feane-49ad1",
  storageBucket: "feane-49ad1.appspot.com",
  messagingSenderId: "305851413167",
  appId: "1:305851413167:web:922cb908eb0ec50b0ada5a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const db = getFirestore(app);
