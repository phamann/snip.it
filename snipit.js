//Global
var Snipit = Snipit || {};

Snipit.init = function() {
    Snipit.showCta();
    Snipit.highlighter.init();
	Snipit.flyout.init();

    Snipit.flyout.open({
		article_link: 'http://www.guardian.co.uk/artanddesign/interactive/2013/feb/01/view-from-top-shard-london-interactive',
		article_headline: 'The view from the top of the Shard: London panorama of sights and sounds – interactive',
		selected_content: 'Read Antony Gormley, Tony Benn, Diana Athill and other famous Londoners on their favourite places'
	}, { top: 20, left: 50 });
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