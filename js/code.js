$(document).ready(function(){
// code here

// Variable for html elements
//Menubuttons to start the game
const startButton = document.querySelector('#break');
const selectWheel = document.querySelector('.cardsamount');
//const amount = document.querySelectorAll('li');
//gallery buttons and variable
const openGallery = document.querySelector('#background');
const gallery = document.querySelector('.backgroundChange');
const choosenPic = document.querySelector('.choosen');
const exitGallery = document.querySelector('.backgroundExit');
const nextPic = document.querySelector('.fa-arrow-right');
const prevPic = document.querySelector('.fa-arrow-left');
const images = document.querySelectorAll('.selection > img');
let current = document.querySelector('.preview img');

// open the menu 
startButton.addEventListener('click', () =>{
    // selectAmount();
    selectWheel.classList.toggle('hidden');
    console.log('clicked');
});

// open and close the gallery 
    $(openGallery).on('click',function(){
        console.log('gallery open');
        $(gallery).toggleClass('hidden');
    });
    $(exitGallery).on('click',function(){
        console.log('gallery closed');
        $(gallery).toggleClass('hidden');
    });

// click on the images
// select next background pic
let bildIndex = 0
$(nextPic).on('click',function(){
    console.log('clicked on the arrow');
    if(bildIndex < images.length-1){
    bildIndex += 1;
    let bild = images[bildIndex];
    console.log(bild);
    $(images).css('opacity','1');
    $(bild).css('opacity','0.5');
    $(current).attr('src', $(bild).attr('src'));   
    };
});

// images change when clicked
$(images).each(function(){
    $(images[0]).css('opacity','0.5');
    
    $(this).on('click',function(){
        console.log(this);
        $(images).css('opacity','1');
        $(this).css('opacity','0.5');
        $(current).attr('src', $(this).attr('src'));
    });
});
// select prev background pic
$(prevPic).on('click',function(){
    console.log('clicked on the arrow');
    if(bildIndex > 0){
     bildIndex -= 1;
    let bild = images[bildIndex];
    console.log(bild);
    $(images).css('opacity','1');
    $(bild).css('opacity','0.5')
    $(current).attr('src', $(bild).attr('src'));   
    }; 
});
// change the background for the choosen image 
$(choosenPic).on('click',function(){
    console.log('clicked on the button');
    $('.board').css('background-image','url('+$(current).attr('src')+')');
    $(gallery).toggleClass('hidden');
});
 


    //code end here
});



