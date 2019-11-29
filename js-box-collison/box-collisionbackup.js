
// (function () {
    function Box(parentElement) {
      this.x = 0;
      this.y = 0;
      this.speed = 1;
      this.width = 20;
      this.height = 20;
      this.element = null;
      this.parentElement = parentElement;
      var that = this;
  
      this.init = function () {
        var box = document.createElement('div');
        box.style.height = this.height + 'px';
        box.style.width = this.width + 'px';
        box.classList.add('box');
        this.parentElement.appendChild(box);
        this.element = box;
        this.element.onclick = this.boxClicked.bind(this);
        this.draw();
  
        return this;
      }
  
      this.setPosition = function(x, y) {
        this.x = x;
        this.y = y;
      }
  
      this.boxClicked = function () {
        this.element.style.display='none';
      }
  
      this.draw = function () {
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
      }
      
      this.move = function() {
        this.x += this.speed;
        this.y += this.speed;
        this.draw();
      }
      this.checkBorderCollision = function(boxes) {
          MAX_HEIGHT=500;
          MAX_WIDTH= 500;
        if ((this.x+this.width)> MAX_WIDTH || (this.y+this.height)>MAX_HEIGHT || this.x<0 ||this.y<0){
            this.speed = -this.speed;
        }
      }
      this.checkCollision = function (boxes) {
		// this -> box whose collision is to be checked
		// boxes -> array of boxes
		// Check if this(box) collides with other boxes and set speed correspondingly
		for(var i = 0; i < boxes.length; i++) {

			// ignore checking collision with self
			if( boxes[i].x === this.x && boxes[i].y === this.y ) continue;

			if(
				boxes[i].x < this.x + this.width &&
				boxes[i].x + boxes[i].width > this.x &&
				boxes[i].y < this.y + this.height &&
				boxes[i].y + boxes[i].height > this.y
			) {
				// collision detected
				this.speed = -this.speed;
				//this.dx = -this.dx;
				//this.dy = -this.dy;
			}

		}		
	}

}

      
    
    
    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }
  // game class function
    function Game(parentElement, boxCount) {
      var boxes = [];
      var MAX_WIDTH = 500;
      var MAX_HEIGHT = 500;
      this.parentElement = parentElement;
      this.boxCount = boxCount || 10;
  
      this.startGame = function() {
        for(var i=0; i < this.boxCount; i++) {
          var box = new Box(parentElement).init();

          this.setUniqueBoxPosition(box);
          
          box.draw();
          boxes.push(box);
        }
  
        setInterval(this.moveBoxes.bind(this), 10)
      }
  
    //   this.moveBoxes = function() {
    //     for(var i=0; i< this.boxCount; i++) {
            
    //       boxes[i].move();
         
    //       boxes[i].checkBorderCollision(boxes);
    //       boxex[i].checkBoxCollision (boxes);
        
    //     }

    //   }
    this.moveBoxes = function() {
		for( var i = 0; i < this.boxCount; i++) {

			// Handle Boundary Collision
			// x-direction
			if ( 
				boxes[i].x <= 0 || 
				boxes[i].x >= (MAX_WIDTH - boxes[i].width)
			) {
				boxes[i].speed = -boxes[i].speed;
				//boxes[i].dx = -boxes[i].dx;
			}
			// y-direction
			if ( 
				boxes[i].y <= 0 || 
				boxes[i].y >= (MAX_HEIGHT - boxes[i].height)
			) {
				boxes[i].speed = -boxes[i].speed;
				//boxes[i].dy = -boxes[i].dy;
			}

			// Check collision
			boxes[i].checkCollision(boxes);
			boxes[i].move();

		}
	}




      this.setUniqueBoxPosition = function (box) {
		var uniqueX;
		var uniqueY;
		
		while ( true ) {
			
			uniqueX =  getRandomArbitrary(0, MAX_WIDTH - box.width);
			uniqueY = getRandomArbitrary(0, MAX_HEIGHT - box.height);
			
			var checkUniqueTL = this.checkUniqueBoxPosition(uniqueX,uniqueY); 
			var checkUniqueTR = this.checkUniqueBoxPosition(uniqueX + box.width, uniqueY); 
			var checkUniqueBL = this.checkUniqueBoxPosition(uniqueX,uniqueY + box.height); 
			var checkUniqueBR = this.checkUniqueBoxPosition(uniqueX + box.width,uniqueY + box.height); 
			
			if(checkUniqueTL && checkUniqueTR && checkUniqueBL && checkUniqueBR) {
			
				box.setPosition(uniqueX, uniqueY);
				break;
			 }
		 }
	 }
     this.checkUniqueBoxPosition = function (x, y) {
		var unique = true;
		var marginLR = 10;
		var marginTB = 10;

		for (var i = 0; i < boxes.length; i++) {
			if(
				x >= (boxes[i].x - marginLR) && x <= (boxes[i].x + boxes[i].width + marginLR) &&
				y >= (boxes[i].y - marginTB) && y <= (boxes[i].y + boxes[i].height + marginTB)
				
			) {
				unique = false;
				break;
			}
		}
		return unique;
	}
      
         
        
      
}

    var parentElement = document.getElementById('app');
  
    new Game(parentElement).startGame();
//}
 // })();