import getLastText from "./get-last-text.js";
import openChat from "../main-page.js"

const createUserTile=(currentUser, user)=>{
    const isGroup=user.participants!==undefined;
    const tile=document.createElement('li');
    const profilePicture=document.createElement('img');
    const username=document.createElement('h3');
    const lastMessage=document.createElement('p');
    const onlineBadge=document.createElement('h4');

    profilePicture.src='../assets/images/icons/image.png';
    username.textContent=isGroup?user.name:user.username;
    lastMessage.textContent=getLastText(isGroup,user.id);
    onlineBadge.textContent = '•';
    onlineBadge.style.color = 'green';
    onlineBadge.style.display = (user.isOnline && !isGroup) ? 'inline' : 'none';

    tile.addEventListener('click',()=>{
        isGroup?openChat(user.id,null,'group')
                :openChat(currentUser.id,user.id,'private');
    });
    tile.append(profilePicture, username, lastMessage, onlineBadge);

    return tile;

}

export default createUserTile;