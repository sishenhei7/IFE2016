//验证标记变量
var mark = [false, false, false, false, false];

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

//验证不为空
var checkNull = function(str){
	var length01 = str.replace(/\s/g,'').length;
	return (length01 > 0);
}

//验证开头(必须以汉字或字母开头)
var checkHead = function(str){
	var reg = /^[\u4e00-\u9fa5A-Za-z]/;
	return reg.test(str);
}

//验证长度为4-16个字符(汉字长度为2，其余为1)
var checkLength = function(str){
	var length01 = str.length;
	var length02 = str.replace(/[^\u4e00-\u9fa5]/g,'').length;
	return ((length01 + length02 >= 4) && (length01 + length02 <= 16));
}

//验证名称
var checkName = function(str){
	var check = (checkNull(str) && checkHead(str) && checkLength(str));
	mark[0] = check;
	return check;
}

//验证密码
var checkPassword = function(str){
	var check = (checkNull(str) && checkLength(str));
	mark[1] = check;
	return check;
}

//验证密码确认
var checkPasswordConfirm = function(str){
	var gPassword = $('password').value;
	var check = (checkNull(str) && checkLength(str) && (str === gPassword));
	mark[2] = check;
	return check;
}

//验证邮箱
var checkMail = function(str){
	var reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
	mark[3] = reg.test(str);
	return reg.test(str);
}

//验证11位手机号
var checkCellphone = function(str){
	var reg = /^1[0-9]{10}$/;
	mark[4] = reg.test(str);
	return reg.test(str);
}


//封装事件绑定函数，使有焦点时输入框变色，并出现提示
var addFocusEvent = function(element){
	addEvent(element, 'focus', function(){
		element.style.border = '2px solid #4fc2d5';
		element.style.boxShadow = '0px 0px 15px #4fc2d5';
		element.parentNode.nextElementSibling.style.color = 'grey';			
	});
}

//封装事件绑定函数，使焦点离开时检测，合法时变绿色，不合法时变红色
var addBlurEvent = function(element, checkFun){
	addEvent(element, 'blur', function(){
		var check = checkFun(element.value);
		element.style.boxShadow = 'none';
		if (check) {
			element.style.border = '2px solid #ded9d9';
			element.parentNode.nextElementSibling.style.color = 'green';
			element.parentNode.nextElementSibling.innerHTML = '格式正确';
		} else {
			element.style.border = '2px solid red';
			element.parentNode.nextElementSibling.style.color = 'red';			
		}
	});
}

//点击事件函数
var buttonCheck = function(){
	var i = 0;
	while (mark[i]) {
		i++;
	}
	if (i < 4) {
		alert('表格还没填完整，提交失败');
	} else {
		alert('提交成功');
	};
}

function init() {
	var gName = $('name');
	var gPwd = $('password');
	var gPwdConfirm = $('password-confirm');
	var gMail = $('mail');
	var gCellphone = $('cellphone');
	var gComButton = $('commit');
	addFocusEvent(gName);	
	addFocusEvent(gPwd);
	addFocusEvent(gPwdConfirm);
	addFocusEvent(gMail);
	addFocusEvent(gCellphone);
	addBlurEvent(gName, checkName);
	addBlurEvent(gPwd, checkPassword);
	addBlurEvent(gPwdConfirm, checkPasswordConfirm);
	addBlurEvent(gMail, checkMail);
	addBlurEvent(gCellphone, checkCellphone);
	addEvent(gComButton, 'click', buttonCheck);
	gName.focus();
}
window.onload=function(){
	init();
};
