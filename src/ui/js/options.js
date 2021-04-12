! function (e) {
    e.storage.sync.get({
        FncMyELTS: 'FncMyELTSver0',
        subcribeYoutube: !0,
        followInstagram: !0
    }, function (t) {
        new Vue({
            el: "#shawn_savour",
            data: Object.assign({
                loading: !1,
            }, t),
            methods: {
                onSubmit: function () {
                    var o = this;
                    console.log(o);
                    this.loading = !0;
                    var n = {};
                    Object.keys(t).map(function (e) {
                        n[e] = o[e]
                    }), e.storage.sync.set(n, function () {
                        setTimeout(function () {
                            o.loading = !1;
                            console.log("Saved! " + o.subcribeYoutube);
                        }, 300)
                    })
                }
            }
        })
    }), document.body.addEventListener("contextmenu", function (e) {
        return e.preventDefault(), !1
    }), e.runtime.sendMessage({
        cmd: "track_page_view",
        path: "/devtoolstab.html"
    })
}(chrome);