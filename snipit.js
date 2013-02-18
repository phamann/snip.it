SnipIt = {};

SnipIt.init = function() {
    this.showCta();
    this.bind();
};

SnipIt.showCta = function() {
    var tpl = '<li class="full-line snipit"><a clas="snipit-cta">Snip.it</a></li>';
    $('.share-links').append(tpl);
};

SnipIt.bind = function() {

};

$(document).ready(function() {
    var isArticle = ($('#article-wrapper').length > 0);
    if(isArticle) {
        SnipIt.init();
    }
});