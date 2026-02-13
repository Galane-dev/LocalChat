import LocalStorageService from "../services/local-storage.js";

class User{
    constructor(username,password){
        
        this.id=User.generateUserId();
        this.username=username;
        this.password=password;
        this.isLoggedIn=false;
        this.isOnline=false;
        this.lastSeen=Date.now();
    }

    static isUserNameUnique=(username)=>{
        let users=LocalStorageService.getUsers();
        return !(users.find(user=>user.username===username));
    }

    static generateUserId=()=>{
        return LocalStorageService.getUsers().length+1;
    }
}

export default User;