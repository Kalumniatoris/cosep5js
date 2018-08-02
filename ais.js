//vAngle = 60
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
  var isLeft=function(Ax,Ay,Bx,By,X,Y){
    return  ((Bx - Ax) * (Y - Ay) - (By - Ay) * (X - Ax))<0
  }
  var burstMine=function(t){
    var explode=function(){
      for(var q=0;q<36;q+=1){
        bullets.push(new Bullet(0,t.x+10*cos((q*10*Math.PI)/180),t.y+10*sin((q*10*Math.PI)/180),(q*10*Math.PI)/180,1));
        }
        t.life=-10;
    }
    if(t.life<=10&&Math.random()<0.01){explode();}
    var range=40;
    fill(254,50)
    ellipse(t.x,t.y,range*2,range*2)
    t.vAngle=180
    t.turnRight(180);
    //t.life+=(50-this.life)/2;
    buffer.text("X",t.x,t.y);
    if(t.playersIsee.length==0)return;
    for(var i=0;i<t.playersIsee.length;i+=1){
      if(t.playersIsee[i].distance<range){
      rect(t.x-range,t.y-range,range*2,range*2)
      explode();
      
    }
    }
  }
  
  var basicTurret = function(t) {
  
    t.stop();
    if (t.playersIsee.length == 0) {
      t.turnLeft();
      return;
    }
    var target = t.playersIsee[0];
    if(target.angle>0){
      t.turnLeft();
    }
    else{
      t.turnRight();
    }
  
    t.shoot();
    t.stop();
    if (keyIsDown(81)) {
      console.log(s + " " + t.x + " " + t.y + " , " + target.x + " " + target.y + " " + target.id)
    }
   
  }