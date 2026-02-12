import LocalStorageService from "./services/local-storage.js";
import SessionManager from "./services/session-manager.js";
import User from "./models/user.js";


console.log(LocalStorageService.getUsers());
let isSignUp=true;
const defaultView=document.getElementById('toggle-action');
let authButton=document.getElementById('submit-button');


function toggleView(){
    let heading=document.getElementById('welcome-heading');
    let toggleQuestion=document.getElementById('toggle-question');
    let toggleView=document.getElementById('toggle-action');
    let toggleMessage=document.getElementById('welcome-message');
    let submitButton=document.getElementById('submit-button');



    if(isSignUp){
        heading.textContent='Hey newbie...';
        toggleQuestion.textContent='Already have an account?';
        toggleMessage.innerHTML='LocalChat is a local chat app.<br>Your data is stored securely in your own <br>computer, no one but you will be able to access the data.';
        toggleView.textContent="Sign In";
        submitButton.textContent='Sign Up';

    }
    else{
        heading.textContent='Welcome Back...';
        toggleQuestion.textContent='Don’t have an account?';
        toggleMessage.innerHTML='LocalChat is a local chat app.<br>Your data is stored securely in your own <br>computer, no one but you will be able to access the data.';
        toggleView.textContent='Sign Up';
        submitButton.textContent='Sign In';

    }

    isSignUp=!isSignUp;
    console.log('done');
}


function authenticate(){
    let username=document.getElementById('username-input').value;
    let password=document.getElementById('password-input').value;
    if(!isSignUp){
        if(User.isUserNameUnique(username)){
            //Create an account
            LocalStorageService.createUser(username,password);
            console.log(LocalStorageService.getUsers());
        }
        else{
            alert('Please enter a new username, make it unique');
            return;
        }
    }
    //Login
    let user=SessionManager.login(username,password);
    console.log(user);
    if(user){
        console.log('logged in as '+ user.username);
        //Navigate to the main page
        window.location.replace('./pages/main.html');
    }
    else{
        alert('Login failed, ensure you have entered correct credentials');
        return;
    }
}










function main(){
    console.log('Main method test');
    defaultView.addEventListener('click',()=>toggleView());
    authButton.addEventListener('click', ()=>authenticate());
}

main();