class ReadMore{
  constructor(container,timer){
    this.container = container;
    this.button = container.querySelector('.readmore-btn');
    this.timer = timer;
    this.bindEvents();
  }
  bindEvents(){
    //console.log('readmore');
    this.button.addEventListener('click',e => this.handleEvent(e),false);
  }
  handleEvent(e){
    this.container.style.maxHeight = '200vh';
    let that = this.container;
    setTimeout(function(){
      that.classList.add('read');
      that.style.maxHeight = '';
    },this.timer);
  }
}
