$(document).ready( function() {
    takeover = new ADSGUI_Takeover( "#div-gpt-ad-1535385089281-0", "/307704689/HARMONIA-V2-TAKEOVER-MOBILE-300X400-1" );
    anchorad = new ADSGUI_Anchorad( "#div-gpt-ad-1535385803480-0", "/307704689/HARMONIA-V2-ANCHOR-MOBILE-320X50-1" );
} );

function ADSGUI_newpage( nnid_ ) {
    if( window.isMobile ) {
        ADSGUI_newpage_Mobile( nnid_ );
    } else {
        ADSGUI_newpage_Desktop( nnid_ );
    }
}
function ADSGUI_newpage_Desktop( nnid_ ) {
    var nnid = "#" + nnid_;
    
    var boxbanner_1_D_id = nnid_ + "-boxbanner-1-D";
    var enhancer_1_D_id = nnid_ + "-enhancer-1-D";
    var leaderboard_1_D_id = nnid_ + "-leaderboard-1-D";
    var leaderboard_2_D_id = nnid_ + "-leaderboard-2-D";
    
    var boxbanner_1_D = "<div id='" + boxbanner_1_D_id + "'></div>";
    var enhancer_1_D = "<div id='" + enhancer_1_D_id + "'></div>";
    var leaderboard_1_D = "<div id='" + leaderboard_1_D_id + "'></div>";
    var leaderboard_2_D = "<div id='" + leaderboard_2_D_id + "'></div>";
    
    $( nnid ).find( ".aside-container" ).append( boxbanner_1_D + enhancer_1_D );
    $( nnid ).find( ".adgui-leaderborad-1" ).append( leaderboard_1_D );
    $( nnid ).find( ".adgui-leaderborad-2" ).append( leaderboard_2_D );
    
    googletag.cmd.push(function() {
        var boxbanner_1_D_slot = googletag.defineSlot('/307704689/HARMONIA-V2-BOXBANNER-DESKTOP-300X250-1', [300, 250], boxbanner_1_D_id).addService(googletag.pubads());
        googletag.display( boxbanner_1_D_id );
        googletag.pubads().refresh( [ boxbanner_1_D_slot ] );
        
        var enhancer_1_D_slot = googletag.defineSlot('/307704689/HARMONIA-V2-ENHANCER-DESKTOP-300X600-1', [300, 600], enhancer_1_D_id).addService(googletag.pubads());
        googletag.display( enhancer_1_D_id );
        googletag.pubads().refresh( [ enhancer_1_D_slot ] );
        
        var leaderboard_1_D_slot = googletag.defineSlot('/307704689/HARMONIA-V2-LEADERBOARD-DESKTOP-NOTICIAS-728X90-1', [728, 90], leaderboard_1_D_id).addService(googletag.pubads());
        googletag.display( leaderboard_1_D_id );
        googletag.pubads().refresh( [ leaderboard_1_D_slot ] );
        
        var leaderboard_2_D_slot = googletag.defineSlot('/307704689/HARMONIA-V2-LEADERBOARD-DESKTOP-NOTICIAS-728X90-2', [728, 90], leaderboard_2_D_id).addService(googletag.pubads());
        googletag.display( leaderboard_2_D_id );
        googletag.pubads().refresh( [ leaderboard_2_D_slot ] );
    });
}

