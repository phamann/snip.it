//Global
var Snipit = Snipit || {};

Snipit.config = {
    isActive: false,
    isWrapped: false
};

Snipit.init = function() {
    Snipit.showCta();
    Snipit.highlighter.init();
	Snipit.flyout.init();
};

Snipit.showCta = function() {
    var tpl = '<li class="full-line snipit-cta"><button class="snipit-cta-btn">Snipit</button></li>';
    $('#article-toolbox-side').prepend(tpl);

    $('.snipit-cta-btn').on('click', function(e) {
        e.preventDefault();

        if(!Snipit.config.isWrapped) {
            Snipit.highlighter.init();
        }

        if(Snipit.config.isActive) {
            Snipit.highlighter.unbind();
            Snipit.config.isActive = false;
        } else {
            Snipit.highlighter.bind();
            Snipit.config.isActive = true;
        }
    });
};

//Kick it all of on domready
$(document).ready(function() {
    var isArticle = ($('#article-wrapper').length > 0);
    if(isArticle) {
        Snipit.init();
    }
});
