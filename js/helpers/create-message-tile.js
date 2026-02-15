import LocalStorageService from "../services/local-storage.js";
const createMessageTile = (message, isCurrentUser) => {
    const tile=document.createElement('li');
    tile.id='message-tile';
    const messageText=document.createElement('p');
    messageText.id='message-tile-text';
    messageText.innerText=message.content;
    const messageSender=LocalStorageService.getUser(message.senderId);
    tile.style.width='70%';
    const messageDate=document.createElement('p');
    messageDate.id='message-date';
    messageDate.textContent= isCurrentUser? 'You'+' | '+new Date(message.timestamp).toLocaleString():
                            messageSender.username+' | '+new Date(message.timestamp).toLocaleString();
    if (isCurrentUser) {
        tile.style.backgroundColor = 'rgb(244, 107, 107)';
        tile.style.marginLeft = 'auto';
        tile.style.marginRight = '10px'; 
    } else {
        tile.style.backgroundColor = 'rgb(169, 169, 169)';
        tile.style.marginLeft = '10px'; 
        tile.style.marginRight = 'auto';
    }
    tile.style.backgroundColor=isCurrentUser?'rgb(244, 107, 107)' 
                                :'rgb(169, 169, 169)';
    tile.append(messageText, messageDate);
    return tile;
};

export default createMessageTile;