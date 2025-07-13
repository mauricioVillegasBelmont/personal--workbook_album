const Root = document.querySelector('body');
window.is_mobile = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};
function remove_single_spaces(){
  $('p').each(function() {
    var $this = $(this);
    if($this.html().replace(/\s|&nbsp;/g, '').length == 0){
      $this.remove();
    }
  });
  $('.single-content * > br:first-child, .single-content * > br:last-child').remove();
}
function searchEngine(){
    var url = "/resultados?q="+$("input#pr-main_search").val();
    $(location).attr('href',url);
}
function pr_main_search_init(){
  $("#pr-main_search_btn").on("click",function(){
    var input = $("input#pr-main_search").val();
    var open = $("#pr_main_header .search-bar .search").hasClass('open');
    if(input != "" && input != undefined && !open){
      $("#pr_main_header .search-bar .search").addClass('input');
    }
    if(input != "" && input != undefined && open){
      searchEngine();
    }else {
      $("input#pr-main_search").blur();
      $("#pr_main_header .search-bar .search").toggleClass('open');
    }
  });
  $(document).on("keyup", "input#pr-main_search", function(e){
    e.preventDefault();
    if(e.keyCode == 13){
      searchEngine();
    }
    var input = $(this).val()
    if( input != "" && input != undefined ){
      $("#pr_main_header .search-bar .search").addClass('input');
    }else {
      $("#pr_main_header .search-bar .search").removeClass('input');
    }
  });
}
function show_mostrecentpage2_button() {
    var hidden_notes = $("div.grid-post-link:hidden");
    if( !hidden_notes.length) {
        $(".load-more-btn").hide();
        $("nav.paginator").show();
    }
}
function show_more_notes() {
  $('html').addClass('page_locked');
  var sct = $('html').scrollTop();
  $("div.grid-post-link:hidden:lt(6)").each(function(i){
    $(this).css({'animation-delay': (i/5)+'s'});
    $(this).addClass('animated slideInUp');
  });
  $("div.grid-post-link:hidden:lt(6)").show();
  $('html').scrollTop(sct);
  show_mostrecentpage2_button();
  $('html').removeClass('page_locked');
}

function Pr_navigation_tabs_menu(){
  var self = this;
}
function main_menu_init(){
  var menu = new Pushbar({
    element:'left-menu',
    blur:true,
    overlay:true
  });
}

Pr_navigation_tabs_menu.prototype.init = function(){
  var self = this;
  var path = window.location.pathname.split('/');
  path = path.filter(item => item);
  var s;
  switch (path[0]) {
    case 'noticias':
    case 'resenas':
    case 'tutoriales':
      s = path[0];
      break;
    default:
      s = 'noticias';
  }
  var init_tab =$("#tab_menu_"+s+ " .tablist_item_btn");
  self.opentab(init_tab);
  this.manage_controller();
  $('#main_menu .main_menu_wrapper [data-src]').each(function(){
    var src = $(this).data('src');
    $(this).attr("src", src);
  });
}
Pr_navigation_tabs_menu.prototype.manage_controller = function(){
  var self = this;
  $(".tablist_item .tablist_item_btn").on("click mouseenter",function(e){
    e.preventDefault();
    self.opentab(this);
  });
}
Pr_navigation_tabs_menu.prototype.opentab = function(sel){
  var elem = $(sel).parent().attr('id');
  $(sel).parent().siblings(".tablist_item").attr('aria-selected','false');
  $(sel).parent().siblings(".tablist_item").removeClass('active');;
  $(sel).parent().attr('aria-selected','true');
  $(sel).parent().addClass('active');
  $(".tab_menu_item_go").removeClass('active');
  $(".tab_menu_item_go."+elem).addClass('active');
  this.opentabList(elem);
}
Pr_navigation_tabs_menu.prototype.opentabList = function(sel){
  $("#main_menu_nav .tab_menu .tab_menu_tabpanel").removeClass('active');
  $("#main_menu_nav .tab_menu .tab_menu_tabpanel").attr('aria-hidden','true');
  $("#"+sel+"_tabpanel").addClass('active');
  $("#"+sel+"_tabpanel").attr('aria-hidden','false');
}
Pr_navigation_tabs_menu.prototype.mobile_redirect = function(r){
  window.location.href = r;
}
