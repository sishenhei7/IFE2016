
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

//必填，长度为4-16个字符(汉字长度为2，其余为1)
var checkLength = function(str){
	var length01 = str.length;
	var length02 = str.replace(/[^\u4e00-\u9fa5]/g,'').length;
	return ((length01 + length02 >= 4) && (length01 + length02 <= 16));
}

//不能为空
var checkNull = function(str){
	var length01 = str.replace(/\s/g,'').length;
	return (length01 > 0);
}

//格式正确(必须以汉字或字母开头)
var checkFormat = function(str){
	var reg = /^[\u4e00-\u9fa5A-Za-z]/;
	return reg.test(str);
}

//封装事件绑定函数，使输入合法时变绿色，不合法时变红色
var addCheckEvent = function(element, event, checkFun, tip){
	addEvent(element, event, function(){
		var check = checkFun(element.value);
		if (check) {
			element.style.border = '2px solid green';
			tip.style.color = 'green';
		} else {
			element.style.border = '2px solid red';
			tip.style.color = 'red';			
		}
	});
}

function init() {
	var strLength = $('string-length');
	var strNull = $('string-null');
	var strFormat = $('string-format');
	var lengthTip = $('length-tip');
	var nullTip = $('null-tip');
	var formatTip = $('format-tip');
	addCheckEvent(strLength, 'blur', checkLength, lengthTip);
	addCheckEvent(strNull, 'blur', checkNull, nullTip);
	addCheckEvent(strFormat, 'blur', checkFormat, formatTip);
	strLength.focus();
}
window.onload=function(){
	init();
};
