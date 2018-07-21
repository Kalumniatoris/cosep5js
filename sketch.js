

var k;
var x=2;
var cwidth=600;
var cheight=600;
var players =[];
var newid=1;
var bullets=[];
var otts=[];
var nplayers=1;
var bulletSpeed=10;
var maxbullets = 100;
var air=(0.01)
//var players=[new Player(10,10,30),new Player(40,20,100),new Player(40,100,1)];\

addNewPlayer=function(x,y){
  players.push(new Player("Player_"+newid,x,y,[Math.floor(Math.random()*255),Math.floor(Math.random()*255),Math.floor(Math.random()*255),200] ));
 newid+=1;
}
function mousePressed() {
 // players.push(new Player("Player_"+newid,mouseX,mouseY,[Math.floor(Math.random()*128)+128,Math.floor(Math.random()*10)+128,Mat h.floor(Math.random()*10)+128,100] ));
  addNewPlayer(mouseX,mouseY);

}

function setup() {
  players.push(new Player("Human",300,400,[Math.floor(Math.random()*255),Math.floor(Math.random()*255),Math.floor(Math.random()*255),200],manual ));
  players[0].stop();
  for(var i=0;i<nplayers-1;i+=1){
   // players.push(new Player("Player_"+i,width,height,[Math.floor(Math.random()*255)+5,Math.floor(Math.random()*255)+5,Math.floor(Math.random()*255)+5,100] ));
   // players.push(new Player("Player_"+i,width,height,[Math.floor(Math.random()*128)+128,Math.floor(Math.random()*10)+128,Math.floor(Math.random()*10)+128,100] ));
    addNewPlayer(Math.random()*width,Math.random()*height);
  }
  for(var i=0;i<45;i+=1){
   otts.push(new Ott(Math.random(),cwidth*Math.random(),cheight*Math.random(),[Math.random()*255,Math.random()*255,Math.random()*255,100]))
    // var tmp=players[i];
   // tmp.setOthers(players);
  }
  cwidth=windowWidth-10;
  cheight=windowHeight-10;
  //canvas = createCanvas(windowWidth-10,windowHeight-10);
  createCanvas(cwidth, cheight);
}
function draw() {
  
  background(0);
 for(var i=0;i<otts.length;i+=1){
   var tmp=otts[i];
   tmp.step();
   tmp.draw();
 }
 //rect(10,10,100,100)
 var points=[]
 for(var i=0;i<players.length;i+=1){
    var tmp=players[i];
  points.push([tmp.x,tmp.y]);

  tmp.draw();
  tmp.step();

  for(var ti=0;ti<i;ti+=1){
    var tmp2=players[ti];
    stroke(avta(tmp.color,tmp2.color));
    strokeWeight(1);
    while(collideRectRect(tmp.x,tmp.y,10,10,tmp2.x,tmp2.y,10,10)){
    if(tmp.x>tmp2.x && Math.abs(tmp.x-tmp2.x)<=10) tmp.x+=1
    if(tmp.x<tmp2.x && Math.abs(tmp.x-tmp2.x)<=10)tmp.x-=1

    if(tmp.y>tmp2.y && Math.abs(tmp.y-tmp2.y)<=10) tmp.y+=1
    if(tmp.y<tmp2.y && Math.abs(tmp.y-tmp2.y)<=10)tmp.y-=1
  }
  //  stroke(0);
    if(collidePointLine(mouseX,mouseY,tmp.x+5,tmp.y+5,tmp2.x+5,tmp2.y+5,1)){
     
    }


   }
  
  }

  ///HULL
   var thull=hull(points,(width+height)/4);
   var thull=hull(points,(width+height)/4);

  
  
   // // stroke(255);
  // // strokeWeight(10)
  var hpoly=[];

  for(var i=0;i<thull.length;i+=1){
    hpoly[i]=createVector(thull[i][0],thull[i][1]);
   // console.log(hpoly[i])
  }
  var inhull=collidePointPoly(mouseX,mouseY,hpoly);
  stroke(200);
   if(inhull){
     text("IN",mouseX,mouseY);
   }else{
     text("OUT",mouseX,mouseY);
   }
   text(bullets.length,mouseX+50,mouseY);
  for(var i=1;i<thull.length;i+=1){
    hpoly[i]=createVector()
    line(thull[i-1][0],thull[i-1][1],thull[i][0],thull[i][1]);
  // // //  console.log(thull[i])
   }
  // strokeWeight(1)
  fill(255);
//createP("a");noFill()//

//text(avta([mouseX,mouseY,mouseX,mouseY],[0,0,width,height]),mouseX,mouseY)
//stroke(0)
//line(mouseX/2,mouseY/2,(width+mouseX)/2,(height+mouseY)/2)
 // text("hjh",mouseX+2,mouseY+10);
 //stroke(222,0,20);
 
 //bezier(0,0,mouseX,height*1/3,mouseX,height*2/3,width,height);
 
  // put drawing code here

   for(var i=0;i<bullets.length;i+=1){
   if(tmp.x<0||tmp.x>width||tmp.y<0||tmp.y>height){
      
     if (i > -1) {
       bullets.splice(i, 1);      
      // console.log("removed");
       i-=1;
     }
    }
   }

  for(var i=0;i<bullets.length;i+=1){
   var tmp=bullets[i]
    
    tmp.draw();
    tmp.step();


     for(var ti=0;ti<i;ti+=1){
      // if(ti==i)continue;
       var tmp2=players[ti];
       if(typeof tmp2 !="undefined" && typeof tmp!="undefined"){
         stroke(255)
         
         if(collideLineRect(tmp.prevX,tmp.prevY,tmp.x,tmp.y,tmp2.x,tmp2.y,10,10)&&tmp.creator!==tmp2.id){
        // if(collideRectRect(tmp.x,tmp.y,2,2,tmp2.x,tmp2.y,10,10) && tmp.creator!==tmp2.id){
        if(tmp.x>tmp2.x && Math.abs(tmp.x-tmp2.x)<=10)tmp.x+=1;
        if(tmp.x<tmp2.x && Math.abs(tmp.x-tmp2.x)<=10)tmp.x-=1;
   
        if(tmp.y>tmp2.y && Math.abs(tmp.y-tmp2.y)<=10) tmp.y+=1;
        if(tmp.y<tmp2.y && Math.abs(tmp.y-tmp2.y)<=10)tmp.y-=1;  
       
        tmp2.life-=tmp.strength;
        ellipse(tmp.x,tmp.y,30,30);
       }
       // if(tmp2!=tmp.creator)tmp.life=0;
        
       }
   
      }
      if(tmp.x<0||tmp.x>width||tmp.y<0||tmp.y>height)tmp.life-=50;
      bullets=bullets.filter(function(bullet){return bullet.life>0})
      players=players.filter(function(player){return player.life>0})

      while(bullets.length>maxbullets){
        bullets.splice(1,1);
        }
      // for(var i=0;i<bullets.length;i+=1){
      //   if(bullets[i].life<=0){
      //    // delete bullets[i]
      //   bullets=bullets.g
      //   }
      // }

   }



}

avta=function(a,b){
  if(a.length!=b.length)return null;
  var tmp=[]
  for(var i=0;i<a.length;i+=1){
    tmp.push((a[i]+b[i])/2)
  }
  return tmp
}

var cDir={"up":1,"right":2,"down":3,"left":4}
Object.freeze(cDir);
