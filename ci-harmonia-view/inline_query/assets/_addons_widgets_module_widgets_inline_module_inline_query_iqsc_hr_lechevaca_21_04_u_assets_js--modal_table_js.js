window.infogr_modal_counter = 1;
class ModalCard {
  constructor(container,event_name,fbq_id,track_eneabled){
    this.container = container;
    this.content = this.container.querySelector('.custom-modal');
    this.buttonClose = this.content.querySelector('span.close');
    this.overlay = this.content.querySelector('.modal-overlay');
    this.card = this.content.querySelector('.modal-content');
    this.scrollAdvice = this.container.dataset.scrollAdvice ? this.container.dataset.scrollAdvice: false;
    this.track_eneabled = track_eneabled;
    this.event_name = event_name;
    this.fbq_id = fbq_id;
    this.bindEvents();
  }
  bindEvents(){
    this.buttonClose.addEventListener('click', e => this.closeBtn(), false);
    this.overlay.addEventListener('click', e => this.closeBtn(), false);
    this.card.addEventListener('scroll', e => this.scrollModalData(), false);
  }
  scrollModalData(){
    if(this.card.classList.contains('scroll')){
      this.card.classList.remove('scroll');
    }
  }
  open(target){
    this.content.classList.add("active");
   if(this.card.scrollHeight > this.card.offsetHeight & this.scrollAdvice){
     this.card.classList.add('scroll');
   }
   if (this.track_eneabled) {
     this.track();
   }
  }
  close(){
    this.content.classList.remove("active");
  }
  track(){
    var custom_event =  this.event_name;

    var data = {
      segment: this.get_segment(),
      uid: notequiz.quiz_data.uid,
      order: window.infogr_modal_counter,
      brandname: this.container.dataset.brand,
      type: this.container.dataset.type,
      product: this.container.dataset.product
    }
    for (var i = 0; i < this.fbq_id.length; i++) {
      var fbq_id = String(this.fbq_id[i])
      fbq( 'trackSingleCustom', fbq_id, custom_event, data );
    }
    window.infogr_modal_counter+=1;
  }
  get_segment() {
      var vars = {};
      var parts = window.location.href.replace( /[?&]+([^=&]+)=([^&]*)/gi, function( m, key, value ) {
          vars[ key ] = value;
      } );
      return (vars[ "s" ] != undefined)?vars[ "s" ]:'default';
  }
  closeBtn(){
    this.close();
  }
}
