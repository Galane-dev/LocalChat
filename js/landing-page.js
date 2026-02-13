import LocalStorageService from "./services/local-storage.js";
import SessionManager from "./services/session-manager.js";
import User from "./models/user.js";

let isSignUp=true;
const defaultView=document.getElementById('toggle-action');
let authButton=document.getElementById('submit-button');

//Toggle view for toggling between login and signup
const toggleView=()=>{
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

    }
    isSignUp=!isSignUp;
}


const authenticate=()=>{
    let username=document.getElementById('username-input').value;
    let password=document.getElementById('password-input').value;
    if(!isSignUp){
        if(User.isUserNameUnique(username)){
            LocalStorageService.createUser(username,password);
        }
        else{
            alert('Please enter a new username, make it unique');
            return;
        }
    }
    //Login
    let user=SessionManager.login(username,password);
    if(user){
        window.location.replace('./pages/main.html');
    }
    else{
        alert('Login failed, ensure you have entered correct credentials');
        return;
    }
}


const main=()=>{
    defaultView.addEventListener('click',()=>toggleView());
    authButton.addEventListener('click', ()=>authenticate());
}

main();