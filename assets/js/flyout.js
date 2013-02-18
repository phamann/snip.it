var snipit = snipit || {};
snipit.flyout = (function() {
	function open(content) {
		var url = chrome.extension.getURL('flyout.html'),
			content_bit;

		$.get(url)
			.then(function(html) {
				for (var i in content) {
					content_bit = content[i];
					html = html.replace('{{ ' + i + ' }}', content_bit);
				}

				$('body').append(html);
			});
	}

	return {
		open: open
	}
})();