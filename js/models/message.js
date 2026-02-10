class Message{
    constructor(content,senderId,replyTo){
        this.id=Math.floor(Math.random()*99999);
        this.content=content;
        this.senderId=senderId;
        this.replyTo=replyTo;
        this.timestamp=Date.now();
    }
}