function PR_tabs_widget(element) {
  var self = this;
  this.tab_widget = element;
  this.tab_btns = [];
}
PR_tabs_widget.prototype.init = function(){
  this.tab_btns = $(this.tab_widget ).find('.tab-btn');
  $(this.tab_btns).each(function(i,el){
    $(el).on('click',function(evnt){
      evnt.preventDefault();
      // var target = $(e).data('target');
      var target = $(el).attr('href');
      $('.tab-btn').removeClass('active');
      $(el).addClass('active');
      $(el).parents('.tabs-widget').find('.tab-content').removeClass('active');
      $(el).parents('.tabs-widget').find(target).addClass('active');
    });
  });
}
function init_tabs_widget(){
  var tabs_widget = [];
  $('.tabs-widget').each(function(i,e){
    tabs_widget[i] = new PR_tabs_widget(this);
    tabs_widget[i].init();
  });
}
