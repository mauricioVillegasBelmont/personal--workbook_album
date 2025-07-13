function IQ_TABLE(table,offset){
  this.element = document.getElementById(table).querySelector('.stiky-table');
  this.overlay = $("#"+table).find('.styky-table-overlay');
  this.stikyHeader = $("#"+table).find('.stiky-head');
  this.stikyHeaderAxis = $("#"+table).find('.stiky-head .axis');
  this.rowHeads = $("#"+table).find(".table-body tr th");
  this.pageOffset = offset;
  this.offset = this.element.getBoundingClientRect();
  this.headX = this.element.scrollLeft;
  this.headY = document.documentElement.scrollTop;
  this.offsetHeight = this.element.offsetHeight;
  this.init();
}
IQ_TABLE.prototype.is_mobil = function(){
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
}

IQ_TABLE.prototype.table_drag_scroll = function(){
  var element = $(this.element);
  $(element).off();
  let pos = { left: 0, x: 0 };
  const mouseDownHandler = function(e) {
    pos = {
      left: $(this).scrollLeft(),
      x: e.clientX,
    };
    $(element).addClass("grab");
    $(document).on('mousemove', mouseMoveHandler);
    $(document).on('touchmove', mouseMoveHandler);
    $(document).on('mouseup', mouseUpHandler);
    $(document).on('touchend', mouseUpHandler);
  }
  const mouseMoveHandler = function(e) {
    const dx = e.clientX - pos.x;
    $(element).scrollLeft(pos.left - dx);
  };
  const mouseUpHandler = function() {
    $(element).removeClass("grab");
    $(document).off('mousemove ',mouseMoveHandler);
    $(document).off('touchmove ',mouseMoveHandler);
    $(document).off('mouseup' ,mouseUpHandler);
    $(document).off('touchend' ,mouseUpHandler);
  };
  $(element).on('mousedown', mouseDownHandler);
  $(element).on('touchstart', mouseDownHandler);
}

IQ_TABLE.prototype.clearOverlay = function(){
  this.overlay.hide()
}

IQ_TABLE.prototype.translateElements = function(){
  var self = this;
  var stikyOffset = this.pageOffset;
  this.headX = this.element.scrollLeft;
  this.headY = (this.element.getBoundingClientRect().top * -1) + stikyOffset;
  if((this.headY - stikyOffset) < 0){
    this.headY = 0;
  }else if (this.headY > this.element.getBoundingClientRect().height - (stikyOffset * 2)) {
    this.headY = this.element.getBoundingClientRect().height - (stikyOffset * 2);
  }
  if(this.headY > 0){
    setTimeout(function(){
      self.clearOverlay();
    }, 1750);
  }

  this.overlay.css({"transform":"translate(0px,"+this.headY+"px)"});
  this.stikyHeader.css({"transform":"translate("+ ( this.headX * -1 ) +"px,"+this.headY+"px)"});
  this.stikyHeaderAxis.css({"transform":"translate("+ this.headX  +"px,0px)"});
  this.rowHeads.css({"transform":"translate("+ this.headX +"px,0px)"});
}

IQ_TABLE.prototype.init = function(){
  var self = this;
  // overlay
  var a = $(this.element).width();
  var b = $(this.element).find('thead.stiky-head').width();
  if(a >= b ){
    this.clearOverlay();
  }
  this.overlay.on('click',function(e){
    self.clearOverlay();
  });
  // scroll
  this.element.addEventListener('scroll',e => this.translateElements());
  $(document).on('scroll',function(){
    self.translateElements();
  })
  if(!this.is_mobil()){
    this.table_drag_scroll();
  }
  // modal-buttons

}

// modalOpen
