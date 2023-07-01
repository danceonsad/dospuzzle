function toggleDesktop() {
  Cookies.set('makeDesktop', 'yes', { expires: 7, path: '/' });
  jQuery('#viewport').attr('content', 'width=1024, initial-scale=0, maximum-scale=5.0, user-scalable=1');
  getRemoveCookie();
}

var  getRemoveCookie = function(){
         Cookies.set('removeInDesc', 'yes', { expires: 7, path: '/' });
        jQuery('.header-line-red').append('<div><a hrerf="#" class="remCook">Обратно мобильная версия сайта</a></div>');

    if(Cookies.get('removeInDesc')){
        jQuery('.header-line-red').append('<div><a hrerf="#" class="remCook">Обратно мобильная версия сайта</a></div>');
    }

    jQuery('.remCook').on('click',function(){
        Cookies.set('makeMobil', 'yes', { expires: 7, path: '/' });
        jQuery('#viewport').attr('content', 'width=device-width, initial-scale=1');
        jQuery('.remCook').remove();
    });

    if(Cookies.get('makeMobil')){
        jQuery('#viewport').attr('content', 'width=device-width, initial-scale=1');
        jQuery('.remCook').remove();
    }
}
jQuery(function($) {
if(Cookies.get('makeDesktop'))
  jQuery('#viewport').attr('content', 'width=1024, initial-scale=0, maximum-scale=5.0, user-scalable=1');
});