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





function init() {
	$('input-array').value = tableArray;
	
	addEvent($('create-table-button'), 'click', function() {
		
	});
}

window.onload=function(){
	init();
};












