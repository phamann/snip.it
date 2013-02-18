var Snipit = Snipit || {};
Snipit.list = (function() {
	var el,
		api_url = 'http://8kf6.t.proxylocal.com/api/snippet';

	function init() {
		el = $('<div class="snipit-list"><div class="snipit-logo"><i class="icon-cut"></i> Snip.it bits</div></div>')
			.insertAfter('#Right1');

		fetch();
	}

	function fetch() {
		$.ajax({
			url: api_url,
			dataType: 'json',
			success: function(res) {
				$(res).each(function() {
					console.log(this);
					el.append('<div class="snipit-list-item">' +
						'<div class="content">' + this.content + '</div>'
					+ '</div>');
				});
			}
		})
	}

	return {
		init: init
	}
})();