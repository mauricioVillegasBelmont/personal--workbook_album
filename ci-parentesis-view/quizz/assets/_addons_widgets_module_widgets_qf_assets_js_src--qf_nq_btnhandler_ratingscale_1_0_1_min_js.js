/*
 * 
 * NoteQuiz - Slide_Ratingscale
 * V.1.1
 * 
 */



NoteQuiz.prototype.init_buttons_ratingscale = function() {
  var self = this;
  $( '.stars input[type="radio"]' ).on( 'change', function() {
    var $question = $( this ).closest( '.question' );
    var userAnswer = $( this ).val();
    var $score = $question.find( '.stars-score' );
    var $scoreText = $question.find( '.stars-score .text' );
    $scoreText.text( userAnswer );
    $score.addClass( 'active' );

    if( !$question.hasClass( 'validate-all' ) ) {
      $( '.fase_nav' ).removeAttr( 'hidden' );
    } else {
      $question.find( 'validate' ).addClass( 'answered' );
    }
    self.show_nextbtn();
  } );

};

NoteQuiz.prototype.init_buttons_function_list.push( "init_buttons_ratingscale" );