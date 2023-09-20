// save info to data base
const save = document.querySelector('.save');
save.addEventListener('click' , function (){
    const requestBody = {
         firstname : document.querySelector('.firstname').value  ,
         lastname: document.querySelector('.lastname').value ,
         phonenumber: document.querySelector('.phonenumber').value  ,
         email: document.querySelector('.email').value ,
         profilepicture : document.getElementById('pfp').src

    }
    fetch("http://localhost:8080/QuickPay/updateUserData" , {
        method: 'POST', headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(requestBody)} ).then(response =>{
        console.log(response) ;
    })
})


/// put a new pfp
let pfp = document.getElementById("pfp");
let inputFile = document.getElementById("input-file");

inputFile.onchange= function (){
    pfp.src  = URL.createObjectURL(inputFile.files[0]);
}


/// get data in the txt fields
fetch("http://localhost:8080/QuickPay/getUserData").then(response =>{
        return response.json();
    }).then( function (response){
        document.querySelector('.firstname').value = response.firstname ;
        document.querySelector('.lastname').value = response.lastname ;
        document.querySelector('.phonenumber').value = response.phonenumber ;
        document.querySelector('.email').value = response.email ;
        document.getElementById('pfp').src = response.profilepicture;
    }
)

