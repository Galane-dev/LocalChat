import SessionManager from "../services/session-manager.js";
class Message{
    constructor(content,replyTo){
        this.id=Math.floor(Math.random()*99999);
        this.content=content;
        this.senderId=SessionManager.getUser().id;
        this.replyTo=replyTo;
        this.timestamp=Date.now();
    }
}

export default Message;