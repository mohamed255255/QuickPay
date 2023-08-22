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

                data.forEach(function (result) {
                    const tableData = document.createElement("td");
                    tableData.className = "dataElement"; // Add a class name for styling

                    let name = document.createElement("p");
                    name.innerText = `${result.creditcardName}`;
                    name.style.fontWeight = "bold";

                    let number = document.createElement("p");
                    let SecuredCardNumber = changeformat(result.cardNumber);
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

                    tableRow.appendChild(tableData);
                });

                document.querySelector(".CreditCardTable").appendChild(tableRow);


            }
        })
        .catch(error => console.error(error));
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

function changeformat(cardNumber){
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