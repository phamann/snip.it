/*
 * To use do something like the follwing:
 	Snipit.flyout.open({
		article_link: 'http://www.guardian.co.uk/artanddesign/interactive/2013/feb/01/view-from-top-shard-london-interactive',
		article_headline: 'The view from the top of the Shard: London panorama of sights and sounds – interactive',
		selected_content: 'Read Antony Gormley, Tony Benn, Diana Athill and other famous Londoners on their favourite places'
	}, { top: 20, left: 50 });
 * 
 */
var Snipit = Snipit || {};
Snipit.flyout = (function() {
	function init() {
		console.log('Snipit.flyout.init');
	}

	function open(content, position) {
		console.log('Snipit.flyout.open');
		var url = chrome.extension.getURL('flyout.html'),
			contentBit,
			snipitBox;

		$.get(url)
			.then(function(html) {
				for (var i in content) {
					contentBit = content[i];
					html = html.replace('{{ ' + i + ' }}', contentBit);
				}

				snipitBox = $(html);
				snipitBox.css({ top: position.top, left: position.left });
				$('body').append(snipitBox);

				// TODO this definitely shoudn't be done like this
				snipitBox.on('click', '[data-snipit-action]', function() {
					var el = $(this),
						action = el.attr('data-snipit-action');

					console.log(action);
				});
			});
	}

	return {
		init: init,
		open: open
	};
})();