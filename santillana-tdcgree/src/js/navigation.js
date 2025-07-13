//navigation actions
const pages = document.getElementsByTagName('section'), pagesCount= pages.length-1;
var  cpIndex = 0, started = false;
function navigation(index){
	if(started && navigationDisabler){
		stopContents(cpIndex);
		setCurrentPage(index);
		startContent(cpIndex);
		navBtns();
	}
}

function doExist(obj){
	var exist = false;
	if(obj != undefined){
	   exist = true;
	}
	return exist;
}

function size(){
	//orientation - true = lanscape;
	//orientation - false = portrait;
	wpx = window.innerWidth;
	hpx = window.innerHeight;
	//console.log('resize');
	if (wpx > hpx) {
		orientation = true;
		//console.log('landscape');
		if(wpx >= 1024){
			dragNavThresholdW = wpx / 6;
			dragNavThresholdH = hpx / 5;
		}else{
			dragNavThresholdW = wpx / 3;
			dragNavThresholdH = hpx / 4;
		}
	}
	else {
		orientation = false;
		//console.log('portrait');
		dragNavThresholdW = wpx / 4;
		dragNavThresholdH = hpx / 6;
	}
}


function prevPage() {
	if(cpIndex-1 >= 0){
	   navigation(cpIndex-1);
	}
	navBtns()
}

function nextPage() {
	if(cpIndex+1 <= pagesCount){
		navigation(cpIndex+1 );
	}
}

function firstPage() {
	navigation(0);
}

function lastPage() {
	navigation(pagesCount);
}

function upPage() {
	//console.log('upPage');
}

function downPage() {
	//console.log('downpage');
}

function navBtns(){
	var nxt = document.getElementById('nxt_btn');
	var prv = document.getElementById('prv_btn');
	if(started){
		if(cpIndex == pagesCount){
			nxt.classList.add('disabled');
		}else if(nxt.classList.contains('disabled')){
			nxt.classList.remove('disabled');
		}
		if(cpIndex == 0){
			prv.classList.add('disabled');
		}else if(prv.classList.contains('disabled')){
				prv.classList.remove('disabled');
		}
	}
}

//page functions
function stopContents(index, i){
	if(index == 0){
		canvasVideo.pause();
	}
	if(index == 1){
		//anim00();
		clVid(false);
	}
}

function startContent(i,obj){
	if(i == 0){
		canvasVideo.play();
	}
	if(i == 1){
		//anim00();
		clVid(true);
	}
	if(i == 2){
		anim01();
	}
}

function setCurrentPage(index){
	stopContents(cpIndex, index);
	if(index-1 >= 0){
		//prev pages
		for(var i = index-1;i >= 0;i--){
			pages[i].classList.remove('current','nextPage');
			pages[i].classList.add('prevPage');
		}
	}
	//current pages
	pages[index].classList.remove('nextPage','prevPage')
	pages[index].classList.add('current');
	if(index+1 <= pagesCount){
		//next pages
		for(var i = index+1;i <= pagesCount;i++){
			pages[i].classList.remove('current','prevPage');
			pages[i].classList.add('nextPage');
		}
	}
	cpIndex = index;
}

//gifts
function gift(){
	var allgifts = document.getElementsByClassName('unopened');
	for(var i = 0;i < allgifts.length;i++){
		allgifts[i].setAttribute('id','gift'+i);
		allgifts[i].setAttribute('onclick','openGift(this)');
	}
}

function openGift(obj){
	var objPrnt = document.getElementById(obj.id).parentNode;
	var svgAnim = objPrnt.getElementsByClassName('clckMe');
	if(obj.classList.contains('unopened')){
		obj.classList.remove('unopened');
	}
	obj.removeAttribute('onclick');
	objPrnt.removeChild(svgAnim[0]);
	startContent(obj);
	started = true;
	navigation(0);
}

//first Start
document.addEventListener("DOMContentLoaded", function() {

	setCurrentPage(cpIndex);
	size();
	navBtns();
	gift();
});