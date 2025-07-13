/* EVENTLOGGER */

function Eventlogger( base_url ) {
  this.base_url = base_url;
  this.sid = "";
  this.satellite = new Satellite( { attemps_limit: 1 } );
  this.init();
}

Eventlogger.prototype.init = function() {
  var self = this;
  $( ".el-click" ).click( function() {
    var n = $( this ).data( "el-e-name" );
    var v = $( this ).data( "el-e-value" );
    var data = {
      n: n, v: v
    };
    var url = self.base_url + "eventlogger/save";
    self.satellite.send_message( data, url, function( response ) { 
      console.log( response );
    } );
  } );
};

/* /EVENTLOGGER */

/* SATELLITE */

function Satellite( config ) {
    this.config = {
        attemps_limit: -1
    };
    this.messenger_stock = {};
    this.dead = false;
    this.c = 0;
    $.extend( true, this.config, config );
}

Satellite.prototype.send_message = function( data, url, callback ) {
    var self = this;
    var messenger_id = "mid_" + this.c++;
    this.messenger_stock[ messenger_id ] = {
        c: 0,
        f: callback
    };
    this.pulse( data, url, 0, messenger_id );
    this.messenger_stock[ messenger_id ].f = setInterval( function() {
        if( typeof self.messenger_stock[ messenger_id ].c != "undefined" ) {
            self.messenger_stock[ messenger_id ].c++;
        }
        self.pulse( data, url, self.messenger_stock[ messenger_id ].c, messenger_id );
    }, 2000 );
};

Satellite.prototype.pulse = function( data, url, c, messenger_id ) {
    if( this.dead ) return;
    var al = this.config.attemps_limit;
    if( al >= 0 && c >= al ) {
        this.kill_messenger( messenger_id );
        return;
    }
    console.log( "pulse", messenger_id );
    var self = this;
    data["c"] = c;
    $.ajax( {
        url: url,
        type: 'post',
        dataType: 'json',
        data: data,
        success: function ( response ) {
            self.messenger_stock[ messenger_id ].f( response );
        }
    } );
};

Satellite.prototype.kill_messenger = function( mid ) {
    if( !( mid in this.messenger_stock ) ) return;
    if( typeof this.messenger_stock[mid].f != "undefined" ) {
        clearInterval( this.messenger_stock[mid].f );
        this.messenger_stock[mid].f = false;
    }
};

Satellite.prototype.suicide = function() {
    this.dead = true;
    for( mid in this.messenger_stock ) {
        this.kill_messenger( mid );
    }
};

/* /SATELLITE */
