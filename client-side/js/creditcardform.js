const nextButton =  document.querySelector('#next-button');
const cardNumber =  document.querySelector('#cardNumberID').value;

function validateInputs(){
    return checkCardName() & checkCardNumber() & checkMonth() & checkYear() & checkCVV();
}

function checkCardName(){
    const cardnameError =   document.querySelector('.cardName-error');
    const cardnameInput =   document.querySelector('#ccnameID');
    const cardnameLabel =   document.querySelector('.cardName-label')
    document.querySelector('#ccname').style.border = '0' ;
    cardnameError.innerHTML = '';
    if( cardnameInput.value.length === 0 ){
        cardnameInput.classList.remove('valid');
        cardnameLabel.style.color = 'red';
        cardnameInput.style.borderBottom = '2px solid red' ;
        cardnameError.innerText = "card name is required";
        return false;
    }
    cardnameInput.classList.add('valid');
    cardnameLabel.style.color = 'green';
    cardnameInput.style.borderBottom = '2px solid green' ;
    return true ;

}
const creditCardRegex = /^(4\d{12}(?:\d{3})?|\d{16}000|5[1-5]\d{14})$/;
// this regex checks : meeza , master , visa
function checkCardNumber(){
    const cardNumberError =   document.querySelector('.cardNumber-error');
    const cardNumberInput =   document.querySelector('#cardNumberID');
    const cardNumberLabel =   document.querySelector('.cardNumber-label');
    document.querySelector('#cardNumber').style.border = '0' ;
    cardNumberError.innerHTML = '';
    cardNumberInput.classList.add('valid');

   if(creditCardRegex.test(cardNumberInput.value)){
       cardNumberLabel.style.color = 'green';
       cardNumberInput.style.borderBottom = '2px solid green' ;
       return true ;
   }else{
       cardNumberError.innerText = "invalid card number";
   }
    if(cardNumberInput.value.length === 0)
        cardNumberError.innerText = "card number is required";

    cardNumberLabel.style.color = 'red';
    cardNumberInput.style.borderBottom = '2px solid red' ;
    return false;
}
function checkMonth(){
    const expiryMonthError =   document.querySelector('.month-error');
    const expiryMonthInput =   document.querySelector('#expirymonthID');
    const expiryMonthLabel =   document.querySelector('.expirymonth-label');
    document.querySelector('#expirymonth').style.border = '0' ;
    expiryMonthError.innerHTML = '';

    if(expiryMonthInput.value <= 12 &&  expiryMonthInput.value >= 1 ){
        expiryMonthInput.classList.add('valid');
        expiryMonthLabel.style.color = 'green';
        expiryMonthInput.style.borderBottom = '2px solid green' ;
        return true ;
    }

    if(expiryMonthInput.value .length===0){
        expiryMonthError.innerText = "Expiry month is required";
    }
    else if(expiryMonthInput.value < 1 ){
        expiryMonthError.innerText = "invalid month";
    }
    else if(expiryMonthInput.value > 12 ){
        expiryMonthError.innerText = "invalid month";
    }
    expiryMonthInput.classList.remove('valid');
    expiryMonthLabel.style.color = 'red';
    expiryMonthInput.style.borderBottom = '2px solid red' ;
    return false;

}
function checkYear(){
    const expiryyearError =   document.querySelector('.year-error');
    const expiryyearInput =   document.querySelector('#expiryyearID');
    const expiryyearLabel =   document.querySelector('.expiryyear-label');
    document.querySelector('#expiryyear').style.border = '0' ;
    expiryyearError.innerHTML = '';

    if(expiryyearInput.value .length === 0 ){
        expiryyearInput.classList.remove('valid');
        expiryyearLabel.style.color = 'red';
        expiryyearInput.style.borderBottom = '2px solid red' ;
        expiryyearError.innerText = "Expiry year is required";
        return false;
    }
    expiryyearInput.classList.add('valid');
    expiryyearLabel.style.color = 'green';
    expiryyearInput.style.borderBottom = '2px solid green' ;
    return true ;
}

function checkCVV(){
    const CVVError =   document.querySelector('.CVV-error');
    const CVVInput =   document.querySelector('#cvvID');
    const CVVLabel =   document.querySelector('.CVV-label');
    document.querySelector('#cvv').style.border = '0' ;
    CVVError.innerHTML = '';

    if(CVVInput.value.length === 3) {
        CVVInput.classList.add('valid');
        CVVLabel.style.color = 'green';
        CVVInput.style.borderBottom = '2px solid green';
        return true;
    }
    CVVInput.classList.add('valid');
    CVVLabel.style.color = 'red';
    CVVInput.style.borderBottom = '2px solid red' ;
    CVVError.innerText = "CVV is required";
    return false;
}

nextButton.addEventListener('click', (e) => {

    if( validateInputs() ) {
            e.preventDefault();
            const data = {
                creditcardName : document.querySelector('#ccnameID').value,
                expirymonth    : document.querySelector('#expirymonthID').value,
                expiryyear     : document.querySelector('#expiryyearID').value,
                cvv            : document.querySelector('#cvvID').value,
                cardNumber     : document.querySelector('#cardNumberID').value
            };
            fetch('http://localhost:8080/QuickPay/AddCreditCard', {
                method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)} )
                .then(response => {
                    return response;
                })
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.error('failed to add credit card:', error);
                    alert('this credit card is already existed.');
                });
            window.location.href="http://localhost:63342/QuickPay/Online-payment-project/client-side/html/Quickpay.html"
        }

});