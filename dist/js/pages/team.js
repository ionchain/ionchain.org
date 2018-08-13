(function(){
    var swiper1 = new Swiper('#gallery-team', {
        slidesPerView: 'auto',
        centeredSlides: true,
        loop: true,
        // pagination: {
        //     el: '.swiper-pagination'
        // },
        on:{
            slideChangeTransitionStart: function(){
                if(swiper1){
                    $("#section-team .js-info-card").eq(swiper1.realIndex).fadeOut();
                }
                
            },
            transitionEnd: function(){
                if(swiper1){
                    $("#section-team .js-info-card").eq(swiper1.realIndex).fadeIn().siblings().hide();
                }
                
            }
        }
    });
    var swiper2 = new Swiper('#gallery-consultant', {
        slidesPerView: 'auto',
        centeredSlides: true,
        loop: true,
        // pagination: {
        //     el: '.swiper-pagination'
        // },
        on:{
            slideChangeTransitionStart: function(){
                if(swiper2){
                    $("#section-consultant .js-info-card").eq(swiper2.realIndex).fadeOut();
                }
                
            },
            transitionEnd: function(){
                if(swiper2){
                    $("#section-consultant .js-info-card").eq(swiper2.realIndex).fadeIn().siblings().hide();
                }
                
            }
        }
    });
})()

