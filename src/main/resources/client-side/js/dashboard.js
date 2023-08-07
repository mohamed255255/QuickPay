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
                  window.location.href = `/${result.serviceId}`; 
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







    function gotoServicesPage(){
      window.location.href = "/client-side/html/services.html";
     }
     
    function loadWelcomeMessage() {
      fetch('http://localhost:8080/QuickPay/welcome')
      .then(response => response.text())
      .then(data => {
          if(data == "Session not found"){
              alert("Session expired. Please log in again.");
              window.location.href = "http://localhost:63342/QuickPay-main/Online-payment-project/client-side/html/login.html";
          }
          document.querySelector('.dropdown-button').innerHTML = `Welcome<br>${data}`;
          document.querySelector('.firstname').innerHTML = `${data}`;;

      })
      .catch(error => console.error(error));
    }

    /// call welcome msg at load time
    window.addEventListener('load', () => {
      loadWelcomeMessage();
    });




/*    const mypayLink = document.getElementById("myPay");

    signUpForm.addEventListener('click', async (e) => {

        const response = await fetch('http://localhost:8080/QuickPay/ShowAllServices', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        } );
       /* response.forEach(function(result) {

            const listItem = document.createElement('li');
            const link = document.createElement("a");
            const img = document.createElement("img");

            link.textContent = result.servicename;
            img.src=`/${result.img_path}`;
            listItem.setAttribute('role' , 'button');
            listItem.addEventListener('click', function() {
                window.location.href = `/${result.serviceId}`;
            });
            listItem.appendChild(link);
            listItem.appendChild(img);
            resultsList.appendChild(listItem);


        });


    });*/


    // Get the dropdown button and dropdown content elements
    const dropdownButton = document.querySelector('.dropdown-button');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    // Add a click event listener to the dropdown button
    dropdownButton.addEventListener('click', function() {
        if (dropdownMenu.style.display === 'none') {
            dropdownMenu.style.display = 'flex';
        }else{
            dropdownMenu.style.display = 'none';
        }
    });
