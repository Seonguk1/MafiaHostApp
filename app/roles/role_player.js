export default class Player{
    constructor(name='Player', role=null, life=1, isMafiaTeam=False){
        this.name = name;
        this.role = role;
        this.life = life;
        this.isMafiaTeam = isMafiaTeam;
    }
    
    isAlive(){
        return this.life?true:false;
    }
}