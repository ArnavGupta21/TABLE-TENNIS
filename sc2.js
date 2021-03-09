var W = window.innerWidth-60,
    H = window.innerHeight;

var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext("2d");

canvas.width = W;
canvas.height = H;
var hit = new Audio();
hit.src = 'hit.wav';

var lost = new Audio();
lost.src = 'lose.mp3';
/* Section for drawing the game table*/

var board = {
    // x, y positions
    x: 0,
    y: 0,

    // width & height
    w: W,
    h: H,

    // walls
    top_wall: {
        dir: "top",
        x: 0,
        y: 0,
        w: W-5,
        h: 5
    },

    bottom_wall: {
        dir: "bottom",
        x: 0,
        y: H-5,
        w: W-5,
        h: 5
    },

    right_wall: {
        dir: "right",
        x: W-5,
        y: 0,
        w: 5,
        h: H
    },

    left_wall: {
        dir: "left",
        x: 0,
        y: 0,
        w: 5,
        h: H
    },

    goal_wdith: H-30,

    draw: function() {
        ctx.clearRect(this.x, this.y, this.w, this.h);

        // fill rect
        ctx.fillStyle = "#000853"; 
        // "#8B0000";
        ctx.fillRect(this.x, this.y, this.w, this.h)

        // walls
        ctx.fillStyle = "#fff";

        ctx.fillRect(this.left_wall.x, this.left_wall.y, this.left_wall.w, this.left_wall.h); // left
        ctx.fillRect(this.right_wall.x, this.right_wall.y, this.right_wall.w, this.right_wall.h); // right
        ctx.fillRect(this.top_wall.x, this.top_wall.y, this.top_wall.w, this.top_wall.h); // top
        ctx.fillRect(this.bottom_wall.x, this.bottom_wall.y, this.bottom_wall.w, this.bottom_wall.h); // bottom

        // negilla dashed rectangles (Captin Magid Style ;))
        var ground_height = this.bottom_wall.y - (this.top_wall.y + this.top_wall.h);
        var yi = 15;

        // dashed line & circles
        ctx.beginPath();

        // small circle
        ctx.fillStyle = '#fff';
        ctx.arc(W/2, H/2, 5, 0, 2 * Math.PI, false);
        ctx.fill();

        // big circle in the center
        ctx.arc(W/2, H/2, 80, 0, 2 * Math.PI, false);

        // dashed line in the middle
        ctx.moveTo(0, H/2);
        ctx.lineTo(W-5,H/2);
        ctx.strokeStyle = '#fff';
        ctx.stroke();

        // dashed line on the top
        ctx.moveTo(0, 100);
        ctx.lineTo(W-5,100);
        ctx.strokeStyle = '#fff';
        ctx.stroke();

        // dashed line on the bottom
        ctx.moveTo(0, H-100);
        ctx.lineTo(W-5,H-100);
        ctx.strokeStyle = '#fff';
        ctx.stroke();


        // dashed line on the left
        ctx.moveTo(100, 0);
        ctx.lineTo(100,H);
        ctx.strokeStyle = '#fff';
        ctx.stroke();

        // dashed line on the right
        ctx.moveTo(W-100, 0);
        ctx.lineTo(W-100,H);
        ctx.strokeStyle = '#fff';
        ctx.stroke();


        // vertical line on the middle
        ctx.moveTo(W/2, 0);
        ctx.lineTo(W/2,H);
        ctx.strokeStyle = '#fff';
        ctx.stroke();

        // half-circle on Right
        ctx.beginPath();
        ctx.arc(W, H/2, 100, 2 * Math.PI , 0, false);
        ctx.stroke();


        // half-circle on Left
        ctx.beginPath();
        ctx.arc(0, H/2, 100, 2 * Math.PI , 0, false);
        ctx.stroke();
    }
}

board.draw();
drawText("Score Limit : 5",canvas.width/3 + 50,canvas.height - 20);
// draw text
var user_score = 0;
var cpu_score = 0;
var prev_user=0;
var prev_cpu = 0;
var user_open = false;
var cpu_open = false;
function drawUserText(text,x,y){
    if(user_score - prev_user == 1){
        ctx.fillStyle = "#000853";
        ctx.font = "65px fantasy";
        ctx.fillText(prev_user, x, y);

        ctx.fillStyle = "white";
        ctx.font = "65px fantasy";
        ctx.fillText(text, x, y);
    }
    ctx.fillStyle = "white";
    ctx.font = "65px fantasy";
    ctx.fillText(text, x, y);
}
 
