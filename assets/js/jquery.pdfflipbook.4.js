(function( $ ) {
 
    function genLinks(el, key) 
    {
        if ((key == 'd3m0' && document.location.href.indexOf('heyzine.com') <= -1)) {
            alert('https://heyzine.com PDF to flipbook API demo');
            return;
        }
        
        var endpoint = 'https://heyzine.com/api1';
        var q = "?k=" + key;
        
        if ($(el).attr('title')!=null) q += '&t=' + $(el).attr('title');
        if ($(el).attr('subtitle')!=null) q += '&s=' + $(el).attr('subtitle');
        if ($(el).attr('showdownload')!=null) q += '&d=1';
        if ($(el).attr('data-rtl')!=null) q += '&rtl=1';
                
        if ($(el).attr('href')!=null) {
            $(el).attr('href', endpoint + q + '&pdf=' + $(el).attr('href'));
        } else {
            $(el).on('click', function() {
                if ($(el).attr('showmodal') != null) {

                    $('#mdlflipbook').remove();
                    $('body').append('<div id="mdlflipbook" class="fp-backdrop" style="display: none;position: fixed;width: 100vw;height: 100vh;top: 0;left: 0;background-color: #ffffffed;transition: 1s ease;z-index: 200000;">' +
                            '<div class="fp-close" style="position: absolute;right: 6vw;top: calc(5vh - 30px);cursor: pointer;opacity: 1;">' +
                            ' <img src="https://heyzine.com/assets/img/icon/close.png" alt="close" /></div>' + 
                            '<div class="fp-content" style="position: absolute; width: 80vw; height: 80vh; left: 10vw; top: 10vh; transition: 0.4s ease;">' +
                            '<iframe src="" allowfullscreen style="width: 100%; height: 100%; border: 1px solid lightgray;"></iframe></div></div>');
                    $('#mdlflipbook iframe').attr('src', endpoint + q + '&pdf=' + $(el).attr('flipbook'));
                    $('#mdlflipbook').show();
                    var cov = $('html').css('overflow');
                    $('html').css('overflow', 'hidden');
                    
                    $('#mdlflipbook .fp-close').on('click', function() {
                        $('#mdlflipbook .fp-content').html('');
                        $('#mdlflipbook').hide();
                        $('html').css('overflow', cov);
                        return false;
                    });
                } else {
                    document.location.href = endpoint + q + '&pdf=' + $(el).attr('flipbook');
                }
            });
        }
    };
    
    function initHz() {
        
        window.addEventListener("message", (event) => {

            var data = event.data;
            if (data.action == 'heyzineFullscreen') {
                if ($('#mdlflipbook .fp-content').length > 0) {
                    if (data.value) {
                        $('#mdlflipbook .fp-content').css({
                            'width': '100vw',
                            'height': '100vh',
                            'left': '0',
                            'top': '0'
                        });
                    } else {
                        $('#mdlflipbook .fp-content').css({
                            'width': '80vw',
                            'height': '80vh',
                            'left': '10vw',
                            'top': '10vh'
                        });
                    }
                    return;
                }
                
                $('iframe').each(function(i, d) {
                    if ($(d).attr('src') == data.target || $('iframe').length == 1) {
                        if (data.value) {
                            $(d).css({
                                width: '100vw',
                                height: '100vh',
                                position: 'fixed',
                                left: '0',
                                top: '0',
                                zIndex: '100000'
                            });
                        } else {
                            $(d).attr('style', '');
                        }
                        return false;
                    }
                });
            }
            
        }, false);        
      
    };
    
    $.pdfFlipbook = function( opts ) {
        initHz();
        $('[flipbook]').each(function(i, d) {
            genLinks(d, opts.key);
        });
    };
    
    $.fn.pdfFlipbook = function( opts ) {
        initHz();
        return $(this).each(function(i, d) {
            genLinks(d, opts.key);
        });
    };    
 
}( jQuery ));

