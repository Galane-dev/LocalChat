class Group{
    constructor(name,participants){
        this.id=Math.floor(Math.random()*99999);
        this.name=name;
        this.messages=[];
        this.participants=participants;
    }
}

export default Group;