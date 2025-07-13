var site = document.getElementById('mainWrapper'); 
var slides = document.getElementsByTagName('section');
var slideIndex = 0;




function activate(){
    var videomemoria = document.getElementById('videomemoria');
    var startVideo = document.getElementById('videoBGPlayer');
    startVideo.pause();
	videomemoria.currentTime =  startVideo.currentTime;
    startVideo.currentTime = 0;
    startVideo.volume = 0;
    if(!site.classList.contains('active')){
        site.classList.add('active');
    }
    slideIndex += 1;
    setCurrent(slides,slideIndex);
	/*photo slider*/
    document.getElementById('start').style.display='none';
	var sliderRangeControl = document.getElementById('sliderRangeControl');
	sliderRangeControl.max = document.getElementsByClassName('galleryItem').length-1;
	sliderRangeControl.oninput = function(){
		photoSlideSet(parseInt(sliderRangeControl.value));
	}
	
	
	photoSlideSet(0);
}

function parralax(){
    var bg = document.getElementsByTagName('body');
    var bgTraslation = slideIndex*100/slides.length;
    bg[0].style.backgroundPosition = bgTraslation +'% 50%';
}



function displayAgenda(index){
    var agenda = document.querySelectorAll('#agendaDisplayer .agenda');
    var agendaButton = document.querySelectorAll('#agendaButtons .holoBtn');
    
    if(index > 0){
        
        for(var i = index-1;i >= 0;i--){
            
            if(i != -1){
                if(!agenda[i].classList.contains('disabled')){
                    agenda[i].classList.add('disabled');
                }
                if(agendaButton[i].classList.contains('selected')){
                    agendaButton[i].classList.remove('selected');
                }
            }
        }
    }
    
    agenda[index].classList.remove('disabled');
    agendaButton[index].classList.add('selected');
    
    if(index < agenda.length-1){
        for(var i = index+1;i < agenda.length;i++){
            if(!agenda[i].classList.contains('disabled')){
                agenda[i].classList.add('disabled');
            }
            if(agendaButton[i].classList.contains('selected')){
                agendaButton[i].classList.remove('selected');
            }
        }
    }
}

/*function introVideo(index){
    var introVideoElement = document.getElementById('introVideo');
    var button = document.getElementById('introVideoMute');
    if(index == 1){
        introVideoElement.muted = false;
        introVideoElement.play();
        
    }else{
        introVideoElement.currentTime = 0;
        introVideoElement.muted = true;
        introVideoElement.pause();
    }
    button.classList.add('mute');
}
function introVideoVolume(button){
    var introVideoElement = document.getElementById('introVideo');
    
    if (introVideoElement.muted == false) {    
        introVideoElement.muted = true;
        button.classList.remove('mute');
    } else {
        introVideoElement.muted = false;
        button.classList.add('mute');
    }
}*/


function videoMemoria(index){
    var videomemoria = document.getElementById('videomemoria');
    var button = document.getElementById('introVideoMute');
    if(index == 1){
        videomemoria.muted = false;
        videomemoria.play();
        
    }else{
        videomemoria.currentTime = 0;
        videomemoria.muted = true;
        videomemoria.pause();
    }
    button.classList.add('mute');
}
function videoPause(button,id){
    if (id.paused) {    
        id.play();
        button.classList.add('pause');
    } else {
        id.pause();
        button.classList.remove('pause');
    }
}
function videoMemoriaVolume(button){
    var videoMemoriaVolume = document.getElementById('videomemoria');
    
    if (videoMemoriaVolume.muted == false) {    
        videoMemoriaVolume.muted = true;
        button.classList.remove('mute');
    } else {
        videoMemoriaVolume.muted = false;
        button.classList.add('mute');
    }

}


function spaceRunVideo(index){
    var spaceRunVideoElement = document.getElementById('spaceRunVideo');
    var button = document.getElementById('spaceRunMute');
    var spaceRunAudio = document.getElementById('spaceRunAudio');
    if(index == 2){
        spaceRunAudio.muted = false;
        spaceRunVideoElement.play();
        spaceRunAudio.play();
        
    }else{
        spaceRunVideoElement.currentTime = 0;
        spaceRunAudio.currentTime = 0;
        spaceRunAudio.muted = true;
        spaceRunVideoElement.pause();
        spaceRunAudio.pause();
    }
    button.classList.add('mute');
	var videomemoriaPlay = document.getElementById('videomemoriaPlay');
	var videomemoria = document.getElementById('videomemoria');
	//videoPause(videomemoriaPlay, videomemoria);
}

function spaceRunVideoVolume(button){
    var spaceRunAudio = document.getElementById('spaceRunAudio');
    if (spaceRunAudio.muted == false) {    
        spaceRunAudio.muted = true;
        button.classList.remove('mute');
    } else {
        spaceRunAudio.muted = false;
        button.classList.add('mute');
    }

}
var currentBoom;
function boomSrc(selector){
	var boom = ['boom01','boom02','boom03','boom04','boom05','boom06','boom07','boom08','boom09'];
	const vid = document.getElementById('spaceRunVideo'), vidSource = document.querySelector('#spaceRunVideo source'), btns = document.getElementsByClassName('bomerangElement');
	for(var i = 0;i <= btns.length-1;i++){
		if(btns[i].classList.contains('active')){
			btns[i].classList.remove('active');
		}
	}
	if(currentBoom === undefined || currentBoom === null){
	   currentBoom = 0;
	}
	vid.pause();
	if(selector == 'current'){
		vidSource.src = 'resources/video/boomerangs/'+boom[currentBoom]+'.mp4';
	} else if(selector == 'space'){
		vidSource.src = 'resources/video/SapceRun_V10.mp4';
	} else {
		currentBoom = selector;
		vidSource.src = 'resources/video/boomerangs/'+boom[currentBoom]+'.mp4';
	}
	btns[currentBoom].classList.add('active');
	vid.load();
	vid.play();
}

