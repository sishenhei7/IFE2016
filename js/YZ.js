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
window['YZ']['$'] = $;

var $$ = function(str) {
	return document.querySelectorAll(str);
}
window['YZ']['$$'] = $$;

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
window['YZ']['addEvent'] = addEvent;

//基于一个类superClass,使subClass继承它
function extend(subClass, superClass){
	var F = function(){};
	F.prototype = superClass.prototype;
	subClass.prototype = new F();
	subClass.prototype.constructor = subClass;
}
window['YZ']['extend'] = extend;

//获取元素对象
function g(el) { return document.getElementById(el); }
window['YZ']['g'] = g;

//获取元素到document顶部的距离
function getTop (ele) {
	var offset = ele.offsetTop;
	if(ele.offsetParent!=null) {
		offset += getTop(ele.offsetParent);
	}
	return offset;	
}
window['YZ']['getTop'] = getTop;

//创建一个类型为type的元素，内容为str，加在ele的子节点后面
var createChild = function(type, str, ele){
	var myEle = document.createElement(type);
	myEle.appendChild(document.createTextNode(str));
	ele.appendChild(myEle);
}
window['YZ']['createChild'] = createChild;

//extend方法？库的扩展方法？




















































}();