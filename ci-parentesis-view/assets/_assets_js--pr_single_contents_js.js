$(document).ready(function(){
  var collapseModule = document.getElementsByClassName("collapse");
  if(collapseModule.length > 0){
    let collapseElemetn = []
    for (let i = 0; i < collapseModule.length; i++) {
      collapseElemetn[i] = new Collapse(collapseModule[i]);
      //collapseElemetn[i] = new prCollapse(collapseModule[i]);
    }
  }else {
    //console.log('no colapse');
  }

  var dropdownBoxes = document.getElementsByClassName("dropdown");
  if(dropdownBoxes.length > 0){
    let dropdownElement = [];
    for (let i = 0; i < dropdownBoxes.length; i++){
      dropdownElement[i] = new DropDownModule(dropdownBoxes[i]);
    }
  }else {
    //console.log('no dropdown-boxes');
  }

  var vYT = document.getElementsByClassName('yt-placeholder');
  if(vYT.length > 0){
    for (var i = 0; i < vYT.length; i++) {
      if( vYT[i].dataset.id ){
        videoYTElemets[i] = new VideoYt(i,vYT[i]);
      }
    }
  }else {
    //console.log('no yt');
  }

  var readmoreelements = document.getElementsByClassName("readmore-wrapper");
  if(readmoreelements.length > 0){
    let readmorebtn = [];
    for(let i = 0; i < readmoreelements.length; i++){
      readmorebtn[i] = new ReadMore(readmoreelements[i],500);
    }
  }else {
    //console.log('no readmores');
  }
  //LINK CODES
  if( $("div.js-star-rating").length > 0 ){
    $("div.js-star-rating").each(function(i, j){
      load_gui_js_start_rating( j );
    });
  }
  //END LINK CODES
});

//Se Debera optimizar a futuro.
function load_gui_js_start_rating(div){
  id_div = $(div).parent().parent().parent().attr("id");
  var r = $(div).attr("data");
  if(r>0){
    $(div).attr("disabled", true);
    $(div).find("input:radio[name='rating']").attr("disabled",true);
    $(div).find("input:radio[value='"+r+"']").attr("checked",true);
  }
  $("#"+id_div+" input:radio[name='rating']").off("change");
  $("#"+id_div+" input:radio[name='rating']").on("change", function(e){
    _tempDiv = $(this).parent().parent().parent().parent();
    if(r>0){return false; }
    var d = new Date();
    var p = window.location.pathname;
    p=p.split("/");
    p=p[p.length-1];
    r=$(this).val();
    $.get(window.location.origin+"/service", {"a": "rating", "p":p, "r":$(this).val(), "v":(d.getTime())}, function(data){
      _tempDiv.find(".users-rate-as > span.punctuation").html(data.data.promedio);
      _tempDiv.find(".users-rate-as span.users-who-qualified").html(data.data.total_usrs);
      _tempDiv.find(".js-star-rating").attr("disabled", true);
      _tempDiv.find("input:radio[name='rating']").attr("disabled",true);
      _tempDiv.find("input:radio[value='"+r+"']").attr("checked",true);
    }, "json");
    e.preventDefault();
  });
}
