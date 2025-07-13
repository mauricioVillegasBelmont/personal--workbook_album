class ModalCard {
  constructor(container){
    this.container = container;
    this.carname = $( container ).attr("id");
    this.button = this.container.querySelector('.modal-dataCard-btn');
    this.content = this.container.querySelector('.modal');
    this.buttonClose = this.content.querySelector('span.close');
    this.overlay = this.content.querySelector('.modal-overlay');
    this.card = this.content.querySelector('.modal-content');
    this.modalOpen = false;
    this.bindEvents();
    //console.log(this.container);
  }
  bindEvents(){
    this.container.setAttribute("data-modalOpen", this.modalOpen);
    this.button.addEventListener('click', e => this.handleEvent(e), false);
    this.buttonClose.addEventListener('click', e => this.closeBtn(), false);
    this.overlay.addEventListener('click', e => this.closeBtn(), false);
    this.card.addEventListener('scroll', e => this.scrollModalData(), false);
  }
  scrollModalData(){
    if(this.card.classList.contains('scroll')){
      this.card.classList.remove('scroll');
    }
  }
  open(){
    this.content.classList.add("active");
    if(this.card.scrollHeight > this.card.offsetHeight){
      this.card.classList.add('scroll');
    }
    this.modalOpen = true;
    this.container.setAttribute("data-modalOpen", this.modalOpen);
    var eventname = "beat_open_" + this.carname;
    var data = {
      "clickorder": window.infogr_modalbtn_counter,
      "carname": this.carname,
      "uid": window.infogr_uid
    };
    fbq( 'trackSingleCustom', "000000000000000", eventname, data );
    window.infogr_modalbtn_counter++;
  }
  close(){
    this.content.classList.remove("active");
    this.modalOpen = false;
    this.container.setAttribute("data-modalOpen", this.modalOpen);
  }
  handleEvent(e) {
    if (this.modalOpen) {
      this.close();
    }else {
      this.open();
    }
  }
  closeBtn(){
    this.close();

  }
}

var modalModule = document.getElementsByClassName("modal-dataCard");
var modalElemetn = [];
var modalObjElemetn = {};
$(document).ready(function(){
  if(modalModule){
    for (let i = 0; i < modalModule.length; i++) {
      modalObjElemetn[modalModule[i].id] = new ModalCard(modalModule[i]);
    }
  }
  $('[data-modal-target]').on('click',function(event){
    var target = this.dataset.modalTarget;
    modalObjElemetn[ target ].open()
  });
});
