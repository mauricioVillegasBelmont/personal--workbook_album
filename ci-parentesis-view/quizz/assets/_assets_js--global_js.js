$(document).ready(function(){
  $(window).on("resize",function() {
    windowSize = document.documentElement.clientWidth;
  });
  var windowSize = document.documentElement.clientWidth;
  var popperGeneralBoundaries = document.getElementById('main_body');
  var dropdownBoxes = document.getElementsByClassName("dropdown");
  var pollelements = document.getElementsByClassName("middle-poll");
  var collapseModule = document.getElementsByClassName("collapse");

  pr_main_search_init();
  if ($('.main_menu').length) {main_menu_init();}
  if( $('.tab-btn').length ){init_tabs_widget();}
  if ($('.tablist_item_btn').length) {
    var pr_navigation_tabs_menu = new Pr_navigation_tabs_menu;
    pr_navigation_tabs_menu.init();
  }
  if ($(".load-more-btn").length){$(".load-more-btn").click(show_more_notes);}
  remove_single_spaces();
});
