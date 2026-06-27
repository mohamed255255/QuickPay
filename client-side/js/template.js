
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
                window.location.href = "http://localhost:63342/QuickPay/Online-payment-project/client-side/html/home.html";
            }
            document.querySelector('.dropdown-button').innerHTML = `Welcome<br>${data} ▾`;

        })
        .catch(error => console.error(error));
}

function getProfilePicture() {
    fetch('http://localhost:8080/QuickPay/getProfilePicture')
        .then(response => response.text())
        .then(dataURL => {
            if(dataURL === "null"){
                document.getElementsByClassName('pfpImage')[0].src ='/client-side/icons/profile.png'
            }else{
                document.getElementsByClassName('pfpImage')[0].src = dataURL;
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
/// call welcome msg at load time for all the pages
window.addEventListener('load', () => {
    loadWelcomeMessage();
    getProfilePicture();
});


/// if i type in any txt fields the label goes up (valid = go up)
let AllTextFields = document.querySelectorAll('.txt_field input');
AllTextFields.forEach(textFields =>{
    textFields.addEventListener('input' , function (){
        if(textFields.value.length > 0){
            textFields.classList.add('valid');
        }
    })
})