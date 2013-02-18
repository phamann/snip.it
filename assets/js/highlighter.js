/*jshint loopfunc:true */
var Snipit = Snipit || {};

Snipit.highlighter = (function() {

    var config = Snipit.config,
        $article = $('#article-wrapper');

    function init() {
        if(Snipit.config.isWrapped) return;

        var paras = $('#article-body-blocks p'),
            pattern = /\n|([^\r\n.!?]+([.!?]+|$))/gim;

        for(var i = 0, length = paras.length; i < length; i++) {
          var text = paras[i].innerHTML,
              sentences = text.match(pattern),
              wrapped = [];
          
          sentences.forEach(function(el){
            wrapped.push('<span class="snipit-snip">' + el + "</span>");
          });
          
          paras[i].innerHTML = wrapped.join();
        }

        Snipit.config.isWrapped = true;
    }

    function click(e) {
        e.preventDefault();
        
    }

    //Bind event handlers
    function bind() {
        if(Snipit.config.isActive) return;

        $article.addClass('snipit-is-active');
        $('.snipit-snip').on('click', click);
    }

    function unbind() {
        if(!Snipit.config.isActive) return;

        $article.removeClass('snipit-is-active');
        $('.snipit-snip').off('click', click);
    }

    return {
        init: init,
        bind: bind,
        unbind : unbind
    };
})();