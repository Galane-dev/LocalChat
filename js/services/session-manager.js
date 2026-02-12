import LocalStorageService from "./local-storage.js";
import User from "../models/user.js";

class SessionManager{

    static login=(username,password)=>{
        let users=LocalStorageService.getUsers();
        let user=users.find(user=>(user.username===username && user.password===password));
        if(user){
            for(let i=0;i<users.length;i++){
                if(users[i]===user){
                    users[i].isLoggedIn=true;
                    users[i].isOnline=true;
                    break;
                }
            }

            localStorage.setItem('users',JSON.stringify(users));
            sessionStorage.setItem('user',JSON.stringify(user));
            return user;
        }

        return false;
    }
    

    static logout=()=>{
        let users=LocalStorageService.getUsers();
        let user=SessionManager.getUser();
        
        if(user){
            for(let i=0;i<users.length;i++){
                if(users[i].id===user.id){
                    users[i].isLoggedIn=false;
                    users[i].isOnline=false;
                    break;
                }
            }

            localStorage.setItem('users',JSON.stringify(users));
        }        
        sessionStorage.removeItem('user');
        window.location.replace('../index.html');
    }

    static getUser=()=>{
        return JSON.parse(sessionStorage.getItem('user'));
    }

}


export default SessionManager;