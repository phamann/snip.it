//Global
var Snipit = Snipit || {};

Snipit.init = function() {
    Snipit.showCta();
    Snipit.highlighter.init();
};

Snipit.showCta = function() {
    var tpl = '<li class="full-line snipit"><a clas="snipit-cta">Snip.it</a></li>';
    $('.share-links.floating').append(tpl);
};

//Kick it all of on domready
$(document).ready(function() {
    var isArticle = ($('#article-wrapper').length > 0);
    if(isArticle) {
        Snipit.init();
    }
});


