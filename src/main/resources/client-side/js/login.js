const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const signUpForm = document.querySelector('#signup-form');
const error = document.querySelector('#error');

  signUpForm.addEventListener('submit', async (e) => {
  
  e.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;
  const data = { email: email  , password: password };

  const response = await fetch('http://localhost:8080/QuickPay/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  } );

  if (response.status === 400) {
      const errorMessage = document.createElement('span');
      errorMessage.style.color = 'red';
      errorMessage.textContent = 'Invalid email or password.';
      error.insertBefore(errorMessage, error.firstChild);
      return;
  }
  else if (response.status = 200)
      window.location.href = "../html/dashboard.html"; // redirect to the dashboard page

});