function drawCPUText(text,x,y){
    if(cpu_score - prev_cpu == 1){
        ctx.fillStyle = "#000853";
        ctx.font = "65px fantasy";
        ctx.fillText(prev_cpu, x, y);
        
        ctx.fillStyle = "white";
        ctx.font = "65px fantasy";
        ctx.fillText(text, x, y);
    }
    ctx.fillStyle = "white";
    ctx.font = "65px fantasy";
    ctx.fillText(text, x, y);
}

function drawText(text,x,y){
    ctx.fillStyle = "white";
    ctx.font = "65px fantasy";
    ctx.fillText(text, x, y);
}
function render(){
    drawUserText(user_score,canvas.width/4,canvas.height/7 - 20);
    drawCPUText(cpu_score,3*canvas.width/4,canvas.height/7 - 20);
}

//ps= player speed
var ps = 15;

function nfp(urpx) {
    return Number(urpx.replace("px", ""))
}

var r = document.getElementById('right_paddle');
var l = document.getElementById('left_paddle');
var b = document.getElementById('ball');

var rscore = document.getElementById('scoreleft');
var lscore = document.getElementById('scoreright');
var ogoal = document.getElementById('goal');

var w = window.innerWidth;
var h = window.innerHeight;

var map = []; // Or you could call it "key"
onkeydown = onkeyup = function(e) {
    e = e || event; // to deal with IE
    map[e.keyCode] = e.type == 'keydown';
    /*insert conditional here*/
}

function keydown() {
    if (map[40]) {
        if (nfp(r.style.top) + ps > h - 200)
            r.style.top = h - 200 + "px";
        else
            r.style.top = nfp(r.style.top) + ps + "px";
    }



    //if key was down arrow
    else if (map[38]) {
        if (nfp(r.style.top) - ps < 0)
            r.style.top = 0 + "px";
        else
            r.style.top = nfp(r.style.top) - ps + "px";
    }

}


var speedx = 5,
    speedy = 3;
var balltime = 1;
b.style.left = w / 2 + "px";

function ball() {
    b.style.left = nfp(b.style.left) + speedx + "px";
    b.style.top = nfp(b.style.top) + speedy + "px";
    l.style.top = nfp(l.style.top) + speedy + "px";
}


function moveball() {
    ball();

    //remove overflow y
    if (h < nfp(b.style.top) + 20 || nfp(b.style.top) < 0) {
        speedy *= -1;
        hit.play();
    }

     //overflow-x right
    if (nfp(b.style.left) >= w - 50) {
        if (nfp(r.style.top) <= nfp(b.style.top) + 20 && nfp(r.style.top) + 200 >= nfp(b.style.top)) {
            speedx *= -1;
            hit.play();
        } 

        else if (nfp(b.style.left) >= w - 20){
            if(prev_user ==0 && user_open === false){
                user_score = user_score + 1;
                user_open = true;
            }
            else{
                user_score = user_score +1; 
                prev_user=user_score-1;  
            }

            goal('left');
        }
    }

    //remove overflow x in left or get the goal in left
    if (nfp(b.style.left) <= 30) {
        if (nfp(l.style.top) <= nfp(b.style.top) + 20 && nfp(l.style.top) + 200 >= nfp(b.style.top)) {
            speedx *= -1;
            hit.play();
        }
        else if (nfp(b.style.left) <= 0){
            
            if(prev_cpu ==0 && cpu_open === false){
                cpu_score = cpu_score + 1;
                cpu_open = true;
                hit.play();
            }
            else{
                cpu_score = cpu_score +1; 
                prev_cpu=cpu_score-1;  
            }
            
            goal('right');
        }
        
    }
    if(user_score == 5){
        lost.play();
        alert("You Lost :( Refresh to Re-Start the Game!");
        return;
    }
    setTimeout(function() { moveball() }, balltime);
}

setInterval(function() {
    keydown();
    render(); }, 10);
moveball();

function goal(pos) {

    ogoal.style.color = "white";

    setTimeout(function() {
        ogoal.style.color = "black"
    }, 1000);

    if (pos == "left")
        rscore.innerHTML = Number(rscore.innerHTML) + 1;
    else
        lscore.innerHTML = Number(lscore.innerHTML) + 1;


    speedx *= -1;
    b.style.left = w / 2 + "px";
}