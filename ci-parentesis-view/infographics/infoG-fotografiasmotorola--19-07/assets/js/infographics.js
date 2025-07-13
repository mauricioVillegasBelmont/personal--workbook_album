class PictureFlip {
  constructor(element) {
    this.element = element;
    this.modal = this.element.querySelector('.modal');
    this.closeBtn = this.element.querySelector('.close');
    this.openend = false;
    this.bindEvents();
  }
  bindEvents(){
    this.element.dataset.openend = this.openend;
    this.element.setAttribute('style','height:'+this.element.offsetHeight+'px');
    this.element.addEventListener('click',e => this.handleEvent(e),false);
    this.modal.addEventListener('click',e => this.handleEvent(e),false);
    this.closeBtn.addEventListener('click',e => this.handleEvent(e),false);
  }
  handleEvent(e){
    e.stopPropagation();
    if(this.openend){
      this.close();
    }else {
      this.open();
    }
  }
  close(){
    this.modal.classList.remove('active');
    this.openend = false;
    this.element.dataset.openend = this.openend;
  }
  open(){
    this.modal.classList.add('active');
    this.openend = true;
    this.element.dataset.openend = this.openend;
  }
  resize(){
    this.element.setAttribute('style','height:'+this.element.scrollHeight+'px');
  }
}
$( document ).ready(function(){
  var pictureFlipElements = document.querySelectorAll('#infographics .picture-row');
  var picFlip = [];
  for (var i = 0; i < pictureFlipElements.length; i++) {
    picFlip[i] = new PictureFlip(pictureFlipElements[i])
  }
  $( window ).resize(function(){
    for (var i = 0; i < pictureFlipElements.length; i++) {
      picFlip[i].resize();
    }
  });
});
