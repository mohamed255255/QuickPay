const nextButton =  document.querySelector('#next-button');
const cardNumber =  document.querySelector('#cardNumberID').value;

//*short circuit*/
function validateInputs(){
    return checkCardName() && checkCardNumber() && checkMonth() && checkYear() && checkCVV();
}

function checkCardName(){
    const cardnameError =   document.querySelector('.cardName-error');
    const cardnameInput =   document.querySelector('#cardName');
    const cardnameLabel =   document.querySelector('.cardName-label')
    if(cardnameInput.value.length===0){
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
function checkCardNumber(){
    const cardNumberError =   document.querySelector('.cardNumber-error');
    const cardNumberInput =   document.querySelector('#cardNumber');
    const cardNumberLabel =   document.querySelector('.cardNumber-label');
    if(cardNumberInput.value.length === 0 ){
        cardNumberInput.classList.remove('valid');
        cardNumberLabel.style.color = 'red';
        cardNumberInput.style.borderBottom = '2px solid red' ;
        cardNumberError.innerText = "card number is required";
        return false;
    }
    else if(cardNumberInput.value.length > 16){
        cardNumberInput.classList.add('valid');
        cardNumberLabel.style.color = 'red';
        cardNumberInput.style.borderBottom = '2px solid red' ;
        cardNumberError.innerText = "Invalid card number";
        return false;
    }
    cardNumberInput.classList.add('valid');
    cardNumberLabel.style.color = 'green';
    cardNumberInput.style.borderBottom = '2px solid green' ;
    return true ;
}
function checkMonth(){
    const expiryMonthError =   document.querySelector('.month-error');
    const expiryMonthInput =   document.querySelector('#expirymonth');
    const expiryMonthLabel =   document.querySelector('.expirymonth-label');
    if(expiryMonthInput.value .length===0){
        expiryMonthInput.classList.remove('valid');
        expiryMonthLabel.style.color = 'red';
        expiryMonthInput.style.borderBottom = '2px solid red' ;
        expiryMonthError.innerText = "Expiry month is required";
        return false;
    }
    else if(expiryMonthInput.value > 12 && expiryMonthInput.value < 1 ){
        expiryMonthInput.classList.add('valid');
        expiryMonthLabel.style.color = 'red';
        expiryMonthInput.style.borderBottom = '2px solid red' ;
        expiryMonthError.innerText = "invalid month";
        return false;
    }
    expiryMonthInput.classList.add('valid');
    expiryMonthLabel.style.color = 'green';
    expiryMonthInput.style.borderBottom = '2px solid green' ;
    return true ;
}
function checkYear(){
    const expiryyearError =   document.querySelector('.year-error');
    const expiryyearInput =   document.querySelector('#expiryyear');
    const expiryyearLabel =   document.querySelector('.expiryyear-label');
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
    const CVVInput =   document.querySelector('#CVV');
    const CVVLabel =   document.querySelector('.CVV-label');
    if(CVVInput.value .length === 0 ){
        CVVInput.classList.remove('valid');
        CVVLabel.style.color = 'red';
        CVVInput.style.borderBottom = '2px solid red' ;
        CVVError.innerText = "CVV is required";
        return false;
    }
    else if(CVVInput.value.length !== 3){
        CVVInput.classList.add('valid');
        CVVLabel.style.color = 'red';
        CVVInput.style.borderBottom = '2px solid red' ;
        CVVError.innerText = "CVV is required";
        return false;
    }
    CVVInput.classList.add('valid');
    CVVLabel.style.color = 'green';
    CVVInput.style.borderBottom = '2px solid green' ;
    return true ;
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
                    if (!response.ok) {
                        throw new Error('this card is already existed');
                    }
                    return response;
                })
                .then(response => {
                    console.log(response);
                    alert('You have successfully added a credit card!');
                })
                .catch(error => {
                    console.error('failed to add credit card:', error);
                    alert('An error occurred while adding your credit card . Please try again later.');
                });
            window.location.href="http://localhost:63342/QuickPay/Online-payment-project/client-side/html/Quickpay.html"
        }

});