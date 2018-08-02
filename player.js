
var Player = class Player {

  constructor(id, x, y, color, AI = undefined, vAngle=g.vAngle) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.color = color;
    this.dir = 0;
    this.speed = 2;
    this.life = 100;
    this.AI = AI;
    this.maxSpeed = 5;
    this.acceleration = 0.2;
    this.bullets = [];
    this.clonning = false;
    this.shootCtd = 0;
    this.vAngle=vAngle;
    this.playersIsee = [];
    this.timeToClone=100;
    this.experience=0;
    this.level=1;
    this.shootDelay=10;
    this.bulletSpeed=20;
    this.maxLife=100;
  //  this.stepLoop=setInterval(this.step,g.ldelay);
  }
  setOthers(others) {
    this.others = others;
  }
  turnRight(angle = 1) {
    this.dir += angle * Math.PI * 2 / 360;
  }
  turnLeft(angle = 1) {
    this.dir -= angle * Math.PI * 2 / 360;
  }
  speedUp() {
    this.speed = Math.min(this.speed + this.acceleration, this.maxSpeed)
  }
  speedDown() {
    this.speed = Math.max(this.speed - this.acceleration, -this.maxSpeed)
  }
  stop() {
    this.speed = 0;
  }
  levelUp(){
   this.shootDelay*=0.9;
   this.maxSpeed+=0.5;
   this.bulletSpeed+=1;
   this.experience-=this.level*10;
   this.level+=1;
  }
  levelDown(){
    this.shootDelay/=0.9;
    this.maxSpeed-=0.5;
    this.bulletSpeed-=1;
   // this.experience=this.level*10;
    this.level-=1;
  }
  step() {
    if(this.experience>10*this.level){
     
      this.levelUp();
    }
    this.timeToClone-=1;
    while (this.bullets.length > maxbullets) {
      this.bullets.splice(1, 1);
    }
    if (this.shootCtd > 0) {
      this.shootCtd -= 1;
    }
    //this.wrap();
    this.border();
    this.forward();
    this.see();
    if (typeof this.AI == "function") {
      this.AI(this);
    } else {
      this.speed = 1;
      this.dir += (Math.PI * 2) * (0.05 - Math.random() * 0.1);
      //  this.dir+=Math.random()/100;


      if (Math.random() > 0.92) {
        this.shoot();
      }
      if (this.life >= 20 && Math.random() > 0.99) {
        // this.split();
      }
      if (this.life < 15 && Math.random() > 0.99) {
        this.life += 1;
      }
      // this.x+=Math.random()*10-5;
      //this.y+=this.speed;
    }
  }

  forward() {
    this.x = Math.max(this.x + this.speed * cos(this.dir), 0)
    this.y = Math.max(this.y + this.speed * sin(this.dir), 0)
  }
  split(AI=this.AI) {
    if (this.timeToClone <= 0&&this.level>1) {
  
    this.clonning = true;
    
    var clone = new Player(this.id, this.x+Math.random()-0.5, this.y+Math.random()-0.5, this.color,AI)
   // console.log(clone)

    clone.life = Math.floor((this.life / 2))
    this.life = Math.floor(this.life / 2 - 1)
    clone.speed=this.speed;
    clone.dir=this.dir+(Math.PI*(Math.random()-0.5)/5)
    for(var q=0;q<Math.floor(this.level/2);q+=1){
      clone.experience+=10*q;
    }
    if(clone.life>=1)players.push(clone);
    this.clonning = false;
    this.levelDown();
    this.timeToClone=100;
    }
  }
  shoot() {
    if (this.shootCtd <= 0) {
      bullets.push(new Bullet(this, this.x, this.y, this.dir,this.bulletSpeed))
      this.shootCtd = this.shootDelay;
    }
  }
  shootDir(dir,power=g.sPower) {
    if(power>g.maxSPower)power=g.maxSPower
    if (this.shootCtd <= 0) {
      var b=new Bullet(this, this.x, this.y, dir,this.bulletSpeed/Math.pow(power,1.2))
      b.life*=power;
      b.strength*=power;
      bullets.push(b);
      this.shootCtd = this.shootDelay*Math.pow(1.3,power);
     
    }
  }
  wrap() {
    if (this.x > cwidth) {
      this.x = 0;
    }
    if (this.y > cheight) {
      this.y = 0;
    }
    if (this.x < 0) {
      this.x = cwidth;
    }
    if (this.y < 0) {
      this.y = cheight;
    }
  }

  border() {
    if (this.x > cwidth - 10) {
      this.x = cwidth - 10;
    }
    if (this.y > cheight - 10) {
      this.y = cheight - 10;
    }
    if (this.x <= 0) {
      this.x = 0;
    }
    if (this.y <= 0) {
      this.y = 0;
    }
  }
  see() {
    //var hit = collidePointArc(mouseX, mouseY,this.x, this.y,width+height, this.dir, ((2*PI)/360)*vAngle);

    var tx = this.x;
    var ty = this.y;
    var td = this.dir;
    var tid = this.id;
    var tva=this.vAngle;
    this.playersIsee = [];
    var tmpinfo=[];
    this.playersIsee = players.filter(function(p) {
      //    var px=player.x;

      return (tid != p.id && collidePointArc(p.x, p.y, tx, ty, width + height, td, ((2 * PI) / 360) * tva));
      //return g
    });
    for(var i=0;i<this.playersIsee.length;i+=1){
      var id=this.playersIsee[i].id;
      var px=this.playersIsee[i].x;
      var py=this.playersIsee[i].y;
      var pd=this.playersIsee[i].dir;
      var sx=10*cos(this.dir);
      var sy=10*sin(this.dir);
      var cx=px-this.x;
      var cy=py-this.y;
      var tma= (cx * sx + cy * sy) / ( sqrt(cx*cx + cy*cy) * sqrt(sx*sx + sy*sy) );
      //line(sx+this.x,sy+this.y,cx+this.x,cy+this.y)
      var angle;
      if(isLeft(this.x,this.y,this.x+10*cos(this.dir),this.y+10*sin(this.dir),px,py)){
      angle=Math.acos(tma);}
      else{
        angle=-Math.acos(tma);
      }
      angle=180*(angle/Math.PI)
      //s = ((Bx - Ax) * (Y - Ay) - (By - Ay) * (X - Ax))
      var distance = Math.sqrt(Math.pow((px-this.x),2)+Math.pow(py-this.y,2));
      tmpinfo.push(new SeenPlayer(id,distance,angle,pd))
      fill(200);
      noStroke()
     // text(angle,this.x,this.y+50)
      if (keyIsDown(86)) {    
      
      console.log(cx+":"+cy+"   "+angle)
      }
    }
    this.playersIsee=tmpinfo.slice(0);
   // this.playersIsee = this.playersIsee.slice(0);

  }
  draw() {

    var viewAngle = ((2 * PI) / 360) * this.vAngle;
    var tmpcolor = this.color.slice(0);

    tmpcolor[3] = 30
      //  console.log(tmpcolor)
      buffer.fill(tmpcolor)
      buffer.noStroke();
    if(keyIsDown(192))
    buffer.arc(this.x, this.y, width + height, width + height, this.dir - viewAngle / 2, this.dir + viewAngle / 2, PIE);

    buffer.text(this.playersIsee.length, this.x - 5, this.y - 35);
    buffer.fill(this.color)
    buffer.noStroke()
    buffer.rect(this.x - 5, this.y - 5, 10, 10);
    // text(tmp.id,tmp.x,tmp.y+20)
    var hedist = 8;
    buffer.ellipse(this.x + hedist * cos(this.dir), this.y + hedist * sin(this.dir), 8, 8)
    buffer.alpha(20)
      //stroke(222)
      buffer.stroke(222)
      buffer.text(this.life, this.x, this.y + 15)
      buffer.text(this.playersIsee.length, this.x - 5, this.y - 35);
      buffer.text(this.level+": "+this.experience,this.x-5,this.y-20);
  }


}