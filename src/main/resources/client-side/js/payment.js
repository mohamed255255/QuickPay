/*Displaying the last chosen service stored in a local storage*/
let someServiceImg = new Image();
someServiceImg.src = localStorage.getItem('someServiceImg');

let serviceProvider = localStorage.getItem('serviceProvider');
let servicename = localStorage.getItem('servicename');

document.querySelector('.serviceProvider-tag img').src = someServiceImg.src;
document.querySelector('.firstText').textContent = serviceProvider;
document.querySelector('.secondText').textContent = servicename;
let orderNumber = 1 ;

function incrementOrder(){
    let storedNum = localStorage.getItem("orderNumber");
    if(!storedNum) {
        storedNum = orderNumber;
    }
    localStorage.setItem("orderNumber", orderNumber.toString());
    orderNumber = parseInt(storedNum) + 1
    localStorage.setItem("orderNumber", orderNumber.toString());
    return orderNumber
}

/*show all credit cards in a drop-down menu*/
function loadCreditCardInfo() {
    fetch('http://localhost:8080/QuickPay/showcreditcard')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (Object.keys(data).length === 0) {
                document.querySelector('.creditcard-menu-button').style.display='none';

            }else{  // a card or more found
                document.querySelector('.noCreditCardText').style.display='none';
                data.forEach(function (result) {
                            let link = document.createElement('a');
                            link.href="#";
                            link.className = "menu-option" ;

                            let cardname = document.createElement("p");
                            cardname.className="cardname";
                            cardname.textContent = `${result.creditcardName}`;

                            let cardNumber = document.createElement("p");
                            cardNumber.className="cardNumber";
                            cardNumber.textContent = `${result.cardNumber}`;
                            cardNumber.style.display='none';
                            let type = detectCardType(result.cardNumber);

                            let img = document.createElement("img");
                            img.src = `/client-side/icons/${type}.png`;

                            link.appendChild(img);
                            link.appendChild(cardname);
                            link.appendChild(cardNumber);
                            document.querySelector(".creditcard-menu").appendChild(link);
                });
            }
        }).catch(error => console.error(error));
}

window.addEventListener('DOMContentLoaded', () => {
    loadCreditCardInfo();
});

function detectCardType(number) {

    if(number[0] === '4')
        return "visa";
    else if (number[0] === '5')
        return "mastercard";
    else if (number[0] === '3')
        return "amex";

    return "unknown";
}




/*Display the drop-down menu onclick*/
const serviceTypeButton = document.querySelector('.creditcard-menu-button');
const dropdownMenu2 = document.querySelector('.creditcard-menu');
serviceTypeButton.addEventListener('click', function() {
    if (dropdownMenu2.style.display === 'none') {
        dropdownMenu2.style.display = 'flex';
    }else{
        dropdownMenu2.style.display = 'none';
    }
    pickCreditCard()
});


/*sending the choice to the backend*/


function pickCreditCard(){

    const menuButton = document.querySelector('#creditcard-menu-button');
    const menuOptions = document.querySelectorAll('.menu-option');
    menuOptions.forEach(option => {
        option.addEventListener('click', handleClick);

    });
    function handleClick(event) {
        event.preventDefault();
        let cardNumber = event.currentTarget .querySelector('.cardNumber').textContent;
        let cardName = event.currentTarget .querySelector('.cardname').textContent;
        menuButton.querySelector('span').textContent = cardName ;
        dropdownMenu2.style.display = 'none';
       fetch(`http://localhost:8080/QuickPay/pickCreditcard?cardNumber=${encodeURIComponent(cardNumber)}`)
            .then(response => console.log(cardNumber));

    }

}


/*payment logic*/
document.querySelector('.receipt').style.display = "none";
function  pay(){
    const amount = document.querySelector('.amount').value;
    const requestBody =
        {
            servicename: servicename,
            servicetype: serviceProvider,
            amount: amount
        };

    fetch('http://localhost:8080/QuickPay/pay',
        { method: 'POST', headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(requestBody)} )
        .then(response => {
            if (!response.ok) {
                throw new Error('no enough money in your credit card');
            }
            return response;
        })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
        });

    document.querySelector('.servicetype').textContent = serviceProvider;
    document.querySelector('.servicename').textContent = servicename;
    document.querySelector('.receipt').style.display = "flex";
    document.querySelector('.orderNo').textContent = 'order # : ' + incrementOrder() ;
    document.body.style.backgroundColor = "grey";
    document.querySelector("header").style.display = 'none' ;
    document.querySelector("p").style.display = 'none' ;
    document.querySelector(".footer").style.display = 'none' ;
    document.querySelector(".serviceProvider-tag").style.display = 'none' ;
    document.querySelector(".txt_field").style.display = 'none' ;
    document.querySelector(".buttons").style.display = 'none' ;
    document.querySelector(".bottomFooter").style.display = 'none' ;
    document.querySelector(".creditcard-menu-button").style.display = 'none' ;
    document.querySelector(".dropdown-button").style.display = 'none' ;



}



