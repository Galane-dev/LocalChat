let isSignIn=true;
const defaultHeading=document.getElementById('welcome-heading');
const defaultQuestion=document.getElementById('toggle-question');
const defaultView=document.getElementById('toggle-action');
const defaultMessage=document.getElementById('welcome-message');



function toggleView(){
    let heading=document.getElementById('welcome-heading');
    let toggleQuestion=document.getElementById('toggle-question');
    let toggleView=document.getElementById('toggle-action');
    let toggleMessage=document.getElementById('welcome-message');
    let submitButton=document.getElementById('submit-button');



    if(isSignIn){
        heading.textContent='Hey newbie...';
        toggleQuestion.textContent='Already have an account?';
        toggleMessage.textContent='LocalChat is a local chat appYour data is stored securely in your own computer, no one but you will be able to access the data.';
        toggleView.textContent="Sign In";
        submitButton.textContent='Sign Up';

    }
    else{
        heading.textContent='Welcome Back...';
        toggleQuestion.textContent='Don’t have an account?';
        toggleMessage.textContent='LocalChat is a local chat appYour data is stored securely in your own computer, no one but you will be able to access the data';
        toggleView.textContent='Sign Up';
        submitButton.textContent='Sign In';

    }

    isSignIn=!isSignIn;
    console.log('done');
}











function main(){
    console.log('Main method test');
    defaultView.addEventListener('click',()=>toggleView());
}

main();