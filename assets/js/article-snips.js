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
				console.log(res);
				$(res).each(function() {
					sentenceIndex = this.reference.match(sentenceReg);
					ref = this.reference.replace(sentenceReg, '').replace('>span', '');
					refEl = $(ref);
					if (sentenceIndex && sentenceIndex[1]) {
						var t = refEl.text().match(/\n|([^\r\n.!?]+([.!?]+|$))/gim),
							tReplace = t[sentenceIndex[1]];
						
						refEl.html(refEl.html().replace(tReplace, '<span class="snipit-fragment">' + tReplace + '</span>'));
						refEl = refEl.find('.snipit-fragment');
					}
					
					refEl.css({ position: 'relative' }).prepend('<span class="snipit-count"><span class="number">' + this.totalActions + '</span></span>');
				});
			}
		});
	};

	return {
		init: init
	};
})();