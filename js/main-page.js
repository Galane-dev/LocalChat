import LocalStorageService from "./services/local-storage.js";
import SessionManager from "./services/session-manager.js";
import Chat from "./models/chat.js";

console.log('Logged in user is '+JSON.parse(sessionStorage.getItem('user')).username);

function populateUsersList(users){
    let userList=document.getElementById('users-list');
    let noUsersText=document.getElementById('no-users');
    userList.innerHTML='';


    if(users.length===0){
        userList.style.display='none';
        noUsersText.style.display='block';
    }
    else{
        userList.style.display='block';
        noUsersText.style.display='none';
    }


    let currentUserId=SessionManager.getUser().id;

    console.log('Users are '+users);


    for(let i=0;i<users.length;i++){
        let userTile=document.createElement('li');
        let userProfilePicture=document.createElement('img');
        let username=document.createElement('h3');
        let lastMessage=document.createElement('p');
        let onlineBadge=document.createElement('p');


        onlineBadge.textContent='⦿';
        onlineBadge.style.color='red';

        if(users[i].isOnline===true){
            onlineBadge.style.display='inline';
        }
        else{
            onlineBadge.style.display='none';
        }

        userProfilePicture.src=users[i].profilePicture||'../assets/images/profile-icon.png';
        username.textContent=users[i].username;
        lastMessage.textContent='Last message placeholder';

        //Attach open chat method to the user tile
        userTile.addEventListener('click',()=>openChat(currentUserId,users[i].id));

        //Append tile elements to the tile/list item
        userTile.append(userProfilePicture);
        userTile.append(username);
        userTile.append(lastMessage);
        userTile.append(onlineBadge);

        //Append the tile/list item to the list;
        userList.append(userTile);

        console.warn('Added user: '+users[i].username);


    }
}

function openChat(userId1,userId2){
    let allChats=LocalStorageService.getChats();
    let chatId=Chat.generateChatId(userId1,userId2);
    let currentChat=allChats?.find(chat=>chat.id===chatId);
    let chatee=LocalStorageService.getUser(userId2);
    let chatsList=document.getElementById('chats-list');
    let messagesBox=document.getElementById('messages-box');
    let messagesCount=currentChat?.messages?.length;
    let sendIcon=document.getElementById('message-send');
    let noMessages=document.getElementById('no-messages');
    let chateeName=document.getElementById('chatee-name');
    let chateeStatus=document.getElementById('chatee-status');
    let chateeSideName=document.getElementById('chatee-side-name');
    let chateeSideStatus=document.getElementById('chatee-side-status');

    chateeName.textContent=chatee.username;
    chateeSideName.textContent=chatee.username;
    

    //Display online/offline status
    if(chatee.isOnline){
        chateeStatus.textContent='Online';
        chateeSideStatus.textContent='Online';
    }
    else{
        chateeStatus.textContent='Offline';
        chateeSideStatus.textContent='Offline';
    }

    sendIcon.addEventListener('click',()=>sendMessage(chatId));

    if(messagesCount>0){
        noMessages.style.display='none';
        chatsList.style.display='inline';
    }
    else{
        chatsList.style.display='none';
        noMessages.style.display='inline';
    }

    for(let i=0;i<messagesCount;i++){
        let chatTile=document.createElement('li');
        let chatMessage=document.createElement('p');
        let chatDate=document.createElement('p');
        
        chatMessage.innerText=currentChat.messages[i].content;
        chatDate.textContent=currentChat.messages[i].timestamp;


        chatTile.append(chatMessage.textContent);
        chatTile.append(chatDate.textContent);

        chatsList.appendChild(chatTile);
    }

    

}

function sendMessage(chatId,replyTo='none'){
    let messageInput=document.getElementById('message-text').value;
    LocalStorageService.sendMessage(chatId,messageInput,replyTo);
}

function displayUserProfile(userId){
    if(userId===SessionManager.getUser().id){
        //The current user's profile
    }
    else{
        //Show the chatee profile

    }
}



function searchUsers(){
    let users=LocalStorageService.getUsers();
    let textToSearch=document.getElementById('search-text').value;
    textToSearch=textToSearch.toLowerCase();
    let usersToReturn=users.filter(user=>user.username.toLowerCase().includes(textToSearch));
    console.error(usersToReturn);

    populateUsersList(usersToReturn);
}

function applyFilters(){
    //This is a nice to have, implement if there's time
}

function updateProfile(){
    let username=document.getElementById('username-input').value;
    let password=document.getElementById('password-input').value;
    LocalStorageService.updateProfile(username,password);
}


function main(){
    let searchIcon=document.getElementById('search-icon');
    searchIcon.addEventListener('click',()=>searchUsers());

    let saveEdits=document.getElementById('save-edits');
    saveEdits.addEventListener('click',()=>updateProfile());

    let logout=document.getElementById('logout');
    logout.addEventListener('click',()=>SessionManager.logout());

    populateUsersList(LocalStorageService.getUsers());
}

main();