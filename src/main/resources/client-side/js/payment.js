/*u should delete to reset so i reset at load time by deleting the content */
window.addEventListener('load', () => {
    localStorage.removeItem('someServiceImg');
    localStorage.removeItem('serviceProvider');
    localStorage.removeItem('servicename');
});


let someServiceImg = new Image();
someServiceImg.src = localStorage.getItem('someServiceImg');

let serviceProvider = localStorage.getItem('serviceProvider');
let servicename = localStorage.getItem('servicename');

document.querySelector('.serviceProvider-tag img').src = someServiceImg.src;
document.querySelector('.firstText').textContent = serviceProvider;
document.querySelector('.secondText').textContent = servicename;