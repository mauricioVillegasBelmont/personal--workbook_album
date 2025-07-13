class Collapse {
  constructor(container){
    this.carname = $( container ).attr("id");
    this.container = container;
    this.button = container.querySelector('.collapse-btn');
    this.content = container.querySelector('.collapse-content');
    this.collapsed = true;
    this.bindEvents();
  }
  bindEvents(){
    this.container.setAttribute("data-collapsed", this.collapsed);
    this.button.addEventListener('click', e => this.handleEvent(e), false);
  }
  open(){
    this.button.classList.add("active");
    this.content.classList.add("active")
    this.content.style.maxHeight = this.content.scrollHeight + "px";
    this.collapsed = false;
    var eventname = "HB_collapsebtn_open_" + this.carname;
    var data = {
      "clickorder": window.infogr_collapsebtn_counter,
      "carname": this.carname,
      "uid": window.infogr_uid
    };
    fbq( 'trackSingleCustom', "000000000000000", eventname, data );
    window.infogr_collapsebtn_counter++;
  }
  close(){
    this.button.classList.remove("active");
    this.content.classList.remove("active")
    this.content.style.maxHeight = null;
    this.collapsed = true;
  }
  handleEvent(e) {
    //e.preventDefault();
    if (this.collapsed) {
      this.open();
    }else {
      this.close();
    }
    this.container.setAttribute("data-collapsed", this.collapsed);
  }
}

$( document ).ready( function() {
  var collapseModule = document.getElementsByClassName("collapse");
  if(collapseModule){
    let collapseElemetn = [];
    for (let i = 0; i < collapseModule.length; i++) {
      collapseElemetn[i] = new Collapse(collapseModule[i]);
    }
  }  
} );


