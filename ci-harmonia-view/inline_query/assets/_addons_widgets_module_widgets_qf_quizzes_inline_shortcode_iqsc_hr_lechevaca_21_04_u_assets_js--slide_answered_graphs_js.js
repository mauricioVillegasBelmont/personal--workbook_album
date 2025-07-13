/*
 *
 * NoteQuiz - Slide_answered_statistics_slide
 * V.1
 *
 */


$(document).ready(function(){
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(function(){
    console.log('loaded charts');
  });
});

NoteQuiz.prototype.chart_color_stock = [];
NoteQuiz.prototype.init_answered_statistics_slide = function() {
    var self = this;

    $('.next-btn-wrapper button.next-btn').text('Continuar');
    self.show_waitmask();

    let d = new Date();
    let ans = [];
    $.each(notequiz.ans_log, function(i,v){
      ans[i] = [];
      $.each(v, function(i2, v2){
        ans[i][i2] = v2.code;
      });
    });
    $(self.target +" "+ self.current_slide.sid + " .shortcode-ans.single-ans").remove();
    $.getJSON(self.base_url+"service", {"a":"answeredGraphs", "uid": self.quiz_data.uid, "ans": ans, "i":self.current_slide.step, "v":(d.getTime())}, function(data){
      // console.log(data.html);

      var slide_selector = self.target +" "+ self.current_slide.sid;
      // asign chart id
      data.html = data.html.replace( "{NQS_ID}", $( slide_selector ).attr( 'id' ) );
      $( slide_selector + " .statistics-container" ).append( data.html );

      // normalize chart data text/numbers
      var percentage = 0;
      var chart_data = data.chart_data;
      for (let i = 0; i < chart_data.length; i++) {
        chart_data[i][1] = parseInt(chart_data[i][1], 10);
        percentage +=parseInt(chart_data[i][1], 10);
      }
      //console.log(percentage);

      var uans = data['uans'];
      // setup chart and print it
      var colorSetup = $(slide_selector).data('colors');
      if(colorSetup == undefined  || colorSetup[0] == "" ) {
        colorSetup = false;
      }else {
        colorSetup = colorSetup.split(", ");
        colorSetup = self.chart_color_config(colorSetup, chart_data.length);
      }
      self.chart_color_stock.push(colorSetup);
      self.pie_chart(slide_selector,chart_data,uans,colorSetup,false);
      // porcentaje jquery
      $('.graph svg text').each(function(){
        var t = $(this).text() + "%";
        $(this).text(t)
      });

      //AJUSTE DE SLIDE TAMANO
      var questionnaire_h = $( slide_selector ).outerHeight();
      var target_h = questionnaire_h +
      $( self.target + " .progress-meter" ).outerHeight() +
      $( self.target + " .next-btn-wrapper" ).outerHeight();
      $( self.target + " .questionnaire" ).css( "min-height", questionnaire_h);
      setTimeout( function() {
        $( self.target ).css( "min-height", ( target_h ) );
        self.hide_waitmask();
      }, 500 );
      //END AJSUTE DE SLLIDE TAMANO

      setTimeout( function() {
        self.show_nextbtn();
        $( ".next-btn" ).off().click( function() {
          self.answered_statistics__nextbtn_handler( this );
        } );
      }, 500 );
    });
    return true;
};

NoteQuiz.prototype.answered_statistics__nextbtn_handler = function( btn ) {
    var self = this;
    $( btn ).off( "click" );
    if( this.working ) return;
    this.working = true;

    this.hide_nextbtn();
    this.hide_scrollnav();

     var ans = {
         ans: "skip",
         code: "skip",
         value: "skip",
         ans_id: "skip",
         type: "skip" };
    this.current_slide.ans = [ ans ];
    this.call_home();

    this.current_slide.ans = [];
    var next_step = this.current_slide.step + 1;
    var to_step = $( btn ).data( 'tostep' );
    if( to_step ) {
      to_step = to_step == 'results' ? this.quiz_data.max_step + 1 : to_step;
      for( var j = next_step; j < to_step; j++ ) {
        this.change_slide( next_step, false );
        var ans = { ans: "skip", value: "skip", code: "skip", ans_id: "skip", type: "skip" };
        this.current_slide.ans = [ ans ];
        this.call_home();
        next_step++;
      }
    }

    while( !this.change_slide( next_step ) ) {
     var ans = { ans: "skip", value: "skip", code: "skip" , ans_id: "skip", type: "skip" };
     this.current_slide.ans = [ ans ];
     this.call_home();
     next_step++;
    }
    $('.next-btn-wrapper button.next-btn').text('Siguiente');
    this.working = false;
    $( ".next-btn" ).off().click( function() {
      self.nextbtn_handler( this );
    } );
};

