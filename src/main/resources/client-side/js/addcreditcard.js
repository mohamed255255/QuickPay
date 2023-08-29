const nextButton = document.querySelector('#next-button');
nextButton.addEventListener('click', (e) => {
    e.preventDefault();
    const data = {
        creditcardName : document.querySelector('#ccname').value,
        expirymonth    : document.querySelector('#expirymonth').value,
        expiryyear     : document.querySelector('#expiryyear').value,
        cvv            : document.querySelector('#cvv').value,
        cardNumber     : document.querySelector('#cardNumber').value
    };

    fetch('http://localhost:8080/QuickPay/AddCreditCard', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)} )
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
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
});