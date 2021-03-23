//  validate form
const openButton = document.querySelector('#signup');
const openButtonMobile = document.querySelector('.signup');
const confirmButton = document.querySelector('.confirmButton');
const exitButton = document.querySelector('.formButton');
const formMenu = document.querySelector('.formular');
// click event and prevent default
confirmButton.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('clicked')
    validate();
});
// Open form
openButton.addEventListener('click', function(){
    formMenu.classList.toggle('hidden');
});
openButtonMobile.addEventListener('click', function(){
    console.log('open form');
    formMenu.classList.toggle('hidden');
});
// Close the tab with x
exitButton.addEventListener('click', function(){
    formMenu.classList.toggle('hidden');

});
// function validate 

function validate() {

    // delete already existing spans
    if(document.querySelector('fieldset span')){
        document.querySelectorAll('fieldset span').forEach(element =>{
        element.remove();
        })
    }


    // error messages
    let validateError = {};
    // dictionary for values
    data = {
        firstName: document.querySelector('#firstName').value,
        lastName: document.querySelector('#lastName').value,
        email: document.querySelector('#email').value,
        phone: document.querySelector('#phone').value
    }
    // console.log(data.firstName)
   
    // first name check
    if (data.firstName.length < 2) {
        console.log('Please enter your first name');
        validateError.firstName = 'First name has to be longer than 2 letters';
    } else {
        
        console.log(data.firstName);
    }
    // last name check
    if (data.lastName.length < 2) {
        console.log('Please enter your last name');
        validateError.lastName = 'Last name has to be longer than 2 letters';
    } else {
        console.log(data.lastName);
        
    }
    // email check
    if(!data.email){
        console.log('Please ente your email address')
        validateError.email = 'Please enter your email address';
    }else{
        // RegEx check for mail
        let emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(!emailRegExp.test(data.email)){
            console.log('Email address is not valid');
            validateError.email = 'Your email is invalid, please try it again'
        }else{
            console.log('email is valid');
        }
    }
    //phone number check -- only swiss numbers
    let phoneRegExp = /^(\+41)\s(\d{2})\s(\d{3})\s(\d{2})\s(\d{2})*$/;
    if(!phoneRegExp.test(data.phone)){
        console.log('Phone number is invalid')
        validateError.phone = 'Your phone number is invalid, tip: +41 00 000 00 00';
    }else{
        console.log('phone number is valid')
    }
  
  

    // error message will appear in the page
    if(validateError.firstName){
        const errorContainer = document.createElement('span');
        errorContainer.innerText = validateError.firstName;
        document.querySelector('#firstName').after(errorContainer);
    }
    if(validateError.lastName){
        const errorContainer = document.createElement('span');
        errorContainer.innerText = validateError.lastName;
        document.querySelector('#lastName').after(errorContainer);
    }
    if(validateError.email){
        const errorContainer = document.createElement('span');
        errorContainer.innerText = validateError.email;
        document.querySelector('#email').after(errorContainer);
    }
    if(validateError.phone){
        const errorContainer = document.createElement('span');
        errorContainer.innerText = validateError.phone;
        document.querySelector('#phone').after(errorContainer);
    }

    
  if(Object.keys(validateError).length = 0 ){
   
    console.log('no errors');


  }else{
    formMenu.classList.toggle('hidden');   
  }
  

    
  // function end
}



