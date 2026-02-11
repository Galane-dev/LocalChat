import LocalStorageService from "./local-storage.js";
import User from "../models/user.js";

class SessionManager{

    static login(username,password){
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
    

    static logout(user){
        user.isLoggedIn=false;
        user.isOnline=false;
        sessionStorage.removeItem('user');
    }

    static getUser(){
        return JSON.parse(sessionStorage.getItem('user'));
    }


    static setTestValue(){
        sessionStorage.setItem('test','test value');
    }

    static getTestValue(){
        console.log(sessionStorage.getItem('test'));
    }
}


export default SessionManager;