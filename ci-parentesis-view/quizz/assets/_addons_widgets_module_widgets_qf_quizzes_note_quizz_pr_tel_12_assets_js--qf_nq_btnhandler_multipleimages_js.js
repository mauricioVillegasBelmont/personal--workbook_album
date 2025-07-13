NoteQuiz.prototype.init_multipleimages_slide = function() {
    var a = this;
    $(".next-btn").off().click(function() {
        a.multipleimages__nextbtn_handler(this)
    });
    return !0
};
NoteQuiz.prototype.init_buttons_multipleimages = function() {
    var a = this;
    $(".ans-btn-multipleimages").click(function() {
        a.multipleimages__btn_handler(this)
    })
};
NoteQuiz.prototype.multipleimages__btn_stock = {};
NoteQuiz.prototype.multipleimages__btn_handler = function(btn) {

  //Previene click mas en opcion custom (ponere clase disablle)?
  if(this.current_slide.sid == "#notequizslide-2-main"){
    if(this.current_slide.ans.length>0 && this.current_slide.ans[0]["code"]=="noconozco" && $(btn).data("code")!="noconozco"){
      return;
    }else if($(btn).data("code")!="noconozco"){
        $("button[data-code='noconozco']").css("display", "none");
    }else if($(btn).data("code")=="noconozco"){
      $(btn).closest( ".answers" ).toggleClass('disable-all-but-active');
    }
  }
  //END

    var d = this;
    $(btn).off("click");

    if (!this.working) {
        this.working = !0;
        "undefined" == typeof this.multipleimages__btn_stock[this.current_slide.sid] && (this.multipleimages__btn_stock[this.current_slide.sid] = []);
        this.multipleimages__store_ans(btn);
        this.multipleimages__switch_button(btn);
        var b = this.get_current_query_data(),
            f = this.current_slide.ans.length;

            // valores min y max custom//
        var min = ($(btn).data("code")=="noconozco") ? 1 : b.config.restrictions.min;
        var max = ($(btn).data("code")=="noconozco") ? 1 : b.config.restrictions.max;
            // valores min y max custom//      

        f < min ? this.hide_nextbtn() : f > max ? (b = this.multipleimages__btn_stock[this.current_slide.sid][0],
            this.multipleimages__store_ans(b), this.multipleimages__switch_button(b)) : this.show_nextbtn();

          //Por si elimna seleccion previa.
          if(this.current_slide.ans.length==0){
            $("button[data-code='noconozco']").removeAttr("style");
          }
          //END


        this.working = !1;
        $(btn).off().click(function() {
            d.multipleimages__btn_handler(this)
        })
    }
};

NoteQuiz.prototype.multipleimages__store_ans = function(a) {
    var d, b = !1,
        c = this.get_ansdata_btn(a);
    for (d = 0; d < this.current_slide.ans.length; d++) {
        var f = this.current_slide.ans[d].ans;
        if (f == c.ans) {
            b = !0;
            break
        }
    }
    b ? (this.current_slide.ans.splice(d, 1), this.multipleimages__btn_stock[this.current_slide.sid].splice(d, 1)) : (this.current_slide.ans.push(c), this.multipleimages__btn_stock[this.current_slide.sid].push(a))
};
NoteQuiz.prototype.multipleimages__nextbtn_handler = function(a) {
    var d = this;
    $(a).off("click");
    if (!this.working) {
        this.working = !0;
        for (var b = "", c = 0; c < this.current_slide.ans.length; c++)(b = this.current_slide.ans[c].thread_setter) && this.set_thread(b);
        //for (var b = "", c = 0; c < this.current_slide.ans.length; c++)(b = this.current_slide.ans[c].thread_setter+'-'+c) && this.set_thread(b);
        this.hide_nextbtn();
        this.hide_scrollnav();
        this.call_home();
        this.current_slide.ans = [];
        b = this.current_slide.step + 1;
        if (a = $(a).data("tostep"))
            for (a = "results" == a ? this.quiz_data.max_step + 1 : a, c = b; c < a; c++) {
                this.change_slide(b, !1);
                var f = {
                    ans: "skip",
                    code: "skip",
                    value: "skip",
                    ans_id: "skip",
                    type: "skip"
                };
                this.current_slide.ans = [f];
                this.call_home();
                b++
            }
        for (; !this.change_slide(b);) f = {
            ans: "skip",
            code: "skip",
            value: "skip",
            ans_id: "skip",
            type: "skip"
        }, this.current_slide.ans = [f], this.call_home(), b++;
        this.working = !1;
        $(".next-btn").off().click(function() {
            d.nextbtn_handler(this)
        })
    }
};
NoteQuiz.prototype.multipleimages__switch_button = function(a) {
    $(a).data("checked") ? ($(a).removeClass("active"), $(a).data("checked", !1)) : ($(a).addClass("active"), $(a).data("checked", !0))
};
NoteQuiz.prototype.multipleimages__get_trackingdata = function() {
    for (var a, d = "", b = "", c = {}, f = "", g = ["", 0], e = 0; e < this.current_slide.ans.length; e++) a = this.current_slide.ans[e].code, c[a] = "undefined" == typeof c[a] ? 1 : c[a] + 1, c[a] > g[1] && (g = [a, c[a]]), a = e ? " " : "", d += a + this.current_slide.ans[e].code + " o_" + (e + 1) + "_" + this.current_slide.ans[e].code, b += a + this.current_slide.ans[e].ans;
    for (e in c) f += " n_" + c[e] + "_" + e, g[1] == c[e] && g[0] != e && (g[0] = "none");
    d += f + " mr_" + g[0];
    return {
        step: this.current_slide.step,
        thread: this.current_slide.thread,
        ans: b,
        code: d,
        segment: this.segment,
        uid: this.quiz_data.uid
    }
};
NoteQuiz.prototype.init_buttons_function_list.push("init_buttons_multipleimages");
NoteQuiz.prototype.change_slide_function_list[ "multipleimages" ] = "init_multipleimages_slide";