jQuery(document).ready(function() {
    "use strict";
/* -------- Appears Menu ------ */
    var new_scroll_position = 0;
    var last_scroll_position;
    function handleScroll(scrollTop){
        if ($(window).scrollTop() > 30) {
            $("#logo_1").hide();
            $("#logo").css("display","block");
            $('.main-menu').addClass('minified');
            $(".navbar-toggler").removeClass("ioc_while");
            $("#footer_app").css({opacity:1}); //移动端底部

	    } else {
	        $('.main-menu').removeClass('minified');
            $("#logo_1").css("display","block");
            $("#logo").hide();
            $(".navbar-toggler").addClass("ioc_while");
        }
        last_scroll_position = scrollTop;
        if (new_scroll_position < last_scroll_position && last_scroll_position > 80) {
            $(".header").removeClass('slideDown').addClass('slideUp');

        } else if (new_scroll_position > last_scroll_position) {
            $(".header").removeClass('slideUp').addClass('slideDown');
        }

        new_scroll_position = last_scroll_position;

    }
    $('window,document,body').on('ready scroll',function(){
        handleScroll(e.target.scrollTop);
    })
	$(window).scroll(function(e){
        // console.log(arguments,'ddddd');
        handleScroll($(window).scrollTop());
	});


      // 移动端footer部分
      $(".footer_nav>li").click(function(){
        console.log(".footer_nav>li");
        if($(this).children(".drop_down").hasClass("drop_down_b")){
            $(this).children(".drop_down").removeClass("drop_down_b");
            $(this).children("div").css("border-bottom","1px solid #3D3F4A");
            $(this).removeClass("img_xz");
        }else{
            $(this).children(".drop_down").addClass("drop_down_b").parent().siblings().children(".drop_down").removeClass("drop_down_b");;
            $(this).children("div").css("border-bottom","transparent");
            $(this).addClass("img_xz");
        }
    
        })

});

