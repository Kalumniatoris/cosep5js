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
  draw() {
    stroke(255, 255, 255, 10)
      //rect(tmp.x-1,tmp.y-1,2,2)
    stroke(255, 255, 255)
    line(this.prevX, this.prevY, this.x, this.y)

  }
}