class ModalCard {
  constructor(container){
    this.container = container;
    this.carname = $( container ).attr("id");
    this.button = this.container.querySelector('.modal-dataCard-btn');
    this.modal = this.container.querySelector('.custom-modal');
    this.buttonClose = this.container.querySelector('span.close');
    this.overlay = this.container.querySelector('.modal-overlay');
    this.card = this.container.querySelector('.modal-content');
    this.scrollAdvice = this.container.dataset.scrollAdvice ? this.container.dataset.scrollAdvice: false;
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
    this.container.classList.add("active");
    this.modal.classList.add("active");
    if(this.card.scrollHeight > this.card.offsetHeight & this.scrollAdvice){
      this.card.classList.add('scroll');
    }
    this.modalOpen = true;
    this.container.setAttribute("data-modalOpen", this.modalOpen);
    var eventname = "sedanes_compactos_modalbtn_open_" + this.carname;
    var data = {
      "clickorder": window.infogr_modalbtn_counter,
      "carname": this.carname,
      "uid": window.infogr_uid
    };
    console.log(this.carname);
    console.log(data.clickorder);
    fbq( 'trackSingleCustom', "000000000000000", eventname, data );
    window.infogr_modalbtn_counter++;
  }
  close(){
    this.container.classList.remove("active");
    this.modal.classList.remove("active");
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
var modalElement = [];
var modalObjElement = {};
$(document).ready(function(){
  if(modalModule){
    for (let i = 0; i < modalModule.length; i++) {
      modalObjElement[modalModule[i].id] = new ModalCard(modalModule[i]);
    }
  }
  $('[data-modal-target]').on('click',function(event){
    var target = this.dataset.modalTarget;
    //console.log(target);
    //document.getElementById(target).scrollIntoView();
    modalObjElement[ target ].open()
  });
});
