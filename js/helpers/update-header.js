import LocalStorageService from "../services/local-storage.js";

const updateChatHeader=(chateeId,chatData,type)=>{
    const chateeName=document.getElementById('chatee-name');
    const chateeSideName=document.getElementById('chatee-side-name');
    const chateeStatus=document.getElementById('chatee-status');
    const chateeSideStatus=document.getElementById('chatee-side-status');

    if(type==='private'){
        const chatee=LocalStorageService.getUser(chateeId);
        chateeName.textContent=chatee.username;
        chateeSideName.textContent=chatee.username;
        chateeStatus.textContent=chatee.isOnline?'Online':'Offline';
        chateeSideStatus.textContent=chateeStatus.textContent;
    }
    else{
        chateeName.textContent=chatData.currentChat.name;
        chateeSideName.textContent=chatData.currentChat.name;
        chateeStatus.textContent='Group';
        chateeSideStatus.textContent='Group';
    }

}

export default updateChatHeader;