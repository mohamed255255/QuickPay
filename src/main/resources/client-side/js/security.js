const save = document.querySelector('.save');

save.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const currentPassword = document.querySelector('.currentPassword')
    const newPassword = document.querySelector('.newPassword');
    const confirmPassword = document.querySelector('.confirmPassword');

    const requestBody = {
        currentpassword: currentPassword.value,
        newpassword: newPassword.value
    };

    valid = 1 ;
    if(currentPassword.value.length === 0){
        valid = 0 ;
        currentPassword.style.borderBottom = "2px red solid"
    }else{
        valid = 1
        currentPassword.style.borderBottom = "2px green solid"
    }
    if(newPassword.value.length === 0){
        valid = 0 ;
        newPassword.style.borderBottom = "2px red solid"
    }else{
        valid = 1
        currentPassword.style.borderBottom = "2px green solid"

    }
    if(confirmPassword.value.length === 0){
        valid = 0 ;
        confirmPassword.style.borderBottom = "2px red solid"
    }else{
        valid = 1
        currentPassword.style.borderBottom = "2px green solid"
    }
    if(valid){
        fetch('http://localhost:8080/QuickPay/updatePassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
           })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log(response);
                return response;
            })
            .catch(error => {
                console.error(error);
            });
    }

});


