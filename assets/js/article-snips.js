var Snipit = Snipit || {};
Snipit.articleSnips = (function() {
	var articleUrl = window.location.pathname
		apiUrl = 'http://3kgx.t.proxylocal.com/api/snippet/article' + articleUrl;

	function init() {
		console.log(apiUrl);
		$.ajax({
			url: apiUrl,
			success: function(res) {
				var ref,
					refEl,
					sentenceIndex,
					sentenceReg = /\>span\:eq\((\d)\)/;
				
				$(res).each(function() {
					sentenceIndex = this.reference.match(sentenceReg);
					ref = this.reference.replace(sentenceReg, '').replace('>span', '');
					refEl = $(ref).css({ position: 'relative' });
					if (sentenceIndex[1]) {
						var t = refEl.text().match(/\n|([^\r\n.!?]+([.!?]+|$))/gim);
						// console.log(t);
					}
					
					refEl.prepend('<span class="snipit-count">' + this.totalActions + '</span>');
				});
			}
		});
	};

	return {
		init: init
	};
})();