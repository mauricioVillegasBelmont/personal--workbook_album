/*
 * 
 * NoteQuiz
 * V.2.6.2
 * 
 */

function NoteQuiz( config ) {
    this.segment = "";
    this.target = config.target;
    this.base_url = config.base_url;
    this.quiz_data = config.quiz_data;
    this.quiz_config = {
        slides_transition: {
            hide_class: "hide-slide",
            show_class: "show-slide",
            display_step: true
        },
        progress_bar: {
            display_label: false,
            label_type: "percentage",
            calcfunc_type: "linear"
        },
        waitmask: {
            html: "<div class='waitmask'><div class='spinnercontainer'><div class='spinner'><div class='bounce1'></div><div class='bounce2'></div><div class='bounce3'></div></div></div></div>",
            template: ""
        }
    };
    $.extend( true, this.quiz_config, config.quiz_config );
    this.track_data = config.track_data;
    this.results_function = config.results_function;
    this.current_slide = {
        step: 0,
        type: "",
        display_step: 0,
        ans: [],
        thread: "main",
        sid: ""
    };    
    this.current_thread = "main";
    this.thread_map = [ "main" ];
    this.ans_log = [];
    this.working = false;
    this.satellite = new Satellite( config.quiz_config.satellite );
}

NoteQuiz.prototype.plugins_data = {};

NoteQuiz.prototype.init_buttons_function_list = [];

NoteQuiz.prototype.change_slide_function_list = {};

NoteQuiz.prototype.start = function() {
    this.init_buttons();
    this.init_quizmap();
    this.segment = NoteQuizHelper.get_segment();
    //NEW CALL VALIDATE UID
    var d = new Date();
    var temp = this;
    
    // Segment Validation

    //ENS NEW CALL VALIDATA UID
    NoteQuizHelper.check_images_loading( this.target );
    NoteQuizProgressbar.init( this.quiz_config.progress_bar );
    if( this.quiz_config.waitmask.template ) {
        this.quiz_config.waitmask.html = $( '<div>' ).append( $( this.quiz_config.waitmask.template ).clone().css( "display", "block" ) ).html();
    }
};

NoteQuiz.prototype.init_buttons = function() {
    var self = this;
    $( ".ans-btn-default" ).off().click( function() {
        self.btn_handler( this );
    } );
    $( ".next-btn" ).off().click( function() {
        self.nextbtn_handler( this );
    } );
    var fname = "";
    for( var i=0; i<this.init_buttons_function_list.length; i++ ) {
        fname = this.init_buttons_function_list[ i ];
        this[ fname ]();
    }
};

NoteQuiz.prototype.init_quizmap = function() {
    var max_step = 0;
    for( slide in this.quiz_data.slides ) {
        if( this.quiz_data.slides[ slide ].step > max_step ) {
            max_step = this.quiz_data.slides[ slide ].step;
        }
    }
    this.quiz_data.max_step = max_step;
};

NoteQuiz.prototype.btn_handler = function( btn ) {
    $( btn ).closest( ".answers" ).find( ".ans-btn" ).off( "click" );
    if( this.working ) return;
    this.working = true;

    $( btn ).addClass( "active" );
    
    var thread_setter = $( btn ).data( 'threadsetter' );
    if( thread_setter ) this.set_thread( thread_setter );
    
    this.current_slide.ans = [ this.get_ansdata_btn( btn ) ];
    this.call_home();
    
    var next_step = this.current_slide.step + 1;
    var to_step = $( btn ).data( 'tostep' );
    if( to_step ) {
        to_step = to_step == 'results' ? this.quiz_data.max_step + 1 : to_step;
        for( var j = next_step; j < to_step; j++ ) {
            this.change_slide( next_step, false );
            var ans = { 
                ans: "skip",
                code: "skip",
                value: "skip", 
                ans_id: "skip", 
                type: "skip" };
            this.current_slide.ans = [ ans ];
            this.call_home();
            next_step++;
        }
    }
    while( !this.change_slide( next_step ) ) {
        var ans = {
            ans: "skip",
            code: "skip",
            value: "skip", 
            ans_id: "skip", 
            type: "skip" };
        this.current_slide.ans = [ ans ];
        this.call_home();
        next_step++;
    }
    
    
    this.working = false;
};

