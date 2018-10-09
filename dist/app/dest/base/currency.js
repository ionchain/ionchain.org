(function(){
    var winH = $(window).outerHeight();
    var mainH = $('.main_cont').outerHeight()-46;
    var footerH = $('.main_footer').outerHeight();
    //-------safari 滚动问题------
    function handleIphoneScroll(scrollTOP){
        // console.log('scrollTOP',scrollTOP,mainH);
        if(scrollTOP < mainH+footerH-winH ){
            $("#footer_app").css({'overflow-y':"hidden"});
        }else{
            $("#footer_app").css({'overflow-y':"auto"});
        }
          
    }
    //解决safari的 overflow-y:auto
    function isTouchDevice(){
        try{
            document.createEvent("TouchEvent");
            return true;
        }catch(e){
            return false;
        }
    }
    function touchScroll(id){
        if(isTouchDevice()){
            var el=document.getElementById(id);
            var scrollStartPos=0;

            document.getElementById(id).addEventListener("touchstart", function(event) {
                scrollStartPos=this.scrollTop+event.touches[0].pageY;
                event.stopPropagation();
            },true);

            document.getElementById(id).addEventListener("touchmove", function(event) {
                this.scrollTop=scrollStartPos-event.touches[0].pageY;
                event.preventDefault();
            },true);
        }
    }
    touchScroll("footer_app");

    /*---中英文判断start---*/
    /* $.ajax({
        url:'http://ip.taobao.com/service/getIpInfo.php?ip=52.74.223.119'
    }) */
    /*---中英文判断end---*/
    // 导航栏切换
    //-----------  导航控制
    // console.log(location.pathname)

    // $("#header-navbar-collapse [page="+pageName+"]").addClass('active_ac')
    var pages = $("#header-navbar-collapse [page="+pageName+"]");
    if(pages.parent(".navbar-nav").length == 1){
        pages.addClass('active_ac');
    }else if(pages.parent(".navbar-nav").length == 0){
        pages.parent(".dropdown-menu").parent('li').addClass('active_ac');
    }

    var new_scroll_position = 0;
    var last_scroll_position;
    function handleScroll(scrollTop) {
        // console.log(scrollTop ,'aaaaaaaa')
        // console.log($("nav").next().offset().top);
        if (scrollTop > 30) {
            $('.header').addClass('minified');
            $('.caret_copy1').addClass('caret_copy');
            $('.caret_copy2').addClass('.caret_copy_in').removeClass('caret_copy');
            $("#footer_app").css({opacity:1}); //移动端底部

            $(".ioc_green").removeClass("ioc_greens");
            $(".ioc_white").addClass("ioc_greens");
            $(".icon-bar").removeClass("icon_bar_while");
            
        } else {
            $('.header').removeClass('minified');
            $('.caret_copy1').addClass('.caret_copy_in').removeClass('caret_copy');
            $('.caret_copy2').addClass('caret_copy');
            

            $(".ioc_green").addClass("ioc_greens");
            $(".ioc_white").removeClass("ioc_greens");
            $(".icon-bar").addClass("icon_bar_while");

        }
        //------------往下滚动-----------
        last_scroll_position = scrollTop;
        if (new_scroll_position < last_scroll_position && last_scroll_position > 80) {
            $(".header").removeClass('slideDown').addClass('slideUp');

        } else if (new_scroll_position > last_scroll_position) {
            $(".header").removeClass('slideUp').addClass('slideDown');
        }

        new_scroll_position = last_scroll_position;
    }
    // 导航滚动变色

    $('window,html,body').bind('scroll', function(e) {  //手机版
        handleScroll( $("nav").next().offset().top * -1 );
        handleIphoneScroll($("nav").next().offset().top * -1)
    });

    $(window).bind('scroll', function(e){   //pc版
        handleScroll( $(window).scrollTop() )
    });

    // 移动端导航栏关闭
    $("#header_coll").click(function(){//--
        if($(this).hasClass("active")){
            $(this).removeClass("active");
            $(".navbar-header").css("background","none");
        }else{
            $(this).addClass("active");
            $(".navbar-header").css("background","#282A36");
        }
        if($("#header-navbar-collapse").hasClass("actives")){
            $("#header-navbar-collapse").removeClass("actives");
        }else{
            $("#header-navbar-collapse").addClass("actives");
        }
        
        // $("#header-navbar-collapse").css("display","block");
        // $(".collapsed").css("display","none");
        // $(".colse_logo").css("display","block");
    })
    // 导航中英文切换
    var languageMap = {
        EN: {
            index: '/',
            coming_soon: '/coming_soon_EN.html',
            vision: '/vision_EN.html',
            team: '/team_EN.html',
            community: 'community_EN.html'
        },
        CN: {
            index: 'index_CN.html',
            coming_soon: '/coming_soon.html',
            vision: '/vision_CN.html',
            team: '/team_CN.html',
            community: 'community_CN.html'
        },
        KO: {
            index: 'index_KO.html',
            coming_soon: '/coming_soon_KO.html',
            vision: '/vision_KO.html',
            team: '/team_KO.html',
            community: 'community_KO.html'
        }
    }

    $(".z_en a[data-language]").click(function(e){
        // if(location.pathname=="/vision_EN.html"){
        //     $(location).attr("href","vision_CN.html");
        // }
        var url = languageMap[e.target.dataset.language][pageName]
        location.href = url
    })

    // 首页 离子链视频
    $(".ctrl").click(function(){
        $(".block_chain").hide();
        $(".herVideo").show();
        $("#icon-video2").append($iframeVideo);
    })
    $(".close").click(function(){
        $(".herVideo").hide();
        $("#icon-video2 iframe").remove();
    })
    $(".block_img").click(function(){
        $(".herVideo").show();
        $("#icon-video2").append($iframeVideo);
    })

    //定义图片滚动所需全局参数
    var blw,liArr,mysw,mus,length,bodyWid,lastW,i;
    var blw_t,liArr_t,mysw_t,mus_t,length_t,bodyWid_t,lastW_t,j;

    function slideParamInit(){
        // 图片轮播 1
        blw=$("#myscrollbox_1 li").width();
        //获取单个子元素所需宽度
        liArr = $("#myscrollbox_1 ul").children("li");
        //获取子元素数量
        mysw = $("#myscroll_1").width();
        //获取子元素所在区域宽度
        mus = parseInt(mysw/blw);
        //计算出需要显示的子元素的数量
        length = liArr.length-mus;

        //获取最后一个不完整的步长
        bodyWid =  $(window).width();
        lastW = blw - bodyWid % blw;

        if(blw*liArr.length - bodyWid > 22 ){//显示箭头prev,next
            $(".team-part1 .btn-arrow").show();
        }else{
            $(".team-part1 .btn-arrow").hide();
        }

    }

    slideParamInit();
    slideParamInit2();
    $(window).resize(function(){
        slideParamInit();
        slideParamInit2();
    })
    

    //计算子元素可移动次数（被隐藏的子元素数量）
    i=0
    $("#right_1").click(function(){
        // console.log("click move")
        i++
        //点击i加1
        if(i<length){
            $("#myscrollbox_1 ul").css("left",-(blw*i));
            //子元素集合向左移动，距离为子元素的宽度乘以i。
        }else{
            // console.log("last move")
            i=length;
            if(lastW!=0){

                $("#myscrollbox_1 ul").css("left",-(blw*(length-1)+ lastW));
            }else{

                $("#myscrollbox_1 ul").css("left",-(blw*length));
                //超出可移动范围后点击不再移动。最后几个隐藏的元素显示时i数值固定位已经移走的子元素数量。
            }
        }
    });
    $("#left_1").click(function(){
        i--
        //点击i减1
        if(i>=0){
            $("#myscrollbox_1 ul").css("left",-(blw*i));
            //子元素集合向右移动，距离为子元素的宽度乘以i。
        }else{
            i=0;
            $("#myscrollbox_1 ul").css("left",0);
            //超出可移动范围后点击不再移动。最前几个子元素被显示时i为0。
        }
    });
    $(".tablea").find(".box:eq(0)").show();    //为每个BOX的第一个元素显示
    $("#myscrollbox_1 ul li").on("click",function(){ //给a标签添加事件
        //团队
        var index=$(this).index();  //获取当前a标签的个数
        $(".team_us .tablea").each(function(){
            $(this).find(".box").hide().eq(index).show(); //返回上一层，在下面查找css名为box隐藏，然后选中的显示
        })
        $(this).parent().find('.mask').removeClass("selected");
        $(this).children('.mask').addClass("selected");
    })

    $(".tableas").find(".box:eq(0)").show();
    $("#myscrollbox_2 ul li").on("click",function(){ //给a标签添加事件
        //----顾问
        var index=$(this).index();  //获取当前a标签的个数
        $(".tableas").each(function(){
            $(this).find(".box").hide().eq(index).show(); //返回上一层，在下面查找css名为box隐藏，然后选中的显示
        })

        $(this).parent().find('.mask').removeClass("selected");
        $(this).children('.mask').addClass("selected");
    })

    function slideParamInit2(){
        // 图片轮播 2
        blw_t=$("#myscrollbox_2 li").width();
        //获取单个子元素所需宽度
        liArr_t = $("#myscrollbox_2 ul").children("li");
        //获取子元素数量
        mysw_t = $("#myscroll_2").width();
        //获取子元素所在区域宽度
        mus_t = parseInt(mysw_t/blw_t);
        //计算出需要显示的子元素的数量
        length_t = liArr_t.length-mus_t;
        //计算子元素可移动次数（被隐藏的子元素数量）

        //获取最后一个不完整的步长
        bodyWid_t =  $(window).width();
        lastW_t = blw_t - bodyWid_t % blw_t;

        if(blw*liArr.length - bodyWid > 22 ){//显示箭头prev,next
            $(".team_consultant .btn-arrow").show();
        }else{
            $(".team_consultant .btn-arrow").hide();
        }
    }

    j=0
    $("#right_2").click(function(){
        console.log("click right_2")
        j++
        //点击i加1
        if(j<length){
            $("#myscrollbox_2  ul").css("left",-(blw_t*j));
            //子元素集合向左移动，距离为子元素的宽度乘以i。
        }else{
            j=length;
            if(lastW_t!=0){
                $("#myscrollbox_2  ul").css("left",-(blw_t*(length-1)+ lastW_t));
            }else {
                $("#myscrollbox_2  ul").css("left",-(blw_t*length));
            //超出可移动范围后点击不再移动。最后几个隐藏的元素显示时i数值固定位已经移走的子元素数量。
            }
        }


    });
    $("#left_2").click(function(){
        j--
        //点击j减1
        if(j>=0){
            $("#myscrollbox_2  ul").css("left",-(blw_t*j));
            //子元素集合向右移动，距离为子元素的宽度乘以i。
        }else{
            j=0;
            $("#myscrollbox_2  ul").css("left",0);
            //超出可移动范围后点击不再移动。最前几个子元素被显示时i为0。
        }
    });
    // 移动端footer部分
    $(".footer_nav>li").click(function(){
        // console.log(".footer_nav>li");
        if($(this).children(".drop_down").hasClass("drop_down_b")){
            $(this).children(".drop_down").removeClass("drop_down_b");
            $(this).children("div").css("border-bottom","1px solid #3D3F4A");
            $(this).removeClass("img_xz");
        }else{
            $(this).children(".drop_down").addClass("drop_down_b").parent().siblings().children(".drop_down").removeClass("drop_down_b");;
            $(this).children("div").css("border-bottom","transparent");
            $(this).addClass("img_xz").siblings().removeClass("img_xz");
        }
    })
  
})();