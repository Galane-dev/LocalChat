import LocalStorageService from "./services/local-storage.js";
import SessionManager from "./services/session-manager.js";
import Chat from "./models/chat.js";

console.log('Logged in user is '+JSON.parse(sessionStorage.getItem('user')).username);

function populateUsersList(show='all'){
    let users=LocalStorageService.getUsers();
    let currentUserId=SessionManager.getUser().id;

    console.log('Users are '+users);
    let userList=document.getElementById('users-list');


    for(let i=0;i<users.length;i++){
        let userTile=document.createElement('li');
        let userProfilePicture=document.createElement('img');
        let username=document.createElement('h3');
        let lastMessage=document.createElement('p');

        userProfilePicture.src=users[i].profilePicture||'../assets/images/profile-icon.png';
        username.textContent=users[i].username;
        lastMessage.textContent='Last message placeholder';

        //Attach open chat method to the user tile
        userTile.addEventListener('click',()=>openChat(currentUserId,users[i].id));

        //Append tile elements to the tile/list item
        userTile.append(userProfilePicture);
        userTile.append(username);
        userTile.append(lastMessage);

        //Append the tile/list item to the list;
        userList.append(userTile);

        console.warn('Added user: '+users[i].username);


    }
}

function openChat(userId1,userId2){
    let allChats=LocalStorageService.getChats();
    let chatId=Chat.generateChatId(userId1,userId2);
    let currentChat=allChats?.find(chat=>chat.id===chatId);
    let chatsList=document.getElementById('chats-list');
    let messagesBox=document.getElementById('messages-box');
    let messagesCount=currentChat?.messages?.length;
    let sendIcon=document.getElementById('message-send');
    let noMessages=document.getElementById('no-messages');

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



function main(){
    populateUsersList();
}

main();