class Chat{
    constructor(chatId){
        this.id=chatId;
        this.user1Typing=false;
        this.user2Typing=false;
        this.messages=[];
    }

    static generateChatId=(userId1,userId2)=>{
        if(userId1>userId2){
            return userId1+'-'+userId2;
        }
        else{
            return userId2+'-'+userId1;
        }
    }
}

export default Chat;