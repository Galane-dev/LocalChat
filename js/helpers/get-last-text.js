import LocalStorageService from "../services/local-storage.js";
import SessionManager from "../services/session-manager.js";
import Chat from "../models/chat.js";

function getLastText(isGroup,userId){
    let allChats = LocalStorageService.getChats();
    let allGroups = LocalStorageService.getGroups();
    let currentUserId = SessionManager.getUser().id;
    let lastMsgText='No message yet'

    if (isGroup) {
    let group = allGroups.find(g=>g.id===userId);

    if (group && group.messages && group.messages.length > 0) {
        let lastMsg = group.messages[group.messages.length - 1];
        lastMsgText = lastMsg.content;
        
    }
} 
    else {
        let chatId = Chat.generateChatId(currentUserId, userId);
        let chat = allChats.find(c => c.id === chatId);

        if (chat && chat.messages && chat.messages.length > 0) {
            let lastMsg = chat.messages[chat.messages.length - 1];
            lastMsgText = lastMsg.content;
        }
    }
    return lastMsgText;
}

export default getLastText;