// chart constuction functions
NoteQuiz.prototype.pSBC = function(p,c0,c1,l){
  let r,g,b,P,f,t,h,i=parseInt,m=Math.round,a=typeof(c1)=="string";
  if(typeof(p)!="number"||p<-1||p>1||typeof(c0)!="string"||(c0[0]!='r'&&c0[0]!='#')||(c1&&!a))return null;
  if(!this.pSBCr)this.pSBCr=(d)=>{
    let n=d.length,x={};
    if(n>9){
      [r,g,b,a]=d=d.split(","),n=d.length;
      if(n<3||n>4)return null;
      x.r=i(r[3]=="a"?r.slice(5):r.slice(4)),x.g=i(g),x.b=i(b),x.a=a?parseFloat(a):-1
    }else{
      if(n==8||n==6||n<4)return null;
      if(n<6)d="#"+d[1]+d[1]+d[2]+d[2]+d[3]+d[3]+(n>4?d[4]+d[4]:"");
      d=i(d.slice(1),16);
      if(n==9||n==5)x.r=d>>24&255,x.g=d>>16&255,x.b=d>>8&255,x.a=m((d&255)/0.255)/1000;
      else x.r=d>>16,x.g=d>>8&255,x.b=d&255,x.a=-1
    }return x};
    h=c0.length>9,h=a?c1.length>9?true:c1=="c"?!h:false:h,f=this.pSBCr(c0),P=p<0,t=c1&&c1!="c"?this.pSBCr(c1):P?{r:0,g:0,b:0,a:-1}:{r:255,g:255,b:255,a:-1},p=P?p*-1:p,P=1-p;
    if(!f||!t)return null;
    if(l)r=m(P*f.r+p*t.r),g=m(P*f.g+p*t.g),b=m(P*f.b+p*t.b);
    else r=m((P*f.r**2+p*t.r**2)**0.5),g=m((P*f.g**2+p*t.g**2)**0.5),b=m((P*f.b**2+p*t.b**2)**0.5);
    a=f.a,t=t.a,f=a>=0||t>=0,a=f?a<0?t:t<0?a:a*P+t*p:0;
    if(h)return"rgb"+(f?"a(":"(")+r+","+g+","+b+(f?","+m(a*1000)/1000:"")+")";
    else return"#"+(4294967296+r*16777216+g*65536+b*256+(f?m(a*255):0)).toString(16).slice(1,f?undefined:-2)
  }
