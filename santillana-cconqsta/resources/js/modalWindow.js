// Get the modal
var modal = document.getElementById('photoModal');
var closeModal = document.querySelector('#closeModal');

//var CurrentPonentePic = document.querySelector('#ponentesInfo #biography img');

var sedePic = ['001', '002', '003', '004', '005', '006'];
var slideElement = ['SC-00','SC-01', 'SC-02', 'SC-03', 'SC-04', 'SC-05', 'SC-06', 'SC-07', 'SC-08', 'SC-09', 'SC-10', 'SC-11', 'SC-12', 'SC-13', 'SC-14', 'SC-15', 'SC-16'];


var img = document.getElementById('sedeImg');

// When the user clicks on <span> (x), close the modal
closeModal.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function setModalImg(index){
    modal.style.display = "block";
    img.src = "resources/img/"+sedePic[index]+".jpg";
    img.src = "resources/img/gallery/"+slideElement[index]+".jpg"
    
}

// When the user clicks the button, open the modal 

