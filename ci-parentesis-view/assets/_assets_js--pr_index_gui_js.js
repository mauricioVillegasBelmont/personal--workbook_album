$(document).ready(function(){
  if ($("#js_up").length) {init_gotop_button();}
  if ($('.gridmenu-subcategories li').length) {
    strobe = new Strobe( 2500 );
    strobe.init();
  }
  $(".bnr_cotizador").each(function(k, v){
    if(typeof window.gtag === 'function'){
      window.gtag('event', 'Banner_Cotizador_Parentesis', { 'event_category': 'banner', 'event_label': 'impresión', 'value': 0});
    }
  });
  $(".bnr_fundacion").each(function(k, v){
    if(typeof window.gtag === 'function'){
      window.gtag('event', 'Banner_Fundación_Parentesis', { 'event_category': 'banner', 'event_label': 'impresión', 'value': 0});
    }
  });
});

//ANALITYCS CODE
function track_event( name ){
  if(typeof window.gtag === 'function'){
    var evento = "Banner"+name+"_Parentesis";
    window.gtag('event', evento, { 'event_category': 'banner', 'event_label': 'click', 'value': 0});
  }
  return true;
}
//END ANALITYCS CODE

function init_gotop_button() {
    $(window).scroll(function(){
        if($(this).scrollTop() > 300){
            $("#js_up").fadeIn(300);
        }else{
            $("#js_up").fadeOut(300);
        }
    });
    $("#js_up").on('click', function (e) {
        e.preventDefault();
        $("body,html").animate({
          scrollTop: 0
        },2000);
        return false;
    });
}

function Strobe( delay ) {
    delay = typeof delay == 'undefined' ? 0 : delay;
    this.spot_list = [];
    this.active_spot_list = [];
    this.delay = delay;
}

Strobe.prototype.init = function() {
    var self = this;
    var boxesmenu_items = document.getElementsByClassName("grid-section-item");
    var i, spot;
    for( i=0; i<boxesmenu_items.length; i++ ) {
      let _spt = $(boxesmenu_items[i]).find(".gridmenu-subcategories li");
      spot = {
        leds: $(boxesmenu_items[i]).find(".gridmenu-subcategories li")
      }
      if (spot.leds != undefined && _spt.length){
        this.spot_list.push( spot );
      }
    }
    self.pulse();
    setInterval( function() {
      self.pulse();
    }, this.delay );
};

Strobe.prototype.pulse = function() {
  var self = this;
  var i, j, led, leds, active_spot;
  i = 0;
  for (i = 0; i < this.spot_list.length; i++) {
    leds = this.spot_list[i].leds;
    active_spot = typeof this.active_spot_list[i] == 'undefined' ? false : this.active_spot_list[i];
    $(leds).removeClass('active');
    if(active_spot !== false){
      if(leds[active_spot+1] == undefined){
        this.active_spot_list[i] = 0;
      }else {
        this.active_spot_list[i] = active_spot+1;
      }
    }else {
      this.active_spot_list[i] = 0;
    }
    j = this.active_spot_list[i];
    $(leds[j]).addClass('active');
  }
};
