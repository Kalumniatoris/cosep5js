
  var Bullet=class Bullet{
    constructor(creator,x,y,dir,speed=20){
      this.creator=creator;
      this.x=x;
      this.y=y;
      this.dir=dir;
      this.speed=speed;
      this.life=10;
      this.strength = 10;
      this.prevX=this.x;
      this.prevY=this.y;
    }
    step(){
      this.prevX=this.x;
      this.prevY=this.y;
      this.x=this.x+this.speed*cos(this.dir);
      this.y=this.y+this.speed*sin(this.dir);
  
     
      // //this.life-=1;
      // if(this.life<=0){
      //   bullets=bullets.filter(function(n){
      //     return n!==this;
      //   })
      // }
    }
  }