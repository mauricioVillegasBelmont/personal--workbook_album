$(document).ready(function(){
    $(".load-more-btn").click(show_more_notes);
    init_gotop_button();
    strobe = new Strobe( 2000 );
    strobe.init();
});

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

function show_more_notes() {
    $("div.hguih-notebox:hidden:lt(6)").show();
    show_mostrecentpage2_button();
}

function show_mostrecentpage2_button() {
    var hidden_notes = $("div.hguih-notebox:hidden");
    if( !hidden_notes.length) {
        $(".load-more").hide();
        $(".index-mostrecent-page2-link").show();
    }
}

function Strobe( delay ) {
    delay = typeof delay == 'undefined' ? 2000 : delay;
    this.spot_list = [];
    this.active_spot_list = [];
    this.delay = delay;
}

Strobe.prototype.init = function() {
    var self = this;
    var boxesmenu_items = document.getElementsByClassName("boxesmenu-item");
    var i, spot;
    for( i=0; i<boxesmenu_items.length; i++ ) {
      let _spt = $(boxesmenu_items[i]).find(".subcategories-strobe li");
        spot = {
            leds: $(boxesmenu_items[i]).find(".subcategories-strobe li")
        }
        if (spot.leds != undefined && _spt.length){
          this.spot_list.push( spot );
        }
    }
    setInterval( function() {
        self.pulse();
    }, this.delay );
};

Strobe.prototype.pulse = function() {
    var i, j, led, leds, active_spot;
    for( i=0; i<this.spot_list.length; i++ ) {
        leds = this.spot_list[i].leds;
        active_spot = typeof this.active_spot_list[i] == 'undefined' ? false : this.active_spot_list[i];
        j = Math.floor(Math.random()*leds.length);
        while( active_spot!==false ) {
            if( j != active_spot ) break;
            j = Math.floor(Math.random()*leds.length);
        }
        led = leds[ j ];
        if( active_spot!==false ) {
            $(leds[active_spot]).addClass("bye").removeClass("shown");
        }
        this.active_spot_list[i] = j;
        $(leds[j]).addClass("shown").removeClass("bye");
    }
};
