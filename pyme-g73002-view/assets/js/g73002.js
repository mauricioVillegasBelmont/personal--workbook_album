var g73002;
function G73002(conf){
  this.conf = conf;
  this.init_slider();
  this.init_pushbar();
  this.init_yt();
}

G73002.prototype.is_mobil = function () {
  if( navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)){
    return true;
  }
  return false;
};

G73002.prototype.init_slider = function () {
  $('#header_slider').flexslider({
    animation: "slide"
  });
  $('#bio_slider').flexslider({
    animation: "slide",
    slideshowSpeed: 2000,
    before: function(slider){
      var dir = slider.direction;
      var cr = $(slider.slides).parent().find('.flex-active-slide');
      // $(cr).find('.picture').addClass('animate__backOutRight');
      g73002.animated_slide_out(cr,dir);
    },
    after: function(slider){
      var dir = slider.direction;
      var cr = $(slider.slides).parent().find('.flex-active-slide');
      g73002.animated_slide_in(cr,dir);
      // $(cr).find('.picture').addClass('animate__backOutRight');
      // $(cr).find('.picture').addClass('animate__bounce');
    },
    animationSpeed: 500,
  });
};
G73002.prototype.animated_slide_out = function(cr,dir){
  
  
}
G73002.prototype.animated_slide_in = function(cr,dir){
  
  
}

G73002.prototype.init_pushbar = function () {
  this.pushbar = new Pushbar({
    blur:true,
    overlay:true,
  });
};
G73002.prototype.init_yt = function () {
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}



function onYouTubeIframeAPIReady() {
  var w = $('#yt-player').parent().width(), h = ((w * 9)/16);
  h = (h > w)?w:h;
  var container = g73002.conf.video_container;
  g73002.yt_player = new YT.Player( container, {
    height: h,
    width: w,
    videoId: g73002.conf.video_id,
    playerVars:{
      autoplay:0,
      loop: 0,
      modestbranding: 1,
      iv_load_policy: 3,
      autohide: 1,
      rel:0,
      showinfo: 0,
      controls:1,
    },
    events: {
      onReady: function(e) {
        $(window).on('scroll',function(){
          video_visible();
        });
      },
      onStateChange:function(e){
      }
    }
  });
}
function video_visible(){
  var container = g73002.conf.video_container;
  var visible = $(`#${container}`).visible();
  var state = g73002.yt_player.getPlayerState();
  // if(visible && (state == 2 || state == 5) ){
  if(visible && (state == 5) ){
    g73002.yt_player.playVideo();
  }else if(!visible && state ==  1 ){
    g73002.yt_player.pauseVideo();
  }
}
function video_responsive(){
  var container = g73002.conf.video_container;
  var w = $(`#${container}`).parent().width();
  var h = ((w * 9)/16);
  h = (h > w)?w:h;
  $(g73002.yt_player.h).attr('width', w).attr('height', h);
}



$(window).on('resize',function(){
  video_responsive();
})

$( document ).ready(function() {
  conf = {
    video_container: 'yt-player',
    video_id: 'jxEkpO5-zY4', //sampli video
  }
  g73002 = new G73002(conf);
});
