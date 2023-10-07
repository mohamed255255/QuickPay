function loadCreditCardInfo() {
    fetch('http://localhost:8080/QuickPay/showcreditcard')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (Object.keys(data).length === 0) {
                document.querySelector(".CreditCardDetails").style.display = "none";
            } else {
                document.querySelector(".noCreditCardForm").style.display = "none";

                const tableRow = document.createElement("tr");
                let cntr = 0 ;
                data.forEach(function (result) {
                    const tableData = document.createElement("td");
                    tableData.dataset.index =  cntr++ ;

                    tableData.className = "dataElement";

                    let removeButton = document.createElement('button');
                    removeButton.className='removeButton';
                    let closeImg = document.createElement('img');
                    closeImg.src='/client-side/icons/closeButton.png';
                    removeButton.appendChild(closeImg);



                    let name = document.createElement("p");
                    name.innerText = `${result.creditcardName}`;
                    name.style.fontWeight = "bold";

                    let number = document.createElement("p");
                    let SecuredCardNumber = SecureCardNumber(result.cardNumber);
                    number.innerText = `${SecuredCardNumber}`;
                    number.style.fontSize = "17px";
                    number.style.opacity = "0.5";

                    let balance = document.createElement("p");
                    balance.innerText = `current balance: ${result.currentBalance} L.E`;

                    let type = detectCardType(result.cardNumber);
                    let img = document.createElement("img");
                    img.src = `/client-side/icons/${type}.png`;

                    tableData.appendChild(name);
                    tableData.appendChild(number);
                    tableData.appendChild(balance);
                    tableData.appendChild(img);
                    tableData.appendChild(removeButton);
                    tableRow.appendChild(tableData);
                    removeButton.onclick = function () {
                        const parentTr = tableData.parentNode;
                        parentTr.removeChild(tableData);
                        deleteCreditCard(result.creditcardID , tableData.dataset.index);
                    }
                });

                document.querySelector(".CreditCardTable").appendChild(tableRow);
                if (tableRow.offsetWidth < 1310) {
                    document.querySelector('.CreditCardTable').style.overflowX = 'hidden';
                }
            }
        })
        .catch(error => console.error(error));
}
// call
window.addEventListener('DOMContentLoaded', () => {
    loadCreditCardInfo();


});


function deleteCreditCard(ID, index) {
    fetch(`http://localhost:8080/QuickPay/deleteCreditCard?creditcardID=${ID}&index=${index}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.text())
        .then(responseText => {
            console.log(responseText);
        })
    window.location.href="http://localhost:63342/QuickPay/Online-payment-project/client-side/html/Quickpay.html";
}
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
function SecureCardNumber(cardNumber){
     let SecuredCardNumber = "" ;
     for(let i = 1 ; i <= cardNumber.length ; i++){
         if( i <= cardNumber.length - 4 )
             SecuredCardNumber += '*';
         else
             SecuredCardNumber += cardNumber[i-1] ;
         if( i % 4 === 0) {
             SecuredCardNumber+=" ";
         }
     }
     return SecuredCardNumber ;
}

