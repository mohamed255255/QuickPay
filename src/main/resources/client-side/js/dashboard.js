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

const FavouriteList  = document.querySelector('.FavouriteList');
const noFavouriteList  = document.querySelector('.noFavouriteList');




function goToSummaryLink(){
    document.querySelector(".summary").style.background = "#ffd400";
    document.querySelector(".fav").style.background="white";
    FavouriteList.style.display='none';
    noFavouriteList.style.display='none';
    notransactionList.style.display='block';
    transactionList.style.display='block';

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
             transactionList.innerHTML = `<div class="transactionTitles">
                                <p></p>
                                <p>Service type</p>
                                <p>Service name</p>
                                <p>Transaction type</p>
                                <p>Time</p>
                                <p>Date</p>
                            </div>`
                let NumberOfRows = 1;
                results.forEach(function(result) {
                    console.log(result);
                    const Number = document.createElement('p');
                    const listItem = document.createElement('div');
                    const servicename = document.createElement("p");
                    const servicetype = document.createElement("p");
                    const TransactionType = document.createElement("p");
                    const date = document.createElement("p");
                    const time = document.createElement("p");

                    Number.innerText = NumberOfRows++;
                    servicename.innerText = result.serviceName;
                    servicetype.innerText = result.servicetype;
                    TransactionType.innerText = result.transactionType;
                    date.innerText = result.date ;
                    time.innerText = result.time ;

                    listItem.appendChild(Number);
                    listItem.appendChild(servicetype);
                    listItem.appendChild(servicename);
                    listItem.appendChild(TransactionType);
                    listItem.appendChild(time);
                    listItem.appendChild(date);
                    transactionList.appendChild(listItem);
                });
            }
        })
}


function goToFavLink(){
    document.querySelector(".fav").style.background="#ffd400";
    document.querySelector(".summary").style.background="white";
    notransactionList.style.display='none';
    transactionList.style.display='none';
    fetch('http://localhost:8080/QuickPay/getallfav') .then(function(response) {
        return response.json();
    }).then(function(results){
        console.log(results);
        if (results.length === 0) {
            FavouriteList.style.display='none';
            noFavouriteList.style.display='block';
            noFavouriteList.innerHTML = '';
            const img = document.createElement('img');
            const firstTxt = document.createElement('p');
            img.src=`/client-side/icons/star2.png`;
            firstTxt.innerText = "There is no favourite services\n";
            noFavouriteList.appendChild(img);
            noFavouriteList.appendChild(firstTxt);

        }else{
            FavouriteList.style.display='block';
            noFavouriteList.style.display='none';
            let NumberOfRows = 1;
            FavouriteList.innerHTML = '';
            results.forEach(function(result) {
                const Number = document.createElement('p');
                const link = document.createElement('a');
                const servicename = document.createElement("p");
                const img = document.createElement("img");
                Number.innerText = NumberOfRows++;
                servicename.innerText = result.servicename;
                img.src = result.img_path ;
                link.href=`http://localhost:63342/QuickPay/Online-payment-project/client-side/html/${result.servicetype}/${result.company}.html`;
                link.appendChild(Number);
                link.appendChild(servicename);
                link.appendChild(img);
                FavouriteList.appendChild(link);

                link.addEventListener('click', function() {
                    localStorage.setItem('servicename', result.servicename);
                    localStorage.setItem('valid', '1');
                });
            });
        }
    })
}

localStorage.removeItem('valid');

window.addEventListener('DOMContentLoaded', () => {
    goToSummaryLink();
});
