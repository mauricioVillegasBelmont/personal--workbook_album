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
    var share = "whatsapp://send?text=" + url;
    window.open(share);
}
