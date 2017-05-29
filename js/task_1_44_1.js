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

//创建一个类型为type的元素，内容为str，加在ele的子节点后面
var createChildElement = function(type, str, ele){
	var myEle = document.createElement(type);
	if (str !== '') {
		myEle.appendChild(document.createTextNode(str));
	}
	ele.appendChild(myEle);
	return myEle;
}


function init() {

}

window.onload=function(){
	init();
};












