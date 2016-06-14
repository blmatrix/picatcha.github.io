// JavaScript Document
var scroll ={
	resizeScrollH:function (speed, newWindowHeight, newY){
		//console.log("resizeScrollH "+this+"  newWindowHeight: "+newWindowHeight+"  newY: "+newY );
		TweenLite.to(isiText, speed, {height:newWindowHeight, ease:Sine.easeInOut, overwrite:0, onComplete:this.redrawScroller});
		if (newY) TweenLite.to(isiText, speed, {y:newY, ease:Sine.easeInOut, overwrite:0});
	},
	resizeScrollW:function (speed, newWindowWidth, newX){
		//console.log("resizeScrollW "+this+"  newWindowWidth: "+newWindowWidth+"  newX: "+newX );
		TweenLite.to(isiText, speed, {width:newWindowWidth, ease:Sine.easeInOut, overwrite:0, onComplete:this.redrawScroller});
		if (newX) TweenLite.to(isiText, speed, {x:newX, ease:Sine.easeInOut, overwrite:0});
	},
	redrawScroller:function (){
		isiText.style.display="none";
		var redrawFix = isiText.offsetHeight;
		isiText.style.display="block"
	},
	resetScroller:function (){
		scroll.moveScrollTo(0);
	},
	initScrollBar:function(){
		//window.addEventListener('beforeunload', gsk_scroll.resetScroller);
		scroll.redrawScroller();
	}
}; 
