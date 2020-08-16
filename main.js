///##$$$$$$$DATABASE$$$$$###///
class Canvas {
  constructor(w, h) {
    this.cw = w;
    this.ch = h;
    this.cx;
  };
  init() {
    let cv = document.createElement("canvas");
    this.cx = cv.getContext("2d");
    cv.width = this.cw;
    cv.height = this.ch;
    document.body.appendChild(cv);
  };
  update(col) {
    this.cx.fillStyle = col;
    this.cx.fillRect(0, 0, this.cw, this.ch);
  }
}

class Button {
  constructor(t, x, y, w, h) {
    this.w = w;
    this.h = h;
    this.text = t;
    this.x = x;
    this.y = y;
    this.btn;
  }
  init() {
    this.btn = document.createElement("button");
    this.btn.type = "button";
    this.btn.innerHTML = this.text;
    this.btn.style.height = `${this.h}px`;
    this.btn.style.width = `${this.w}px`;
    this.btn.style.position = "absolute";
    this.btn.style.left = `${this.x}px`;
    this.btn.style.top = `${this.y}px`;
    document.body.appendChild(this.btn);
  }
  /**
   * Add a border, background and font style 
   */
  personalize(brd, r, bkg, font, col, size) {
    this.init();
    this.btn.style.border = brd;
    this.btn.style.borderRadius = r;
    this.btn.style.background = bkg;
    this.btn.style.fontFamily = font;
    this.btn.style.color = col;
    this.btn.style.fontSize = `${size}px`;
  }
}

class Particle {
  constructor(x, y, r, g, canvas_Render) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.gravity = g;
    this.cv = canvas_Render;
  }
  draw() {
    this.cv.cx.fillStyle = "#fff5";
    this.cv.cx.strokeStyle = "#fffc";
    this.cv.cx.lineWidth = 3;
    this.cv.cx.beginPath();
    this.cv.cx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
    this.cv.cx.fill();
    this.cv.cx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
    this.cv.cx.stroke();
    this.cv.cx.closePath();
  }
  fall() {
    if (this.y + this.r < this.cv.ch) {
      this.y += this.gravity;
    }
    else {
      this.y = this.cv.ch - this.r - 30
      this.gravity *= -1
      //this.gravity*=-0.9
    }
    this.gravity += .3;
  }
}
//#####$$$$$ VAR and OBJECTS$$####///
let canvas1 = new Canvas(1500, 2000);
canvas1.init();

let particles = [];
let gravity_mean = 0;
let n_green = 0;
let n_yellow = 0;
let n_red = 0;
//let btnPlay=new Button("Play",250,100,100,50);
//btnPlay.personalize("2px ridge grey","13px","lightgreen","arial","#000",30)
//####$$$$$$FRAME TEST FUNCTION$$$$$###///
window.onload=function(){
    canvas1.update("#000")
  canvas1.cx.fillStyle="#fff";
  canvas1.cx.font="bold 100px arial"
  canvas1.cx.fillText("Just touch to start",window.innerWidth/2,canvas1.ch/2)
  setTimeout(test,2000);
}
function test() {
  canvas1.update("#000")
  for (pa of particles) {
    pa.draw()
    pa.fall()
  }
  radius_join();
  check_Collision();
  infos();
  requestAnimationFrame(test);
}

let ratex = window.innerWidth / canvas1.cw
let ratey = window.innerHeight / canvas1.ch

document.body.ontouchstart = function(e) {
  let xr = e.touches[0].clientX / ratex;
  let yr = e.touches[0].clientY / ratey;
  let rr = rand(50, 200);
  let gr = 2000 / rr;
  particles.push(new Particle(xr, yr, rr, gr, canvas1));
  gravity_mean += gr;
}

//////////$$¢$$$$$ Librairies $$$$/////
function rand(a, b) {
  return parseInt(Math.random() * (b - a) + a);
}

function dist(A, B) {
  let X = A.x - B.x;
  let Y = A.y - B.y;
  return Math.sqrt(X * X + Y * Y);
}

function radius_join() {
  for (pa of particles) {
    n_red=0;
    n_green=1;
    n_yellow=0;
    for (par of particles) {
      if (pa != par) {
        let col;
        
        if (dist(pa, par) < pa.r+par.r+100) {
          col = "#f00";
          n_red++;
        }
        else if (dist(pa, par) < pa.r+par.r+300) {
          col = "#ff0"
          n_yellow++;
        }
        else {
          col = "#0f0"
          n_green++;
        }
        /* pa.cv.cx.fillStyle = "aqua";
         pa.cv.cx.font = "30px arial"
         pa.cv.cx.fillText(dist(pa, par), pa.x, pa.y)*/
        pa.cv.cx.lineWidth = 4;
        pa.cv.cx.strokeStyle = col;
        pa.cv.cx.beginPath();
        pa.cv.cx.moveTo(pa.x, pa.y);
        pa.cv.cx.lineTo(par.x, par.y);
        pa.cv.cx.stroke();
        pa.cv.cx.closePath();
      }
    }
  }
}

function check_Collision() {
  for (pa of particles) {
    for (par of particles) {
      if (pa != par) {
        if (dist(pa, par) < par.r + pa.r) {
          pa.gravity *= -1;
        }
      }
    }
  }
}

function infos() {
  let xMax = canvas1.cw;
  let yMax = canvas1.ch / 7 * ratey;
  canvas1.cx.fillStyle = "#000c"
  canvas1.cx.strokeStyle = "#fffd"
  canvas1.cx.lineWidth = 3;
  canvas1.cx.beginPath();
  canvas1.cx.moveTo(0, yMax)
  canvas1.cx.lineTo(xMax, yMax)
  canvas1.cx.stroke();
  canvas1.cx.fillRect(0, 0, xMax, yMax)
  canvas1.cx.closePath();

  canvas1.cx.font = "bold 30px arial"
  canvas1.cx.fillStyle = "#fff"
  canvas1.cx.fillText(`Particles : ${particles.length}`, 50, yMax / 2)
  canvas1.cx.fillText(`Mean Gravity : ${parseInt(gravity_mean/particles.length)}`, 300, yMax / 2)
  canvas1.cx.fillText(`Far Particles : ${n_green}`, 600, yMax / 2)
  canvas1.cx.fillText(`Normal Particles : ${n_yellow}`, 900, yMax / 2)
  canvas1.cx.fillText(`Close Particles : ${n_red}`, 1200, yMax/ 2)

}