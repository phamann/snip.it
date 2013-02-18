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
		api_url = 'http://8kf6.t.proxylocal.com/api/snippet',
		actions = {
			save: function() {
				var data = getSnipitData();
				data.action = 'save';
				save(data);
			},
			share: function(btn) {
				var data = getSnipitData(),
					network = btn.attr('data-snipit-network');
				data.action = 'share';

				switch(network) {
					case 'twitter' : shareTwitter(data); break;
					case 'facebook' : shareFacebook(data); break;
				}
			},
			comment: function() {
				var data = getSnipitData();
				data.action = 'comment';
			},
			embed: function() {
				var data = getSnipitData();
				data.action = 'embed';
			}
		};

	function init() {
		el = $('<div class="snipit-flyout-container"></div>')
			.css({ display: 'none' })
			.appendTo('body');

		el.on('click', '[data-snipit-action]', function(e) {
			var actionButton = $(this),
				action = actionButton.attr('data-snipit-action');

			console.log('Snipit.flyout.action', action);
			actions[action](actionButton);
		});

		$(document).on('click', function(e) {
			if ($(e.target).parents('.snipit-flyout-container').length === 0) {
				close();
			}
		});
	}

	function save(data) {
		$.ajax({
			url: api_url + '/' + data.action,
			data: JSON.stringify(data),
			type: 'post',
			contentType : 'application/json',
			success: function(res) {
				console.log('Saved', res);
			},
			error: function(a, b, c) {
				console.log(a, b, c);
			}
		});
	}

	function getSnipitData() {
		return  {
			articleID: el.find('.headline a').attr('href').replace('http://www.guardian.co.uk', '').replace(window.location.search, '').replace(window.location.hash, ''),
			content: el.find('.selected-content').html(),
			email: Snipit.id.localUserData().primaryEmailAddress,
			contentType: 'text', // TODO
			reference: el.find('[data-html-reference]').attr('data-html-reference') // TODO
		};
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

	function shareTwitter(data) {
		console.log('Snipit.share twitter', data);
	}

	function shareFacebook(data) {
		console.log('Snipit.share facebook', data);
	}

	function close() {
		console.log('Snipit.flyout.close');
		el.empty().hide();
	}

	return {
		init: init,
		open: open
	};
})();