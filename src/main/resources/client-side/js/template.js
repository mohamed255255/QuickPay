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

function loadWelcomeMessage() {
    fetch('http://localhost:8080/QuickPay/welcome')
        .then(response => response.text())
        .then(data => {
            if(data == "Session not found"){
                alert("Session expired. Please log in again.");
                window.location.href = "http://localhost:63342/QuickPay/Online-payment-project/client-side/html/login.html";
            }
            document.querySelector('.dropdown-button').innerHTML = `Welcome<br>${data} ▾`;
            document.querySelector('.firstname').innerHTML = `${data}`;;

        })
        .catch(error => console.error(error));
}

/// call welcome msg at load time
window.addEventListener('load', () => {
    loadWelcomeMessage();
});
