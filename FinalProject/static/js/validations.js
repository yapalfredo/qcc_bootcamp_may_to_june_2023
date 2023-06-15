let formLogin;
let formSignup;
let homeH1;

onHomeLoad = () => {
  formLogin = document.getElementById('form_login');
  formSignup = document.getElementById('form_signup');
  homeH1 = document.getElementById('homeH1');
};

signUp = () => {
  formLogin.className = 'login_form hide_this';
  formSignup.className = 'signup_form';
  homeH1.innerHTML = 'Sign Up';
};

logIn = () => {
  formLogin.className = 'login_form';
  formSignup.className = 'signup_form hide_this';
  homeH1.innerHTML = 'Login';
};
