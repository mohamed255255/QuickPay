const dropdownMenu2  = document.querySelector('.dropdown-menu2');
const dropdownButton2 = document.querySelector('.dropdown-button2');
let servicename ;

dropdownButton2.addEventListener('click' , function () {
    if(dropdownMenu2.style.display === 'none'){
        dropdownMenu2.style.display = 'block';
        document.querySelectorAll('.option').forEach(option=>{
            option.addEventListener('click', function (){
                document.querySelector('.dropdown-button2 span').textContent = option.textContent;
                servicename = option.textContent;
                dropdownMenu2.style.display = 'none';
            });
        })
     }else{
        dropdownMenu2.style.display = 'none';
    }
})


fetch(`http://localhost:8080/QuickPay/getAllServiceNames?servicename`)
    .then(response=>{return response.json()})
    .then(ListOfServiceNames =>{
        (ListOfServiceNames).sort();
        ListOfServiceNames.forEach(element=>{
            const para = document.createElement('p');
            para.className="option";
            para.innerHTML = element;
            dropdownMenu2.appendChild(para);
        })
    })





const MenuOfTransactions = document.querySelector('.MenuOfTransactions');

document.querySelector('.searchWithinDate').addEventListener('click' , function (){
    let valid = 0;
    const startingDate = document.querySelector('.startingDate');
    const endingDate = document.querySelector('.endingDate');
    const choice = document.querySelector('.dropdown-button2 span');
    if(startingDate.value === ''){
        valid = 0 ;
        startingDate.style.border='2px red solid';
        startingDate.style.color='red';
    }
    else{
        valid = 1 ;
        endingDate.style.border ='1px black solid';
        startingDate.style.color='black';
    }
    if(endingDate.value === ''){
        valid = 0 ;
        endingDate.style.border='2px red solid';
        endingDate.style.color='red';
    }
    else {
        valid = 1 ;
        endingDate.style.border ='1px black solid';
        endingDate.style.color='black';
    }
    if(choice.textContent === 'Service name'){
        valid = 0 ;
        choice.style.color='red';
        dropdownButton2.style.border='2px red solid';
    }else{
        valid = 1;
        choice.style.color='black';
        endingDate.style.border ='1px black solid';
    }


    if(valid){
        fetch(`http://localhost:8080/QuickPay/myHistory?servicename=${servicename}&startingDate=${startingDate.value}&endingDate=${endingDate.value}`)
            .then(response=>{return response.json()})
            .then(ListOfPaymentTransactions =>{
                console.log(ListOfPaymentTransactions)
                if (ListOfPaymentTransactions.length === 0) {
                    MenuOfTransactions.style.display='none';
                    alert('There is no payment made for ' + servicename)
                }else{
                    MenuOfTransactions.innerHTML = `<div class="TableTitles">
                                    <p></p>
                                    <p>Service name</p>
                                    <p>Service type</p>
                                    <p>Fees</p>
                                    <p>Date</p>
                                    <p>Time</p>
                                </div>`
                    let NumberOfRows = 1;
                    ListOfPaymentTransactions.forEach(function(result) {
                        const Number = document.createElement('p');
                        const listItem = document.createElement('div');
                        const servicename = document.createElement("p");
                        const serviceType = document.createElement("p");
                        const fees = document.createElement("p");
                        const date = document.createElement("p");
                        const time = document.createElement("p");

                        Number.innerText = NumberOfRows++;
                        servicename.innerText = result.serviceName;
                        serviceType.innerText = result.servicetype;
                        fees.innerText = result.servicePrice + ' E£';
                        date.innerText = result.date;
                        time.innerText = result.time;

                        listItem.appendChild(Number);
                        listItem.appendChild(servicename);
                        listItem.appendChild(serviceType);
                        listItem.appendChild(fees);
                        listItem.appendChild(date);
                        listItem.appendChild(time);
                        MenuOfTransactions.appendChild(listItem);
                    })
                }
            })
    }


})

