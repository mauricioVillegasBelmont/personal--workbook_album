var bg = document.getElementById('particlesBG'), bgColor = ['#4f5e72','#363d45','#1b1b1b','#6c7d98'], bgCount = 0, audio = document.getElementById('bells'), timer= 6000;


audio.volume = 0.1;

var x=1;
//const a = `element${bg}`

while(timer*x<=20000){
	x++
	timer = timer+100;
}

var bgInterval = setInterval(function(){ 
    //bg.style.backgroundColor = bgColor[bgCount]
	bgCount += 1;
	if(bgCount >= bgColor.length){
	   bgCount = 0;
	}
}, timer);
var audioInterval = setInterval(function(){ 
	audio.play();
}, timer*x);

function stopBgInterval() {
	audio.currentTime = 0;
    clearInterval(bgInterval);
}


var animation = document.getElementsByClassName('animation');

var a00 = true;

function anim00(){
	//console.log('anim00');
	if(a00){
		setTimeout(function() { 
			document.getElementById('teamBanner').classList.add('fired');
		}, 0);
		setTimeout(function() { 
			document.getElementById('teamdec00').classList.add('fired');
		}, 1000);
		setTimeout(function() { 
			document.getElementById('teamdec01').classList.add('fired');
		}, 1000); 
		a00 = false;
	}
}



var a01 = true;
function anim01(){
	//console.log('anim00');
	if(a01){
		setTimeout(function() { 
			document.getElementById('bak2').classList.add('fired');
		}, 0);
		setTimeout(function() { 
			document.getElementById('bakg').classList.add('fired');
		}, 1000);
		setTimeout(function() { 
			document.getElementById('mtns').classList.add('fired');
		}, 1000);
		setTimeout(function() { 
			document.getElementById('blls').classList.add('fired');
		}, 2000);
		setTimeout(function() { 
			document.getElementById('msg2').classList.add('fired');
		}, 3000);
		a01 = false;
	}
}

//animation[0].addEventListener("click",anim00);