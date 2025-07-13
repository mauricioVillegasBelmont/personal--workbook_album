class Collapse {
  constructor(container){
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

var collapseModule = document.getElementsByClassName("collapse");
var collapseElemetn = [];
$(document).ready(function(){
  if(collapseModule){
    for (let i = 0; i < collapseModule.length; i++) {
      collapseElemetn[i] = new Collapse(collapseModule[i]);
    }
  }

});