function ADSGUI_newpage_Mobile( nnid_ ) {
    var nnid = "#" + nnid_;
    
//    var boxbanner_1_M_id = nnid_ + "-boxbanner-1-D";
    var boxbanner_2_M_id = nnid_ + "-boxbanner-2-D";
    
//    var boxbanner_1_M = "<div id='" + boxbanner_1_M_id + "'></div>";
    var boxbanner_2_M = "<div id='" + boxbanner_2_M_id + "'></div>";
    
//    $( nnid ).find( ".adgui-leaderborad-1" ).append( boxbanner_1_M );
    $( nnid ).find( ".adgui-leaderborad-2" ).append( boxbanner_2_M );
    
    googletag.cmd.push(function() {
//        var boxbanner_1_M_slot = googletag.defineSlot('/307704689/HARMONIA-V2-BOXBANNER-MOBILE-300X250-1', [300, 250], boxbanner_1_M_id).addService(googletag.pubads());
//        googletag.display( boxbanner_1_M_id );
//        googletag.pubads().refresh( [ boxbanner_1_M_slot ] );
        
        var boxbanner_2_M_slot = googletag.defineSlot('/307704689/HARMONIA-V2-BOXBANNER-MOBILE-300X250-2', [300, 250], boxbanner_2_M_id).addService(googletag.pubads());
        googletag.display( boxbanner_2_M_id );
        googletag.pubads().refresh( [ boxbanner_2_M_slot ] );
    });
}

function ADSGUI_Takeover( id, slot ) {
    this.config = { id: id, slot: slot };
    this.takeover = $( id );
    this.display_listener_instance = null;
    this._init();
}
ADSGUI_Takeover.prototype._init = function() {
    if( !this.takeover.length ) {
        console.log( "ADSGUI_Takeover ERROR: " + this.config.id );
        return;
    }
    this.display_listener();
};
ADSGUI_Takeover.prototype.display_listener = function() {
    var self = this;
    this.display_listener_instance = setInterval( function() {
        if( googletag.pubadsReady ) {
            googletag.pubads().addEventListener('impressionViewable', function(event) {
                if ( event.slot.K == self.config.slot ) {
                    self.add_closebtn();
                    self.add_closetimer();
                }
            });
            self.stop_display_listener();
        }
    }, 100 );
};
ADSGUI_Takeover.prototype.stop_display_listener = function() {
    clearInterval( this.display_listener_instance );
};
ADSGUI_Takeover.prototype.add_closebtn = function( strange ) {
    var self = this;
    strange = typeof strange == 'undefined' ? false : strange;
    if( ! strange ) {
        setTimeout( function() {
            self.add_closebtn( true );
        }, 3000);
        return;
    }
    var close_btn = "<button style='" + 
            "position:absolute;top:-16px;right:-16px;width:32px;height:32px;font-size:32px;line-height:32px;background:white;border-radius:16px;border:1px white solid;box-sizing:content-box;" +
            "'><i class='fa fa-times-circle'></i></button>";
    $( close_btn ).click( function() {
        self.close();
    } ).appendTo( this.takeover );
};
ADSGUI_Takeover.prototype.close = function() {
    this.takeover.remove();
};
ADSGUI_Takeover.prototype.add_closetimer = function() {
    var self = this;
    setTimeout( function() {
        self.close();
    }, 10000)
};

function ADSGUI_Anchorad( id, slot ) {
    this.config = { id: id, slot: slot };
    this.anchorad = $( id );
    this.display_listener_instance = null;
    this._init();
}
ADSGUI_Anchorad.prototype._init = function() {
    if( !this.anchorad.length ) {
        console.log( "ADSGUI_Anchorad ERROR: " + this.config.id );
        return;
    }
    this.display_listener();
};
ADSGUI_Anchorad.prototype.display_listener = function() {
    var self = this;
    this.display_listener_instance = setInterval( function() {
        if( googletag.pubadsReady ) {
            googletag.pubads().addEventListener('impressionViewable', function(event) {
                if ( event.slot.K == self.config.slot ) {
                    self.add_closetimer();
                }
            });
            self.stop_display_listener();
        }
    }, 100 );
};
ADSGUI_Anchorad.prototype.stop_display_listener = function() {
    clearInterval( this.display_listener_instance );
};
ADSGUI_Anchorad.prototype.close = function() {
    this.anchorad.remove();
};
ADSGUI_Anchorad.prototype.add_closetimer = function() {
    var self = this;
    setTimeout( function() {
        self.close();
    }, 10000)
};
