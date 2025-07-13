function results_function( nq ) {
    $( ".shortcode-widget .progress-meter" ).hide( 500 );
    $( ".shortcode-widget .next-btn-wrapper" ).hide( 500 );
    //$( ".wrapper:first p:last" ).hide( 500 );

    // var g_id= "";
    // var g_id_arr= [];
    // g_id = "#" + nq.ans_log[1][0].value;
    // g_id_arr.push(g_id);
    // for(var i= 0; i < g_id_arr.length; i++){
    //     var arrEl= g_id_arr[i];
    //     console.log(arrEl);
    //     $(arrEl).show();
    // }
    /* /to modiffy */

    /* code suggested */
    nq.hide_waitmask();
    setTimeout( function() {
      $('.progress-meter').hide();
        $( nq.target + " .questionnaire" ).hide();
        $( nq.target + " .results" ).show().addClass("fadeInUp");
    }, 750 );
    /* /code suggested */


}
