// estos valores son porcentuales
var poll1=[
  15,
  35,
  11,
  9,
  30
];

var poll2=[
  18,
  40,
  14,
  28
];

var pollPreviousAnswers = [poll1,poll2];

class MiddlePoll{
  // los valores comentados son para que trabaje con vase a la cantidad de respuestas por pregunta en ligar a porcentajes sin embargo tiene un bug referente a math ceil y round
  constructor(poll,values){
    this.poll = poll;
    this.buttons = this.poll.querySelectorAll('.ans');
    this.answerValues = values;
    this.bindEvents(values)
  }
  bindEvents(values){
    for (let i = 0; i < this.buttons.length; i++) {
      this.buttons[i].addEventListener('click', e => this.answer(i) );
    }
  };
  answer(index){
    // aqui enviar respuesta que contesto el usuario
    //this.answerValues[index] += 1;
    this.poll.classList.add('answered');
    this.showAverange();
  }
  alreadyanswered(){
    this.poll.classList.add('answered');
    this.showAverange();
  }
  showAverange(){
    for (var i = 0; i < this.buttons.length; i++) {
      var badge = this.buttons[i].querySelector('span');
      var answerValue = this.answerValues[i];
      var percent = this.percentage(answerValue);
      this.buttons[i].querySelector('div').setAttribute('style', 'width:'+ this.answerValues[i] +'%');
      //this.buttons[i].querySelector('div').setAttribute('style', 'width:'+ percent +'%');
      this.increseBadge(badge,answerValue);
    }
  }
  increseBadge(badge,answerValue){
    var thatBadge = badge;
    var value = this.percentage(answerValue);
    for (let i = 0; i <= 10; i++) {
      setTimeout(function(){
        //thatBadge.innerHTML = Math.round( value * (i*0.1)) + '%';
        thatBadge.innerHTML = Math.round( answerValue * (i*0.1)) + '%';
      }, 50*i);
    }
  }
  percentage(val){
    return  Math.ceil((val * 100) / this.totalValues());
  }
  average(a,b){
    return Math.ceil((a + b) / this.totalValues());
  }
  totalValues(){
    var total = 0;
    for (let i = 0; i < this.answerValues.length; i++) {
      total += this.answerValues[i];
    }
    return total;
  };
}

$(document).ready(function(){
  var pollelements = document.querySelectorAll("[data-midle-poll='true']");
  if(pollelements.length > 0){
    let polls = [];
    for (let i = 0; i < pollelements.length; i++){
      polls[i] = new MiddlePoll(pollelements[i],pollPreviousAnswers[i]);
      //si ya fue contestada previamente ejecutar  polls[i].alreadyanswered()
    }
  }

})
