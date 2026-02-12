import createMessageTile from "./create-message-tile.js";

const displayMessages=(chat,messagesCount,currentUser)=>{
    const chatsList=document.getElementById('chats-list');
    const noMessages=document.getElementById('no-messages');

    if(messagesCount>0){
        chatsList.style.display='inline';
        noMessages.style.display='none';
    }
    else{
        chatsList.style.display='none';
        noMessages.style.display='inline';
        return;
    }

    chat.messages.forEach(currentMessage => {
        const message= currentMessage;
        const messageTile = createMessageTile(message, message.senderId === currentUser);
        chatsList.appendChild(messageTile);
    });
}

export default displayMessages;