
    board.innerHTML = "";
        let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}
    function init(){
    // console.log("Init");
    canvas=document.getElementById("mycanvas");
    pen=canvas.getContext("2d");
    W=canvas.width;
    H=canvas.height;
    game_over=false;
    score=0;
    food=getRandomFood();
    snake={
        init_length:1,
        color:"aqua",
        cells:[],
        direction:"right",
        createSnake:function()
        {
            for(var i=this.init_length-1;i>=0;i--){
                this.cells.push({x:i,y:0});
            }
        },
        drawSnake:function(){
            for(var i=0;i<this.cells.length;i++){
                pen.fillStyle=this.color;
                pen.strokeStyle="black";
                pen.lineWidth=5;
                pen.radius=12;
                pen.round=12;
                pen.strokeRect(this.cells[i].x*10,this.cells[i].y*10,10,10)
            
                pen.fillRect(this.cells[i].x*10,this.cells[i].y*10,10,10)
            }
        },
        updateSnake:function(){
            game_over=false;
                var headX=this.cells[0].x;
                var headY=this.cells[0].y;
            // //assuming snake moving to right
            // nextHeadX=headX+1;
                //  this.cells.pop();
                 if(headX==food.x&&headY==food.y){
                     food=getRandomFood();
                    // score++;
                    score += 1;
                    if(score>hiscoreval){
                        hiscoreval = score;
                        localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
                        hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
                    }
                    scoreBox.innerHTML = "Score: " + score;
                   
                 }
                 else{
                    //pop last cell if food not eaten
                    this.cells.pop();
                 }
            // this.cells.unshift({x:nextHeadX,y:headY});
                if(this.direction=="right"){
                    nextX=headX+1;
                    nextY=headY;
                }
                else if(this.direction=="left"){
                    nextX=headX-1;
                    nextY=headY;
                }
                else if(this.direction=="down"){
                    nextX=headX;
                    nextY=headY+1;
                }
                else{
                    nextX=headX;
                    nextY=headY-1;
                }
                //insert the new cell at head
                this.cells.unshift({x:nextX,y:nextY});
                
                var last_x=Math.round(W/10);
                var last_y=Math.round(H/10);
                if(this.cells[0].y<0||this.cells[0].x<0||this.cells[0].x>last_x||this.cells[0].y>last_y){
                    var s=confirm("Game Over\n Click Ok to play again");
                    game_over=true;
                    if(s){
                        score=0;
                        init();
                        //var f= setInterval(gameLoop,100);
                        gameLoop();
                       // game_over=false;
                    }
                    else{
                        alert("You played very well")
                        //game_over=false;
                        close();

                    }
                   
                    
                }
            }
    };
    snake.createSnake();
    function KeyPressed(e){
        console.log("you pressed a key")
        console.log(e);
        if (e.key=="ArrowRight"){
            snake.direction="right";
        }
        else if(e.key=="ArrowLeft"){
            snake.direction="left";
        }
        else if(e.key=="ArrowDown"){
            snake.direction="down"
        }
        else
        {
            snake.direction="top"
        }
    }
   var f= document.addEventListener("keydown",KeyPressed);

}
function draw(){
    pen.clearRect(0,0,W,H);
    snake.drawSnake();
    pen.fillStyle=food.color;
    pen.fillRect(food.x*10,food.y*10,10,10);

}
function update(){
    snake.updateSnake();
}
function gameLoop(){
 draw();
 update(); 
 if(game_over==true){
     clearInterval(f);
 }

}
function getRandomFood(){
    var foodX=Math.round(Math.random()*(W-10)/10);
    var foodY=Math.round(Math.random()*(H-10)/10);
    fcolors=["red","green","aqua","coral","orchid","pink","blue","white"];
    var i= Math.round(Math.random()*fcolors.length);
    var food={
        x:foodX,
        y:foodY,
        color:fcolors[i]

    };
    return food;
}
init();
var f= setInterval(gameLoop,100);
gameLoop();