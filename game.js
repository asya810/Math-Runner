const menu = document.getElementById("menu");
const game = document.getElementById("game");
const result = document.getElementById("result");

const startBtn = document.getElementById("startBtn");
const playerName = document.getElementById("playerName");

const livesText = document.getElementById("lives");
const scoreText = document.getElementById("score");
const timeText = document.getElementById("time");
const questionText = document.getElementById("question");
const answers = document.getElementById("answers");
const number = document.getElementById("number");
const progressFill = document.getElementById("progressFill");
const runner = document.getElementById("runner");

const playerResult = document.getElementById("playerResult");
const finalScore = document.getElementById("finalScore");
const grade = document.getElementById("grade");

let score = 0;
let lives = 5;
let current = 0;
let timer = 300;
let player = "";
let interval;

// =========================
// 20 SOAL
// =========================

const questions = [

{ q:"12 × 3 + 5 = ?", a:["41","36","38","44"], c:0 },

{ q:"48 ÷ 6 + 7 = ?", a:["16","15","14","13"], c:2 },

{ q:"25 × 4 - 18 = ?", a:["82","84","80","86"], c:0 },

{ q:"90 - 18 × 2 = ?", a:["56","64","54","58"], c:0 },

{ q:"45 + 27 - 18 = ?", a:["52","54","50","56"], c:1 },

{ q:"8 × 9 - 20 = ?", a:["50","54","52","56"], c:2 },

{ q:"100 ÷ 4 + 19 = ?", a:["46","45","44","43"], c:2 },

{ q:"36 ÷ 6 × 8 = ?", a:["42","48","56","40"], c:1 },

{ q:"17 + 15 × 2 = ?", a:["62","64","47","60"], c:2 },

{ q:"81 ÷ 9 + 33 = ?", a:["40","44","42","45"], c:2 },

{ q:"72 - 8 × 5 = ?", a:["32","30","34","36"], c:0 },

{ q:"64 ÷ 8 + 29 = ?", a:["36","37","35","38"], c:1 },

{ q:"18 × 3 - 17 = ?", a:["39","37","35","36"], c:1 },

{ q:"56 + 18 ÷ 3 = ?", a:["60","64","62","58"], c:1 },

{ q:"15 × 6 - 25 = ?", a:["65","70","68","66"], c:0 },

{ q:"96 ÷ 8 + 14 = ?", a:["24","26","28","30"], c:1 },

{ q:"120 - 9 × 8 = ?", a:["48","50","52","46"], c:0 },

{ q:"14 × 7 + 5 = ?", a:["101","103","105","99"], c:1 },

{ q:"84 ÷ 7 + 18 = ?", a:["28","32","30","26"], c:2 },

{ q:"33 + 27 - 15 = ?", a:["43","47","45","41"], c:2 },

];
startBtn.addEventListener("click",()=>{

player = playerName.value.trim();

if(player==""){
alert("Masukkan nama terlebih dahulu!");
return;
}

menu.classList.add("hidden");
game.classList.remove("hidden");

showQuestion();

startTimer();

});

function startTimer(){

interval = setInterval(()=>{

timer--;

let m = Math.floor(timer/60);
let s = timer%60;

if(m<10) m="0"+m;
if(s<10) s="0"+s;

timeText.innerHTML=m+":"+s;

if(timer<=0){

clearInterval(interval);

finishGame();

}

},1000);

}

function showQuestion(){

let q = questions[current];

questionText.innerHTML=q.q;

number.innerHTML=current+1;

progressFill.style.width=((current)/questions.length*100)+"%";

answers.innerHTML="";

q.a.forEach((text,index)=>{

let btn=document.createElement("button");

btn.className="answerBtn";

btn.innerHTML=text;

btn.onclick=()=>checkAnswer(index);

answers.appendChild(btn);

});

runner.style.left=(current*18)+"px";

}

function checkAnswer(answer){

let correct=questions[current].c;

let buttons=document.querySelectorAll(".answerBtn");

buttons.forEach(btn=>btn.disabled=true);

if(answer==correct){

score+=10;

scoreText.innerHTML=score;

buttons[answer].classList.add("correct");

}else{

lives--;

livesText.innerHTML=lives;

buttons[answer].classList.add("wrong");

buttons[correct].classList.add("correct");

}

setTimeout(()=>{

if(lives<=0){

clearInterval(interval);

finishGame();

return;

}

current++;

if(current>=questions.length){

clearInterval(interval);

finishGame();

}else{

showQuestion();

}

},800);

}

function finishGame(){

game.classList.add("hidden");

result.classList.remove("hidden");

playerResult.innerHTML="Selamat, <b>"+player+"</b>!";

finalScore.innerHTML=score;

progressFill.style.width="100%";

if(score>=180){

grade.innerHTML="🏆 Nilai A";

}else if(score>=140){

grade.innerHTML="🥈 Nilai B";

}else{

grade.innerHTML="😊 Nilai C";

}

}