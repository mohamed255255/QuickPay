const save = document.querySelector('.save');

save.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const currentPassword = document.querySelector('.currentPassword').value;
    const newPassword = document.querySelector('.newPassword').value;
    const confirmPassword = document.querySelector('.confirmPassword').value;

    const requestBody = {
        currentpassword: currentPassword,
        newpassword: newPassword
    };

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
});