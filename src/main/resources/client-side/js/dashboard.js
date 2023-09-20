    const resultsList = document.getElementById('results-list');
    function search(query) {
      if (query.length > 0) {
        fetch(`http://localhost:8080/QuickPay/search?servicename=${encodeURIComponent(query)}`)
          .then(function(response) {
            return response.json();
          })
          .then(function(results) {
            resultsList.innerHTML = '';
            if (results.length === 0) {
              document.getElementById('search-results').style.display = 'none';
              }else{
              document.getElementById('search-results').style.display = 'block';
              results.forEach(function(result) {

                const listItem = document.createElement('li');
                const link = document.createElement("a");
                const img = document.createElement("img");
                
                link.textContent = result.servicename;
                img.src=`/${result.img_path}`;

                listItem.setAttribute('role' , 'button');

                listItem.addEventListener('click', function() {
                    const url = `http://localhost:63342/QuickPay/Online-payment-project/client-side/html/${result.servicetype}/${result.company}.html`;
                    window.location.href = url;
                });
                listItem.appendChild(link);
                listItem.appendChild(img);
                resultsList.appendChild(listItem);
              });
            }
          })
          .catch(function(error) {
            console.error(error);
          });
      } else {
        resultsList.innerHTML = '';
        document.getElementById('search-results').style.display = 'none';
      }
    }

    /// Serach call
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', function(event)
    {
    const query = event.target.value.toLowerCase();
    search(query);
    });



const transactionList = document.querySelector(".transactionList")  ;
const notransactionList = document.querySelector(".noTransactionList")  ;





function goToSummaryLink(){
    document.querySelector(".summary").style.background = "#ffd400";
    document.querySelector(".fav").style.background="white";

    fetch('http://localhost:8080/QuickPay/GetTransactions').then( function(response) {
        return response.json();
    })
        .then(function(results) {
            notransactionList.innerHTML = '';
            if (results.length === 0) {
                const img = document.createElement('img');
                const firstTxt = document.createElement('p');
                const secondTxt = document.createElement('p');
                const link = document.createElement('a');
                img.src=`/client-side/icons/trans.png`;
                firstTxt.innerText = "There is no payment transaction for now\n";
                firstTxt.style.fontSize="20px";
                secondTxt.innerText = "You can start make your payment right\t";
                secondTxt.style.opacity="0.7";
                link.href="http://localhost:63342/QuickPay/Online-payment-project/client-side/html/serviceCategory.html";
                link.innerText = "Here";
                link.style.fontWeight="bold";


                notransactionList.appendChild(img);
                notransactionList.appendChild(firstTxt);
                notransactionList.appendChild(secondTxt);
                secondTxt.appendChild(link);
                notransactionList.appendChild(secondTxt);


            }else{
                transactionList.innerHTML = '';
                results.forEach(function(result) {
                    console.log(result);
                    const listItem = document.createElement('div');
                    const servicename = document.createElement("p");
                    const servicetype = document.createElement("p");
                    const TransactionType = document.createElement("p");
                    const img = document.createElement("img");

                    servicename.innerText = result.serviceName;
                    servicetype.innerText = result.servicetype;
                    TransactionType.innerText = result.transactionType;
                    img.src=`${result.imgPath}`;
                    img.className="transactionImg"


                    listItem.appendChild(servicename);
                    listItem.appendChild(servicetype);
                    listItem.appendChild(TransactionType);
                    listItem.appendChild(img);
                    transactionList.appendChild(listItem);
                });
            }
        })

}
function goToFavLink(){
    document.querySelector(".fav").style.background="#ffd400";
    document.querySelector(".summary").style.background="white";

    fetch('http://localhost:8080/QuickPay/getallfav') .then(function(response) {
        return response.json();
    }).then(function(results){

        console.log(results);
    })
}

/// by def
const dashboard = "http://localhost:63342/QuickPay/Online-payment-project/client-side/html/dashboard.html";
if(window.location.href === dashboard){
    goToSummaryLink();
}

