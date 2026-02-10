import LocalStorageService from "./local-storage.js";

class SessionManager{

    static Login(username,password){
        let users=LocalStorageService.getUsers();
        user=users.find(user=>(user.username===username && user.password===password));
        if(user){
            user.isLoggedIn=true;
            user.isOnline=true;

            sessionStorage.setItem('user',JSON.stringify(user));
            return user;
        }

        return false;
    }
    

    static Logout(user){
        user.isLoggedIn=false;
        user.isOnline=false;
        sessionStorage.removeItem('user');
    }


    static setTestValue(){
        sessionStorage.setItem('test','test value');
    }

    static getTestValue(){
        console.log(sessionStorage.getItem('test'));
    }
}


export default SessionManager;