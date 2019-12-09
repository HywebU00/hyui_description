jQuery(document).ready(function($) {
    /*-----------------------------------*/
    //////////// nojs 先移除////////////////
    /*-----------------------------------*/
    $('html').removeClass('no-js');
    document.documentElement.addEventListener('gesturestart', function(event) {
        event.preventDefault();
    }, false);
    //load
    $('.left_nav').load('demo_menu.htm');
    $('header').load('demo_header.htm');
    // 上方選單
    _HH = $("header").height();
    // 滿版顯示按鈕
    $('.main').append('<a href="#" class="re_layout"></a>');
    var fluid_status = false;
    // console.log(fluid_status);
    // 手機選單設定
    $('.main>.content').prepend('<div class="float_menu"><a href="#"class="close"></a></div><div class="overlay"></div>'); //新增一個手機選單
    $('.overlay').hide(); // 遮罩
    $('.float_menu').hide();
    var resizeTimer;
    $('.re_layout').off().click(function(e) {
        $('.left_nav').toggle();
        $(this).toggleClass('hidden');
        $('.main >.content').toggleClass('fluid');
        if (!fluid_status) {
            fluid_status = true;
            e.preventDefault();
        } else {
            fluid_status = false;
            e.preventDefault();
        }
        return false;
    });
    $(window).on('resize load', function(e) {
        clearTimeout(resizeTimer);
        var _WH = $(window).width();
        // console.log("螢幕寬度" + _WH);
        // RWD設定
        resizeTimer = setTimeout(function() {
            if (_WH < 992) {
                fluid_status = false;
                $('.re_layout').hide();
                $('.guide_quicklink').hide();
                // $('body').addClass('noscroll');
                $('.main >.content').removeClass('fluid');
                $('.re_layout').removeClass('hidden');
                $('.guide_quicklink').removeClass('hidden');
            } else {
                // 設定
                $('.re_layout').fadeIn();
                var RIGHT_RE = $(window).outerWidth() - ($('.left_nav').outerWidth() + $('.content').outerWidth() + ($('.re_layout').outerWidth() / 2));
                $('.re_layout').css('right', RIGHT_RE);
                $('.guide_quicklink').show();
                $(window).scroll(function() {
                    if ($(this).scrollTop() > 100) { // this refers to window
                        $('.re_layout').css('top', $(this).scrollTop() + "px");
                        $('.guide_quicklink').css('top', $(this).scrollTop() + "px");
                    } else {
                        $('.re_layout').css('top', $(this).scrollTop() + "px");
                        $('.guide_quicklink').css('top', $(this).scrollTop() + "px");
                    }
                });
            }
        }, 50);
        if (_WH < 992) { //手機螢幕才觸發
            // $('body').addClass('noscroll');
            $('body').css('padding-top', _HH); //設定body padding
            $(".left_nav").appendTo(".float_menu");
            $('.left_nav ul ul').hide();
            $('.close').click(function(e) {
                $('.float_menu').hide();
                $('.overlay').hide();
                // When the modal is hidden...
                const scrollY = document.body.style.top;
                document.body.style.position = '';
                document.body.style.top = '';
                window.scrollTo(0, parseInt(scrollY || '0') * -1);
                // $('.left_nav ul ul').hide();
            });
        } else { //pc才觸發
            $('body').css('padding-top', 0);
            $('body').removeClass('noscroll');
            $(".left_nav").prependTo(".main");
            $('.overlay').hide();
            $('.left_nav ul ul').show();
            // $('.left_nav ul ul').hide();
            $('.left_nav .open').html("全部展開");
            $('.left_nav>ul>li>a').removeClass('animated fadeInDown');
        }
    });
    /*-----------------------------------*/
    //////////// notice訊息區塊 ////////////
    /*-----------------------------------*/
    $('[class*="notice"] a.close').click(function(e) {
        $(this).parent('[class*="notice"]').hide();
    });
    /*-----------------------------------*/
    //////////// Accordion設定 ////////////
    /*-----------------------------------*/
    $('.accordion').each(function() {
        $(this).find('.accordion-content').hide();
        var _accordionItem = $(this).children('ul').children('li').children('a');
        _accordionItem.each(function() {
            function accordion(e) {
                $(this).parent('li').siblings().children('a').removeClass('active');
                $(this).toggleClass('active');
                $(this).parent('li').siblings().children('.accordion-content').slideUp();
                $(this).next('.accordion-content').slideToggle();
                e.preventDefault();
            }
            $(this).click(accordion);
            $(this).keyup(accordion);
        });
    });
    /*-----------------------------------*/
    /////////////fatfooter開關/////////////
    /*-----------------------------------*/
    $('.btn-fatfooter').click(function(e) {
        $(this).parent('.container').find('nav>ul>li>ul').stop(true, true).slideToggle(function() {
            if ($(this).is(':visible')) {
                $('.btn-fatfooter').html("收合/CLOSE");
                $('.btn-fatfooter').attr('name', '收合選單/CLOSE');
            } else {
                $('.btn-fatfooter').html("展開/OPEN");
                $('.btn-fatfooter').attr('name', '展開選單/OPEN');
            }
        });
        $(this).stop(true, true).toggleClass('close');
    });
    /*-----------------------------------*/
    //////////////相簿縮圖+燈箱//////////////
    /*-----------------------------------*/
    //縮圖，same as thumbnail模組
    $(window).bind('resize load', function(e) {
        $('.imgOuter').each(function(index, el) {
            var _imgContainer = $(this),
                cWidth = _imgContainer.width(),
                cHeight = _imgContainer.height(),
                ratioC = cWidth / cHeight,
                _img = _imgContainer.find('img');
            var iWidth = $(this).find('img').width(),
                iHeight = $(this).find('img').height(),
                ratioImg = iWidth / iHeight,
                scaleRatio;
            if (ratioC > ratioImg) {
                scaleRatio = cWidth / iWidth;
                _img.width(cWidth).height(iHeight * scaleRatio).css('top', -.5 * (iHeight * scaleRatio - cHeight));
            } else {
                scaleRatio = cHeight / iHeight;
                _img.height(cHeight).width(iWidth * scaleRatio).css('left', -.5 * (iWidth * scaleRatio - cWidth));
            }
            $(this).find('img').removeClass('img-responsive');
        });
    });
    /*-----------------------------------*/
    //////////////相簿縮圖+燈箱//////////////
    /*-----------------------------------*/
    //縮圖，same as thumbnail模組
    $(window).bind('resize load', function(e) {
        $('.imgOuter').each(function(index, el) {
            var _imgContainer = $(this),
                cWidth = _imgContainer.width(),
                cHeight = _imgContainer.height(),
                ratioC = cWidth / cHeight,
                _img = _imgContainer.find('img');
            var iWidth = $(this).find('img').width(),
                iHeight = $(this).find('img').height(),
                ratioImg = iWidth / iHeight,
                scaleRatio;
            if (ratioC > ratioImg) {
                scaleRatio = cWidth / iWidth;
                _img.width(cWidth).height(iHeight * scaleRatio).css('top', -.5 * (iHeight * scaleRatio - cHeight));
            } else {
                scaleRatio = cHeight / iHeight;
                _img.height(cHeight).width(iWidth * scaleRatio).css('left', -.5 * (iWidth * scaleRatio - cWidth));
            }
            $(this).find('img').removeClass('img-responsive');
        });
    });
    //相簿JQ設定
    var lightbox_Status = false;
    $('.gallery').append('<div class="lightbox"><a href="#" class="light_close">關閉</a><a href="#" class="light_prev">上一張</a><a href="#" class="light_next">下一張</a><img src="" alt=""><div class="galler_overlay"></div></div>')
    $('.gallery .lightbox').hide(); // lightbox先隱藏
    $('.light_close').click(function(event) {
        $('.gallery .lightbox').hide(); // 如果點到close，lightbox隱藏
        $('body').removeClass('noscroll');
        $('.gallery .lightbox .caption').html('');
        lightbox_Status = false;
    });
    $('.gallery .lightbox .galler_overlay').click(function(event) {
        $('.gallery .lightbox').hide(); // 如果點到overlay，lightbox隱藏
        $('body').removeClass('noscroll');
        $('.gallery .lightbox .caption').html('');
        lightbox_Status = false;
    });
    var PIC_SRC = $('.gallery .lightbox img').attr('src');
    // var THUMB_PIC = $(this).attr('src');
    var PIC_INDEX = 0;
    $('.gallery a').click(function(e) {
        e.preventDefault();
        lightbox_Status = true;
    });
    $('.gallery .thumbnail img').each(function(index) {
        $(this).click(function(e) {
            var THUMB_H3 = $(this).attr('alt');
            $('body').addClass('noscroll');
            $('.gallery .lightbox').append('<div class="caption">' + THUMB_H3 + '<div>');
            THUMB_PIC = $(this).attr('src');
            $('.gallery .lightbox img').attr('src', THUMB_PIC);
            $('.gallery .lightbox').fadeIn();
            $('.gallery .lightbox .galler_overlay').fadeIn();
            PIC_INDEX = index;
            e.preventDefault();
        });
    });
    //計算當頁縮圖數量
    var PIC_NUM = $('.gallery .thumbnail').length;
    // 下一張 function
    function NEXT_MOV() {
        //pic_index+1 如果小於 圖片數量
        if ((PIC_INDEX + 1) < PIC_NUM) {
            //PIC_INDEX = (PIC_INDEX + 1) % PIC_NUM;//取餘數
            PIC_INDEX++; //pic_index ++
            //if(PIC_INDEX >= PIC_NUM){PIC_INDEX=0;}
        } else {
            PIC_INDEX = 0 //如果等於或大於圖片數量 pic_index =0 ，跳到第一張
        }
        THUMB_PIC = $('.gallery .thumbnail img').eq(PIC_INDEX).attr('src');
        THUMB_H3 = $('.gallery .thumbnail img').eq(PIC_INDEX).attr('alt');
        $('.gallery .lightbox .caption').html(THUMB_H3);
        $('.gallery .lightbox img').hide();
        $('.gallery .lightbox img').fadeIn();
        $('.gallery .lightbox img').attr('src', THUMB_PIC);
        //放入燈箱 img src
    }
    $('.gallery .light_next').click(function(e) {
        NEXT_MOV();
        e.preventDefault();
    });
    // 上一張 function
    function PREV_MOV() {
        if ((PIC_INDEX + 1) > 1) { //pic_index+1  如果大於 1
            //PIC_INDEX = (PIC_INDEX + 1) % PIC_NUM;//取餘數
            PIC_INDEX--; //pic_index --
            //if(PIC_INDEX >= PIC_NUM){PIC_INDEX=0;}
        } else {
            PIC_INDEX = PIC_NUM - 1; //如果等於或小於圖片數量 pic_index =圖片數量-1 ，跳到最後一張
        }
        //取縮圖 img src
        THUMB_PIC = $('.gallery .thumbnail img').eq(PIC_INDEX).attr('src');
        THUMB_H3 = $('.gallery .thumbnail img').eq(PIC_INDEX).attr('alt');
        $('.gallery .lightbox .caption').html(THUMB_H3);
        $('.gallery .lightbox img').hide();
        $('.gallery .lightbox img').fadeIn();
        $('.gallery .lightbox img').attr('src', THUMB_PIC);
        //放入燈箱 img src
    }
    $('.gallery .light_prev').click(function(e) {
        PREV_MOV();
        e.preventDefault();
    });
    //左右按鍵移動
    if (lightbox_Status = true) {
        $('body').keydown(function(e) {
            if (e.keyCode == 37) {
                PREV_MOV();
            } else if (e.keyCode == 39) {
                NEXT_MOV();
            } else if (e.keyCode == 27) {
                $('.gallery .lightbox').hide();
                $('body').removeClass('noscroll');
            }
        });
    }
    /*-----------------------------------*/
    ////////////////多組Tab////////////////
    /*-----------------------------------*/
    $('.tabs').find('.active').next('.tabContent').show();
    var tw = $('.tabSet').width();
    var tabItemHeight = $('.tabs>.tabItem').height();
    $('.tabs').find('.tabContent').css('top', tabItemHeight);

    function tabs() {
        var WindowW = $(window).width();
        $('.tabs').find('.active').next('.tabContent').show();
        var tabItemHeight = $('.tabs>.tabItem').height();
        $('.tabs').find('.tabContent').css('top', tabItemHeight);
        $('.tabSet').each(function() {
            tw = $(this).width();
            var tabItemHeight = $(this).find('.tabs>.tabItem').height();
            $(this).children('.tabs').find('.tabContent').css('top', tabItemHeight);
            var tabContentHeight = $(this).find('.active').next('.tabContent').innerHeight();
            // console.log(tabContentHeight);
            var tabItemLength = $(this).find('.tabItem').length;
            $(this).height(tabContentHeight + tabItemHeight);
            var tabWidth = Math.ceil(tw / tabItemLength);
            $(this).find('.tabItem>a').width(tabWidth);
            if (WindowW >= 768) {
                $(this).find('.tabItem:last').css({
                    position: 'absolute',
                    right: '0',
                });
            } else {
                $(this).find('.tabItem:last').css({
                    position: 'relative',
                    right: '0',
                });
            }
            tabContentHeight = $(this).parent('.tabItem').next('.tabContent').innerHeight();
            // console.log(tabContentHeight);
            $(this).parents('.tabSet').height(tabContentHeight + tabItemHeight);
        });
        $(this).parent('.tabItem').siblings().removeClass('active');
        $(this).parent('.tabItem').addClass('active');
        return false;
    }
    $('.tabs>.tabItem>a').focus(tabs);
    $('.tabs>.tabItem>a').click(tabs);
    $(window).on("load resize", function(e) {
        tabs();
    });
    /*-----------------------------------*/
    ///////////////置頂go to top////////////
    /*-----------------------------------*/
    $(window).bind('scroll', function() {
        if ($(this).scrollTop() > 200) {
            $('.scrollToTop').fadeIn();
        } else {
            $('.scrollToTop').fadeOut();
        }
    });
    /*-----------------------------------*/
    /////Click event to scroll to top//////
    /*-----------------------------------*/
    $('.scrollToTop').click(function(e) {
        $('html, body').animate({ scrollTop: 0 }, 400);
        e.preventDefault();
    });
    // a key map of allowed keys
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        65: 'a',
        66: 'b'
    };
    /*-----------------------------------*/
    /////konami.js//////
    /*-----------------------------------*/
    // the 'official' Konami Code sequence
    var konamiCode = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a'];
    // a variable to remember the 'position' the user has reached so far.
    var konamiCodePosition = 0;
    // add keydown event listener
    document.addEventListener('keydown', function(e) {
        // get the value of the key code from the key map
        var key = allowedKeys[e.keyCode];
        // get the value of the required key from the konami code
        var requiredKey = konamiCode[konamiCodePosition];
        // compare the key with the required key
        if (key == requiredKey) {
            // move to the next key in the konami code sequence
            konamiCodePosition++;
            // if the last key is reached, activate cheats
            if (konamiCodePosition == konamiCode.length) {
                activateCheats();
                konamiCodePosition = 0;
            }
        } else {
            konamiCodePosition = 0;
        }
    });

    function activateCheats() {
        alert("cheats activated");
    }
    /*------------------------------------*/
    //////////分享按鈕 share dropdwon////////
    /*------------------------------------*/
    $('.function_panel .share').children('ul').hide();
    $('.function_panel .share').prepend('<a href="#" class="shareButton">share分享按鈕</a>');
    var _shareButton = $('.shareButton');
    _shareButton.off().click(function(e) {
        $(this).siblings('ul').stop(true, true).slideToggle();
        e.preventDefault();
    });
    _shareButton.keyup(function(event) {
        $(this).siblings('ul').stop(true, true).slideDown();
    });
    $('.function_panel .share').find('li:last>a').focusout(function(event) {
        $(this).parent().parent('ul').hide();
    });
    // 點外面關閉share
    $(document).on('touchend click', function(e) {
        var container = $(".function_panel .share");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            $('.function_panel .share ul').hide();
        }
    });
    /*------------------------------------*/
    /////////////字型大小 font-size//////////
    /*------------------------------------*/
    $('.font_size').find('.medium').addClass('active');
    $('.font_size').find('.small').click(function(e) {
        $(this).parent('li').siblings('li').find('a').removeClass('active');
        $('.cp').removeClass('large_size').addClass('small_size');
        $(this).addClass('active');
        e.preventDefault();
    });
    $('.font_size').find('.medium').click(function(e) {
        $(this).parent('li').siblings('li').find('a').removeClass('active');
        $('.cp').removeClass('large_size small_size');
        $(this).addClass('active');
        e.preventDefault();
    });
    $('.font_size').find('.large').click(function(e) {
        $(this).parent('li').siblings('li').find('a').removeClass('active');
        $('.cp').removeClass('small_size').addClass('large_size');
        $(this).addClass('active');
        e.preventDefault();
    });
    /*-----------------------------------*/
    //////// 語言模組 無障礙遊走設定  ////////
    /*-----------------------------------*/
    $('.language').find('ul').hide();
    var openLang = $('.language').children('a');
    openLang.off().click(function(e) {
        $(this).next('ul').stop(true, true).slideToggle();
        e.preventDefault();
    });
    openLang.keyup(function() {
        $(this).next('ul').stop(true, true).slideDown();
    });
    $('.language').find('ul li:last>a').focusout(function() {
        $('.language').find('ul').hide();
    });
    $(document).on('touchend click', function(e) {
        var target = e.target;
        if (!$(target).is('.language a')) {
            $('.language').find('ul').hide();
        }
    });
    /*-----------------------------------*/
    /////////// category active  //////////
    /*-----------------------------------*/
    $('.category').find('a').off().click(function(event) {
        $(this).parent('li').siblings().find('a').removeClass('active');
        $(this).addClass('active');
    });
    /*-----------------------------------*/
    /////////////// lazyload  /////////////
    /*-----------------------------------*/
    // cp_photo
    $('.Slider-for').on('init reInit afterChange', function(event, slick, currentSlide) {
        var i = (currentSlide ? currentSlide : 0) + 1;
        $('.controls').html(i + '/' + slick.slideCount);
    });
    // /*------------------------------------*/
    // ///////table 加上響應式table wrapper/////
    // /*------------------------------------*/
    $('table').each(function(index, el) {
        //判斷沒有table_list
        if ($(this).parents('.table_list').length == 0 && $(this).parents('.fix_th_table').length == 0 && $(this).parent('form').length == 0) {
            $(this).scroltable();
        }
    });
    // tablearrow arrow，為了設定箭頭
    $('.scroltable-nav-left').append('<div class="tablearrow_left" style="display:none;"></div>');
    $('.scroltable-nav-right').append('<div class="tablearrow_right"  style="display:none;"></div>');
    // 固定版頭
    function table_Arrow() {
        if ($('table').parents('.table_list').length == 0 && $('table').parents('.fix_th_table').length == 0 && $(this).parent('form').length == 0) {
            if ($('.scroltable-wrapper').length > 0) {
                var stickyArrowTop = Math.floor($('.scroltable-wrapper').offset().top),
                    thisScroll = Math.floor($(this).scrollTop());
                if (thisScroll > stickyArrowTop - 230) {
                    $('.scroltable-wrapper .tablearrow_left').css('display', 'block');
                    $('.scroltable-wrapper .tablearrow_left').css({ "top": thisScroll - stickyArrowTop + 220 }, 100, 'easeOutQuint');
                    $('.scroltable-wrapper .tablearrow_right').css('display', 'block');
                    $('.scroltable-wrapper .tablearrow_right').css({ "top": thisScroll - stickyArrowTop + 220 }, 100, 'easeOutQuint');
                } else {
                    $('.scroltable-wrapper .tablearrow_left').css({
                        top: '10px',
                        display: 'none'
                    });
                    $('.scroltable-wrapper .tablearrow_right').css({
                        top: '10px',
                        display: 'none'
                    });
                }
            }
        }
    }
    var scrollTimer;
    $(window).scroll(function() {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(function() {
            table_Arrow();
        }, 50);
    });
    // /*------------------------------------*/
    // //////////table 加上 data-title//////////
    // /*------------------------------------*/
    function rwdTable() {
        $('.table_list').find('table').each(function() {
            var $row = $(this).find('tr');
            rowCount = $row.length;
            for (var n = 1; n <= rowCount; n++) {
                $(this).find('th').each(function(index) {
                    var thText = $(this).text();
                    $row.eq(n).find('td').eq(index).attr('data-title', thText);
                });
            }
        });
    }
    rwdTable();
    /*-----------------------------*/
    /////form表單 placeholder隱藏/////
    /*-----------------------------*/
    $('input,textarea').focus(function() {
        $(this).removeAttr('placeholder');
    });
    $('input[type="checkbox"]').off().click(function(e) {
        $(this).blur();
    });
    /*--------------------------------------------------------*/
    /////設定img 在IE9+ SAFARI FIREFOX CHROME 可以object-fit/////
    /*--------------------------------------------------------*/
    var userAgent, ieReg, ie;
    userAgent = window.navigator.userAgent;
    ieReg = /msie|Trident.*rv[ :]*11\./gi;
    ie = ieReg.test(userAgent);
    if (ie) {
        $(".img-container").each(function() {
            var imgUrl = $(this).find('img').attr('src');
            var $container = $(this);
            $container.has('.none').addClass('ie-object-none');
            $container.has('.none').css('backgroundImage', 'url(' + imgUrl + ')');
            $container.has('.cover').addClass('ie-object-cover');
            $container.has('.cover').css('backgroundImage', 'url(' + imgUrl + ')');
            $container.has('.fill').addClass('ie-object-fill');
            $container.has('.fill').css('backgroundImage', 'url(' + imgUrl + ')');
            $container.has('.contain').addClass('ie-object-contain');
            $container.has('.contain').css('backgroundImage', 'url(' + imgUrl + ')');
        });
    }
    // document.createElement("picture");
    // if ($('img.lazy').length > 0) {
    //     $('img.lazy').show().lazyload({
    //         placeholder: 'images/basic/placeholder.gif',
    //         effect: "fadeIn",
    //         effectspeed: 600,
    //     });
    // }
     var lazyLoadInstance = new LazyLoad({
        elements_selector: "img.lazy",
        placeholder: '/images/basic/placeholder.gif',
        effect: "fadeIn",
        fadeTime: 200,
        threshold: 0
    });

    //無障礙切換slick箭頭語系
    if ($('html')[0].hasAttribute("labg")) {
        var weblang = $('html').attr('lang');
        if (weblang.substring(0, 2) == 'zh') {
            $('.slick-prev').attr('title', '上一筆');
            $('.slick-next').attr('title', '下一筆');
        } else if (weblang.substring(0, 2) !== 'zh') {
            $('.slick-prev').attr('title', 'previous');
            $('.slick-next').attr('title', 'next');
        }
    }
});
