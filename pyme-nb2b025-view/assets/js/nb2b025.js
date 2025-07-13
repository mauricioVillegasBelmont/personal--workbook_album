function NB2B025(){

  this.machines = {
    vertuo_plus: {
      name: "vertuo_plus",
      capsules: "vertuo_plus_capsules",
      stepsSrc: [
        "/step_1.png",
        "/step_2.png",
        "/step_3.png",
        "/step_4.png",
        "/step_5.png",
        "/step_6.png",
      ],
    },
    vertuo_pop: {
      name: "vertuo_pop",
      capsules: "vertuo_pop_capsules",
      stepsSrc: [
        "/step_1.png",
        "/step_2.png",
        "/step_3.png",
        "/step_4.png",
        "/step_5.png",
        "/step_6.png",
      ],
    },
    essenza: {
      name: "essenza",
      capsules: "multimachine_capsules",
      stepsSrc: [
        "/step_1.png",
        "/step_2.png",
        "/step_3.png",
        "/step_4.png",
        "/step_5.png",
        "/step_6.png",
      ],
    },
    essenzaminiblack: {
      name: "essenzaminiblack",
      capsules: "multimachine_capsules",
      stepsSrc: [
        "/step_1.png",
        "/step_2.png",
        "/step_3.png",
        "/step_4.png",
        "/step_5.png",
        "/step_6.png",
      ],
    },
    inissia: {
      name: "inissia",
      capsules: "multimachine_capsules",
      stepsSrc: [
        "/step_1.png",
        "/step_2.png",
        "/step_3.png",
        "/step_4.png",
        "/step_5.png",
        "/step_6.png",
      ],
    },
    pixie: {
      name: "pixie",
      capsules: "multimachine_capsules",
      stepsSrc: [
        "/step_1.png",
        "/step_2.png",
        "/step_3.png",
        "/step_4.png",
        "/step_5.png",
        "/step_6.png",
      ],
    },
    latissima: {
      name: "latissima",
      capsules: "multimachine_capsules",
      stepsSrc: [
        "/step_1.png",
        "/step_2.png",
        "/step_3.png",
        "/step_4.png",
        "/step_5.png",
        "/step_6.png",
      ],
    },
    citiz: {
      name: "citiz",
      capsules: "multimachine_capsules",
      stepsSrc: [
        "/step_1.png",
        "/step_2.png",
        "/step_3.png",
        "/step_4.png",
        "/step_5.png",
        "/step_6.png",
      ],
    },
    umilk: {
      name: "umilk",
      capsules: "multimachine_capsules",
      stepsSrc: [
        "/step_1.png",
        "/step_2.png",
        "/step_3.png",
        "/step_4.png",
        "/step_5.png",
      ],
    },
  };
  this.user = {
    step: 0,
    machine: "",
    capsule: "",
    capsuleType: "",
    lang: "",
    preparation: 6,
  };
  this.init();
}

NB2B025.prototype.init = function () {
  const step = this.user.step;
  this.setLang();
  this.bind_events();
  $('#step_'+step).show();
};
NB2B025.prototype.bind_events = function () {
  var self = this;
  $('.nxt_step').on('click',function(){
    self.user.step += 1;
    self.nextStep(this);
  });
  $('#main_logo').on('click',function(){
    self.resetSteper();
  });
  $('.bck_step').on('click',function(){
    self.user.step -= 1;
    if (self.user.step <= 0) return self.resetSteper();
    self.changeStep();
  });
  $('input[type=radio][name=lang]').on('change',function(){
    const lang = $(this).val();
    self.setLang(lang);
  });
  $(window).scroll(function(){
    const pageY = $(this).scrollTop();
    self.scrollGui(pageY);
  });
};

NB2B025.prototype.setLang = function (lang = 'es') {
  this.user.lang = lang;
  $("body").removeClass("en es").addClass(lang);
  $("html").attr("lang", lang);
}
NB2B025.prototype.scrollGui = function (pageY = 0) {
  if (pageY < 30) {
    return $("#styky_nav").removeClass("scrolled");
  }
  $("#styky_nav").addClass("scrolled");
};

NB2B025.prototype.resetSteper = function(){
  this.user.step = 0,
  this.setMachineConfig(""),
  this.user.capsule = "",
  this.user.capsuleType = "";
  this.changeStep();
}
NB2B025.prototype.nextStep = function(element){
  const usrSet = $(element).data("usrset")??false;



  if (usrSet == "machine") {
    const value = $(element).val();
    this.setMachineConfig(value);
  }
  if (usrSet == "capsule") {
    this.user.capsule = $(element).val();
    this.user.capsuleType = $(element).data("capsuleType");
    this.setCapsuleSlide();
  }

  this.changeStep();
}
NB2B025.prototype.changeStep = function () {
  var step = this.user.step;
  $("#step_meter").attr('data-step', step);
  $('.step').hide();
  $('#step_'+step).show();
  this.guiManager();
};

NB2B025.prototype.guiManager = function () {
  var step = this.user.step;
  $(".step_cover").hide();
  if (step == 0) {
    $(".step_cover").show();
  }
  if (step == 1 || step == 2 || step == 4) {
    $("#back_btn_wrapper").show();
  } else {
    $("#back_btn_wrapper").hide();
  }

  if (step == 2) {
    this.machineGUI();
  }
  if (step == 4) {
    this.initSlider();
  }
};

NB2B025.prototype.setMachineConfig = function (value = '') {
  if(this.user.machine == value) return;
  this.user.machine = value
  // unset slider
  this.destroySlider();
  if(this.user.machine !== '') {
    // set slider
    const machine = this.user.machine;
    const name = this.machines[machine].name;
    const steps = this.machines[machine].stepsSrc;
    this.setSlider(name, steps);
  }


}
NB2B025.prototype.machineGUI = function () {
  $("#step_2 .capsule_row").hide();
  const value = this.user.machine;
  if (!this.machines.hasOwnProperty(value)) {
    $("#step_2 .capsule_row").show();
  }
  const machine_capsules = this.machines[value].capsules;
  $(`#step_2 .${machine_capsules}`).show();
};

NB2B025.prototype.setCapsuleSlide = function () {
  const capsule = (this.user.capsule).toUpperCase();
  const type = this.user.capsuleType;
  const template = `<img class="es" src="./assets/img/selections/es/${type}/${capsule}.png" alt="selected capsule"><img class="en" src="./assets/img/selections/en/${type}/${capsule}.png" alt="selected capsule">`;

  $('#selected_capsule').empty();
  $('#selected_capsule').append( template );
};

NB2B025.prototype.destroySlider = function () {
  if ($("#preparacion_slider").hasClass("slick-initialized")) {
    $("#preparacion_slider").slick("unslick");
  }
  $("#preparacion_slider").empty();
};
NB2B025.prototype.setSlider = function (name, steps) {
  var _tmpl = '';
  var counter = 1;
  for (const item of steps) {
    _tmpl += `<div class="slider-item">
      <img class="es" src="./assets/img/preparation/es/${name}${item}" alt="${name} step ${counter}" loading="lazy">
      <img class="en" src="./assets/img/preparation/en/${name}${item}" alt="${name} step ${counter}" loading="lazy">
    </div>`;
    counter++;
  }
  this.destroySlider();
  $("#preparacion_slider").append(_tmpl);

};



NB2B025.prototype.initSlider = function () {
  var config = {
    dots: true,
    infinite: false,
  };
  if ( !$("#preparacion_slider").children().length ) return;

  $("#preparacion_slider").slick(config);
}





document.addEventListener("DOMContentLoaded", function (event) {
  const nb2b025_f = new NB2B025();
});
