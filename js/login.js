import { loginEmail, registerEmail } from "./auth.js";

$(document).ready(function () {
  function toggleResetPswd(e) {
    e.preventDefault();
    $("#logreg-forms .form-signin").toggle(); // display:block or none
    $("#logreg-forms .form-reset").toggle(); // display:block or none
  }

  function toggleSignUp(e) {
    e.preventDefault();
    $("#logreg-forms .form-signin").toggle(); // display:block or none
    $("#logreg-forms .form-signup").toggle(); // display:block or none
  }

  $(() => {
    // Login Register Form
    $("#logreg-forms #forgot_pswd").click(toggleResetPswd);
    $("#logreg-forms #cancel_reset").click(toggleResetPswd);
    $("#logreg-forms #btn-signup").click(toggleSignUp);
    $("#logreg-forms #cancel_signup").click(toggleSignUp);
  });

  var emailLoginValue = "";
  var passwordLoginValue = "";
  var emailRegValue = "";
  var passwordRegValue = "";

  $(document).ready(function () {
    $("#inputEmail").on("input", function () {
      emailLoginValue = $(this).val();
    });

    $("#inputPassword").on("input", function () {
      passwordLoginValue = $(this).val();
    });

    $("#user-email").on("input", function () {
      emailRegValue = $(this).val();
    });

    $("#user-pass").on("input", function () {
      passwordRegValue = $(this).val();
    });

    $("#signInForm").submit(function (event) {
      event.preventDefault();

      loginEmail(emailLoginValue, passwordLoginValue);
    });

    $("#signUpForm").submit(function (event) {
      event.preventDefault();
      registerEmail(emailRegValue, passwordRegValue);
    });
  });
});
