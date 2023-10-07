/*Displaying the last chosen service stored in a local storage*/
let someServiceImg = new Image();
someServiceImg.src = localStorage.getItem('someServiceImg');

let serviceProvider = localStorage.getItem('serviceProvider');
let servicename = localStorage.getItem('servicename');

document.querySelector('.serviceProvider-tag img').src = someServiceImg.src;
document.querySelector('.firstText').textContent = serviceProvider;
document.querySelector('.secondText').textContent = servicename;


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

const visaRegex = /^4\d{12}(?:\d{3})?$/;
const meezaRegex = /^\d{16}000$/;
const mastercardRegex = /^5[1-5]\d{14}$/;

function detectCardType(number) {
    if (visaRegex.test(number))
        return "Visa";
    if (mastercardRegex.test(number))
        return "Mastercard";
    if (meezaRegex.test(number))
        return "meza";

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
    pickCreditCard();
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
            .then(response => { console.log(cardNumber) ; return response});

    }
    document.querySelector('.creditcard-menu-button').style.color = 'black';

}


/*payment logic*/
function  pay(){
     const amount = document.querySelector('.amount')

     const cardSelection = document.querySelector('.ServiceTypeContent');
     if(cardSelection.textContent === 'Choose a credit card'){
         document.querySelector('.creditcard-menu-button').style.color = 'red';
     }
     else if(amount.value === ''){
        document.querySelector('.txt_field').style.borderBottom = '1px solid red';
        document.querySelector('.txt_field input').style.color = 'red';
        document.querySelector('.txt_field label').style.color = 'red';
        document.querySelector('.txt_field label').style.opacity = '0.7';
     }else{
         const requestBody =
             {
                 servicename: servicename,
                 company: serviceProvider,
                 amount: amount.value
             };
         fetch('http://localhost:8080/QuickPay/pay',
             { method: 'POST', headers: {'Content-Type': 'application/json'},
                 body: JSON.stringify(requestBody)} )
             .then(response => {
                 console.log(JSON.stringify(requestBody));
                 return response;
             })

         window.location.href="http://localhost:63342/QuickPay/Online-payment-project/client-side/html/reciept.html";

     }
}
/*check if service is a fav service when loading the page*/


window.addEventListener('DOMContentLoaded', () => {
    checkFavService();
});
function checkFavService(){

    fetch(`http://localhost:8080/QuickPay/checkFavService?servicename=${(servicename)}&company=${(serviceProvider)}`)
        .then( response => {
            if (response.ok){
                document.querySelector('.favButton').style.color = 'red';
            }
    })
}
function addtofav(){
    let heart = document.querySelector('.favButton');
    if(heart.style.color === 'black'){ /// add to fav
        heart.style.color = 'red';
        const requestBody =
            {
                servicename: servicename,
                servicetype: localStorage.getItem('servicetype'),
                img_path: someServiceImg.src,
                company : localStorage.getItem('serviceProvider'),
            };

        fetch('http://localhost:8080/QuickPay/addtofav',
            { method: 'POST', headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(requestBody)}
             )
    }else{ // delete
        heart.style.color = 'black';
        const favorite =
            {
                servicename: servicename,
                company: serviceProvider,
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

