$( document ).ready(function() {
    init_listeners();
    responsiveBehaviors();
    $('#infographic #samsung').show('slow');
    $('#infographic #q-led').show('slow');
});
$(window).resize(function() {
    //tvAspectRatio();
    responsiveBehaviors();
});

function init_listeners() {
    $('#infographic .controllers .btn').click(function() {
        $('#infographic .controllers button').removeClass('current');
        $('#infographic .marco img').removeClass('current');
        $(this).addClass('current');
        var info_target = '#' + $(this).attr('target') + '-info';
        var img_target = '#' + $(this).attr('target') + '-img';
        $('#infographic .contents .content').hide();
        $(info_target).show();
        $(img_target).addClass('current');
        if (info_target === '#q-picture-info') {
            var svg = info_target + ' svg';
            screenColor(svg, img_target);
        }
    });
    $('#colorGraphic').click(function() {
        $(this).addClass('disabled');
        if ($(this).hasClass('infogr-full')) {
            decreaseCounter();
            $(this).removeClass('infogr-full');
        } else {
            increseCounter();
            $(this).addClass('infogr-full');
        }
    });
}

var colorStatus = 70;
var colorFT = true;

function screenColor(svg, img) {
    window.setTimeout(function() {
        if (colorFT === true || colorStatus < 100) {
            $(svg).addClass('infogr-full');
            increseCounter();
            colorFT = false;
        }
    }, 2000);
    // window.setTimeout(function(){
    //   $(img).addClass('active');
    // }, 4000);
}

function increseCounter() {
    var t = 3000;
    var mi = 70;
    var timer = Math.floor(t / (100 - 70));
    var inc = 1;
    var limit = 30;
    for (let i = 0; i < limit; i++) {
        (function() {
            window.setTimeout(function() {
                var value = mi + (inc * (i + 1));
                $('#colorPercentage').html(value)
                $('#q-picture-img').css({
                    WebkitFilter: 'saturate(' + value / 100 + ') brightness(' + value + '%)',
                })
                if (i >= limit - 1) {
                    $('#colorGraphic').removeClass('disabled');
                    colorStatus = 100;
                }
            }, timer * i);
        })();
    }
}

function decreaseCounter() {
    var t = 3000;
    var mi = 100;
    var timer = Math.floor(t / (100 - 70));
    var inc = 1;
    var limit = 30;
    for (let i = 0; i < limit; i++) {
        (function() {
            window.setTimeout(function() {
                var value = mi - (inc * (i + 1));
                $('#colorPercentage').html(value)
                $('#q-picture-img').css({
                    WebkitFilter: 'saturate(' + value / 100 + ') brightness(' + value + '%)',
                })
                if (i >= limit - 1) {
                    $('#colorGraphic').removeClass('disabled');
                    colorStatus = 70;
                }
            }, timer * i);
        })();
    }

}

function responsiveBehaviors() {
    // margen automatico de los logos
    if ($('#infographic').width() >= 500) {
        $('#q-led').addClass('ml-auto');
    } else {
        $('#q-led').removeClass('ml-auto');
    }
    //square buttons heights;
    $('#infographic .controllers button').height($('#infographic .controllers button').width());
    // tv - aspect ratio 16:9
    $('#infographic .marco .content').height(Math.floor(($('#infographic .marco').width() * 9) / 16));
    // medida minima de cintenedor de la informacion principal
    $('.contents').css('min-height', Math.floor(($('#infographic .marco').width() * 9) / 12));
}

// inactive functions
var timeoutID;
var buttonAction = 'rubberBand';



function innactiveDetectionSetup() {
    this.addEventListener("mousemove", resetInactiveDetectionTimer, false);
    this.addEventListener("mousedown", resetInactiveDetectionTimer, false);
    this.addEventListener("keypress", resetInactiveDetectionTimer, false);
    this.addEventListener("DOMMouseScroll", resetInactiveDetectionTimer, false);
    this.addEventListener("mousewheel", resetInactiveDetectionTimer, false);
    this.addEventListener("touchmove", resetInactiveDetectionTimer, false);
    this.addEventListener("MSPointerMove", resetInactiveDetectionTimer, false);

    startInactiveDetectionTimer();
}
innactiveDetectionSetup();

function startInactiveDetectionTimer() {
    // wait 10 seconds before calling goInactive
    timeoutID = window.setTimeout(goInactive, 10000);
}

function resetInactiveDetectionTimer(e) {
    window.clearTimeout(timeoutID);
    goActive();
}

function goInactive() {
    $('#infographic .controllers button.btn').addClass(buttonAction);
    window.setTimeout(removeButtonGesture, 5000);
}

function goActive() {
    startInactiveDetectionTimer();
}

function removeButtonGesture() {
    $('#infographic .controllers button.btn').removeClass(buttonAction);
    resetInactiveDetectionTimer();
}
