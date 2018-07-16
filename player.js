

var Player = class Player {
  
    constructor(id,x, y, color,AI=undefined) {
      this.id=id;
      this.x = x;
      this.y = y;
      this.color = color;
      this.color=color;
      this.dir=0;
      this.speed=2;
      this.life=100;
      this.AI=AI;
      
      this.bullets=[];
    }
    setOthers(others){
      this.others=others;
    }
  
    step(){
      while(this.bullets.length>maxbullets){
        this.bullets.splice(1,1);
        }
         //this.wrap();
   this.border();
   if(typeof this.AI =="function"){
       this.AI(this);
   }else{
    var q=Math.floor((Math.random() * 4) + 1);
    q=0;
    this.dir+=(Math.PI*2)*(0.05-Math.random()*0.1);
  //  this.dir+=Math.random()/100;
    this.forward();
    switch(q){
      case 0:
      break;
      case 1:
      this.x+=this.speed;
      break;
      case 2:
      this.y+=this.speed;
      break;
      case 3:
      this.x-=this.speed;
      break;
      case 4:
      this.y-=this.speed;
      break;
    }
    if(Math.random()>0.9){
      this.shoot();
    }
    if(this.life>=15&&Math.random()>0.99){
        this.split();
    }
    if(this.life<15&&Math.random()>0.99){
        this.life+=1;
    }
     // this.x+=Math.random()*10-5;
      //this.y+=this.speed;
}
    }

  forward(){
    this.x = this.x + this.speed * cos(this.dir)
    this.y = this.y + this.speed * sin(this.dir)
  }
  split(){
      var clone=new Player(this.id, this.x, this.y,this.color )
      clone.life=Math.floor( (this.life/2)-1)
      this.life=Math.floor(this.life/2-1)
    players.push(clone);

  }
  shoot(){
    bullets.push(new Bullet(this.id,this.x,this.y,this.dir))
  }
    wrap(){
      if(this.x>cwidth){
        this.x=0;
      }
      if(this.y>cheight){
        this.y=0;
      }
      if(this.x<0){
        this.x=cwidth;
      }
      if(this.y<0){
        this.y=cheight;
      }
    }
  
    border(){
      if(this.x>cwidth-10){
        this.x=cwidth-10;
      }
      if(this.y>cheight-10){
        this.y=cheight-10;
      }
      if(this.x<0){
        this.x=0;
      }
      if(this.y<0){
        this.y=0;
      }
    }
  
    draw(){
        fill(this.color)
        noStroke()
        rect(this.x-5,this.y-5,10,10);
       // text(tmp.id,tmp.x,tmp.y+20)
       ellipse(this.x+10*cos(this.dir),this.y+10*sin(this.dir),2,2)
       stroke(222)
       text(this.life,this.x,this.y+15)
    }
  
  
  }