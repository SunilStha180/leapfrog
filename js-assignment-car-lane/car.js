const score = document.querySelector(".score");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");


let keys = {
ArrowUp:false, ArrowDown:false , ArrowLeft:false , ArrowRight:false 
};

startScreen.addEventListener("click",start);
document.addEventListener("keydown",pressOn);
document.addEventListener("keyup",pressOff);

let player={speed:5 ,score:0};

function moveLines(){
    //assigning all the created line to the lines with the query selector   
    let lines= document.querySelectorAll(".line");  
    lines.forEach(function(item){

        // console.log(item.y);

        if (item.y>1500){

            item.y-=1500;
        }
        item.y+=player.speed;
        item.style.top=item.y+'px';
    })
}

function isCollide(a,b){
let aRect = a.getBoundingClientRect();
let bRect =  b.getBoundingClientRect();

return !(
(aRect.bottom<bRect.top)||
(aRect.top>bRect.bottom)||
(aRect.right<bRect.left)||
(aRect.left>bRect.right)

)
}


function moveEnemy(car){
    //assigning all the created line to the lines with the query selector   
    let ele= document.querySelectorAll(".enemy");  
    ele.forEach(function(item){

        if(isCollide(car,item)){

            console.log("HIT");
            endGame();
        }

        if (item.y>1500){
            item.y=-600;
            item.style.left=Math.floor(Math.random()*350) + 'px';
            item.backgroundColor=randomcolor();
        }
        item.y+=player.speed;
        item.style.top=item.y+'px';
    })
}



function playGame(){

   let car = document.querySelector('.car');

   moveLines();
   moveEnemy(car);
    let road = gameArea.getBoundingClientRect();
    
//    console.log(road);
//    console.log(player.y);
   if (player.start){

    if (keys.ArrowUp && player.y>(road.top))
    {
        player.y -= player.speed
    }
    if (keys.ArrowDown && player.y<(road.bottom))
    {
        player.y += player.speed
    }
    if (keys.ArrowLeft && player.x>0)
    {
        player.x -= player.speed
    }
    if (keys.ArrowRight && player.x<(road.width-50))
    {
        player.x += player.speed
    }
 
    car.style.left = player.x +'px';
    car.style.top = player.y +'px';
    window.requestAnimationFrame(playGame);
    player.score++;
    score.innerText = "Score: "+ player.score;
   }
}



function pressOn(e){
    e.preventDefault();
    keys[e.key]=true;
    console.log(keys);
}

function pressOff(e){
    e.preventDefault();
    keys[e.key]=false;
    console.log(keys);
}

function endGame(){
    player.start=false;
    score.innerHTML="Game Over <br> Score was " + player.score;
    startScreen.classList.remove("hide");
}


function start(){
    startScreen.classList.add("hide");
    //gameArea.classList.remove("hide");
    gameArea.innerHTML ="";
    player.start=true;
    player.score=0;
    for (let x=0;x<10;x++){
        let div=document.createElement("div");
        div.classList.add("line");
        div.y=x*150;

        div.style.top=(x*150)+'px';
        gameArea.appendChild(div);
    }

    window.requestAnimationFrame(playGame);
    let car = document.createElement('div');
    //car.innerHTML='';
    car.setAttribute("class","car"); 
    gameArea.appendChild(car);
    player.x=car.offsetLeft;
    player.y= car.offsetTop;
    for (let x=0;x<4;x++){
        let enemy = document.createElement("div");
        enemy.classList.add("enemy");
        enemy.innerHTML= "<br>" + (x+1);
        enemy.y=((x+1)*600)*-1;
        enemy.style.top=enemy.y+'px';
        
        enemy.style.left=Math.floor(Math.random()*350)
        enemy.style.backgroundColor=randomcolor();
        gameArea.appendChild(enemy);
    }

}

function randomcolor(){
  

    function c(){
    let hex= Math.floor(Math.random()*256).toString(16);
    return("0"+ String(hex)).substr(-2)
    }
    return "#"+c()+c()+c();
}