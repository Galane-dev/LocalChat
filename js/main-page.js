import LocalStorageService from "./services/local-storage.js";
import SessionManager from "./services/session-manager.js";
import Chat from "./models/chat.js";
import switchMobileView from "./helpers/switch-views.js";
import getLastText from "./helpers/get-last-text.js";


let currentChatId=null;
let currentChatUser1=null;
let currentChatUser2=null;
let currentChatType='private';



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
        let onlineBadge=document.createElement('h4');
        let isGroup=users[i].participants!==undefined;


        onlineBadge.textContent='•';
        onlineBadge.style.color='green';

        if(users[i].isOnline===true && isGroup===false){
            onlineBadge.style.display='inline';
        }
        else{
            onlineBadge.style.display='none';
        }

        userProfilePicture.src=users[i].profilePicture||'../assets/images/icons/image.png';
        username.textContent=isGroup?users[i].name
                            :users[i].username;
        lastMessage.textContent=getLastText(isGroup,users[i].id);

        //Attach open chat method to the user tile
        userTile.addEventListener('click',()=>{
            if(isGroup){
                openChat(users[i].id,null,'group');
            }
            else{
                openChat(currentUserId,users[i].id);
            }
        });

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



function openChat(userId1,userId2,type='private'){
    switchMobileView('chat');

    let chatsList=document.getElementById('chats-list');
    let messagesBox=document.getElementById('messages-box');
    let sendIcon=document.getElementById('message-send');
    let noMessages=document.getElementById('no-messages');
    let chateeName=document.getElementById('chatee-name');
    let chateeStatus=document.getElementById('chatee-status');
    let chateeSideName=document.getElementById('chatee-side-name');
    let chateeSideStatus=document.getElementById('chatee-side-status');
    let currentUserId=SessionManager.getUser().id;
    
    let chatId;
    let currentChat;
    let messagesCount=0;


    chatsList.innerHTML='';

    if(type==='private'){

        let allChats=LocalStorageService.getChats();
        chatId=Chat.generateChatId(userId1,userId2);
        currentChat=allChats?.find(chat=>chat.id===chatId);

        let chatee=LocalStorageService.getUser(userId2);

        chateeName.textContent=chatee.username;
        chateeSideName.textContent=chatee.username;

        if(chatee.isOnline){
            chateeStatus.textContent='Online';
            chateeSideStatus.textContent='Online';
        }
        else{
            chateeStatus.textContent='Offline';
            chateeSideStatus.textContent='Offline';
        }

        messagesCount=currentChat?.messages?.length || 0;
    }

    else if(type==='group'){
        let groups=LocalStorageService.getGroups();
        currentChat=groups.find(group=>group.id===userId1);
        chatId=userId1;

        chateeName.textContent=currentChat.name;
        chateeSideName.textContent=currentChat.name;

        chateeStatus.textContent='Group';
        chateeSideStatus.textContent='Group';

        messagesCount=currentChat?.messages?.length || 0;
    }

    
    sendIcon.onclick=()=>{
        let content=document.getElementById('message-text').value.trim();
        console.log(content);
        if(content===''){
            return;
        } 
        if(type==='group'){
            LocalStorageService.messageGroup(chatId,content,'none');
        }
        else{
            LocalStorageService.sendMessage(chatId,content,'none');
        }

        document.getElementById('message-text').value='';
        openChat(userId1,userId2,type);
    };


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

        

        chatTile.id='message-tile';
        chatMessage.id='message-tile-text';
        chatDate.id='message-date';

        chatMessage.innerText=currentChat.messages[i].content;
        chatDate.textContent= new Date( currentChat.messages[i].timestamp).toDateString();


        if(currentChat.messages[i].senderId===currentUserId){
            chatTile.style.backgroundColor= 'rgb(244, 107, 107)';
        }
        else{
            chatTile.style.backgroundColor= 'rgb(169, 169, 169)';
        }

        chatTile.append(chatMessage);
        chatTile.append(chatDate);

        chatsList.appendChild(chatTile);
    }

    currentChatId=chatId;
    currentChatUser1=userId1;
    currentChatUser2=userId2;
    currentChatType=type;
}






function searchUsers(){
    let users=LocalStorageService.getUsers();
    let textToSearch=document.getElementById('search-text').value;
    textToSearch=textToSearch.toLowerCase();
    let usersToReturn=users.filter(user=>user.username.toLowerCase().includes(textToSearch));
    console.error(usersToReturn);

    populateUsersList(usersToReturn);
}




function updateProfile(){
    let username=document.getElementById('username-input').value;
    let password=document.getElementById('password-input').value;
    LocalStorageService.updateProfile(username,password);
}


function createGroup(){
    let groupPrompt=prompt('Enter group name and member Ids(e.g "Group Name":id1,id2,id3...)');
    groupPrompt=groupPrompt.split(':');
    let participants=groupPrompt[1].split(',');
    participants.push(SessionManager.getUser().username);
    let groupName=groupPrompt[0];

   LocalStorageService.createGroup(groupName,participants);
   main();
    
}

function showUserProfile(){
    const currentUser = document.getElementById('current-user');
    const chatee = document.getElementById('chatee');

    currentUser.style.display = 'block';
    chatee.style.display = 'none';

    switchMobileView('profile');
}

function showChateeProfile(){
    const currentUser = document.getElementById('current-user');
    const chatee = document.getElementById('chatee');

    currentUser.style.display = 'none';
    chatee.style.display = 'block';

    switchMobileView('profile');
}


function cancelEdits(){
    switchMobileView('nav');
}



function main(){
    let searchIcon=document.getElementById('search-icon');
    searchIcon.addEventListener('click',()=>searchUsers());

    let saveEdits=document.getElementById('save-edits');
    saveEdits.addEventListener('click',()=>updateProfile());

    let logout=document.getElementById('logout');
    logout.addEventListener('click',()=>SessionManager.logout());

    let addGroup=document.getElementById('add-group-icon');
    addGroup.addEventListener('click',()=>createGroup());

    let userProfile=document.getElementById('profile-icon');
    userProfile.addEventListener('click',()=>showUserProfile());

    let chateeProfile=document.getElementById('chatee-info');
    chateeProfile.addEventListener('click',()=>showChateeProfile());

    let cancelButton = document.getElementById('cancel-edits');
    cancelButton.addEventListener('click', cancelEdits);

    let profileBack = document.getElementById('profile-back');
    profileBack.addEventListener('click', () => {
        switchMobileView('nav');
    });


    let users=LocalStorageService.getUsers();
    let groups=LocalStorageService.getGroups();
    let currentUser=SessionManager.getUser();
    users=users.filter(user=>user.id!==currentUser.id);
    groups=groups.filter(group=>group.participants.includes(currentUser.username));


    window.addEventListener('storage', function(event){
    if(event.key === 'chats' || 
       event.key === 'groups' || 
       event.key === 'users'){

        let users = LocalStorageService.getUsers();
        let groups = LocalStorageService.getGroups();
        let currentUser = SessionManager.getUser();
        users=users.filter(user=>user.id!==currentUser.id);
        groups=groups.filter(group=>group.participants.includes(currentUser.username));

        if(currentChatId !== null){
            openChat(currentChatUser1,currentChatUser2,currentChatType);
        }

        populateUsersList([...users,...groups]);
    }
});



    populateUsersList([...users,...groups]);
}

main();