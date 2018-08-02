var Bullet = class Bullet {
  constructor(creator, x, y, dir, speed = 20) {
    this.creator = creator;
    this.x = x;
    this.y = y;
    this.dir = dir;
    this.speed = speed;
    this.life = 10;
    this.strength = 10;
    this.prevX = this.x;
    this.prevY = this.y;
  }
  step() {
    if(g.bulletMode==0){    this.border();}
    if(g.bulletMode==1){ this.wrap();}
    this.prevX = this.x;
    this.prevY = this.y;
    this.x = this.x + this.speed * cos(this.dir);
    this.y = this.y + this.speed * sin(this.dir);


    // //this.life-=1;
    // 
    //   bullets=bullets.filter(function(n){
    //     return n.life>0;
    // 
    // }
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
      this.life-=100;
    }
    if (this.y > cheight - 10) {
      this.life-=100;
    }
    if (this.x <= 0) {
      this.life-=100;
    }
    if (this.y <= 0) {
      this.life-=100;
    }
  }
  draw() {
    if(this.creator.color!=undefined) {   fill(this.creator.color);}
    else{
      fill(255)
    }
    buffer.stroke(255, 255, 255, 10)
      rect(this.x-this.strength/6,this.y-this.strength/6,this.strength/3,this.strength/3)
      buffer.stroke(255, 255, 255)
      buffer.line(this.prevX, this.prevY, this.x, this.y)

  }
}