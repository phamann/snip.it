//Global
var Snipit = Snipit || {};

Snipit.config = {
    isActive: false,
    isWrapped: false
};

Snipit.init = function() {
    Snipit.setIdSdk();
    Snipit.cta.show();
	Snipit.flyout.init();
	Snipit.list.init();
};

Snipit.setIdSdk = function() {
    Snipit.id = IDENTITY.guardian_idToolkit;
};

Snipit.cta = {
    show: function() {
        var tpl = '<li class="full-line snipit-cta">';
            tpl += '<button class="snipit-cta-btn">';
            tpl += '<i class="icon-cut"></i>Snipit</button></li>';

        //Massive hack, have to wait until share buttons have loaded :(
        window.setTimeout(function() {
            $('.undocked-share.share-links').prepend(tpl);
            Snipit.cta.bind();
        }, 1000);
    },

    bind: function() {
        $('.snipit-cta-btn').on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            // ID
            if (!Snipit.id.localUserData()) {
                Snipit.id.showLoginIfNotLoggedIn();
                return;
            }

            if(!Snipit.config.isWrapped) {
                Snipit.highlighter.init();
            }

            if(Snipit.config.isActive) {
                $(this).removeClass('is-active');
                Snipit.highlighter.unbind();
                Snipit.config.isActive = false;
            } else {
                $(this).addClass('is-active');
                Snipit.highlighter.bind();
                Snipit.config.isActive = true;
            }
        });
    }
};


//Kick it all of on domready
$(document).ready(function() {
    var isArticle = ($('#article-wrapper').length > 0);
    if(isArticle) {
        Snipit.init();
    }
});

jQuery.fn.getPath = function () {
    if (this.length != 1) throw 'Requires one element.';
    var path, node = this;
    while (node.length) {
        var realNode = node[0], name = realNode.localName;
        if (!name) break;
        name = name.toLowerCase();

        var parent = node.parent();

        var siblings = parent.children(name);
        if (siblings.length > 1) {
            name += ':eq(' + siblings.index(realNode) + ')';
        }

        path = name + (path ? '>' + path : '');
        node = parent;
    }
    return path;
};

jQuery.fn.getUrlVars = function(){
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
    return vars;
};

jQuery.fn.getUrlVar = function(name){
    return $.getUrlVars()[name];
};
