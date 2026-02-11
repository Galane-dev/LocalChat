import User from "../models/user.js";
class LocalStorageService{
    constructor(){

    }

    static createUser(username,password){
        let users=JSON.parse(localStorage.getItem('users'))||[];
        const user=new User(username,password);
        users.push(user);
        localStorage.setItem('users',JSON.stringify(users));
    }

    static createChat(userId1,userId2){
        let chats=JSON.parse(localStorage.getItem('chats'));
        let chat=new Chat(userId1,userId2);
        chats.push(chat);
        localStorage.setItem('chats',JSON.stringify(chats));        
    }

    static createGroup(){
        
    }

    static getUsers(){
        return JSON.parse(localStorage.getItem('users'))||[];
    }

    static getChats(){
        return JSON.parse(localStorage.getItem('chats'))||[];
    }

}


export default LocalStorageService;