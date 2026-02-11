import Message from "../models/message.js";
import User from "../models/user.js";
import Chat from "../models/chat.js";
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

    static sendMessage(chatId,content,replyTo){
        let message=new Message(content,replyTo);
        let chats=LocalStorageService.getChats();
        let currentChat=chats.find(chat=>chat.id===chatId);
        if(!currentChat){
            console.log('Creating chat');
            currentChat=new Chat(chatId);
            chats.push(currentChat);
        }

        currentChat.messages.push(message);

        for(let i=0;i<chats.length;i++){
            if(chats[i].id===currentChat.id){
                chats[i]=currentChat;
                break;
            }
        }

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