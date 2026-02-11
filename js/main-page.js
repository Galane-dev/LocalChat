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
    let chatsList=document.createElement('ul');
    let messagesBox=document.getElementById('messages-box');
    let messagesCount=currentChat?.messages?.length;

    for(let i=0;i<messagesCount;i++){
        let chatTile=document.createElement('li');
        let chatMessage=document.createElement('p');
        let chatDate=document.createElement('p');
        
        chatMessage.textContent=currentChat.messages[i].content;
        chatDate.textContent=currentChat.messages[i].timestamp;

        chatTile.append(chatMessage);
        chatTile.append(chatDate);

        chatsList.append(chatTile);
    }

    currentChat?.messages?.length>0?messagesBox.innerHTML=chatsList
                                : messagesBox.innerHTML='<p>No messages yet</p>';

}



function main(){
    populateUsersList();
}

main();