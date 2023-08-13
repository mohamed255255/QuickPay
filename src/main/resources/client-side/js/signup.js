const firstnameInput = document.querySelector('#firstname');
const secondnameInput = document.querySelector('#secondname');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const repeatedPasswordInput = document.querySelector('#repeated-password');
const phoneNumberInput = document.querySelector('#phone-number');
const signUpForm = document.querySelector('#signup-form');

signUpForm.addEventListener('submit', (e) => {
   e.preventDefault();

   const firstname = firstnameInput.value;
   const secondname = secondnameInput.value;
   const email = emailInput.value;
   const RepeatedPassword =repeatedPasswordInput.value;
   const password = passwordInput.value;
   const phoneNumber = phoneNumberInput.value;

   const data = {
      firstname : firstname,
      secondname: secondname,
      email: email,
      password: password,
      phonenumber: phoneNumber
   };
   
   fetch('http://localhost:8080/QuickPay/signup', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
   })
   .then(response => {
      if (!response.ok) {
         throw new Error('Network response was not ok');
      }
      return response;
   })
   .then(response => {
      console.log(response);
      alert('You have successfully signed up!');
      window.location.href = "http://localhost:63342/QuickPay/Online-payment-project/client-side/html/login.html" // redirect to the login page this the only way
      // if i put the link in html it doesnt work also if i put at the end of this function it gives error 
      // bec it worked before the fetch so u should learn what work first and why i cant use html way
   })
   .catch(error => {
      console.error('Error signing up:', error);
      alert('An error occurred while signing up. Please try again later.');
   });

});