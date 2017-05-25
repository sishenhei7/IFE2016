//封装getElementById
var $ = function (id) {
	return document.getElementById(id);
}

//事件绑定函数，兼容浏览器差异
function addEvent(element, event, listener) {
    if (element.addEventListener) {
        element.addEventListener(event, listener, false);
    }
    else if (element.attachEvent) {
        element.attachEvent("on" + event, listener);
    }
    else {
        element["on" + event] = listener;
    }
}

//显示浮出层
function displayFloatOut (elementList) {
	var i = 0;
	while (elementList[i] != undefined) {
		elementList[i].style.display = 'block';
		i++;
	}
	var main = $('main');
	main.style.overflow = 'hidden';
}

//取消浮出层
function hideFloatOut (elementList) {
	var i = 0;
	while (elementList[i] != undefined) {
		elementList[i].style.display = 'none';
		i++;
	}
	var main = $('main');
	main.style.overflow = 'auto';	
}

//改变元素大小
function changeElementHeightWidth (myElement, myHeight, myWidth) {
	myElement.style.height = myHeight + 'px';	
	myElement.style.width = myWidth + 'px';		
}

function init() {
	var main = $('main');
	var cover = $('cover');
	var floatOut = $('float-out');
	var showFloatOut = $('show-float-out');
	var floatOutConfirm = $('float-out-confirm');
	var floatOutConcel = $('float-out-concel');
	var handler = $('handler');
	var floatOutHeader = floatOut.getElementsByClassName('header')[0];
	var headerDragable = false;
	var relativeX, relativeY;
	var floatOutResizable = false;
	var handlerX, handlerY;
	
	addEvent(showFloatOut, 'click', function() {
		changeElementHeightWidth(floatOut, 200, 500);
		displayFloatOut([cover, floatOut]);
	});
	
	addEvent(floatOutConfirm, 'click', function() {
		hideFloatOut([cover, floatOut]);
	});
	
	addEvent(floatOutConcel, 'click', function() {
		hideFloatOut([cover, floatOut]);
	});
	
	addEvent(cover, 'click', function() {
		hideFloatOut([cover, floatOut]);
	});
	
	addEvent(floatOutHeader, 'mousedown', function(event) {
		var e = event || window.event;
		headerDragable = true;
		relativeX = e.clientX - floatOut.offsetLeft;
		relativeY = e.clientY - floatOut.offsetTop;
	});
	
	addEvent(document, 'mouseup', function() {
		headerDragable = false;
	});
	
	addEvent(floatOutHeader, 'mousemove', function(event) {
		var e = event || window.event;
		if (headerDragable === true) {
			floatOut.style.left = e.clientX - relativeX + 'px';
			floatOut.style.top = e.clientY - relativeY + 'px';
		}
	});

	addEvent(handler, 'mousedown', function(event) {
		
		var e = event || window.event;
		floatOutResizable = true;
		
		//取得css里面的height和width属性
		if (floatOut.style.height === '' || floatOut.style.width === '') {
			var floatOutCss = document.defaultView.getComputedStyle(floatOut);
			floatOut.style.height = floatOutCss.getPropertyValue('height');
			floatOut.style.width = floatOutCss.getPropertyValue('width');
		}
		
		//取得css里面的left和top属性
		floatOut.style.left = floatOut.offsetLeft + 'px';
		floatOut.style.top = floatOut.offsetTop + 'px';
		
		//做标记
		handlerX = e.clientX - parseInt(floatOut.style.width.slice(0, -2), 10)/2;
		handlerY = e.clientY - parseInt(floatOut.style.height.slice(0, -2), 10)/2;		
	});
	
	addEvent(document, 'mouseup', function() {
		floatOutResizable = false;
	});
	
	addEvent(document, 'mousemove', function(event) {
		var e = event || window.event;
		if (floatOutResizable === true) {
			floatOut.style.width = 2*(e.clientX - handlerX) + 'px';
			floatOut.style.height = 2*(e.clientY - handlerY) + 'px';		
		}
		
	});
}
window.onload=function(){
	init();
};
