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
                            link.className = "menu-option" ;
                            link.innerText = `${result.creditcardName}`;
                            link.href="#";

                            let type = detectCardType(result.cardNumber);
                            let img = document.createElement("img");

                            img.src = `/client-side/icons/${type}.png`;
                            link.appendChild(img);
                            document.querySelector(".creditcard-menu").appendChild(link);
                });
                pickCreditCard(data.cardNumber);
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
});

/*sending the choice to the backend*/

function pickCreditCard(cardNumber){
    const menuButton  = document.querySelector('#creditcard-menu-button');
    const menuOptions = document.querySelectorAll('.menu-option');
    let chosenCard;  /// chosenCard from the drop down-menu
    menuOptions.forEach(option => {
        option.addEventListener('click', (event) => {
            event.preventDefault();
            chosenCard = option;
            menuButton.querySelector('span').textContent = chosenCard.innerText; /////////////// fix
            dropdownMenu2.style.display = 'none';
            fetch(`http://localhost:8080/QuickPay/pickCreditcard?cardNumber=${encodeURIComponent(cardNumber)}`)
                .then(function(response) {
                    console.log(response);
                })
        });
    });

}

/*payment logic*/
document.querySelector('.receipt').style.display = "none";
function  pay(){
    fetch('http://localhost:8080/QuickPay/pay',
        { method: 'POST', headers: {'Content-Type': 'application/json'}} )
        .then(response => {
            if (!response.ok) {
                throw new Error('No enough money to continue the payment');
            }
            return response;
        })
        .then(response => {
            console.log(response);
            alert('You have successfully paid');

        })
        .catch(error => {
            console.error('failed', error);
            alert('An error occurred while paying . Please try again later.');
        });
    document.querySelector('.serviceprovider').textContent = serviceProvider;
    document.querySelector('.servicename').textContent = servicename;
    document.querySelector('.receipt').style.display = "flex";
    document.querySelector('.orderNo').textContent='order # : ' + 1 ; ////////// fix this logic
    document.body.style.backgroundColor = "grey";
    document.querySelector("header").style.display = 'none' ;
    document.querySelector("p").style.display = 'none' ;
    document.querySelector(".footer").style.display = 'none' ;
    document.querySelector(".serviceProvider-tag").style.display = 'none' ;
    document.querySelector(".txt_field").style.display = 'none' ;
    document.querySelector(".buttons").style.display = 'none' ;
    document.querySelector(".bottomFooter").style.display = 'none' ;







}
