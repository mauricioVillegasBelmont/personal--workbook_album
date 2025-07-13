var grv = document.getElementById('chrGr');
function vidpl_ps(){
	if (grv.paused) {
		grv.play();
	} else {
		grv.pause();
	}
}
grv.addEventListener("touchstart", vidpl_ps, false);