import LocalStorageService from "./services/local-storage.js";
import SessionManager from "./services/session-manager.js";
import Chat from "./models/chat.js";
import switchMobileView from "./helpers/switch-views.js";
import createUserTile from "./helpers/create-user-tile.js";
import User from "./models/user.js";
import getChatData from "./helpers/get-chat-data.js";
import updateChatHeader from "./helpers/update-header.js";
import displayMessages from "./helpers/display-messages.js";
import setupSendMessageHandler from "./helpers/set-up-send-message-handler.js";


//State
let currentChatId=null;
let currentChatUser1=null;
let currentChatUser2=null;
let currentChatType='private';


//Populate the users list with users from local storage
const populateUsersList=(users)=>{
    const usersList=document.getElementById('users-list');
    const noUsersText=document.getElementById('no-users');
    const currentUser=SessionManager.getUser();
    usersList.innerHTML='';

    if(users.length===0){
        usersList.style.display='none';
        noUsersText.style.display='block';
        return;
    }

    usersList.style.display='block';
    noUsersText.style.display='none';

    users.forEach(user => {
        const userTile=createUserTile(currentUser,user);
        usersList.append(userTile);
    });
}


//What happens when we click on a tile from users list
const openChat=(userId1,userId2,type='private')=>{
    switchMobileView('chat');
    const chatData=getChatData(userId1,userId2,type);
    updateChatHeader(userId2,chatData,type);
    displayMessages(chatData.currentChat, chatData.messagesCount, SessionManager.getUser().id);
    setupSendMessageHandler(userId1, userId2, type, chatData.chatId);

    currentChatId = chatData.chatId;
    currentChatUser1 = userId1;
    currentChatUser2 = userId2;
    currentChatType = type;
}




const searchUsers = () => {
    const users = LocalStorageService.getUsers();
    const searchText = document.getElementById('search-text').value.toLowerCase();
    const filteredUsers = users.filter(user => 
        user.username.toLowerCase().includes(searchText)
    );
    populateUsersList(filteredUsers);
};

const updateProfile = () => {
    const username = document.getElementById('username-input').value;
    const password = document.getElementById('password-input').value;
    if(username.length===0 || password.length===0){
        alert('Update failed. Please enter a valid username and password');
        return;
    }

    if(!User.isUserNameUnique(username)){
        alert('Update failed. Username taken, please enter a different username');
        return;
    }
    LocalStorageService.updateProfile(username, password);
};

const createGroup = () => {
    const input = prompt('Enter group name and member Ids(e.g "Group Name":id1,id2,id3...)');
    const [groupName, membersString] = input.split(':');
    const participants = membersString.split(',');

    if(groupName.trim().length===0 || participants.length<2){
        alert('Failed to create group. Ensure you set group name and add 1 or more participant');
        return;
    }
    
    participants.push(SessionManager.getUser().username);
    LocalStorageService.createGroup(groupName, participants);
    location.reload();
};

const showUserProfile = () => {
    document.getElementById('current-user').style.display = 'block';
    document.getElementById('chatee').style.display = 'none';
    switchMobileView('profile');
};

const showChateeProfile = () => {
    document.getElementById('current-user').style.display = 'none';
    document.getElementById('chatee').style.display = 'block';
    switchMobileView('profile');
};

const cancelEdits = () => {
    switchMobileView('nav');
};

const setupEventListeners = () => {
    document.getElementById('search-icon').addEventListener('click', searchUsers);
    document.getElementById('save-edits').addEventListener('click', updateProfile);
    document.getElementById('logout').addEventListener('click', () => SessionManager.logout());
    document.getElementById('add-group-icon').addEventListener('click', createGroup);
    document.getElementById('profile-icon').addEventListener('click', showUserProfile);
    document.getElementById('chatee-info').addEventListener('click', showChateeProfile);
    document.getElementById('cancel-edits').addEventListener('click', cancelEdits);
    document.getElementById('profile-back').addEventListener('click', () => switchMobileView('nav'));
};

const loadInitialData = () => {
    let users=LocalStorageService.getUsers();
    const groups=LocalStorageService.getGroups();
    const currentUser=SessionManager.getUser();
    
    users=users.filter(user=>user.id !== currentUser.id);
    const myGroups=groups.filter(group=>group.participants.includes(currentUser.username));
    
    let onlineUsers=users.filter(user=>user.isOnline===true);
    let offlineUsers=users.filter(user=>user.isOnline===false);

    users=[...onlineUsers,...myGroups,...offlineUsers];

    populateUsersList(users);
};

const handleStorageChange = (event) => {
    if (['chats', 'groups', 'users'].includes(event.key)) {
        if (currentChatId !== null) {
            openChat(currentChatUser1, currentChatUser2, currentChatType);
        }
        loadInitialData();
    }
};

const main = () => {
    setupEventListeners();
    loadInitialData();
    window.addEventListener('storage', handleStorageChange);
};

main();


export default openChat;