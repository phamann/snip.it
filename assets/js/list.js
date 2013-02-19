var Snipit = Snipit || {};
Snipit.list = (function() {
	var el,
		api_url = 'http://3kgx.t.proxylocal.com/api/snippet';

	function init() {
		el = $('<div class="snipit-list"><div class="snipit-logo"><i class="icon-cut"></i> Snip.it bits</div><div class="snipit-list-content"></div></div>')
			.insertAfter('#Right1');

		fetch();
	}

	function fetch() {

		$.ajax({
			url: api_url + '/actions' + window.location.pathname,
			dataType: "json",
			success: function (data) {
				console.log('list data', data);
				$(data.slice(0,5)).each(function() {
					var actionVerb = this.action.slice(-1) === 'e' ? this.action + 'd' : this.action + 'ed on';

					$('.snipit-list-content', el).append('<div class="snipit-list-item">' +
						'<div class="action">' +
							'<i class="action-icon icon-' + this.action + '"></i> ' +
							'<b>' + this.username + ' ' + actionVerb + '</b> ' +
							'<div class="content">' +
								'<i class="icon-quote-left"></i> ' + this.content + ' <i class="icon-quote-right"></i>' +
							'</div>' +
						'</div>' +
					'</div>');
				});
			},
			complete: poll
		});
	}

	function poll() {

			$.ajax({
				url: api_url + '/poll' + window.location.pathname,
				success: function (data) {
					// data will be null if polled for a long time without changes
					if (data !== null) {
							$(data).each(function() {
							var actionVerb = this.action.slice(-1) === 'e' ? this.action + 'd' : this.action + 'ed on';

							$('.snipit-content', el).prepend('<div class="snipit-list-item">' +
								'<div class="action">' +
									'<i class="action-icon icon-' + this.action + '"></i> ' +
									'<b>' + this.username + ' ' + actionVerb + '</b> ' +
									'<div class="content">' +
										'<i class="icon-quote-left"></i> ' + this.content + ' <i class="icon-quote-right"></i>' +
									'</div>' +
								'</div>' +
							'</div>');
						});
					}
				},
				dataType: "json",
				complete: poll,
				timeout: 30000
			});
	}

	return {
		init: init
	};
})();