NoteQuiz.prototype.nextbtn_handler = function( btn ) {
    var self = this;
    $( btn ).off( "click" );
    if( this.working ) return;
    this.working = true;
    
    this.hide_nextbtn();
    this.hide_scrollnav();
    this.call_home();
    this.current_slide.ans = [];
    var next_step = this.current_slide.step + 1;
    this.change_slide( next_step );
    
    this.working = false;
    $( btn ).off().click( function(){ self.nextbtn_handler( this ); } );
};

NoteQuiz.prototype.change_slide = function( step, show ) {
    var self = this;
    show = typeof show == 'undefined' ? true : show;
    var current_slide_id = "";
    if( this.current_slide.step ) {
        var cs_thread = this.current_slide.thread;
        var cs_step = this.current_slide.step;
        current_slide_id = "#notequizslide-" + cs_step + "-" + cs_thread;
        $( current_slide_id ).addClass( this.quiz_config.slides_transition.hide_class );
        setTimeout( function(){
            $( current_slide_id ).hide();
        }, 750 );
    }
    var ns_thread = false;
    var thread_index = this.thread_map.indexOf( this.current_thread );
    var nslide = {};
    while( thread_index >= 0 ) {
        ns_thread = this.thread_map[ thread_index ];
        var next_slide_id = step + "-" + ns_thread;
        if( next_slide_id in this.quiz_data.slides ) {
            nslide = this.quiz_data.slides[ next_slide_id ];
            next_slide_id = "#notequizslide-" + next_slide_id;
            break;
        }
        thread_index--;
    }
    
    this.pbar();
    
    this.current_slide.step = step;    
    this.current_slide.stepcode = nslide.stepcode;
    this.current_slide.type = nslide.type;
    this.current_slide.thread = ns_thread;
    this.current_slide.ans = [];
    this.current_slide.sid = next_slide_id;
    
    if( step > this.quiz_data.max_step ) {
        this.return_to_top();
        this.show_results();
        return true;
    } else if( NoteQuizHelper.is_empty( nslide ) && show ) {
        this.return_to_top();
        return false;
    } else if( NoteQuizHelper.is_empty( nslide ) || !show ) {
        this.return_to_top();
        return true;
    }
    
    if( typeof this.change_slide_function_list[ nslide.type ] != 'undefined' ) {
        var fname = this.change_slide_function_list[ nslide.type ];
        var to_continue = this[ fname ]( nslide, step );
        if( !to_continue )return;
    }
    this.print_display_step( next_slide_id );
    this.show_slide( next_slide_id );
    setTimeout( function(){
        self.return_to_top();
    }, 500 );
    
    return true;
};

NoteQuiz.prototype.show_slide = function( next_slide_id ) {
    var self = this;
    if( !$( next_slide_id ).data( "images_loaded" ) ) {
        this.show_waitmask();
        $( next_slide_id ).on( "imagesLoaded", function() {
            self._show_slide( next_slide_id );
        } );
        return;
    }
    this._show_slide( next_slide_id );
};

NoteQuiz.prototype._show_slide = function( next_slide_id ) {
    var self = this;
    this.hide_waitmask();
    var questionnaire_h = $( next_slide_id ).outerHeight() + 16;
    var target_h = questionnaire_h + 
            $( this.target + " .progress-meter" ).outerHeight() + 
            $( this.target + " .next-btn-wrapper" ).outerHeight();
    $( this.target + " .questionnaire" ).css( "min-height", questionnaire_h + 120);
    setTimeout( function() {
        $( self.target ).css( "min-height", ( target_h + 120 ) );
    }, 500 );
    $( next_slide_id ).css( "display", "block" ).removeClass( 
            this.quiz_config.slides_transition.hide_class ).addClass( 
            this.quiz_config.slides_transition.show_class );
};

