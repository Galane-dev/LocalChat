import Message from "../models/message.js";
import User from "../models/user.js";
import Chat from "../models/chat.js";
import SessionManager from "./session-manager.js";
import Group from "../models/group.js";
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

    static messageGroup(groupId,content,replyTo){
        let message=new Message(content,replyTo);
        let groups=LocalStorageService.getGroups();
        for(let i=0;i<groups.length;i++){
            if(groups[i].id===groupId){
                groups[i].messages.push(message);
                break;
            }
        }

        localStorage.setItem('groups',JSON.stringify(groups));
    }

    static createGroup(name,particpants){
        let groups=JSON.parse(localStorage.getItem('groups'))||[];
        let group=new Group(name,particpants);
        groups.push(group);
        localStorage.setItem('groups',JSON.stringify(groups));
    }

    static getUsers(){
        return JSON.parse(localStorage.getItem('users'))||[];
    }

    static getGroups(){
        return JSON.parse(localStorage.getItem('groups'))||[];
    }

    static getChats(){
        return JSON.parse(localStorage.getItem('chats'))||[];
    }

    static getUser(userId){
        let users=LocalStorageService.getUsers();
        return users.find(user=>user.id===userId);
    }


    static updateProfile(username,password){
        let users=LocalStorageService.getUsers();
        let user=SessionManager.getUser();
        
        if(user){
            for(let i=0;i<users.length;i++){
                if(users[i].id===user.id){
                    users[i].username=username;
                    users[i].password=password;
                    break;
                }
            }

            localStorage.setItem('users',JSON.stringify(users));

        }
    }

}


export default LocalStorageService;