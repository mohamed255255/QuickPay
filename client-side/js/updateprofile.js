let profilePicture = document.getElementById("profilePicture");
let inputFile = document.getElementById("input-file");

inputFile.onchange= function (){
    const file = inputFile.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.addEventListener('load', () => {
        profilePicture.src = reader.result;
    });

}

const save = document.querySelector('.save');
save.addEventListener('click' , function (){
    const requestBody = {
         firstname      : document.querySelector('.firstname').value  ,
         lastname       : document.querySelector('.lastname').value ,
         phonenumber    : document.querySelector('.phonenumber').value  ,
         email          : document.querySelector('.email').value ,
         profilepicture : profilePicture.src

    }
    fetch("http://localhost:8080/QuickPay/updateUserData" , {
        method: 'POST', headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(requestBody)}
    ).then( response =>{
        console.log(requestBody) ; return response.json();
    })
})
/// get data in the txt fields
fetch("http://localhost:8080/QuickPay/getUserData").then(response =>{
          return response.json();
        })
    .then( function (data){
        console.log(data);
        document.querySelector('.firstname')  .value = data.firstname ;
        document.querySelector('.lastname')   .value = data.lastname ;
        document.querySelector('.phonenumber').value = data.phonenumber ;
        document.querySelector('.email')      .value = data.email ;
        document.querySelector('.gender')     .textContent = data.gender ;
        document.getElementById('profilePicture').src = data.profilepicture;
    })


