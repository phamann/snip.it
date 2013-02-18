/*jshint loopfunc:true */
var Snipit = Snipit || {};

Snipit.highlighter = (function() {

    var config = Snipit.config,
        $article = $('#article-wrapper'),
        $paras = $('#article-body-blocks p');

    function init() {
        if(Snipit.config.isWrapped) return;

        var pattern = /\n|([^\r\n.!?]+([.!?]+|$))/gim;

        for(var i = 0, length = $paras.length; i < length; i++) {
          var text = $paras[i].innerHTML,
              sentences = text.match(pattern),
              wrapped = [];
          
            if(sentences && sentences.length) {
                sentences.forEach(function(el){
                    wrapped.push('<span class="snipit-snip">' + el + "</span>");
                });
              
                $paras[i].innerHTML = wrapped.join();
            }
        }

        Snipit.config.isWrapped = true;
    }

    function click(e) {
        e.preventDefault();

        $('.snipit-snip').removeClass('is-active');
        $(this).addClass('is-active');

        Snipit.flyout.open({
            article_link: window.location.toString(),
            article_headline: $('h1[itemprop*="headline"]').text(),
            selected_content: $(e.target).text(),
            reference: $(e.target).getPath()
        }, {
            top: e.pageY,
            left: e.pageX
        });
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