NoteQuiz.prototype.call_home = function() {
    var save_url = this.base_url + "save";
    var step = this.current_slide.step;
    var uid = this.quiz_data.uid;
    this.ans_log.push( this.current_slide.ans );

    if( !this.segment ) return;

    fb_tracking: if( this.track_data.facebook.enable ) {
        var custom_event = this.track_data.facebook.eventprefix + "ansdata";
        var trackingdata_fname = this.current_slide.type + "__get_trackingdata";
        var trackingdata;
        if( typeof this[ trackingdata_fname ] == 'function' ) {
            trackingdata = this[ trackingdata_fname ]();
        } else {
            trackingdata = this.default__get_trackingdata();
        }
        trackingdata[ "stepcode" ] = this.current_slide.stepcode;
        var fbqid = "";
        for( var i = 0; i < this.track_data.facebook.fbqid.length; i++ ) {
            fbqid = this.track_data.facebook.fbqid[ i ];
            fbq( 'trackSingleCustom', fbqid, custom_event, trackingdata );
        }
    }
    
    var fans, formated_ans_arr = [];
    for( var i = 0; i < this.current_slide.ans.length; i++ ) {
        fans = jQuery.extend( true, {}, this.current_slide.ans[i] );
        delete fans.target;
        formated_ans_arr.push( fans );
    }
    
    var data = { 
        ans: formated_ans_arr, 
        step: step, 
        type: this.current_slide.type,
        thread: this.current_slide.thread,
        uid: uid 
    };
    
    var custom_tsdfname = this.current_slide.type + "__get_tosavedata";
    if( typeof this[ custom_tsdfname ] == 'function' ) {
        data = jQuery.extend( true, data, this[ custom_tsdfname ]() );
    }
    
    // Data Posting

};

NoteQuiz.prototype.get_current_query_data = function() {
    var cs_thread = this.current_slide.thread;
    var cs_step = this.current_slide.step;
    return this.quiz_data.slides[ cs_step + "-" + cs_thread ];
};

NoteQuiz.prototype.get_next_slide_data = function() {
    var ns_step = this.current_slide.step + 1;
    var ns_thread = false;
    var thread_index = this.thread_map.indexOf( this.current_thread );
    while( thread_index >= 0 ) {
        ns_thread = this.thread_map[ thread_index ];
        var next_slide_id = ns_step + "-" + ns_thread;
        if( next_slide_id in this.quiz_data.slides ) {
            return this.quiz_data.slides[ next_slide_id ];
        }       
        thread_index--;
    }
};

NoteQuiz.prototype.default__get_trackingdata = function() {
    a = {
        step: this.current_slide.step,
        thread: this.current_slide.thread,
        ans: this.current_slide.ans[0].ans,
        code: this.current_slide.ans[0].code,
        segment: this.segment,
        uid: this.quiz_data.uid
    };
    return a;
};

NoteQuiz.prototype.set_thread = function( ts ) {
    var position = false;
    var thread = ts;
    if( typeof ts != "string" ) {
        thread = ts.thread;
        if( typeof ts.thread != "string" ) {
            var index = ts.thread.index;
            if( ts.thread.reference == "relative" ) {
                index = this.thread_map.indexOf( this.current_thread ) + ts.thread.index;
            } else if( index < 0 ) {
                index = this.thread_map.length + ts.thread.index;
            }
            index = index >= this.thread_map.length ? this.thread_map.length : index;
            index = index < 0 ? 0 : index;
            thread = this.thread_map[ index ];
        }
        if( typeof ts.position != "undefined" ) {
            position = ts.position < 0 ? this.thread_map.length + ts.position + 1 : ts.position;
        }
    }
    var thread_index = this.thread_map.indexOf( thread );
    if( position ) {
        if( thread_index >= 0 ) {
            this.thread_map.splice( thread_index, 1 );
            position -= 1;
        }
        this.thread_map.splice( position, 0, thread );
    } else if( thread_index < 0 ) {
        this.thread_map.push( thread );
    }
    this.current_thread = thread;
};

NoteQuiz.prototype.print_display_step = function( next_slide_id ) {
    if( !this.quiz_config.slides_transition.display_step ) return;
    this.current_slide.display_step++;
    var txt = this.current_slide.display_step + ".- " + $( next_slide_id + " h1" ).html();
    $( next_slide_id + " h1" ).html( txt );
};

NoteQuiz.prototype.return_to_top = function() {
    var totop = $( this.target ).offset().top;
    if( ( totop ) < $( window ).scrollTop() ) {
        $( "html, body" ).stop().animate( { scrollTop: totop }, 500, 'swing' );
    }
};

NoteQuiz.prototype.show_results = function() {
    this.results_function( this );
};

NoteQuiz.prototype.rewind = function() {
    var self = this;
    this.show_waitmask();
    this.start();
    this.ans_log = [];
    $( this.target + " .results" ).removeClass( "fadeInUp" ).addClass( "hide" );
    $( this.target + " .questionnaire .active" ).removeClass( "active" );
    setTimeout( function() {
        $( self.target + " .questionnaire" ).show();
        $( self.target + " .results" ).hide().removeClass( "hide" );
        self.change_slide( 1 );
    }, 1500 );
};

