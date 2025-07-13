$('.back').on('click',function(){
  var index = $(this).closest( '.fase' ).index()-1;
  var current =$('.fase').eq(index);
  var to = $('.cover');
  changeFase(current,to);
});
$('.toFase1').on('click',function(){
  var to =$('.fase').eq(1);
  var from = $('.fase').eq(0);
  changeFase(from,to);
});
$('.toFase2').on('click',function(){
  var to =$('.fase').eq(2);
  var from = $('.fase').eq(0);
  changeFase(from,to);
});
$('.toFase3').on('click',function(){
  var to =$('.fase').eq(3);
  var from = $('.fase').eq(0);
  changeFase(from,to);
});
$('.toFase4').on('click',function(){
  var to =$('.fase').eq(4);
  var from = $('.fase').eq(0);
  changeFase(from,to);
});
$('.next-slide').on('click',function(){
  $(this).addClass('hidden');
  $(this).siblings('.return').removeClass('hidden');
  var currentSlide = $(this).closest('.fase');
  showSlide(currentSlide,1);
  toogleUInstructions();
});
$('.return').on('click',function(){
  var index = $(this).closest( '.fase' ).index()-1;
  var current =$('.fase').eq(index);
  var to = $('.cover');
  changeFase(current,to);
});

$('.hotspot1').on("mouseenter mouseleave",function(){
  $('.spotText1').toggleClass( "active" );
});
$('.hotspot2').on("mouseenter mouseleave",function(){
  $('.spotText2').toggleClass( "active" );
});
$('.hotspot3').on("mouseenter mouseleave",function(){
  $('.spotText3').toggleClass( "active" );
});
$('.hotspot4').on("mouseenter mouseleave",function(){
  $('.spotText4').toggleClass( "active" );
});
$('.hotspot5').on("mouseenter mouseleave",function(){
  $('.spotText5').toggleClass( "active" );
});



var usr_select = 1;
function changeFase(currentSlide,nextfase){
  var transition = 1000;
  cleanShowFase(currentSlide);
  elementsOut(currentSlide);
  currentSlide.addClass('fadeOutLeft');
  nextfase.addClass('fadeInRight');

  setTimeout(function(){
    currentSlide.hide(0,function(){
      cleanHidenFase(currentSlide);
      showSlide(nextfase,0);
      nextfase.show();
      scrollToTop();
    });
  },transition);
}
function cleanHidenFase(cleanHideSlide){
  cleanHideSlide.removeClass('active fadeOutLeft');
  cleanHideSlide.find('.active').removeClass('active');
  cleanHideSlide.find('.hot-spot-wrapper').removeClass('fadeInRight');
  cleanHideSlide.find('.animated').removeClass('fadeInRight fadeOutLeft');
}
function cleanShowFase(cleanShownSlide){
  cleanShownSlide.removeClass('fadeOutLeft fadeInRight');
  cleanShownSlide.find('.animated').removeClass('fadeOutLeft fadeInRight');
}
function showSlide(fase,i){
  fase.find('.slide').removeClass('active');
  fase.find('.slide').eq(i).addClass('active');
}


function elementsEnter(element){
  element.find('.animated').addClass('fadeInRight');
}
function elementsOut(element){
  element.find('.animated').addClass('fadeOutLeft');
}

function toogleUInstructions(){
  $('.indicator').show(0);
  setTimeout(function(){
    $('.indicator').fadeOut('slow');
  },2000);
}
function hotspotShow(spotText) {
  spotText.show();
}
function hotspotHide(spotText) {
  spotText.hide();
}
function hotspotToggle(spotText) {
  spotText.toggleClass( "active" );
}

function scrollToTop(){
  var top = ($("#infographics-motorola .infographic-header").offset().top - $("#infographics-motorola .infographic-header").height() );
  $('html, body').animate({
    scrollTop: top,
  }, 1500);
}


$( document ).ready( function() {
  $( ".track-fb" ).on ( 'click', function(){
    var clase= $(this).attr("class").split(' ')[1];
    infografic_button_tracking(clase);
  });
} );

function infografic_button_tracking( clase ) {
  var custom_event = "infogr_moto_button_";
  var data = {};
  switch(clase) {
    case "purple":
    custom_event += "play";
    data = {
      category: "motog7",
      model: "play",
      order:usr_select
    };
    break;
    case "green":
    custom_event += "power";
    data = {
      category: "motog7",
      model: "power",
      order:usr_select
    }
    break;
    case "blue":
    custom_event += "simple";
    data = {
      category: "motog7",
      model: "simple",
      order:usr_select
    }
    break;
    case "red":
    custom_event += "plus";
    data = {
      category: "motog7",
      model: "plus",
      order:usr_select
    }
    break;
  }
  usr_select++
  fbq( 'trackSingleCustom', "000000000000000", custom_event, data );
}
