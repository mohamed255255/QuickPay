// Get the dropdown button and dropdown content elements
const serviceTypeButton = document.querySelector('.service-type-menu-button');
const dropdownMenu2 = document.querySelector('.service-type-menu');
// Add a click event listener to the dropdown button
serviceTypeButton.addEventListener('click', function() {
    if (dropdownMenu2.style.display === 'none') {
        dropdownMenu2.style.display = 'flex';
    }else{
        dropdownMenu2.style.display = 'none';
    }
});



const menuButton = document.getElementById('service-type-menu-button');
const menuOptions = document.querySelectorAll('.menu-option');
const TextField = document.querySelector('.txt_field');
let servicename;  /// service name from the drop down-menu
menuOptions.forEach(option => {
    option.addEventListener('click', (event) => {
        event.preventDefault();
        servicename = option.textContent;
        menuButton.querySelector('span').textContent = servicename;
        dropdownMenu2.style.display = 'none';
        TextField.style.display = 'flex';
    });
});

let nextButton = document.getElementById('next-button');

nextButton.addEventListener('click', (event) => {

    localStorage.setItem('someServiceImg', document.querySelector('.serviceProvider-tag img').src);
    localStorage.setItem('serviceProvider' , document.querySelector('.serviceProvider-tag p').textContent);
    localStorage.setItem('servicename' , servicename);




});






