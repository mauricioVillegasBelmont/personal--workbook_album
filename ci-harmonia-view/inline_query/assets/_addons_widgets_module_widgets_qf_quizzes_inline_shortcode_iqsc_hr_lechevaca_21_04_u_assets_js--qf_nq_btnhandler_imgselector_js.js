/*
 * 
 * NoteQuiz - Slide_ImgSelector
 * V.1.1
 * 
 */


NoteQuiz.prototype.init_imgselector_slide = function() {
    var self = this;
    setTimeout( function() {
        //self.show_nextbtn();
    }, 1500 );
    return true;
};


NoteQuiz.prototype.init_buttons_imgselector = function() {
    var self = this;  
    $( ".ans-btn-imgselector-default").click( function() {
        self.imgselector__btn_handler( this );
    } );    
    
};

NoteQuiz.prototype.imgselector__btn_handler = function(btn) {
     $( btn ).closest( ".answers" ).find( ".ans-btn-imgselector-default" ).off( "click" );
    
    if( this.working ) return;
    this.working = true;

    $( btn ).addClass( "active" );
    
    var thread_setter = $( btn ).data( 'threadsetter' );
    if( thread_setter ) this.set_thread( thread_setter );
    
    var ans = {
        ans: $( btn ).data( "ans" ),
        value: $( btn ).data( 'value' ),
        ans_id: $( btn ).data( 'ansid' ),
        type: $( btn ).data( 'type' ),
        code: $( btn ).data( 'code')
    };
    
    this.current_slide.ans = [ ans ];
    this.call_home();
    
    var next_step = this.current_slide.step + 1;
    var to_step = $( btn ).data( 'tostep' );
    if( to_step ) {
        to_step = to_step == 'results' ? this.quiz_data.max_step + 1 : to_step;
        for( var j = next_step; j < to_step; j++ ) {
            this.change_slide( next_step, false );
            var ans = { ans: "skip", value: "skip", ans_id: "skip", type: "skip" };
            this.current_slide.ans = [ ans ];
            this.call_home();
            next_step++;
        }
    }
   
    while( !this.change_slide( next_step ) ) {
     var ans = { ans: "skip", value: "skip", ans_id: "skip", type: "skip" };
     this.current_slide.ans = [ ans ];
     this.call_home();
     next_step++;
    }
    
    this.working = false;
    
};


NoteQuiz.prototype.init_buttons_function_list.push( "init_buttons_imgselector" );
NoteQuiz.prototype.change_slide_function_list[ "imgselector" ] = "init_imgselector_slide";