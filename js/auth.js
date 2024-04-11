import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

const auth = getAuth();

export const registerEmail = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert("Đăng ký thành công!, bạn đã tự động đăng nhập");
      console.log(user);
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
    })
    .catch((error) => {
      alert(error.message);
    });
};

export const logout = () => {
  signOut(auth)
    .then(() => {
      alert("Bạn đã đăng xuất!");
    })
    .catch((error) => {
      alert(error.message);
    });
};
