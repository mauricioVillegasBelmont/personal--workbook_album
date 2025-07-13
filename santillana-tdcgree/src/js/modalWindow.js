var downloadLnk = true;
document.getElementById('lnk').onclick = function(){
	if(downloadLnk){
		downloadLnk = false;
		console.log('objeto descargado');
		return true;
	}else{
		return downloadLnk;
	}
}

/*--------------------------------------------------------*/
	//teampic
/*--------------------------------------------------------*/
var modal = document.getElementById('modalWindow');
// Get the <span> element that closes the modal
var span = document.getElementById('closeModal');;
// When the user clicks on the button, open the modal 
//btn.onclick = function() {
//    modal.style.display = "block";
//}
function modalWindow(){
	//console.log('modal');
	navigationDisabler = false;
    modal.style.display = "block";
}
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
	navigationDisabler = true;
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
		navigationDisabler = true;
    }
}


//document.getElementById('teamPic').onclick = function(){
//	//modalWindow();
//}
/*
document.getElementById('teamBanner').onclick = function(){
	modalWindow();
}
*/
