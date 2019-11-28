// GLOBALS
var IMG_WIDTH = 400;
var IMG_HEIGHT = 300;
// var currentPosition = 0;
var currentIndex = 0;

var imageWrapper = document.getElementsByClassName('carousel-image-wrapper');

var images = Array.from(imageWrapper[0].getElementsByTagName('img'));

images.forEach( function ( image, i) {
	image.style.left = ( i * IMG_WIDTH ) + 'px';
});

function shift(direction) {
	var totalTime = 1000;
	// update Index
	( direction === 'left') ? currentIndex-- : currentIndex++;
	// default speed calculated as
	var speed = -((IMG_WIDTH/totalTime) * 10);
	if(direction === 'left') speed = -speed;

	// handle if all images have been shown
	if( currentIndex >= (images.length)) {
		//reset current Index
		currentIndex = 0;	
		// calculate speed
		speed = ( ( IMG_WIDTH*(images.length-1) ) / totalTime ) * 10;
	}

	if( currentIndex < 0 ) {
		var currentPosition = -(images.length * IMG_WIDTH);
		currentIndex = images.length-1;
		speed = -( ( IMG_WIDTH*(images.length-1) ) / totalTime ) * 10;			
	}

	var slideInterval = setInterval(function(){
		var currentPosition = imageWrapper[0].style.left.split('px')[0];
		currentPosition = currentPosition =='' ? 0: parseInt(currentPosition);
		currentPosition += speed;	
		imageWrapper[0].style.left =  currentPosition + '.px';
	},10);

	setTimeout(function(){
		clearInterval(slideInterval);
		displayIndicators();
	},totalTime);
}

// create and add navigators 
var nav = document.createElement('div');
nav.setAttribute('class', 'navigator');
nav.style.width = '100%';
nav.style.height = '100%';
nav.style.position = 'absolute';
nav.style.backgroundColor = 'rgba(0,0,0,0.3)';

var leftNavButton = document.createElement('a');
leftNavButton.addEventListener('click', function(){ shift('left') });
leftNavButton.innerHTML = '<img src="images/arrow-left.png" width="20px"/>';
leftNavButton.style.position = 'absolute';
leftNavButton.style.top = '42%';
leftNavButton.style.left = '2%';
nav.appendChild(leftNavButton);

var rightNavButton = document.createElement('a');
rightNavButton.addEventListener('click', function(){ shift('right') });
rightNavButton.innerHTML = '<img src="images/arrow-right.png" width="20px"/>'
rightNavButton.style.position = 'absolute';
rightNavButton.style.top = '42%';
rightNavButton.style.right ='2%';

nav.appendChild(rightNavButton);

var carouselContainer = document.getElementsByClassName('carousel-container')[0];
carouselContainer.appendChild(nav);

function displayIndicators() {
	// remove previous indicators if exist
	var prevIndicatorContainer = document.getElementById('indicatorContainer');
	if (prevIndicatorContainer) prevIndicatorContainer.remove();
	// indicators
	var indicatorContainer = document.createElement('div');
	indicatorContainer.setAttribute('id', 'indicatorContainer');
	indicatorContainer.style.textAlign = 'center';
	indicatorContainer.style.position = 'absolute';
	indicatorContainer.style.width = '100%';
	indicatorContainer.style.bottom = '2%';

	var ul = document.createElement('ul');
	ul.setAttribute('class', 'indicators');
	ul.style.listStyle = 'none';
	for (var i =0; i< images.length; i++) {
		var li = document.createElement('li');
		li.style.backgroundColor = 'rgba(255,255,255,0.3)';
		li.style.height= '5px';
		li.style.width = '5px';
		li.style.borderRadius = '50%';
		li.style.display ='inline-block';
		if(i!==0) li.style.marginLeft='2%';

		// highlight indicator for current displayed image
		if(currentIndex === i) {
			li.style.backgroundColor = 'rgba(255,255,255,0.7)';
		}
		ul.appendChild(li);
	}
	indicatorContainer.appendChild(ul);
	nav.appendChild(indicatorContainer);
}
displayIndicators();
// var  defaultSlide = setInterval( function() { shift('right') },3000 );