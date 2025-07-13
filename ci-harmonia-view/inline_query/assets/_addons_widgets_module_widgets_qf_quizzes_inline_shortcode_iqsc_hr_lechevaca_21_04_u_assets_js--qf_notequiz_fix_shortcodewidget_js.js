NoteQuiz.prototype.start = function(){
  this.init_buttons();
  this.init_quizmap();
  this.segment = NoteQuizHelper.get_segment();
  //NEW CALL VALIDATE UID
  var d = new Date();
  var temp = this;
  
  // SEGMENT VALIDATION

  //ENS NEW CALL VALIDATA UID
  NoteQuizHelper.check_images_loading( this.target );
  NoteQuizProgressbar.init( this.quiz_config.progress_bar );
  if( this.quiz_config.waitmask.template ) {
      this.quiz_config.waitmask.html = $( '<div>' ).append( $( this.quiz_config.waitmask.template ).clone().css( "display", "block" ) ).html();
  }
}
NoteQuiz.prototype._show_slide = function( next_slide_id ) {
  var self = this;
  this.hide_waitmask();
  var questionnaire_h = $( next_slide_id ).outerHeight();
  var target_h = questionnaire_h +
    $( this.target + " .progress-meter" ).outerHeight() +
    $( this.target + " .next-btn-wrapper" ).outerHeight();
  $( this.target + " .questionnaire" ).css( "min-height", questionnaire_h);
  setTimeout( function() {
    $( self.target ).css( "min-height", ( target_h ) );
  }, 500 );
  $( next_slide_id ).css( "display", "block" ).removeClass(
    this.quiz_config.slides_transition.hide_class
  ).addClass(
    this.quiz_config.slides_transition.show_class
  );
};


