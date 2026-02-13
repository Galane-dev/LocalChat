const createMessageTile = (message, isCurrentUser) => {
    const tile=document.createElement('li');
    tile.id='message-tile';
    
    const messageText=document.createElement('p');
    messageText.id='message-tile-text';
    messageText.innerText=message.content;
    
    const messageDate=document.createElement('p');
    messageDate.id='message-date';
    messageDate.textContent=new Date(message.timestamp).toDateString();
    
    tile.style.backgroundColor=isCurrentUser?'rgb(244, 107, 107)' 
                                :'rgb(169, 169, 169)';
    tile.append(messageText, messageDate);
    
    return tile;
};

export default createMessageTile;