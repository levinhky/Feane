import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

const auth = getAuth();

const renderAuth = () => {
  let userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
  const userLink = document.querySelector(".user_link");
  const userNameDisplay = document.getElementById("userNameDisplay");
  const logOutBtn = document.getElementById("logOutBtn");

  if (userInfo.uid) {
    userLink.style.display = "none";
    userNameDisplay.style.display = "block";
    userNameDisplay.innerHTML = `Hi ${userInfo.email.split("@")[0]}`;
    logOutBtn.style.display = "block";

    logOutBtn.addEventListener("click", () => {
      logout();
      window.location.reload();
    });
  } else {
    userLink.style.display = "block";
    userNameDisplay.style.display = "none";
    logOutBtn.style.display = "none";
  }
};

renderAuth();

export const registerEmail = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert("Đăng ký thành công!, bạn đã tự động đăng nhập");
      window.location.href = "index.html";
      localStorage.setItem("userInfo", JSON.stringify(user));
    })
    .catch((error) => {
      alert(error.message);
    });
};

export const loginEmail = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert("Đăng nhập thành công!");
      window.location.href = "index.html";
      localStorage.setItem("userInfo", JSON.stringify(user));
    })
    .catch((error) => {
      alert(error.message);
    });
};

export const logout = () => {
  signOut(auth)
    .then(() => {
      alert("Bạn đã đăng xuất!");
      localStorage.removeItem("userInfo");
    })
    .catch((error) => {
      alert(error.message);
    });
};
