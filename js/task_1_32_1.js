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

//formComposition产出包括label的一个表单元件
//formDecoration是表单元件的一个装饰
//formElement是一个表单元素，产出input，select等的单一标签

//接受表单标签，类型和一个数组（针对select）
var formElement = function(newLabel, newType, newArray, newName){
	var newElement = document.createElement(newLabel);
	switch (newLabel) {
		//输入框，其中对于单选框和复选框需要name属性
		case ('input') :
			if (newName) {
				var wrapper = document.createElement('div');
				wrapper.innerHTML = '<input type='+newType+' name='+newName+'>';
				newElement = wrapper.firstChild;
			}
			break;
		//选择框
		case ('select') :
			for (var i = 0, j = newArray.length; i < j; i++) {
				var childElement = document.createElement('option');
				childElement.value = newArray[i].toString();
				childElement.appendChild(document.createTextNode(newArray[i]));
				newElement.appendChild(childElement);
			}
			break;
		//文本域
		case ('textarea') :
			break;	
		//按钮
		case ('button') :
			newElement.appendChild(document.createTextNode('提交'));
			break;		
	}
	return newElement;
}

//formComposition类，产出包括label的一个表单元件
var formComposition = function(newText, newLabel, newType, newArray, newName, newRules, newSuccess, newFail){
	this.newText = newText;    //比如：手机号：
	this.newLabel = newLabel;   //比如：input
	this.newType = newType;    //比如：text
	this.newArray = newArray;   //针对下拉框的内容
	this.newName =newName;    //针对单选框，复选框的name属性
	this.newRules = newRules;        //输入时的提示	
	this.newSuccess = newSuccess;      //验证成功的提示
	this.newFail = newFail;         //验证失败的提示	
}

//创建一个表单元件的方法
formComposition.prototype.createElement = function(func) {
	var createLabel = document.createElement('label');
	createLabel.appendChild(document.createTextNode(this.newText));
	//对于单选框，需要对每个选项建立一个表单标签，并且对每个选项加同样的name属性
	//对于复选框，需要对每个选项建立一个表单标签，并且对每个选项加不样的name属性
	//对于其它，只需建立一个表单标签即可
	if (this.newType === 'radio') {
		for (var i = 0, j = this.newArray.length; i < j; i++) {
			var createElement = formElement(this.newLabel, this.newType, [],this.newName);
			createLabel.appendChild(document.createTextNode(this.newArray[i]));
			createLabel.appendChild(createElement);
		}
	} else if (this.newType === 'checkbox') {
		for (var i = 0, j = this.newArray.length; i < j; i++) {
			var createElement = formElement(this.newLabel, this.newType, [],this.newName[i]);
			createLabel.appendChild(document.createTextNode(this.newArray[i]));
			createLabel.appendChild(createElement);
		}
	} else {
		var createElement = formElement(this.newLabel, this.newType, this.newArray, this.newName);
		createLabel.appendChild(createElement);
		createElement.style.border = '2px solid #ded9d9';
	}
	
	//建立提示输入框
	var createTip = document.createElement('div');
	if (this.newRules) {
		createTip.appendChild(document.createTextNode(this.newRules));		
	}
	createLabel.style.color = 'grey'
	createLabel.appendChild(createTip);
	
	//添加验证事件(事件中this失效，所以要先传递给一个值)
	var newSuccessCopy = this.newSuccess;
	var newFailCopy = this.newFail;
	if (func) {
		addEvent(createElement, 'blur', function(){
			createTip.innerHTML = null;
			if (func(createElement.value)) {
				if (newSuccessCopy) {
					createTip.appendChild(document.createTextNode(newSuccessCopy));		
				}
				createTip.style.color = 'green';
			} else {
				if (newFailCopy) {
					createTip.appendChild(document.createTextNode(newFailCopy));
				}
				createTip.style.color = 'red';
			}
	});
	}
	return createLabel;
}

//表单元件的装饰方法，它接受一个label实例，它给input元素改变边框样式
var formComDecorator = function (label) {
	label.style.color = 'purple';
	var inputArray = label.getElementsByTagName('input');
	for (var i = 0, j = inputArray.length; i < j; i++) {
		inputArray[i].style.border = '1px dotted red';
	}
	return label
}

//验证11位手机号
var checkCellphone = function(str){
	var reg = /^1[0-9]{10}$/;
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

function init() {
	var firstOne = $('first-one');
	var element1 = new formComposition('手机号', 'input', 'text', '', '', '11位数字', '验证成功', '请输入11位数字');
	firstOne.appendChild(element1.createElement(checkCellphone));
	var element2 = new formComposition('', 'input', 'radio', ['在校生','非在校生'], 'student');
	firstOne.appendChild(element2.createElement());
	var element3 = new formComposition('', 'input', 'checkbox', ['广州','北京','上海'], ['guangzhou', 'beijing', 'shanghai']);
	firstOne.appendChild(element3.createElement());
	var element4 = new formComposition('大学', 'select', '', ['广州大学','北京大学','上海大学'], ['guangzhou', 'beijing', 'shanghai']);
	firstOne.appendChild(element4.createElement());
	var element6 = new formComposition('留言', 'textarea');
	firstOne.appendChild(element6.createElement());
	var element5 = new formComposition('', 'button');
	firstOne.appendChild(element5.createElement());
	
	var secondOne = $('second-one');
	var element11 = new formComposition('手机号', 'input', 'text', '', '', '11位数字', '验证成功', '请输入11位数字');
	secondOne.appendChild(formComDecorator(element11.createElement(checkCellphone)));
	var element12 = new formComposition('', 'input', 'radio', ['在校生','非在校生'], 'student');
	secondOne.appendChild(element12.createElement());
	var element13 = new formComposition('', 'input', 'checkbox', ['广州','北京','上海'], ['guangzhou', 'beijing', 'shanghai']);
	secondOne.appendChild(element13.createElement());
	var element14 = new formComposition('大学', 'select', '', ['广州大学','北京大学','上海大学'], ['guangzhou', 'beijing', 'shanghai']);
	secondOne.appendChild(element14.createElement());
	var element16 = new formComposition('留言', 'textarea');
	secondOne.appendChild(element16.createElement());
	var element15 = new formComposition('', 'button');
	secondOne.appendChild(element15.createElement());
}
window.onload=function(){
	init();
};
