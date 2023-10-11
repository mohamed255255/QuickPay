// Get the dropdown button and dropdown content elements
const serviceTypeButton = document.querySelector('.service-type-menu-button');
const dropdownMenu2 = document.querySelector('.service-type-menu');
// Add a click event listener to the dropdown button

serviceTypeButton.addEventListener('click', function() {
    if(localStorage.getItem('fakepage') === '1'){
        dropdownMenu2.style.display = 'none';
    }else{

        if (dropdownMenu2.style.display === 'none') {
            dropdownMenu2.style.display = 'flex';
        }else{
            dropdownMenu2.style.display = 'none';
        }
    }
});

const menuButton = document.querySelector('#service-type-menu-button');
const menuOptions = document.querySelectorAll('.menu-option');
const TextField = document.querySelector('.txt_field');
let servicename;  /// service name from the drop down-menu

//if I come from dashboard favourite list So I should have my service name stored else its empty
window.addEventListener('DOMContentLoaded', () => {
    if(localStorage.getItem('fakepage') === '1'){
        TextField.style.display = 'flex';
        document.querySelector('#service-type-menu-button').textContent =
        servicename = localStorage.getItem('servicename' , servicename);
        document.querySelector('#service-type-menu-button').style.paddingRight='300px';
    }});

menuOptions.forEach(option => {
        option.addEventListener('click', (event) => {
            event.preventDefault();
            servicename = option.textContent;
            menuButton.querySelector('span').textContent = servicename;
            dropdownMenu2.style.display = 'none';
            TextField.style.display = 'flex';

            // Remove red warning after picking
            serviceTypeButton.style.color = 'black';
            serviceTypeButton.style.border = '1px solid #d8d4d485';

        });
    });

let nextButton = document.getElementById('next-button');

let valid = 1
nextButton.addEventListener('click', (event) => {
    if(document.querySelector('.service-type-menu-button').textContent === 'Service types'){
              serviceTypeButton.style.color = 'red';
              serviceTypeButton.style.border = '1px solid red';
        valid = 0 ;
    }else{
        valid = 1
    }
    let AllTextFields = document.querySelectorAll('.txt_field');
    AllTextFields.forEach(txtfield =>{
       if(txtfield.querySelector('input').value.length === 0){
           txtfield.style.borderBottom = '1px solid red';
           txtfield.querySelector('label').style.color = 'red';
           valid = 0 ;
           }else{
           txtfield.style.borderBottom = '1px solid green';
           document.querySelector('label').style.color = 'green';
           valid = 1
          }
        })
    if(valid){
        localStorage.setItem('someServiceImg'  , document.querySelector('.serviceProvider-tag img').src);
        localStorage.setItem('serviceProvider' , document.querySelector('.serviceProvider-tag p').textContent);
        localStorage.setItem('servicename'     , servicename);
        const url = window.location.href;
        const pathArray = url.split('/');
        const lastSegment = pathArray[pathArray.length - 2];
        const servicetype = lastSegment.split('.')[0]; // Output: 'mobileBill / mobileRecharge etc'
        localStorage.setItem( 'servicetype' , servicetype );
        window.location.href = "http://localhost:63342/QuickPay/Online-payment-project/client-side/html/payment.html";
    }

});