NoteQuiz.prototype.chart_color_config = function(colors, tones) {
  var self = this;
  const regex = new RegExp('(^#.*[0-9]|[a-f]|[A-F]$)|(^rgb+a?.[0-9].*)','gi');
  if (regex.test(colors[0])) {
    if (colors.length != tones){
      switch(colors.length) {
        case 1:
          if (colors.length < tones) {
            var nca=[ colors[0] ];
            for (var i = 1; i < tones; i++) {
              var offset =   Math.round( i/(tones+(tones*1.25)) * 10) / 10;
              nca.push( self.pSBC( offset, nca[0] ) );
            }
            colors = nca;
          }
        break;
        case 2:
          if (colors.length < tones){
            var nca=[ colors[0],colors[1] ];
            for (var i = 1; i < tones; i++) {
              var offset =   Math.round( i/(tones+(tones*1.25)) * 10) / 10;
              nca.push( self.pSBC( offset, nca[1] ) );
            }
            colors = nca;
          }
        break;
        case 3:
          if (colors.length < tones){
            var nca=[ colors[0],colors[1] ];
            for (var i = 1; i < tones-2; i++) {
              var offset = (i/(tones-2));
              nca.push( self.pSBC(offset, colors[1], colors[2] ) );
            }
            nca.push(colors[2]);
            colors = nca;
          }
        break;
        default:
          if (colors.length < tones){
            var nca = colors;
            for (var i = (colors.length-1); i < tones; i++) {
              var offset =   Math.round( i/(tones+(tones*1.25)) * 10) / 10;
              nca.push( self.pSBC( offset, nca[1] ) );
            }
            colors = nca;
          }
        break;
      }
    }
    return colors;
  } else {
    var color_function = colors[0];
    colors.shift();
    if (color_function == 'lighten') {
      if (colors.length == 1) {
        var t = tones;
        var c = colors[0];
        for (var i = 1; i < t; i++) {
          (function(index,tones,color) {
            var oper =   Math.round(index/(tones+(tones*1.25)) * 10) / 10;
            colors.push( self.pSBC( oper, color ) );
          })(i,t,c);
        }
      }else {
        tones = tones;
      }
    }
  }
}
NoteQuiz.prototype.pie_chart = function(slide_selector,chart_data,uans,colorSetup,anhoter_options){
  //console.log(slide_selector,chart_data,uans,colorSetup,anhoter_options);

  /*
  var percentage = 0;
  for (let i = 0; i < chart_data.length; i++) {
    chart_data[i][1] = parseInt(chart_data[i][1], 10);
    percentage +=parseInt(chart_data[i][1], 10);
  }
  if(percentage<100){
    var faltante = (100-percentage);
    chart_data.push( ["Otra opcion", faltante, "Otra opcion: "+faltante+"%"] );
    var last = chart_data.length-1;
    anhoter_options = { slices: { [last]: {color: '#dadada'} } };
  }
  */

  var self = this;
  var chart = new google.visualization.DataTable();
  var pie_chart = new google.visualization.PieChart( $(slide_selector+'-chart')[0] );
  var chart_options = {
    legend: 'none',
    'width':$(slide_selector+'-chart').eq(0).width(),
    'height':$(slide_selector+'-chart').eq(0).height(),
    chartArea:{width:'80%',height:'80%'},
    pieSliceTextStyle:{
      fontSize:14,
      bold:true
    }
  }

  chart.addColumn( 'string', 'Topping' );
  chart.addColumn( 'number', 'Slices' );
  if(chart_data[0].length == 3){
    chart.addColumn({type: 'string', role: 'tooltip'});
  }
  chart.addRows( chart_data );

  if (uans.length > 0) {
    var slices = {};
    for (var i = 0; i < uans.length; i++) {
      slices[i] = {offset: 0.05};
    }
    chart_options.slices = slices;
  }

  if(colorSetup) {
    chart_options.colors = colorSetup;
    $(slide_selector +' .chosen-ans-wrapper .ans-color').css("background-color",colorSetup[0]);
    $(slide_selector +' .other-selections-item').each(function(i){
      $(this).find(".ans-color").css( "background-color", colorSetup[i+1] )
    });
  }
  if(anhoter_options){
    Object.keys(anhoter_options).forEach(function(key) {
      chart_options[key] =  anhoter_options[key]
    });
  }

  chart_options.fractionDigits = 0;
  chart_options.legend = 'none';
  chart_options.pieSliceText = 'value';


  setTimeout(function(){
    pie_chart.draw(chart, chart_options);
  },10);
  setTimeout(function(){
    google.visualization.events.addListener(pie_chart, 'onmouseout', addTextValue);
    google.visualization.events.addListener(pie_chart, 'onmouseover', addTextValue);
    google.visualization.events.addListener(pie_chart, 'select', addTextValue);
    addTextValue();
  },20);


  function addTextValue(){
    $('.graph svg text').each(function(){
      var t = $(this).text();
      if(!t.includes("%")){
        $(this).text(t+"%")
      }
    });
  }

}


NoteQuiz.prototype.change_slide_function_list[ "answeredStatistics" ] = "init_answered_statistics_slide";
