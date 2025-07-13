

const localAns = [
  {"step":"1","result":{"si":Math.round(Math.random()*100),"no":Math.round(Math.random()*100)}},
  {"step":"2","result":{"camara":Math.round(Math.random()*100),"manten":Math.round(Math.random()*100),"cibers":Math.round(Math.random()*100),"identi":Math.round(Math.random()*100),"prote":Math.round(Math.random()*100),"shome":Math.round(Math.random()*100),"taple":Math.round(Math.random()*100),"tsams":Math.round(Math.random()*100),"thuawe":Math.round(Math.random()*100),"photos":Math.round(Math.random()*100)}},
  {"step":"3","result":{"labora":Math.round(Math.random()*100),"libre":Math.round(Math.random()*100),"finde":Math.round(Math.random()*100),"any":Math.round(Math.random()*100)}},
  {"step":"4","result":{"r5":Math.round(Math.random()*100),"r4":Math.round(Math.random()*100),"r3":Math.round(Math.random()*100),"r2":Math.round(Math.random()*100),"r1":Math.round(Math.random()*100)}},
]

function IlineQuery(){
  this.s;
  this.iqs;
  this.url;
  this.uid;
  this.quizzes;
  this.steps;
  this.td;
}

IlineQuery.prototype.init = function (iqs,uid,url,iql,td) {
  var self = this;
  this.s = this.get_s();
  this.iqs = iqs;
  this.uid = uid;
  this.steps = iql;
  this.url = url;
  this.quizzes = this.bind_events();
  this.td = td;
};
IlineQuery.prototype.get_s = function() {
  var a = {};
  window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(b, c, d) {
    a[c] = d
  });
  return a.s
}
IlineQuery.prototype.bind_events = function(){
  var self = this;
  var iqs = this.iqs;
  for (var i = 0; i < this.steps; i++) {
    $(iqs+i+" .ans").on('click',function(){
      $(this).addClass('usr_selection');
      var selector = $(this).closest('.inline-query').attr('id');
      $("#"+selector+" .ans").off();
      $("#"+selector).closest('.inline-query-widget-wrapper').addClass('loading');
      var data = {
        uid: self.uid,
        ans: $(this).data('ans'),
        qid: $(this).closest('.inline-query').data('qid'),
        step: $(this).closest('.inline-query').data('step'),
        stepcode:$(this).closest('.inline-query').data('stepcode'),
        code: $(this).data('code'),
      };
      if ( self.s ) {
        data.s = self.s;
      }
      self.callhome(selector,data);
      self.fbtrack_ans(data);
    })
  }
}
IlineQuery.prototype.callhome = function(selector,data){
  
  // ajax POST "datas" logic
  var selector = "#"+selector;
  const step = $(selector).closest('.inline-query').data('step');
  const response = localAns.find(item=> item.step === `${step}`);
  const total = Object.values(response.result).reduce((a, b) => a + b, 0);
  setTimeout(function(){
    $(selector).closest('.inline-query-widget-wrapper').removeClass('loading');
    $( selector+" .ans" ).addClass( "answered" );
    $.each( response.result, function( index, value ){
      const percentage = Math.round((value/total)*100)
      const s = `${selector} ${selector}-${index}`;
      $( s + " > .overlay" ).css( {"width": (percentage)+"%","max-width": (percentage)+"%"} );
       iq_timer_increment( (s + " > .meter") ,percentage);
    });
  },850);
}
IlineQuery.prototype.fbtrack_ans = function(data){
  data.uid = this.uid;
  var fbp = this.td.facebook;
  var custom_event = fbp.eventprefix+data.step;
  if(fbp.enable){
    for (var i = 0; i < fbp.id.length; i++) {
      var fbq_id = String(fbp.id[i])
      // fb pixel traking
    }
  }
}

function iq_timer_increment(selector, v){
  var d=10,t=750;
  var ft = t/d;
  var fv = v/d;
  for (var i = 0; i <= d; i++) {
    iq_doSetTimeout(selector,i,fv,ft);
  }
}
function iq_doSetTimeout(selector,i,fv,ft){
  setTimeout(function(){
    $(selector).text(Math.ceil( (fv*i) ) +"%");
  },(ft*i));
}
