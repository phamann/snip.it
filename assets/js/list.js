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
			url: api_url + '/actions',
			dataType: "json",
			success: function (data) {
				console.log('list data', data);
				$(data.slice(0,5)).each(function() {
					var actionVerb = this.action.slice(-1) === 'e' ? this.action + 'd' : this.action + 'ed on';

					$('.snipit-list-content', el).append('<div class="snipit-list-item"' +
						'data-id="' + this.id +'" data-reference="' + this.reference +'">' +
						'<div class="action">' +
							'<i class="action-icon icon-' + this.action + '"></i> ' +
							'<b>' + this.username + ' ' + actionVerb + '</b> ' +
							'<div class="content">' +
								'<a href="' + this.articleID + '?snipit=' + encodeURIComponent(this.reference) +' ">' +
								'<i class="icon-quote-left"></i> ' + this.content + ' <i class="icon-quote-right"></i></a>' +
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
				url: api_url + '/poll',
				success: function (data) {
					// data will be null if polled for a long time without changes
					if (data !== null) {
						$(data).each(function() {
							var actionVerb = this.action.slice(-1) === 'e' ? this.action + 'd' : this.action + 'ed on';
							var that = this;

							$('.snipit-list-item:last-child').remove();

							$('.snipit-list-content', el).prepend('<div class="snipit-list-item fade"' +
								'data-id="' + this.id +'" data-reference="' + this.reference +'">' +
								'<div class="action">' +
									'<i class="action-icon icon-' + this.action + '"></i> ' +
									'<b>' + this.username + ' ' + actionVerb + '</b> ' +
									'<div class="content">' +
										'<a href="' + this.articleID + '?snipit=' + encodeURIComponent(this.reference) +' ">' +
										'<i class="icon-quote-left"></i> ' + this.content + ' <i class="icon-quote-right"></i></a>' +
									'</div>' +
								'</div>' +
							'</div>');

							setTimeout(function() {
								$('[data-id="' + that.id +'"]').removeClass('fade');
							}, 1000);
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