function fontSizeFit(){
	var designWid=375;
	var deviceWidth=document.body.offsetWidth;
	var html=document.documentElement;
	var ratio=designWid/14;
	html.style.fontSize=deviceWidth/ratio+'px';
}
fontSizeFit();
window.addEventListener('resize',function(){
	fontSizeFit();
})
