
var Ott = class Ott {
  constructor(id, x, y, color = 200) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.color = color;
    this.fx = 0;
    this.fy = 0;
    this.maxForce = 5;
    this.forceInc = 1;
  }
  step() {
    this.wrap();

    this.x += this.fx;
    this.y += this.fy;
    this.ai();
    this.addForce(Math.random() - 0.5, Math.random() - 0.5);
    this.air();
  }

  ai() {}
  air() {
    if (this.fx > 0) {
      this.fx = Math.max(this.fx - g.air, 0)
    }

    if (this.fx < 0) {
      this.fx = Math.min(this.fx + g.air, 0)
    }

    if (this.fy > 0) {
      this.fy = Math.max(this.fy - g.air, 0)
    }

    if (this.fy < 0) {
      this.fy = Math.min(this.fy + g.air, 0)
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
    if (this.x < 0) {
      this.x = 0;
    }
    if (this.y < 0) {
      this.y = 0;
    }
  }
  addForce(fx, fy) {

    if (Math.abs(this.fx + fx) <= this.maxForce) this.fx += fx;
    if (Math.abs(this.fy + fy) <= this.maxForce) this.fy += fy;


  }
  draw() {
    //stroke(this.color);
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, Math.abs(this.fx) + 3, Math.abs(this.fy) + 3);
    stroke(128);
  }

}