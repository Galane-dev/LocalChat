import Chat from "../models/chat.js";
import User from "../models/user.js";
import LocalStorageService from "../services/local-storage.js";

const getChatData=(user1,user2,type)=>{
    const chatsList=document.getElementById('chats-list');
    chatsList.innerHTML='';
    let chatId,currentChat,messagesCount;
    if(type==='private'){
        chatId=Chat.generateChatId(user1, user2);
        const allChats=LocalStorageService.getChats();
        currentChat=allChats.find(chat=>chat.id===chatId);
    }
    else{
        const groups=LocalStorageService.getGroups();
        currentChat=groups.find(group=>group.id===user1);
        chatId=user1;
    }

    messagesCount=currentChat?.messages?.length||0;

    return {chatId,currentChat,messagesCount};
}

export default getChatData;