var timeoutID;
var time = 1500;

var ScrolTimeout;
var ScrollTimer = 1500;

var scroller = document.getElementById('ponentes');
var scrolling = scroller.scrollHeight - scroller.clientHeight;
var elements = document.querySelector('#ponentes .rail>div').childElementCount;

/*
function scrollAdd(){
    var add = scrolling/elements;
    var newlimit = scroller.scrollTop+add;
    if(newlimit<=scrolling){
        scroller.scrollIntoView({top:0,  behaviour: 'smooth'});
    }else{
        scroller..scrollIntoView({top:0,  behaviour: 'smooth'});
    }
}*/
function scrollAdd(){
    var add = scrolling/elements;
    var limit = scroller.scrollTop+add;
    if(limit<=scrolling){
        scroller.scrollTop += add;
       
    }else{
        scroller.scrollTop =0;
    }
    scrollAddEachTime();
}


function scrollAddEachTime(){
    ScrolTimeout = window.setTimeout(scrollAdd, ScrollTimer);
}

/*---------------------------------------------------------------------*/
/*-------------------------------clear All----------------------------*/
/*---------------------------------------------------------------------*/
function clearAllInactive(){
    window.removeEventListener("DOMMouseScroll", resetTimer, false);
    window.removeEventListener("MSPointerMove", resetTimer, false);
    window.removeEventListener("mousewheel", resetTimer, false);
    window.removeEventListener("mousemove", resetTimer, false);
    window.removeEventListener("mousedown", resetTimer, false);
    window.removeEventListener("touchmove", resetTimer, false);
    window.removeEventListener("keypress", resetTimer, false);
    window.clearTimeout(timeoutID);
    window.clearTimeout(ScrolTimeout);
}

/*---------------------------------------------------------------------*/
/*-------------------------------star timer----------------------------*/
/*---------------------------------------------------------------------*/
function inactiveMode() {
    window.addEventListener("DOMMouseScroll", resetTimer, false);
    window.addEventListener("MSPointerMove", resetTimer, false);
    window.addEventListener("mousewheel", resetTimer, false);
    window.addEventListener("mousemove", resetTimer, false);
    window.addEventListener("mousedown", resetTimer, false);
    window.addEventListener("touchmove", resetTimer, false);
    window.addEventListener("keypress", resetTimer, false);
    startTimer();
}

/*---------------------------------------------------------------------*/
/*-------------------------------star timer----------------------------*/
/*---------------------------------------------------------------------*/
function startTimer() {
    timeoutID = window.setTimeout(goInactive, time);
}
function resetTimer(e) {
    window.clearTimeout(timeoutID);
    window.clearTimeout(ScrolTimeout);
    goActive();
}


/*---------------------------------------------------------------------*/
/*------------------toggle active/innactive----------------------------*/ 
/*---------------------------------------------------------------------*/
function goInactive() {
    scrollAddEachTime();
}

function goActive() {
    //console.log('is active');
    startTimer();
}
