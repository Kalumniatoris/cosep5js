vAngle = 60
var manual2 = function(t, up, down, left, right, shoot, stop, slow, split) {
  return function(t) {
    sp = 3;
    if (keyIsDown(slow)) sp = 1 / 3;
    if (keyIsDown(left)) {

      t.turnLeft(sp);
    }
    if (keyIsDown(right)) {
      t.turnRight(sp);
    }
    if (keyIsDown(up)) {
      t.speedUp();
    }
    if (keyIsDown(down)) {
      t.speedDown();
    }
    if (keyIsDown(shoot)) {
      t.shoot();
    }
    if (keyIsDown(split)) {
      t.split();
    }
    if (keyIsDown(stop)) {
      t.stop();
    }
  }
}

var man = function(t) {
  ret = manual2(t, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, 32, 17, 16, 90);
  return ret;
};
var manual = function(t) {
  sp = 3;
  if (keyIsDown(16)) sp = 1 / 3;
  if (keyIsDown(LEFT_ARROW)) {

    t.turnLeft(sp);
  }
  if (keyIsDown(RIGHT_ARROW)) {
    t.turnRight(sp);
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

var basicTurret = function(t) {
  t.stop();
  if (t.playersIsee.length == 0) {
    t.turnLeft();
    return;
  }
  var target = t.playersIsee[0];
  var Ax = t.x;
  var Ay = t.y;
  var Bx = t.x + 100 * cos(t.dir);
  var By = t.y + 100 * sin(t.dir);
  var X = target.x;
  var Y = target.y;
  s = ((Bx - Ax) * (Y - Ay) - (By - Ay) * (X - Ax))
  if (s < 0) {
    t.turnLeft(1 / 2);
  } else {
    t.turnRight(1 / 2);
  }
  //text(s,t.x,t.y+30)
  t.shoot();
  t.stop();
  if (keyIsDown(81)) {
    console.log(s + " " + t.x + " " + t.y + " , " + target.x + " " + target.y + " " + target.id)
  }
}
var Player = class Player {

  constructor(id, x, y, color, AI = undefined) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.color = color;
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

    this.playersIsee = [];
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
  step() {
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
      if (this.life >= 20 && Math.random() > 0.999) {
        //   this.split();
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
  split() {
    if (this.clonning) return;
    this.clonning = true;
    var clone = new Player(this.id, this.x, this.y, this.color)
    clone.life = Math.floor((this.life / 2) - 1)
    this.life = Math.floor(this.life / 2 - 1)
    players.push(clone);
    this.clonning = false;
  }
  shoot() {
    if (this.shootCtd <= 0) {
      bullets.push(new Bullet(this.id, this.x, this.y, this.dir))
      this.shootCtd = 10;
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
    this.playersIsee = [];
    var tmpinfo=[];
    this.playersIsee = players.filter(function(p) {
      //    var px=player.x;

      return (tid != p.id && collidePointArc(p.x, p.y, tx, ty, width + height, td, ((2 * PI) / 360) * vAngle));
      //return g
    });
    for(var i=0;i<this.playersIsee.length;i+=1){

    }
    this.playersIsee = this.playersIsee.slice(0);
    text(this.playersIsee.length, this.x - 5, this.y - 35);

  }
  draw() {

    var viewAngle = ((2 * PI) / 360) * vAngle;
    var tmpcolor = this.color.slice(0);

    tmpcolor[3] = 30
      //  console.log(tmpcolor)
    fill(tmpcolor)
    noStroke();
    arc(this.x, this.y, width + height, width + height, this.dir - viewAngle / 2, this.dir + viewAngle / 2, PIE);

    text(this.playersIsee.length, this.x - 5, this.y - 35);
    fill(this.color)
    noStroke()
    rect(this.x - 5, this.y - 5, 10, 10);
    // text(tmp.id,tmp.x,tmp.y+20)
    var hedist = 8;
    ellipse(this.x + hedist * cos(this.dir), this.y + hedist * sin(this.dir), 8, 8)
    alpha(20)
      //stroke(222)
    stroke(222)
    text(this.life, this.x, this.y + 15)
  }


}