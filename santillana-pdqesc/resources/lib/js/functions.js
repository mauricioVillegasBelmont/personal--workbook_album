var videoDisplayed=false, menuStarted = false, menulenght /*,getHIndex = Reveal.getIndices()*/;
//getHIndex.h;
function imgsvgRemplacer(){
    jQuery('img.svg').each(function(){
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');
        jQuery.get(imgURL, function(data) {
            var $svg = jQuery(data).find('svg');
            if(typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            if(typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass+' replaced-svg');
            }
            $svg = $svg.removeAttr('xmlns:a');
            if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }
            $img.replaceWith($svg);
        }, 'xml');
    });
};

function init() {
	menulenght = $('.menuContainer').length;
	var w = window.innerWidth,
	h = window.innerHeight,
	a = 360/menulenght,
	d = Math.floor((h*0.8)),
	r = d/2,
	k = d/3,
	c = d*Math.tan(3.14159265359/menulenght);
	$('section.circle').css({
		//'width'  : 'calc(100% - '+r/2+'px)'
		'width'  : 'calc(100% - '+r+'px)'
	});
	$('#fit').css({
		'top'    : Math.floor((h*0.8)/8),
		'right'	 : '10%',
		'width'  : d,
		'height' : d
	});
	$('#borde').css({
		'background-image'   : 'url(resources/lib/img/p_a.svg)'
	});
	$('.menuContainer').css({
		'width'	:	Math.floor( h*0.4),
		'height':	c*0.5,
		'top'	:	'calc(50% -  '+Math.floor(c*0.25)+'px',
		'left'	:	'calc(50% -  '+Math.floor( h*0.4)+'px'
	});
	$('.menuButton').css({
		'width'	:	c*0.7,
		'height':	c*0.7
	});
	var menuButton = $('.menuButton');
	for(var i = 0;i <= menuButton.length-1; i++){
	(function () {
		var index = i+1;
		menuButton[i].addEventListener('click',function(){ 
			menu_slide(index)
			
		},false);
	}())
	}
	
	var colors = ['#225588','#5185af', '#9d9c9b', '#225588', '#6eb1bb', '#83a634', '#5185af','#6eb1bb'];
	var styles ='';
	for(var i = 0; i <= menulenght-1; i++){
		styles += '.menuContainer:nth-child('+(i+1)+') .p {fill:'+colors[i]+';} .menuContainer:nth-child('+(i+1)+')  .menuButton{background-color:'+colors[i]+';} '
	}
	var newStyle = $('<style></style>').text(styles);
	$("head").append(newStyle);
	
	
	
	/*var sections = $('.fase');
	for(var i=0;i <= sections.length*-1;i++){
		var subsections = $(sections[i]);
		console.log();
	}*/
}

function videoStart(){
	$('#starter').css({
		'opacity':'0'
	});
	$('#starterVideo').stop();
	setTimeout(function(){
		$('#starter').css({
			'display':'none'
		});
		videoDisplayed = true;
	}, 1500);
}

function firstStart(){
	
}

function menuStart(){
	if(!$('#fit').hasClass('active')){
		$('#fit').addClass('active');
		var menuContainer = $('.menuContainer'),
		menuContainerInner = $('.menuContainer .inner'),
		a = 360/menulenght, aS=a/2;
		$('#elementsContainer').css({
			'-webkit-transform' : 'rotate(' +aS + 'deg)',
  			'transform'         : 'rotate(' +aS + 'deg)'
		});
		for(var i = 0; i <=  menuContainer.length-1; i++){
			var deg = a*(i+1);
			menuContainer[i].setAttribute('style', menuContainer[i].getAttribute('style')+'; -webkit-transform: rotate('+deg+'deg); transform: rotate('+deg+'deg);');
			menuContainerInner[i].setAttribute('style', '-webkit-transform: rotate('+(deg+20)*(-1)+'deg); transform: rotate('+(deg+20)*(-1)+'deg);');
		}
		menuStarted = true;
		Reveal.configure({ keyboard: true });
	}else{
		console.log('si-contiene');
	}
	$('#d00v01_01').css({
		'left': '2%'
	});
}

function returnToBeggin(){
	videoDisplayed = false;
	menuStarted = false;
	$('#fit').removeClass('active');
	$('#starterVideo').get(0).play();
	$('#starter').css({
		'display':'block',
		'opacity':'1'
	});
	Reveal.slide(0);
}

function starterSlide(){
	Reveal.slide(0);
	//videoDisplayed=false;
	menuStarted = false;
}

