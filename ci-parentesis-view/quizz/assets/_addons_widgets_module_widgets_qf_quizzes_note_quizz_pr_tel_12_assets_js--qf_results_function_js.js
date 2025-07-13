function results_function(nq) {
  $(".progress-meter").hide(500);
  $(".next-btn-wrapper").hide(500);
  $(".single-content-wrapper:first p:last").hide(500);

  /* to modiffy */
  var g_id = "#r" + nq.ans_log[1][0].value;
    $(g_id).show();
  /* /to modiffy */

  /* code suggested */
  $('.progress-meter .bar .progress').width(0);
  nq.hide_waitmask();
  setTimeout(function() {
    $(nq.target + " .questionnaire").hide();
    $(nq.target + " .results").show().addClass("fadeInUp");
  }, 750);
  /* /code suggested */
}


NoteQuiz.prototype._show_slide = function(next_slide_id) {
  var self = this;
  this.hide_waitmask();
  var questionnaire_h = $(next_slide_id).outerHeight();
  var target_h = questionnaire_h +
    $(this.target + " .progress-meter").outerHeight() +
    ($(this.target + " .next-btn-wrapper").outerHeight() * .625);
  $(this.target + " .questionnaire").css("min-height", questionnaire_h);
  setTimeout(function() {
    $(self.target).css("min-height", (target_h));
  }, 500);
  $(next_slide_id).css("display", "block").removeClass(
    this.quiz_config.slides_transition.hide_class
  ).addClass(
    this.quiz_config.slides_transition.show_class
  );
};
