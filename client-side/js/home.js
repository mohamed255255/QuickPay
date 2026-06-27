HiddenLoginForm = document.querySelector('.hiddenForm');
HiddenSignupForm = document.querySelector('.center');
function showSigninForm(){
    HiddenSignupForm.style.display ='none';
    if(HiddenLoginForm.style.display === 'none'){
        HiddenLoginForm.style.display = 'block';
    }else{
        HiddenLoginForm.style.display ='none';
    }
}
function showSignupForm(){
    HiddenLoginForm.style.display ='none'
    if(HiddenSignupForm.style.display === 'none'){
        HiddenSignupForm.style.display = 'block';
    }else{
        HiddenSignupForm.style.display ='none';
    }
}

/// if I type in any txt fields the label goes up (valid = go up)
let AllTextFields = document.querySelectorAll('.txt_field input');
AllTextFields.forEach(textFields =>{
    textFields.addEventListener('input' , function (){
        if(textFields.value.length > 0){
            textFields.classList.add('valid');
        }
    })
})
