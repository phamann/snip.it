var Snipit = Snipit || {};
Snipit.message = (function() {

    var tpl = '<div class="snipit-msg is-{{ state }}">{{ msg }}</div>',
        $body = $('body');

    /**
     * Show a feedback message to use
     * @param  {Object} config configuration object contatiing message and state keys
     */
    function show(config) {
        var msg = tpl,
            that = this;

        for (var i in config) {
            contentBit = config[i];
            msg = msg.replace('{{ ' + i + ' }}', contentBit);
        }

        $body.append(msg);
        $msg = $('.snipit-msg');

        $msg.css({
            top : window.innerHeight/2 - $msg.height()/2 + 'px',
            left : window.innerWidth/2 - $msg.width()/2 + 'px'
        });

        $msg.show();
        setTimeout(function() {
            $msg.fadeOut(1500, function() {
                $msg.remove();
           });
        }, 1000);
    }

    return {
        show: show
    };
})();