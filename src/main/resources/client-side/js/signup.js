const signUpForm = document.querySelector('#signup-form');
let gender;


const maleRadio = document.querySelector('#male');
maleRadio.addEventListener('change', () => {
   if (maleRadio.checked) {
      gender = 'male';
   }
});

const femaleRadio = document.querySelector('#female');
femaleRadio.addEventListener('change', () => {
   if (femaleRadio.checked) {
      gender = 'female';
   }
});


const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneNumberRegex = /^\d+$/;

function validateInputs() {
    const AllFields = document.querySelectorAll('.txt_field');
    AllFields.forEach((AllFields) => {
        AllFields.style.border = '0';
    });
    return checkEmail() & checkFirstname() & checklastname() & checkGender() & checkPhoneNumber() & checkPassword() & checkRepeatedPassword();
}
function checkGender(){
    if(femaleRadio.checked  === false && maleRadio.checked  === false){
        const error = document.querySelector('.genderError');
        error.innerText = 'choose a gender.';
        return false
    }
    error.innerText = '';
    return true ;
}

function checkFirstname(){
    const firstnameInput = document.querySelector('#firstname');
    const error = document.querySelector('.firstnameError');
    error.innerText = '';

    if (firstnameInput.value.length > 0) {
        firstnameInput.classList.add('valid');
        document.querySelector('.firstname-label').style.color = 'green';
        firstnameInput.style.borderBottom = '2px solid green' ;
        return true ;
    }
    error.innerText = 'first name is required';
    document.querySelector('.firstname-label').style.color = 'red';
    firstnameInput.style.borderBottom = '2px solid red' ;
    firstnameInput.classList.remove('valid');
    return false ;
}

function checklastname(){
    const secondnameInput = document.querySelector('#secondname');
    const error = document.querySelector('.secondnameError');
    error.innerText = '';

    if (secondnameInput.value.length > 0) {
        secondnameInput.classList.add('valid');
        document.querySelector('.lastname-label').style.color = 'green';
        secondnameInput.style.color = 'green';
        secondnameInput.style.borderBottom = '2px solid green' ;
        return true ;
    }
    secondnameInput.classList.remove('valid');
    document.querySelector('.lastname-label').style.color = 'red';
    secondnameInput.style.borderBottom = '2px solid red' ;
    error.innerText = 'last name is required';
    return false ;

}

function checkEmail(){
    const error = document.querySelector('.emailError');
    const emailInput = document.querySelector('#email');
    error.innerText = '';

    if ( emailRegex.test(emailInput.value) ){
        emailInput.classList.add('valid');
        document.querySelector('.email-label').style.color = 'green';
        emailInput.style.borderBottom = '2px solid green' ;
        return true ;
    }else{
        emailInput.classList.add('valid');
        error.innerText = 'email format is not correct';
    }
    if(emailInput.value === ''){
        emailInput.classList.remove('valid');
        error.innerText = 'email is required';
    }
    document.querySelector('.email-label').style.color = 'red';
    emailInput.style.borderBottom = '2px solid red' ;
    return false ;
}

function checkPassword(){
    const passwordInput = document.querySelector('#password');
    passwordInput.classList.add('valid');
    const error = document.querySelector('.passwordError');
    error.innerText = '';

    if (passwordInput.value.length >= 8) {
        document.querySelector('.password-label').style.color = 'green';
        passwordInput.style.borderBottom = '2px solid green' ;
        return true ;
    }else{
        error.innerText = 'password is less than 8 characters';
    }
    if(passwordInput.value.length === 0){
        passwordInput.classList.remove('valid');
        error.innerText = 'password is required';
    }
    document.querySelector('.password-label').style.color = 'red';
    passwordInput.style.borderBottom = '2px solid red' ;
    return false
}

function checkRepeatedPassword(){
    const repeatedPasswordInput = document.querySelector('#repeated-password');
    const passwordInput = document.querySelector('#password');
    const error = document.querySelector('.repeatedPasswordError');
    error.innerText = '';
    repeatedPasswordInput.classList.add('valid');

    if(repeatedPasswordInput.content !== passwordInput.content){
        document.querySelector('.repeatedPasswordError');
        error.innerText = 'no matching with your password';
        document.querySelector('.repeatedPassword-label').style.color = 'red';
        repeatedPasswordInput.style.borderBottom='2px solid red';
        return false;
    }
    else if(repeatedPasswordInput.value.length === 0 ){
        repeatedPasswordInput.classList.remove('valid');
        error.innerText = 'confirm your password';
        document.querySelector('.repeatedPassword-label').style.color = 'red';
        repeatedPasswordInput.style.borderBottom='2px solid red';
        return false ;
    }

    document.querySelector('.repeatedPassword-label').style.color = 'green';
    repeatedPasswordInput.style.borderBottom = '2px solid green' ;
    return true;
}

function checkPhoneNumber(){
    const phoneNumberInput = document.querySelector('#phone-number');
    phoneNumberInput.classList.add('valid');
    const error = document.querySelector('.phoneNumberError');
    error.innerText = '';

    if(phoneNumberRegex.test(phoneNumberInput.value) &&  phoneNumberInput.value.length === 11)  {
        document.querySelector('.phoneNumber-label').style.color = 'green';
        phoneNumberInput.style.borderBottom = '2px solid green' ;
        return true ;
    }
    else{
        error.innerText = 'invalid format';
    }
    if(phoneNumberInput.value === ''){
        phoneNumberInput.classList.remove('valid');
        error.innerText = 'phone number is required';
    }
    document.querySelector('.phoneNumber-label').style.color = 'red';
    phoneNumberInput.style.borderBottom = '2px solid red' ;
    return false ;

}



signUpForm.addEventListener('submit', (e) => {
   e.preventDefault();
   if( validateInputs() ){
           const data = {
               firstname : document.querySelector('#firstname').value,
               lastname: document.querySelector('#secondname').value,
               email: document.querySelector('#email').value,
               password: document.querySelector('#password').value,
               phonenumber: document.querySelector('#phone-number').value,
               gender : gender
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
                   window.location.href = "http://localhost:63342/QuickPay/Online-payment-project/client-side/html/login.html"
                  })
                    .catch(error => {
                    console.error('Error signing up:', error);
                    });
   }
})


/// if i type in any txt fields the label goes up (valid = go up)
let AllTextFields = document.querySelectorAll('.txt_field input');
AllTextFields.forEach(textFields =>{
    textFields.addEventListener('input' , function (){
        if(textFields.value.length > 0){
            textFields.classList.add('valid');
        }
    })
})

