const categoryButton = document.querySelector('.category-button');
const categoryMenu = document.querySelector('.category-menu');

categoryButton.addEventListener('click', function() {
    if (categoryMenu.style.display === 'none') {
        categoryMenu.style.display = 'flex';
    }else{
        categoryMenu.style.display = 'none';
    }
});


const menuOptions = document.querySelectorAll('.options');
    menuOptions.forEach(option => {
    option.addEventListener('click', (event) => {
        event.preventDefault();
        categoryButton.firstChild.nodeValue = option.textContent;
        document.querySelector('.category-button').style.color='#1b6ca1'
        document.querySelector('.category-button').style.borderBottom='3px solid #1b6ca1';
        categoryMenu.style.display = 'none';
    });
});





let text = document.querySelector('textarea');

text.addEventListener('input', function() {
    if (text.value.length > 5) {
        text.style.borderBottom = '3px solid #1b6ca1';
    } else {
        text.style.borderBottom = ''; // Reset the border style if the condition is not met
    }
});

text.addEventListener('focus', function() {
    if (text.value.length === 0 ) text.style.borderBottom = '3px solid red';
})


const sendButton = document.getElementById('sendButton');
sendButton.addEventListener('click', (e) => {
    e.preventDefault();
    const data = {
        reason: document.querySelector('textarea').value ,
        category : document.querySelector('.category-button').textContent
    };

    if(categoryButton.textContent === 'Category'){
          categoryButton.style.borderBottom = '2px solid red';
          categoryButton.querySelector('span').style.color='red';

    }
    else if(document.querySelector('textarea').value.length === 0){
        document.querySelector('textarea').style.borderBottom = '2px solid red';
    }
    else{
        fetch('http://localhost:8080/QuickPay/sendComplaint', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(response => {
                console.log(response);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                alert("Successfully sent")
                return response.text();
            })

    }
});