function menu_slide(index){
	var w = window.innerWidth,
	h = window.innerHeight,
	a = 360/menulenght,
	d = Math.floor((h*0.8)),
	k = d/2;
	if(index != undefined){
	    var m = index;
		Reveal.slide(index);
	}else{
		var getHIndex = Reveal.getIndices();
		var m = getHIndex.h;
	}
	
	var constant = 135;
	var menuContainer = $('.menuContainer'),
	menuContainerInner = $('.menuContainer .inner'),
	a = 360/menulenght, aS=a/2;
	var elementsContainerDeg = (a*m)*(-1);
	var buttonInnerDeg = (a-45)*m ;
	
	if(m === 0 || m >= menuContainer.length+1){
		$('#borde').css({
			'background-image'   : 'url(resources/lib/img/p_a.svg)'
		});
		$('#fit').css({
			'top'    : Math.floor((h*0.8)/8),
			'right': '10%'
		});
		var menuContainer = $('.menuContainer'),
		menuContainerInner = $('.menuContainer .inner'),
		a = 360/menulenght, aS=a/2;
		$('#elementsContainer').css({
			'-webkit-transform' : 'rotate(' +aS + 'deg)',
  			'transform'         : 'rotate(' +aS + 'deg)'
		});
		for(var i = 0; i <=  menuContainer.length-1; i++){
			var deg = a*(i+1);
			menuContainer[i].setAttribute('style', menuContainer[i].getAttribute('style')+'; -webkit-transform: rotate('+deg+'deg); transform: rotate('+deg+'deg);');
			menuContainerInner[i].setAttribute('style', '-webkit-transform: rotate('+(deg+20)*(-1)+'deg); transform: rotate('+(deg+20)*(-1)+'deg);');
		}
		$('#fit').removeClass('menuScale');
		menuStarted = true;
		Reveal.configure({ keyboard: true }); 
		if(m >= menuContainer.length+1){
		    $('#fit').css({
				'opacity':'0',
				'pointer-events' : 'none'
			});
		}else{
			$('#fit').css({
				'opacity':'1',
				'pointer-events': 'auto'
			});
		}
	}else{
		$('#fit').addClass('menuScale')
		$('#fit').css({
			'top'    : Math.floor((h*0.8)/2),
			'right': '-'+k+'px',
			'opacity':'1',
			'pointer-events': 'auto'
		});
		$('#borde').css({
			'background-image'   : 'url(resources/lib/img/p_b.svg)'
		});
	   $('#elementsContainer').css({
			'-webkit-transform' : 'rotate(' +elementsContainerDeg + 'deg)',
  			'transform'         : 'rotate(' +elementsContainerDeg + 'deg)'
		});
		$('.menuContainer .inner').css({
			'-webkit-transform' : 'rotate(' +buttonInnerDeg + 'deg)',
  			'transform'         : 'rotate(' +buttonInnerDeg + 'deg)'
		});
	}
	//starterSlide();
}

$('#menu').click(function(){
	menuStart();
});
$('#queesBtn').click(function (){
	videoStart();
	starterSlide();
});


$('#d04v04_01, #d01v01_01, #d04v04_01, #d10v01_01').click(function() {
	Reveal.nextFragment();
});

function d01v01_02Changed(){
	var clase = 'current-fragment';
    if($('#d01v01_02').hasClass(clase) && !$('#d01v01_01').hasClass('foo')){
		$('#d01v01_01').addClass('foo');
	}
	if(!$('#d01v01_02').hasClass(clase) && $('#d01v01_01').hasClass('foo')){
		$('#d01v01_01').removeClass('foo');
	}
}
function d04v04_02Changed() {
	var clase = 'current-fragment';
    if($('#d04v04_02').hasClass(clase) && !$('#d04v04_01').hasClass('foo')){
		$('#d04v04_01').addClass('foo');
	}
	if(!$('#d04v04_02').hasClass(clase) && $('#d04v04_01').hasClass('foo')){
		$('#d04v04_01').removeClass('foo');
	}
};
function d10v01_02(){
	var clase = 'current-fragment';
    if($('#d10v01_02').hasClass(clase) && !$('#d10v01_01').hasClass('foo')){
		$('#d10v01_01').addClass('foo');
	}
	if(!$('#d10v01_02').hasClass(clase) && $('#d10v01_01').hasClass('foo')){
		$('#d10v01_01').removeClass('foo');
	}
}










Reveal.addEventListener( 'slidechanged', function( event ) {
	menu_slide()
} );
Reveal.addEventListener( 'fragmentshown', function( event ) {
	//console.log('elemento');
	d04v04_02Changed();
	d10v01_02();
	d01v01_02Changed();
} );
Reveal.addEventListener( 'fragmenthidden', function( event ) {
	// event.fragment = the fragment DOM element
	d04v04_02Changed();
	d10v01_02();
	d01v01_02Changed();
} );

/*$(window).keypress(function(e){
	var key = e.keyCode ? e.keyCode : e.which;
	console.log('any key '+ key);
	if ( key == 32 || key == 13 || key == 34 || key == 39 || key == 78 || key == 76 || event.which == 39 || key == 46) {
		console.log(event.which);
		if(!videoDisplayed && !menuStarted){
			videoStart();
			Reveal.slide(0);
		}else if(videoDisplayed && !menuStarted){
			menuStart();	
			console.log('asrfdmqnadsgflkhna');
		}
	}
});*/

document.addEventListener("keydown", function(e){
	var key = e.keyCode ? e.keyCode : e.which;
   //console.log('any key '+ key);
	if ( key == 32 || key == 13 || key == 34 || key == 39 || key == 78 || key == 76 || event.which == 39 || key == 46) {
		if(!videoDisplayed && !menuStarted){
			videoStart();
			Reveal.slide(0);
		}else if(videoDisplayed && !menuStarted){
			menuStart();
		}
	}
	
});

$(document).ready(function(){
	//Reveal.slide(0);
	imgsvgRemplacer();
	videoDisplayed = false;
	menuStarted = false;
	init();
});

