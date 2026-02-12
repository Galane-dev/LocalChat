import LocalStorageService from "../services/local-storage.js";
import openChat from "../main-page.js";

const setupSendMessageHandler = (userId1, userId2, type, chatId) => {
    const sendIcon=document.getElementById('message-send');
    sendIcon.onclick = null;
    sendIcon.onclick=()=>{
        const content= document.getElementById('message-text').value.trim();
        if (content==='') return;
        
        if (type==='group') {
            LocalStorageService.messageGroup(chatId, content, 'none');
        } else {
            LocalStorageService.sendMessage(chatId, content, 'none');
        }
        document.getElementById('message-text').value = '';
        openChat(userId1, userId2, type);
    };
};

export default setupSendMessageHandler;