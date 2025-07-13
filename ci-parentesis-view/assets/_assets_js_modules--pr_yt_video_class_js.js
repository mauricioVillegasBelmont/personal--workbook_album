var videoYTElemets = [];
var videoYTdeferred = $.Deferred();

class VideoYt {
  constructor(index,holder) {
    this.index = index;
    this.state;
    this.element = holder;
    this.parentNote = this.element.closest("section.single-content");
    this.videoId = holder.dataset.id;
    this.videoWidth = this.element.offsetWidth;
    this.videoHeight = this.aspectRatio(this.element.offsetWidth, 64,39);
    this.videoIsPlaying = false;
    this.videoIsFollowing = false;
    this.isStiky = this.element.classList.contains('sticky-yt');
    this.parentNoteOffset;
    this.elementOffset;
    this.videoHolder;
    this.iframe;
    this.closeBtn;
    this.setupElements();
    if( this.isStiky ){
      this.setupStikyElements();
    }
  }

  setupElements(){
    this.element.setAttribute('style','background-image: url(http://img.youtube.com/vi/'+ this.videoId +'/sddefault.jpg)');
    this.videoHolder = document.createElement('div');
    this.videoHolder.classList.add("video-placeholder");
    this.iframe = document.createElement('div');
    this.iframe.id = this.videoId;
    this.videoHolder.appendChild(this.iframe);
    this.element.appendChild(this.videoHolder);
  }
  setupStikyElements(){
    this.closeBtn = document.createElement('span');
    this.closeBtn.classList.add("close-btn");
    this.videoHolder.appendChild(this.closeBtn);
    document.addEventListener('scroll',e => this.stikyfy());
    this.closeBtn.addEventListener("click", e => this.close());
  }
  updateOffset(){
    this.parentNoteOffset = this.getPageTopLeft(this.parentNote);
    this.elementOffset = this.getPageTopLeft(this.element);
  }
  getPageTopLeft(el) {
    var rect = el.getBoundingClientRect();
    var docEl = document.documentElement;
    return {
      left: rect.left + (window.pageXOffset || docEl.scrollLeft || 0),
      top: rect.top + (window.pageYOffset || docEl.scrollTop || 0)
    };
  }

  loadYTVideo(){
    this.iframe = new YT.Player(this.iframe.id , {
      height: this.videoHeight,
      width: this.element.offsetWidth,
      videoId: this.videoId
    });
    this.iframe.addEventListener("onStateChange", e => this.videoStateChange(e));
  }

  videoStateChange(state){
    if(state.data == 1){
      this.videoIsPlaying = true;
      if ( this.isStiky ) {
        this.updateOffset();
      }
    }else {
      this.videoIsPlaying = false;
    }
    this.state = state.data;
    this.yeldYTState();
  }

  aspectRatio(w,w1,h1){
    return w * h1 / w1;
  }

  stikyfy(){
    if(this.videoIsPlaying){
      let stikyOffset = 92;
      let headY = this.elementOffset.top + stikyOffset;
      let noteTop = this.parentNoteOffset.top + stikyOffset;
      let notebottom = this.parentNoteOffset.top + this.parentNote.offsetHeight - stikyOffset;
      if( headY < document.documentElement.scrollTop && ( headY + this.videoHeight ) > document.documentElement.scrollTop && this.videoIsFollowing == false){
        this.videoHolder.classList.add('fixed');
        this.videoIsFollowing = true;
        this.yeldYTState();
      }else if(this.videoHolder.classList.contains('fixed')){
        if( noteTop > document.documentElement.scrollTop || notebottom < document.documentElement.scrollTop ){
          this.videoIsFollowing = false;
          this.close();
        }
      }
    }
  }
  close(){
    this.videoHolder.classList.remove('fixed');
    this.videoIsFollowing = false;
    this.iframe.pauseVideo();
  }
  yeldYTState(){
    ytMasterController(this.index, this.videoIsPlaying, this.videoIsFollowing);
  }
}

var currentYTVPlaying;
var currentYTVFollowing;
function ytMasterController(elementIndex, videoPlayingState, videoFolowingState){
  if(currentYTVPlaying != elementIndex && videoPlayingState){
    if(currentYTVPlaying != undefined){
      videoYTElemets[currentYTVPlaying].iframe.pauseVideo();
    }
    if(videoYTElemets[elementIndex].videoIsPlaying){
      currentYTVPlaying = elementIndex;
    }
  }

  if(currentYTVFollowing != elementIndex && videoFolowingState){
    if(currentYTVFollowing != undefined ){
      videoYTElemets[currentYTVFollowing].close();
    }
    if(videoYTElemets[elementIndex].videoIsFollowing){
      currentYTVFollowing = elementIndex;
    }
  }
}


window.onYouTubeIframeAPIReady = function() {
  videoYTdeferred.resolve(window.YT);
};
$(document).ready(function() {
  videoYTdeferred.done(function(YT) {
    for (var i = 0; i < videoYTElemets.length; i++) {
      videoYTElemets[i].loadYTVideo();
    }
  });
});
