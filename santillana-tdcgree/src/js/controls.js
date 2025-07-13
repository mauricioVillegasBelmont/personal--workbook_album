var wpx = window.innerWidth, hpx = window.innerHeight, orientation, startX, startY, endX, endY, curXPos, curYPos,dragNavThresholdW, dragNavThresholdH;
//orientation - true = lanscape;
//orientation - false = portrait;
window.addEventListener("resize", function (e) {
	size();
	//resizeCanvas();
	canvasVideo.play();
});


//button navigation
document.getElementById('nxt_btn').onclick = function () {
	nextPage();
};
document.getElementById('prv_btn').onclick = function () {
	prevPage();
};

//keyboar Navigation
document.addEventListener('keydown', function (e) {
	if (!e.metaKey) {
		e.preventDefault();
	}
	if (e.keyCode == 39 || e.keyCode == 34 || e.keyCode == 32 || e.keyCode == 13) {
		nextPage();
	}
	if (e.keyCode == 37 || e.keyCode == 33) {
		prevPage();
	}
	if (e.keyCode == 38) {
		upPage();
	}
	if (e.keyCode == 40) {
		downPage();
	}
	if (e.keyCode == 36) {
		firstPage();
	}
	if (e.keyCode == 35) {
		lastPage();
	}
});

//wheel navigation

var supportsWheel = false,wheelT, mno = true, cancelWheel= document.getElementsByClassName('wrapper'), navigationDisabler = true;
function wNav(e) {
	if(mno){
		/* Check whether the wheel event is supported. */
		if (e.type == "wheel") supportsWheel = true;
		else if (supportsWheel) return;

		/* Determine the direction of the scroll (< 0 → up, > 0 → down). */
		var delta = ((e.deltaY || -e.wheelDelta || e.detail) >> 10) || 1;

		/* ... */
		//console.log(delta);
		clearTimeout(wheelT);
		wheelT = setTimeout(function(){
			if(delta == 1){
			   nextPage();
			}
			if(delta < 0){
			   prevPage();
			}
		},250);
	}
}
cancelWheel = document.getElementsByClassName('cw');
for(var i=0;i<cancelWheel.length;i++){
	cancelWheel[i].addEventListener('mouseleave', function(e) {
		mno = true;
	});
	cancelWheel[i].addEventListener('mouseenter', function(e) {
		mno = false;
	});
}
document.addEventListener('wheel', wNav);
document.addEventListener('mousewheel', wNav);
document.addEventListener('DOMMouseScroll', wNav);

//drag navigation
function dragNav(){
	if (endX > startX && endX - startX >= dragNavThresholdW) {
		//left
		prevPage();
	}
	if (endX < startX && startX - endX >= dragNavThresholdW) {
		//right
		nextPage();
	}
	if (endY > startY && endY - startY >= dragNavThresholdH) {
		//up
		upPage();
	}
	if (endX < startX && startY - endY >= dragNavThresholdH) {
		//down
		downPage();
	}
}

window.addEventListener('mousedown', function (e) {
	startX = e.clientX;
	startY = e.clientY;
});

window.addEventListener('mouseup', function (e) {
	endX = e.clientX;
	endY = e.clientY;
	dragNav();
});

window.addEventListener('touchstart', function (e) {
	startX = e.changedTouches[0].pageX;
	startY = e.changedTouches[0].pageY;
});

window.addEventListener('touchend', function (e) {
	endX = e.changedTouches[0].pageX;
	endY = e.changedTouches[0].pageY;
	dragNav();
});

