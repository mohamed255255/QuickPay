let serviceProvider = localStorage.getItem('serviceProvider');
let servicename = localStorage.getItem('servicename');
let orderNumber = 1 ;

function incrementOrder(){
    let storedNum = localStorage.getItem("orderNumber");
    if(!storedNum) {
        storedNum = orderNumber;
    }
    localStorage.setItem("orderNumber", orderNumber.toString());
    orderNumber = parseInt(storedNum) + 1
    localStorage.setItem("orderNumber", orderNumber.toString());
    return orderNumber;
}
document.querySelector('.servicetype').textContent = serviceProvider;
document.querySelector('.servicename').textContent = servicename;
document.querySelector('.orderNo').textContent = 'order # : ' + incrementOrder() ;