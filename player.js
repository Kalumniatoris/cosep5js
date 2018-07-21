
vAngle=60

var manual=function(t){
  if (keyIsDown(LEFT_ARROW)) {
   t.turnLeft(3);
  }
  if (keyIsDown(RIGHT_ARROW)) {
   t.turnRight(3);
  }
  if (keyIsDown(UP_ARROW)) {
   t.speedUp();
  }
  if (keyIsDown(DOWN_ARROW)) {
   t.speedDown();
  }
  if (keyIsDown(32)) {
    t.shoot();
   }
   if (keyIsDown(90)) {
    t.split();
   }
   if (keyIsDown(17)) {
    t.stop();
   }
}

var basicTurret=function(t){
  t.stop();
  if(t.playersIsee.length==0)return;
  var target=t.playersIsee[0];
  
s = ( t.x+100*cos(t.dir) - t.x ) * ( target.x - t.y ) - ( t.y+100*sin(t.y) - t.y ) * ( target.y - t.x ); 
if(s<0){t.turnLeft(1);}
else {t.turnRight(1);}
t.shoot();
t.stop();
}
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
      this.maxSpeed=5;
      this.acceleration=0.2;
      this.bullets=[];
      this.clonning=false;
      this.shootCtd=0;

      this.playersIsee=[];
    }
    setOthers(others){
      this.others=others;
    }
  turnRight(angle=1){
    this.dir+=angle*Math.PI*2/360;
  }  turnLeft(angle=1){
    this.dir-=angle*Math.PI*2/360;
  }
  speedUp(){
    this.speed=Math.min(this.speed+this.acceleration,this.maxSpeed)
  }
  speedDown(){
    this.speed=Math.max(this.speed-this.acceleration,-this.maxSpeed)
  }
  stop(){
    this.speed=0;
  }
    step(){
      while(this.bullets.length>maxbullets){
        this.bullets.splice(1,1);
        }
        if(this.shootCtd>0){
          this.shootCtd-=1;
        }
         //this.wrap();
   this.border();
   this.forward();
   this.see();
   if(typeof this.AI =="function"){
       this.AI(this);
   }else{
 
    this.dir+=(Math.PI*2)*(0.05-Math.random()*0.1);
  //  this.dir+=Math.random()/100;
   
 
    if(Math.random()>0.92){
      this.shoot();
    }
    if(this.life>=20&&Math.random()>0.999){
     //   this.split();
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
  split(){if(this.clonning)return;
    this.clonning=true;
      var clone=new Player(this.id, this.x, this.y,this.color)
      clone.life=Math.floor( (this.life/2)-1)
      this.life=Math.floor(this.life/2-1)
    players.push(clone);
    this.clonning=false;
  }
  shoot(){
    if(this.shootCtd<=0){
    bullets.push(new Bullet(this.id,this.x,this.y,this.dir))
    this.shootCtd=10;
    }
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
    see(){
     //var hit = collidePointArc(mouseX, mouseY,this.x, this.y,width+height, this.dir, ((2*PI)/360)*vAngle);
     
     var tx=this.x;
     var ty=this.y;
     var td=this.dir;
     this.playersIsee=[];
      this.playersIsee=players.filter(function(p){
   //    var px=player.x;
      
      return (tx!=p.x&&collidePointArc(p.x, p.y,tx, ty, width+height, td, ((2*PI)/360)*vAngle));
       //return g
     });
     this.playersIsee=this.playersIsee.slice(0);
     text(this.playersIsee.length,this.x-5,this.y-35);
     
    }
    draw(){
     
      text(this.playersIsee.length,this.x-5,this.y-35);
        fill(this.color)
        noStroke()
        rect(this.x-5,this.y-5,10,10);
       // text(tmp.id,tmp.x,tmp.y+20)
       var hedist=8;
       ellipse(this.x+hedist*cos(this.dir),this.y+hedist*sin(this.dir),8,8)
       alpha(20)
       //stroke(222)
      var viewAngle=((2*PI)/360)*vAngle;
      var tmpcolor= this.color.slice(0);

      tmpcolor[3]=30
  //  console.log(tmpcolor)
      fill(tmpcolor)
       arc(this.x, this.y, width+height,width+height, this.dir-viewAngle/2,this.dir+viewAngle/2, PIE);
	
       stroke(222)
       text(this.life,this.x,this.y+15)
    }
  
  
  }