function boomerangActive(){
	var boomerangBtn = document.getElementById('boomerangBtn');
	var boomerangPanel = document.getElementById('boomerangsBtnWrapper');
	if(boomerangBtn.classList.contains('active')){
		boomerangBtn.classList.remove('active');
		boomerangPanel.classList.remove('active');
		boomSrc('space');
	}else{
		boomerangBtn.classList.add('active');
		boomerangPanel.classList.add('active');
		boomSrc('current');
	}
}
function displayInstructions(index){
    var tables = document.querySelectorAll('#instructivo table');
    var butons = document.querySelectorAll('#instructivo .holoBtn');
    
    for(var i = 0; i <= tables.length-1; i++){
        if(!tables[i].classList.contains('disabled')){
            tables[i].classList.add('disabled');
        }
        if(butons[i].classList.contains('selected')){
            butons[i].classList.remove('selected');
        }
    }
    tables[index].classList.remove('disabled');
    butons[index].classList.add('selected');
}

function goTo(elem,index){
    slideIndex = index;
    setCurrent(elem,index);
    
    if(index <= 0){
        ant.classList.add('disabled');
    }else if(ant.classList.contains('disabled')){
        ant.classList.remove('disabled');
    }
    if(index >= slides.length-1){
        sig.classList.add('disabled');
    }else if(sig.classList.contains('disabled')){
        sig.classList.remove('disabled');
    }
}



function horizontalNav(trigger,inc){
    var navButtons = document.getElementsByClassName('horizontalNav');
    slideIndex += inc;
    setCurrent(slides,slideIndex);
    if(slideIndex + 1 >= slides.length||slideIndex - 1 <= -1){
        trigger.classList.add('disabled');
    }else{
        for(var i = 0;i<=navButtons.length-1;i++){
            if(navButtons[i].classList.contains('disabled')){
                navButtons[i].classList.remove('disabled');
            }
        }
    }
}

function setCurrent(elem,index){
    
    for(var i = index-1;i>=0;i--){
        if(elem[i].classList.contains('current')){
            elem[i].classList.remove('current');
        }
        if(elem[i].classList.contains('next')){
            elem[i].classList.remove('next');
        }
        elem[i].classList.add('prev');
    }
    elem[index].classList.remove('prev','next');
    elem[index].classList.add('current');
    for(var i = index+1;i <= elem.length-1;i++){
        if(elem[i].classList.contains('current')){
            elem[i].classList.remove('current');
        }
        if(elem[i].classList.contains('prev')){
            elem[i].classList.remove('prev');
        }
        elem[i].classList.add('next');
    }
	
    var menuButton = document.querySelectorAll('#header .menu p');
	for(var j=0;j<=menuButton.length-1;j++){
    	menuButton[j].classList.remove('current');
	}
    menuButton[index].classList.add('current')
	
    slideIndex = index;
    parralax();
    hologram(index);
    //introVideo(index);
	videoMemoria(index);
    spaceRunVideo(index);

}


function home(){
    page.classList.remove('active');
    slideIndex = 0;
    setCurrent(slides,slideIndex);
    var start = document.getElementById('start').style.display='block';
}

function hologram(index){
    /*reasign*/
    for(var i = 0;i <= slides.length-1;i++){
        var disableit = slides[i].getElementsByClassName('waitForDisplay');
        for(var j = 0;j <= disableit.length-1;j++){
            if(!disableit[j].classList.contains('startDisabled')){
                disableit[j].classList.add('startDisabled');
            }
        }
    }
    setTimeout(function(){
        var display =  slides[index].getElementsByClassName('waitForDisplay');
        for(var i = 0;i <= display.length-1;i++){
            display[i].classList.remove('startDisabled');
        }
    },1000);
}



function photoSlideSet(index){
	var photoSlides = document.getElementsByClassName('galleryItem');
	if(index > 0){
		for(var i = index-1;i >= 0;i--){
			photoSlides[i].classList.remove('backPic','currSlide','nextSlide');
			//photoSlides[i].classList.add('prevSlide');
		}
		//photoSlides[index-1].classList.add('backPic');
	}
	photoSlides[index].classList.remove('backPic','nextpic','nextSlide','prevSlide');
	photoSlides[index].classList.add('currSlide');
	if(index < photoSlides.length-1){
		for(var j = index+1;j<=photoSlides.length-1;j++){
			photoSlides[j].classList.remove('nextpic','currSlide','prevSlide');
			//photoSlides[j].classList.add('nextSlide');
		}
		//photoSlides[index+1].classList.add('nextpic');
	}
	//document.getElementById('sliderRangeControl').value = index;
}

function gllaryPic(index){
	//var photoSlides = document.getElementsByClassName('galleryItem');
	/*if(photoSlides[index].classList.contains('backPic')){
		photoSlideSet(index);
	}else if(photoSlides[index].classList.contains('nextpic')){
		photoSlideSet(index);
	}else if(photoSlides[index].classList.contains('currSlide')){
		setModalImg(index);
	}*/
	//photoSlideSet(index);
		setModalImg(index);
}

document.addEventListener('DOMContentLoaded', function(){
    setCurrent(slides,slideIndex);
    ant.addEventListener('click',function(){horizontalNav(ant,-1)},false);
    sig.addEventListener('click',function(){horizontalNav(sig,1)} ,false);
}, false);