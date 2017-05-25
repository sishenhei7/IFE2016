//这是我自己的原生js库

(function(){

//建立我的命名空间
window['YZ'] = {};

//检查YZ是否导入了
if(!window['YZ']) {
    window['YZ'] = {};
}

// 获取元素
var $ = function(str) {
	return document.querySelector(str);
}
window['YZ']['$'] = bindFunction;
var $$ = function(str) {
	return document.querySelectorAll(str);
}
window['YZ']['$$'] = bindFunction;

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
window['YZ']['addEvent'] = bindFunction;

//基于一个类superClass,使subClass继承它
function extend(subClass, superClass){
	var F = function(){};
	F.prototype = superClass.prototype;
	subClass.prototype = new F();
	subClass.prototype.constructor = subClass;
}
window['YZ']['extend'] = bindFunction;

//获取元素对象
function g(el) { return document.getElementById(el); }
window['YZ']['g'] = g;

//extend方法？




















































}();