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
      }).then( response =>{
          return response.text() ;
      }).then( response=> {
          const errorMessage = document.createElement('span');
          if(response === 'Incorrect password'){
                errorMessage.style.color = 'red'
                errorMessage.textContent = 'invalid password.';
                error.insertBefore(errorMessage, error.firstChild);
              }
              else if(response === 'User not found'){
                  errorMessage.style.color = 'red';
                  errorMessage.textContent = 'invalid email.';
                  error.insertBefore(errorMessage, error.firstChild);

              }
              else
                  window.location.href = "../html/dashboard.html"; // redirect to the dashboard page

          }
      )
  });


/// if i type in any txt fields the label goes up (valid = go up)
let AllTextFields = document.querySelectorAll('.txt_field input');
AllTextFields.forEach(textFields =>{
    textFields.addEventListener('input' , function (){
        if(textFields.value.length > 0){
            textFields.classList.add('valid');
        }
    })
})
