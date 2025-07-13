/*
 ***********HARMONIA GUI HANDLER************
 */

$(document).ready(function(){
    HarmoniaGUIHandler = new Harmonia_GUI_Handler();
    spacial_text_modifiers();
});

function Harmonia_GUI_Handler() {
    this._init();
}
Harmonia_GUI_Handler.prototype._init = function() {
    $(".search").on("click", function(){
          $(".overlay-search").show();
    });
    $(".harmonia-search").on("click", function(){
          $(".overlay-search").show();
    });
    $(".harmonia-search-close").on("click", function(){
          $(".overlay-search").fadeOut();
          $(".harmonia-search-input").val("");
    });
    $(".newsletter-open-btn").click( function(){
        $("#newsletter-modal").modal({
            fadeDuration: 300,
            fadeDelay: 1.2
        });
    } );
    $("#search-submit-button").click( function() {
        var q = $("#search-text-input").val();
        if( q ) window.location = "/resultados?q=" + q;
    } );
    $("#search-text-input").on('keyup', function (e) {
        if (e.keyCode == 13) {
            var q = $("#search-text-input").val();
            if( q ) window.location = "/resultados?q=" + q;
        }
    });
}
Harmonia_GUI_Handler.prototype.block = function( element ) {
    var mask = "<div class='HGUIH-blockmask' style='position:absolute;left:0;right:0;top:0;bottom:0;background:rgba(32,32,32,0.8);-webkit-transition:opacity 0.5s;-moz-transition:opacity 0.5s;-o-transition:opacity 0.5s;transition:opacity 0.5s;'><div style='position: absolute;top: 45%;width:100%;text-align:center;'><div style='margin: 0 auto;' class='sk-three-bounce'><div style='background:white;' class='sk-child sk-bounce1'></div><div style='background:white;' class='sk-child sk-bounce2'></div><div style='background:white;' class='sk-child sk-bounce3'></div></div></div></div>";
    var position = $(element).css("position");
    if( position != 'relative' && position != 'absolute' ) {
        $(element).css("position", "relative");
    }
    $(element).append(mask);
}
Harmonia_GUI_Handler.prototype.unblock = function( element ) {
    $(element).find(".HGUIH-blockmask").css("opacity",0);
    setTimeout(function(){
        $(element).find(".HGUIH-blockmask").remove();
    },500);
}
function spacial_text_modifiers(){
  $(".breadcrumb span.txt-head").html(function(i,t){
    return t.replace('Coronavirus covid-19','Coronavirus COVID-19');
  });
  $(".c-coronaviruscovid-19-comopuedoayudar .inner-container .txt-title").html(function(i,t){
    return t.replace('Cómo puedo ayudar','Cómo puedo ayudar <small>(Buenas iniciativas)</small>');
  });
}
