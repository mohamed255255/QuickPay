
const dropdownButton = document.querySelector('.dropdown-button');
const dropdownMenu = document.querySelector('.dropdown-menu');
dropdownButton.addEventListener('click', function() {
    if (dropdownMenu.style.display === 'none') {
        dropdownMenu.style.display = 'flex';
    }else{
        dropdownMenu.style.display = 'none';
    }
});

function loadWelcomeMessage() {
    fetch('http://localhost:8080/QuickPay/welcome')
        .then(response => response.text())
        .then(data => {
            if(data === "Session not found"){
                alert("Session expired. Please log in again.");
                window.location.href = "http://localhost:63342/QuickPay/Online-payment-project/client-side/html/login.html";
            }
            document.querySelector('.dropdown-button').innerHTML = `Welcome<br>${data} ▾`;
            document.querySelector('.firstname').innerHTML = `${data}`;;

        })
        .catch(error => console.error(error));
}

/// call welcome msg at load time for all the pages
window.addEventListener('load', () => {
    loadWelcomeMessage();
});
