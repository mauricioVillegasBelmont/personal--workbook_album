function fb_share() {
    var url = window.location.href;
    var share = url;
    FB.ui({
        method: 'share',
        display: 'popup',
        href: share,
    }, function(response){});
}
function twitter_share() {
    var left   = ($(window).width()  - 550)  / 2,
          top    = ($(window).height() - 285) / 2;
    var url = window.location.href;
    var title = encodeURI( $("title").text() );
    console.log(title);
    var share = "https://twitter.com/intent/tweet?text=" + title + "&url=" + url;
    window.open(share, "Twitter", "status=1,height=285,width=550,resizable=1,top=" + top + ",left=" + left);
}
function WA_share() {
    var url = window.location.href;
    var title = encodeURI( $("title").text() );
    var message = title + " - " + url;
    var share;
    if(is_mobile()){
      share = "whatsapp://send?text=" + url;
    }else {
      share = "https://wa.me/send?text=" + message;
    }
    window.open(share);
}
function custom_share(){
    console.log("Custom Share");
}
function add_favorite(a){
    pageTitle=document.title;
    pageURL=document.location;
    try {
        // Internet Explorer solution
        eval("window.external.AddFa-vorite(pageURL, pageTitle)".replace(/-/g,''));
    }
    catch (e) {
        try {
            // Mozilla Firefox solution
            window.sidebar.addPanel(pageTitle, pageURL, "");
        }
        catch (e) {
            // Opera solution
            if (typeof(opera)=="object") {
                a.rel="sidebar";
                a.title=pageTitle;
                a.url=pageURL;
                return true;
            } else {
                // The rest browsers (i.e Chrome, Safari)
                alert('Press ' + (navigator.userAgent.toLowerCase().indexOf('mac') != -1 ? 'Cmd' : 'Ctrl') + '+D to bookmark this page.');
            }
        }
    }
    return false;
}