NoteQuiz.prototype.show_waitmask = function() {
    var mask = $( this.quiz_config.waitmask.html );
    $( this.target ).append( mask );
    mask.attr( "id", "qf-nq-waitmask" );
};

NoteQuiz.prototype.hide_waitmask = function() {
    $( "#qf-nq-waitmask" ).addClass( "waitmask-disappear" );
    setTimeout( function() {
        $( "#qf-nq-waitmask" ).remove();
    }, 750 );
};

NoteQuiz.prototype.show_error = function( error_msg ) {
    //TODO
};

NoteQuiz.prototype.show_nextbtn = function() {
    $( this.target + " .next-btn-wrapper" ).addClass( "shown" );
};

NoteQuiz.prototype.hide_nextbtn = function() {
    $( this.target + " .next-btn-wrapper" ).removeClass( "shown" );
};

NoteQuiz.prototype.show_scrollnav = function() {
    $( this.target + " .scrollnav-wrapper" ).addClass( "shown" );
};

NoteQuiz.prototype.hide_scrollnav = function() {
    $( this.target + " .scrollnav-wrapper" ).removeClass( "shown" );
};

NoteQuiz.prototype.pbar = function() {
    var step = this.current_slide.step;
    var n_steps = this.quiz_data.max_step;
    NoteQuizProgressbar.update( step, n_steps );
};

NoteQuiz.prototype.get_ansdata_btn = function( btn ) {
    var btndata = $( btn ).data();
    return {
        step:           this.current_slide.step,
        thread:         this.current_slide.thread,
        sid:            this.current_slide.sid,
        target:         $( btn ),
        ans:            btndata.ans,
        code:           btndata.code,
        value:          btndata.value,
        ans_id:         btndata.ansid,
        type:           btndata.type,
        to_step:        btndata.tostep,
        thread_setter:  btndata.threadsetter
    };
};

/******************************************************************************/
/*******************************    HELPERS     *******************************/

var NoteQuizHelper = {
    check_images_loading: function( target ) {
        $( target + " .slide" ).each( function() {
            var slide = $( this );
            var slide_images = slide.find( "img" );
            var i = 0;
            $( this ).data( "images_n", slide_images.length );
            var interval = setInterval( function() {
                var loaded = 0;
                slide_images.each( function( k, v ) {
                    if( v.complete ) loaded++;                
                } );
                if( loaded >= slide_images.length ) {
                    clearInterval( interval );
                    slide.data( "images_loaded", true );
                    slide.trigger( "imagesLoaded" );
                }
                i++;
            }, 500 );
        } );      
    },
    get_segment: function() {
        var vars = {};
        var parts = window.location.href.replace( /[?&]+([^=&]+)=([^&]*)/gi, function( m, key, value ) {
            vars[ key ] = value;
        } );
        return vars[ "s" ];
    },
    is_empty: function( obj ) {
        for( var key in obj ) {
            if( obj.hasOwnProperty( key ) )
                return false;
        }
        return true;
    }
};

var NoteQuizProgressbar = {
    bar: null,
    radius: null,
    circunference: null,
    config: {
        display_label: false,
        label_type: "percentage",
        calcfunc_type: "linear"
    },
    init: function( conf ) {
        $.extend( true, this.config, conf );
        this.update( 0 );
    },
    update: function( i, n ) {
        var v = null;
        switch( this.config.calcfunc_type ) {
            case "parabolic":
                v = parseInt( -( 100 * i * i / ( n * n ) ) + 200 * i / n );
                break;
            case "linear":
                v = parseInt(i / n * 100);
                break;
        }
        $('.progress-meter .bar .progress').width( v + "%" );
        $('.progress-meter .bar span').html( v + "%" );
        $('.progress-meter .bar span').css( {"left" : v + "%", "transform": "translate("+ (-v)+ "%, -50%)"} );
    }
};

NoteQuizGlobalGUI = {
    init: function() {
        $( ".notequiz .scrollnav .up-btn" ).off().click( function() {
            var new_pos = $( window ).scrollTop() - 50;
            $( "html, body" ).stop().animate( { scrollTop: new_pos }, 200, 'swing' );            
        } );
        $( ".notequiz .scrollnav .down-btn" ).off().click( function() {
            var new_pos = $( window ).scrollTop() + 50;
            $( "html, body" ).stop().animate( { scrollTop: new_pos }, 200, 'swing' );
        } );
    }
};

/*******************************    /HELPERS     ******************************/
/******************************************************************************/

$( document ).ready( function() {
    NoteQuizGlobalGUI.init();
} );