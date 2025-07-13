$(document).ready(function(){
});

function Infinite_Scroll( config_ ) {
    config = typeof config_ == 'undefined' ? {enable:true} : config_;
    var f_nid = $("#first-note-id").data("nid");
    var f_cid = $("#first-note-catid").data("cid");
    var f_title = $("#first-note-title").data("title");
    var f_path = $("#first-note-path").data("path");
    var f_intro = $("#first-note-intro").data("intro");
    var f_img = $("#first-note-img").data("img");
    this.config = $.extend( {
        n: 16,
        boosted: [0]
    }, config );
    this.shown = [f_nid];
    this.note_data = [
        {nid: f_nid, title: f_title, description: f_intro, path: f_path, image: f_img}
    ];
    this.current_nid = f_nid;
    this.cid = f_cid;
    this.base_url = "/parentesis/resources./";
    this.i = 0;
    this.next_note = {};
    this.next_note_charged = false;
    this.next_note_shown = false;
    this.finish = false;
    if( this.config.enable ){
        this.call_home();
        this._init_gui();
    }else{
        $("#infinite-scroll-pr-1").remove();
        this.finish = true;
    }
}
Infinite_Scroll.prototype._init_gui = function() {
    var win = $(window);
    var self = this;
    win.scroll( function() {
        var nexthr_shown = self.is_nexthr_shown();
        var prevnote_shown = self.is_prevnote_shown();
        if ( nexthr_shown===true ) {
            self.prepare_show_nextnote();
        } else if( nexthr_shown < 0 ) {
            self.i++;
            self.update();
        } else if( prevnote_shown ) {
            self.i--;
            self.update();
        }
    });
};
Infinite_Scroll.prototype.is_nexthr_shown = function() {
    var next_hr_id = "#infinite-scroll-pr-" + (this.i+1);
    var shown = $(next_hr_id).data("shown");
    var pageTop = $(window).scrollTop();
    var elementTop = $(next_hr_id).offset().top;
    var elementBottom = elementTop + $(next_hr_id).height();
    var in_sight = ( pageTop > (elementBottom-$(window).height()) );
    if( (!shown & in_sight) ) return true;
    else if( in_sight ) return -1;
    else return 0;
};
Infinite_Scroll.prototype.is_prevnote_shown = function() {
    if( !this.i ) return false;
    var current_hr_id = "#infinite-scroll-pr-" + this.i;
    var pageTop = $(window).scrollTop();
    var pageBottom = pageTop + $(window).height();
    var elementTop = $(current_hr_id).offset().top;
    return (pageBottom < elementTop);
};
Infinite_Scroll.prototype.prepare_show_nextnote = function() {
    if( this.finish ) {
        this.finish_IS();
        return;
    }
    var hr_id = "#infinite-scroll-pr-" + (this.i+1);
    if(!this.next_note_charged) {
        $(hr_id).addClass("loading-content");
        return;
    }
    var self = this;
    this.next_note_shown = true;
    this.next_note_charged = false;
    $("#infinite-scroll-container").append( this.next_note.html );
    if( $(hr_id).hasClass("loading-content") ) {
         this.show_nextnote();
    } else {
        $(hr_id).addClass("loading-content");
        setTimeout(function(){
            self.show_nextnote();
        },600);
    }
};
Infinite_Scroll.prototype.show_nextnote = function() {
    var hr_id = "#infinite-scroll-pr-" + (this.i+1);
    $("article.single").last().addClass("animated slideInUp");
    $("article.single").last().show();
    $(hr_id).addClass("loaded-content");
    $(hr_id).data("shown", true);
    this.shown.push( this.next_note.note_id );
    this.i++;
    var inf_scroll_tmpl = '<div id="infinite-scroll-pr-' + (this.i+1) + '" class="single-separator"> <div class="separator-icon"> <div class="single-spinner-wrapper"> <svg version="1.1" class="parentesis-spinner" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve"> <path class="parentesis-animated-element animated-left" d="M32.9,13.3c0.5-0.4,1.3-1.1,1.3-1.8c0-1.1-1.3-1.7-2.3-1.7c-3.2,0-8,4-10.2,5.9 c-3.9,3.1-7.1,6.4-9.9,10.4c-5,6.8-8.2,15.8-8.2,23.9c0,3,0.9,8,1.8,11c1.2,4.5,3.2,8.6,6.1,12.6c3.2,4.4,14.5,16.7,20.5,16.7 c1,0,2.3-0.6,2.3-1.7c0-0.8-0.8-1.4-1.3-1.8c-4.6-3.3-10-12.2-12-16.9C18.3,64,16.4,56,16.4,49.8c0-6.3,2.2-14.9,5-20.6 C23.5,25.1,28.7,16.5,32.9,13.3z"/> <path class="parentesis-animated-element animated-right" d="M88.5,26.5C85.3,22.1,74,9.8,68.1,9.8c-1,0-2.3,0.6-2.3,1.7c0,0.8,0.8,1.4,1.3,1.8 c4.6,3.3,10,12.2,12,16.9c2.6,5.7,4.5,13.7,4.5,19.9c0,6.3-2.2,14.9-5.1,20.6c-2,4.1-7.2,12.8-11.5,15.9c-0.5,0.4-1.3,1.1-1.3,1.8 c0,1.1,1.3,1.7,2.3,1.7c3.2,0,8-4,10.2-5.9c3.9-3.1,7.1-6.4,9.9-10.4c5-6.8,8.2-15.8,8.2-23.9c0-3-0.9-8-1.7-11 C93.4,34.5,91.4,30.4,88.5,26.5z"/> </svg> </div><div class="single-separator-wrapper"> <img class="" src="/assets/img/simbolo.svg" alt="separador de nota"> </div></div><hr class="infinite-scroll-hr"/> </div>';
    $("#infinite-scroll-container").append( inf_scroll_tmpl );
    this.call_home();
    gtag('event', 'page_view', {
        'page_title' : this.next_note.title,
        'page_path' : this.next_note.full_pl
    });
    this.update();
    var next_note_container_id = "nid-" + this.next_note.note_id;
    FB.XFBML.parse( document.getElementById( next_note_container_id ) );
    if(typeof ADSGUI_newpage === "function"){
        ADSGUI_newpage( next_note_container_id );
    }
    if (typeof load_gui_js_start_rating === 'function') {
        if( $("div.js-star-rating").length > 0 ){
          $("div.js-star-rating").each(function(i, j){
            load_gui_js_start_rating( j );
          });
        }
    }
};
Infinite_Scroll.prototype.update = function() {
    var note = this.note_data[this.i];
    window.history.replaceState("", note.title, note.path);
    document.title = note.title;
    $("meta[property='og\\:title']").attr("content", note.title);
    $("meta[property='og\\:description']").attr("content", note.description);
    $("meta[property='og\\:image']").attr("content", note.image);
    $("meta[property='og\\:url']").attr("content", window.location.protocol + "//" + window.location.protocol + window.location.hostname + note.path);
};
Infinite_Scroll.prototype.call_home = function() {
    var self = this;
    var url = this.base_url + "get_prev";
    var data = {nid: this.current_nid, cid: this.cid, shown: this.shown};
    var get_boosted = false;
    if( $.inArray( self.i, self.config.boosted ) >= 0 ) {
        url = this.base_url + "get_boosted";
        get_boosted = true;
    }
    this.next_note_shown = false;
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        data: data,
        success: function (data) {
            self.next_note = data;
            self.note_data.push( {
                nid: data.note_id,
                title: data.title,
                description: data.intro,
                path: data.full_pl,
                image: data.img
            });
            if( (!data)||(self.config.n == self.note_data.length) ) {
                self.finish = true;
            }
            setTimeout(function(){
                self.next_note_charged = true;
                if( self.is_nexthr_shown() ) {
                    self.prepare_show_nextnote();
                }
            },2000);
            if( !get_boosted ) self.current_nid = data.note_id;
            var readmoreelements = document.getElementsByClassName("readmore-wrapper");
            if(readmoreelements.length > 0){
              let readmorebtn = [];
              for(let i = 0; i < readmoreelements.length; i++){
                readmorebtn[i] = new ReadMore(readmoreelements[i],500);
              }
            }
        },
        complete: function(a,b,c){
        	//console.log("end:",a,b,c);
            (adsbygoogle = window.adsbygoogle || []).push({});
        }
    });
};
Infinite_Scroll.prototype.finish_IS = function() {
    var hr_id = "#infinite-scroll-pr-" + (this.i+1);
    $(hr_id).addClass("loading-content");
    setTimeout(function(){
        $(hr_id).addClass("loaded-content");
        $(".category-titles").fadeIn();
        $("#same-category-boxes").fadeIn();
    },600);
    // remuebe espacios innesesarios de la nota
    remove_single_spaces();
};
