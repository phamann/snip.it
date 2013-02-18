/*
 * To use do something like the follwing:
	Snipit.flyout.open({
		article_link: 'http://www.guardian.co.uk/artanddesign/interactive/2013/feb/01/view-from-top-shard-london-interactive',
		article_headline: 'The view from the top of the Shard: London panorama of sights and sounds interactive',
		selected_content: 'Read Antony Gormley, Tony Benn, Diana Athill and other famous Londoners on their favourite places'
	}, { top: 20, left: 50 });
 *
 */
var Snipit = Snipit || {};
Snipit.flyout = (function() {
	var el,
		actions = {
		save: function() {},
		share: function() {},
		comment: function() {},
		embed: function() {}
	};

	function init() {
		el = $('<div class="snipit-flyout-container"></div>')
			.css({ display: 'none' })
			.appendTo('body');

		el.on('click', '[data-snipit-action]', function(e) {
			var actionButton = $(this),
				action = actionButton.attr('data-snipit-action');

			console.log(action);
			actions[action]();
		});
	}

	function save(data) {

	}

	function close() {
		el.hide();
	}

	function open(content, position) {
		console.log('Snipit.flyout.open');
		var url = chrome.extension.getURL('flyout.html'),
			contentBit,
			snipitBox;

		close();

		$.get(url)
			.then(function(html) {
				for (var i in content) {
					contentBit = content[i];
					html = html.replace('{{ ' + i + ' }}', contentBit);
				}

				snipitBox = $(html);

				el.empty()
					.append(snipitBox)
					.css({ display: 'block', top: position.top, left: position.left });
			});
	}

	return {
		init: init,
		open: open
	};
})();