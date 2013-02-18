var snipit = snipit || {};
snipit.flyout = (function() {
	function open(content) {
		console.log(content);
	}

	return {
		open: open
	}
})();