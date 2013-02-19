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
		var res = [
			{
				content: 'Police denied leaking the details and Pistorius\'s agent refused to comment.',
				username: 'James Gorrie',
				action: 'twitter',
			},
			{
				content: '"Steenkamp was still breathing and Pistorius tried to resuscitate her in the foyer,"',
				username: 'Smash Hamilton',
				action: 'save',
			},
			{
				content: 'Later, van Zyl confirmed he had cancelled all of the athlete\'s commitments, including a race in the UK, so he could "concentrate on the legal proceedings".',
				username: 'Grimey Gondola',
				action: 'comment',
			}
		];

		$(res).each(function() {
			var actionVerb = this.action.slice(-1) === 'e' ? this.action + 'd' : this.action + 'ed on';



			el.append('<div class="snipit-list-item">' +
				'<div class="action">' +
					'<i class="action-icon icon-' + this.action + '"></i> ' +
					'<b>' + this.username + ' ' + actionVerb + '</b> ' +
					'<div class="content">' +
						'<i class="icon-quote-left"></i> ' + this.content + ' <i class="icon-quote-right"></i>' +
					'</div>' + 
				'</div>' +
			'</div>');
		});



		// $.ajax({
		// 	url: api_url,
		// 	dataType: 'json',
		// 	success: function(res) {
		// 		$(res).each(function() {
		// 			el.append('<div class="snipit-list-item">' +
		// 				'<div class="content">' + this.content + '</div>'
		// 			+ '</div>');
		// 		});
		// 	}
		// });
	}

	return {
		init: init
	}
})();