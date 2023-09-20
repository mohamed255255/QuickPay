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
                            cardname.style.fontSize="20px";

                            let cardNumber = document.createElement("p");
                            cardNumber.className="cardNumber";
                            cardNumber.textContent = `${result.cardNumber}`;
                            cardNumber.style.display='none';
                            let type = detectCardType(result.cardNumber);

                            let img = document.createElement("img");
                            img.className="img";
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
        let img = event.currentTarget .querySelector('.img');
        menuButton.querySelector('span').textContent = cardName;
        menuButton.querySelector('.pickedCreditCardImg').src = img.src;
        menuButton.querySelector('.pickedCreditCardImg').style.display='inline';

        dropdownMenu2.style.display = 'none';
        fetch(`http://localhost:8080/QuickPay/pickCreditcard?cardNumber=${encodeURIComponent(cardNumber)}`)
            .then(response => console.log(cardNumber));

    }

}


/*payment logic*/
document.querySelector('.receipt').style.display = "none";
function  pay(){
    const amount = document.querySelector('.amount').value;
   /* if( menuButton.querySelector('span').textContent === 'Choose a credit card'){
        alert("pick a credit card first");
        return;
    }*/
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
            else{
                window.location.href="http://localhost:63342/QuickPay/Online-payment-project/client-side/html/reciept.html";
            }
            return response;
        })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
        });

   ;



}
/*check if service is a fav service when loading the page*/
function checkFavService(){
    fetch(`http://localhost:8080/QuickPay/checkFavService?servicename=${(servicename)}&servicetype=${(serviceProvider)}`)
        .then( response => {
            if (response.ok) {
                document.querySelector('.favButton span').style.color = 'red';
            }
        })
}

window.addEventListener('DOMContentLoaded', () => {
    checkFavService();
});

function addtofav(){
  let heart = document.querySelector('.favButton span');
    if(heart.style.color === 'black'){ /// add to fav
        heart.style.color = 'red';
        const requestBody =
            {
                servicename: servicename,
                servicetype: serviceProvider,
                img_path: someServiceImg.src
            };

        fetch('http://localhost:8080/QuickPay/addtofav',
            { method: 'POST', headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(requestBody)} )


    }else{ // delete
        heart.style.color = 'black';
        const favorite =
            {
                servicename: servicename,
                servicetype: serviceProvider,
            };
        fetch('http://localhost:8080/QuickPay/deletefav', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                     },
            body: JSON.stringify(favorite),
        }).then( response =>{
            console.log(response.text());
            return response;
        })
    }
}


