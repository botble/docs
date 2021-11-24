function Docs() {
    this.init();
    this.pjax();
}

/**
 * Initialize.
 */
Docs.prototype.init = function () {
    this.toc = $('.docs-toc');
    this.content = $('.docs-content');

    this.navbar();
    this.elements();
    this.anchorTags();
    this.activePage();
};

/**
 * Handle docsearch click.
 *
 * @param {Object} e
 * @param {String} url
 */
Docs.prototype.handleClick = function (e, url) {
    url = url.replace('#pjax-container', '');
    // url = url.replace('.com', '.app');

    var link = $('<a>', {href: url})[0];

    // Reload if not the same protocol and host.
    if (location.protocol !== link.protocol || location.hostname !== link.hostname ||
        (link.href.indexOf('#') > -1 && stripHash(link) == stripHash(location))) {
        location.href = link.href;
    }

    $.pjax.click($.Event('click', {currentTarget: link}), '#pjax-container');
}

function stripHash(location) {
    return location.href.replace(/#.*/, '');
}

/**
 * Initialize pjax.
 */
Docs.prototype.pjax = function () {
    var doc = $(document), _this = this;

    doc.pjax('a', '#pjax-container');

    doc.on('pjax:success', function (e, data, status, xhr, options) {
        _this.init();
        _this.scrollTo();
        Prism.highlightAll();
    });
};

/**
 * Scroll to the element referenced by the URL anchor.
 */
Docs.prototype.scrollTo = function () {
    var scrollTo = 0;
    var hash = location.hash;

    if (hash) {
        var name = decodeURIComponent(hash.slice(1))
        var target = document.getElementById(name) || document.getElementsByName(name)[0]

        if (target) {
            scrollTo = $(target).offset().top;
        }
    }

    if (typeof scrollTo == 'number') {
        $(window).scrollTop(scrollTo - 12);
    }
}

/**
 * Initialize elements: tables, images, iframes, callouts.
 */
Docs.prototype.elements = function () {
    // Tables.
    this.content.find('table').addClass('table table-striped table-bordered table-hover table-condensed');

    // Images.
    this.content.find('img').addClass('img-responsive img-thumbnail');

    // Iframes.
    this.content.find('iframe').each(function () {
        $(this).wrap('<div class="embed-responsive embed-responsive-16by9"></div>')
            .addClass('embed-responsive-item');
    });

    // Callouts.
    this.content.find('blockquote:contains({attention})').addClass('callout callout-danger');
    if (this.content.find('blockquote:contains({attention})').length > 0) {
        $.each(this.content.find('blockquote:contains({attention})'), function (index, item) {
            $(item).html($(item).html().replace('{attention}', ''));
        });
    }
    this.content.find('blockquote:contains(danger)').addClass('callout callout-danger');
    if (this.content.find('blockquote:contains({danger})').length > 0) {
        $.each(this.content.find('blockquote:contains({danger})'), function (index, item) {
            $(item).html($(item).html().replace('{danger}', ''));
        });
    }

    this.content.find('blockquote:contains({warning})').addClass('callout callout-warning');
    if (this.content.find('blockquote:contains({warning})').length > 0) {
        $.each(this.content.find('blockquote:contains({warning})'), function (index, item) {
            $(item).html($(item).html().replace('{warning}', ''));
        });
    }
    this.content.find('blockquote:contains({notice})').addClass('callout callout-warning');
    if (this.content.find('blockquote:contains({notice})').length > 0) {
        $.each(this.content.find('blockquote:contains({notice})'), function (index, item) {
            $(item).html($(item).html().replace('{notice}', ''));
        });
    }

    this.content.find('blockquote:contains({info})').addClass('callout callout-info');
    if (this.content.find('blockquote:contains({info})').length > 0) {
        $.each(this.content.find('blockquote:contains({info})'), function (index, item) {
            $(item).html($(item).html().replace('{info}', ''));
        });
    }
    this.content.find('blockquote:contains({note})').addClass('callout callout-info');
    if (this.content.find('blockquote:contains({note})').length > 0) {
        $.each(this.content.find('blockquote:contains({note})'), function (index, item) {
            $(item).html($(item).html().replace('{note}', ''));
        });
    }

    this.content.find('blockquote:contains({hint})').addClass('callout callout-success');
    if (this.content.find('blockquote:contains({hint})').length > 0) {
        $.each(this.content.find('blockquote:contains({hint})'), function (index, item) {
            $(item).html($(item).html().replace('{hint}', ''));
        });
    }

    this.content.find('blockquote:contains({tip})').addClass('callout callout-success');
    if (this.content.find('blockquote:contains({tip})').length > 0) {
        $.each(this.content.find('blockquote:contains({tip})'), function (index, item) {
            $(item).html($(item).html().replace('{tip}', ''));
        });
    }

    this.content.find('blockquote:contains({video})').addClass('video-wrapper');
    if (this.content.find('blockquote:contains({video})').length > 0) {
        $.each(this.content.find('blockquote:contains({video})'), function (index, item) {
            $(item).html($(item).html().replace('{video}', ''));
            let mainElement = $(item).find('a');
            mainElement.html('<img src="https://img.youtube.com/vi/' + mainElement.text().replace('https://www.youtube.com/watch?v=', '') + '/maxresdefault.jpg" class="img-responsive img-thumbnail" alt="' + mainElement.text() + '" />' +
                '<span class="video-button"><i class="glyphicon glyphicon-play"></i></span>'
            );
            mainElement.prop('target', '_blank');
        });
    }
};

/**
 * Set the active page.
 */
Docs.prototype.activePage = function () {
    this.toc.find('a[href$="/' + this.toc.data('current-page') + '"]').parent().addClass('active');
};

/**
 * Create anchor tags on header spans within documentation.
 */
Docs.prototype.anchorTags = function () {
    this.content.find('h2, h3, h4, h5, h6').each(function () {
        // Ignore header spans within blockquotes.
        if ($(this).parent().get(0).tagName !== 'BLOCKQUOTE') {
            var anchor = $(this).text().toLowerCase().trim(),
                hyphenNeedle = [/ /g],
                emptyNeedle = [/\[/g, /\]/g, /\(/g, /\)/g, /\:/g];

            hyphenNeedle.forEach(function (word) {
                anchor = anchor.replace(word, '-');
            });

            emptyNeedle.forEach(function (word) {
                anchor = anchor.replace(word, '');
            });

            anchor = anchor.replace(/\./g, '');

            $(this).append(' <a class="header-anchor" id="' + anchor + '" href="#' + anchor + '"></a>');
        }
    });
}

/**
 * Clone toc to navbar.
 */
Docs.prototype.navbar = function () {
    var nav = $(this.toc.html());

    $('.docs-nav-toc').replaceWith(nav);

    nav.addClass('nav navbar-nav docs-nav-toc');

    nav.find('>li').each(function () {
        var li = $(this),
            header = li.find('p');

        if (header.length) {
            li.addClass('dropdown');
            li.find('ul').addClass('dropdown-menu');

            header.replaceWith(
                '<a href="#" class="dropdown-toggle" data-toggle="dropdown">' + header.html() +
                ' <span class="caret"></span></a>'
            );
        } else {
            li.find('ul>li').each(function () {
                li.after($(this));
            });

            li.remove();
        }
    });
};

new Docs();
