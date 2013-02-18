//Global
var Snipit = Snipit || {};

Snipit.config = {
    isActive: false,
    isWrapped: false
};

Snipit.init = function() {
    Snipit.setIdSdk();
    Snipit.cta.show();
	Snipit.flyout.init();
};

Snipit.cta = {
    show: function() {
        var tpl = '<li class="full-line snipit-cta">';
            tpl += '<button class="snipit-cta-btn">';
            tpl += '<i class="icon-cut"></i>Snipit</button></li>';

        //Massive hack, have to wait until share buttons have loaded :(
        window.setTimeout(function() {
            $('.undocked-share.share-links').prepend(tpl);
            Snipit.cta.bind();
        }, 1000);
    },
    bind: function() {
        $('.snipit-cta-btn').on('click', function(e) {
            e.preventDefault();

            // ID
            if (!Snipit.id.localUserData()) {
                Snipit.id.showLoginIfNotLoggedIn();
                return;
            }

            if(!Snipit.config.isWrapped) {
                Snipit.highlighter.init();
            }

            if(Snipit.config.isActive) {
                $(this).removeClass('is-active');
                Snipit.highlighter.unbind();
                Snipit.config.isActive = false;
            } else {
                $(this).addClass('is-active');
                Snipit.highlighter.bind();
                Snipit.config.isActive = true;
            }
        });
    }
};


//Kick it all of on domready
$(document).ready(function() {
    var isArticle = ($('#article-wrapper').length > 0);
    if(isArticle) {
        Snipit.init();
    }
});
