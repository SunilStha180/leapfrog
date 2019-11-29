
(function(){
    function Box(parentElement){  
        this.x=10;
        this.y=10;
        this.speed=1;
        this.width=20;
        this.height=20;
        this.element=null;
        this.parentElement=parentElement;
        
        //var that= this;
        this.init = function(){
          var box = document.createElement('div');
          box.style.height = this.height + 'px';
          box.style.width = this.width + 'px';
          box.classList.add('box')
          this.parentElement.appendChild('box');
          this.element = box;
         }
         this.setPosition = function(x,y){
          this.x = x;
          this.y = y;
      
         }
         //this.boxClicked = function()
         this.draw = function(){
          this.element.style.left = this.x + 'px';
          this.element.style.top = this.y +'px';
      
         }
      
         this.move = function() {
         this.x += this.speed;
         this.y += this.speed;
         this.draw();
       }
      }
         function getRandomNumber(min ,max){
          return Math.random() * (max - min) + min;
          }
      
      
         function Game(parentElement,boxCount){
          var boxex = [];
          var maxWidth = 500;
          var maxheight = 500;
          this.parentElement = parentElement;
          this.boxCount = boxCount || 10;
      
          this.StartGame = function(){
              for (var i = 0; i <= this.boxCount; i++){
              var box = new Box(parentElement).init();
              box.setPosition(
                  getRandomNumber(0 ,maxWidth),
                  getRandomNumber(0,maxheight);
      
              )
              box.draw();
              boxex.push(box);
              }
              setInterval(this.moveBoxes.bind(this), 100)   
          }
          this.moveBoxex = function(){
              for(var i=0 ; i < this.boxCount; i++){
      
                  boxes[i].move();
              }
      
          }
      
         }
         var parentElement = document.getElementById('app')
         new Game(parentElement).StartGame;
})();