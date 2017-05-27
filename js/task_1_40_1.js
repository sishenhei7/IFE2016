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

//在ele的子节点后面添加一系列子节点
var createChildElements = function(arrayType, arrayStr, ele){
	for (var i = 0, j = arrayStr.length; i < j; i++) {
		createChildElement(arrayType[i], arrayStr[i], ele)
	}
}

//在ele的子节点里面找到标签名为tagName的元素，在第x个元素里面写入str且返回它
var writeChildElement = function(ele, tagName, x, str){
	var myEleChildren = ele.getElementsByTagName(tagName);
	if (str !== '') {
		myEleChildren[x - 1].innerHTML = null;
		myEleChildren[x - 1].appendChild(document.createTextNode(str));
	}
	return myEleChildren[x - 1];
}

//calendar对象
var calendar = function (myDate, ele) {
	this.myDate = myDate.slice(0, myDate.lastIndexOf('-'));
	this.myNowDate = myDate;
	this.myParent = ele;
}

//返回日期对象
calendar.prototype.getDate = function() {
	return (new Date(this.myNowDate)); 
}

//建立calendar标签
calendar.prototype.createCalendar = function() {
	this.myParent.innerHTML = null;
	var section = document.createElement('section');
	section.id = 'calendar-banner';
	var date = this.myDate.replace('-', '年') + '月';
	createChildElements(['button', 'button', 'div', 'button', 'button'], ['《', '<', date, '>', '》'], section);
	
	var table = document.createElement('table');
	table.id = 'calendar-table';
	
	var thead = createChildElement('thead', '', table);
	var theadRow = createChildElement('tr', '', thead);
	createChildElements(['td', 'td', 'td', 'td', 'td', 'td', 'td'], ['日', '一', '二', '三', '四', '五', '六'], theadRow);
	
	var tbody = createChildElement('tbody', '', table);
	var tbodyRow = createChildElement('tr', '', tbody);
	createChildElements(['td', 'td', 'td', 'td', 'td', 'td', 'td'], ['', '', '', '', '', '', ''], tbodyRow);
	var tbodyRoww = createChildElement('tr', '', tbody);
	createChildElements(['td', 'td', 'td', 'td', 'td', 'td', 'td'], ['', '', '', '', '', '', ''], tbodyRoww);
	var tbodyRowww = createChildElement('tr', '', tbody);
	createChildElements(['td', 'td', 'td', 'td', 'td', 'td', 'td'], ['', '', '', '', '', '', ''], tbodyRowww);
	var tbodyRowwww = createChildElement('tr', '', tbody);
	createChildElements(['td', 'td', 'td', 'td', 'td', 'td', 'td'], ['', '', '', '', '', '', ''], tbodyRowwww);
	var tbodyRowwwww = createChildElement('tr', '', tbody);
	createChildElements(['td', 'td', 'td', 'td', 'td', 'td', 'td'], ['', '', '', '', '', '', ''], tbodyRowwwww);
	var tbodyRowwwwww = createChildElement('tr', '', tbody);
	createChildElements(['td', 'td', 'td', 'td', 'td', 'td', 'td'], ['', '', '', '', '', '', ''], tbodyRowwwwww);

	this.myParent.appendChild(section);
	this.myParent.appendChild(table);
}

//给calendar选中
calendar.prototype.getSelected = function(date) {
	if (date === undefined) {
		date = this.myNowDate;
	}
	
	var tbody = this.myParent.getElementsByTagName('tbody')[0];
	var tbodyTds = tbody.getElementsByTagName('td');	
	var date = new Date(date);	
	var myDay = date.getDate();
	var day = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

	//添加选中状态，并清除其它日期的选中状态
	for (var i = 0, j = tbodyTds.length; i < j; i++) {
		if (tbodyTds[i].className.includes('selected')){
			tbodyTds[i].className = tbodyTds[i].className.replace('selected', '');
			tbodyTds[i].className = tbodyTds[i].className.trim();
		}
		if ((i === day + myDay - 1) && (this.myDate === this.myNowDate.slice(0, this.myNowDate.lastIndexOf('-')))) {
			tbodyTds[i].className = tbodyTds[i].className + ' ' + 'selected';
		}
	}
}

//给calendar标签添加值
calendar.prototype.writeCalendar = function() {
	var thead = this.myParent.getElementsByTagName('thead')[0];
	var theadTds = thead.getElementsByTagName('td');
	var tbody = this.myParent.getElementsByTagName('tbody')[0];
	var tbodyTds = tbody.getElementsByTagName('td');
	
	var myRealDate = new Date(this.myDate);
	var myDay = myRealDate.getDay();
	var myDays = new Date(myRealDate.getFullYear(), myRealDate.getMonth() + 1, 0).getDate();
	var myLastDays = new Date(myRealDate.getFullYear(), myRealDate.getMonth(), 0).getDate();
	
	theadTds[0].style.color = 'red';
	theadTds[6].style.color = 'red';
	
	for (var i = 0, j = tbodyTds.length; i < j; i++) {
		tbodyTds[i].innerHTML = null;
		tbodyTds[i].className = '';
		
		if (i >= myDay && i < (myDay + myDays)) {
			
			tbodyTds[i].innerHTML = i - myDay + 1;
			if (i%7 == 6 || i%7 == 0) {
				tbodyTds[i].className = 'red';
			}
			
		} else if (i < myDay) {
			
			tbodyTds[i].innerHTML = myLastDays + i - myDay + 1;
			tbodyTds[i].className = 'grey';
			
		} else if (i >= (myDay + myDays)) {
			
			tbodyTds[i].innerHTML = i - myDay - myDays + 1;
			tbodyTds[i].className = 'grey';	
		}
	}
	
	this.getSelected();
	this.getTbodyEvent();	
}

//给calendar左右按钮绑定事件
calendar.prototype.getBannerEvent = function() {
	var thead = this.myParent.getElementsByTagName('section')[0];
	var theadButtons = thead.getElementsByTagName('button');
	var theadDiv = thead.getElementsByTagName('div')[0];
	var that = this;

	for (var i = 0, j = theadButtons.length; i < j; i++) {
		addEvent(theadButtons[i], 'click', (function(k){
			//循环绑定用闭包解决
			return (function () {
				var date = new Date(that.myDate);
				var year = date.getFullYear();
				var month = date.getMonth();				
				theadDiv.innerHTML = null;		
				
				switch(k){
					case 0 :
						date.setFullYear(date.getFullYear() - 1);
						break;
						
					case 1 :
						date.setMonth(date.getMonth() - 1);
						break;
						
					case 2 :
						date.setMonth(date.getMonth() + 1);
						break;
						
					case 3 :
						date.setFullYear(date.getFullYear() + 1);
						break;	
				}	
				that.myDate = date.getFullYear() + '-' + (date.getMonth() + 1);
				var fixedDate = that.myDate.replace('-', '年') + '月';
				theadDiv.appendChild(document.createTextNode(fixedDate));
				that.writeCalendar();
			});
		})(i));
	}
}
	
//给calendar的table部分绑定事件
calendar.prototype.getTbodyEvent = function() {
	var that = this;
	var tbody = this.myParent.getElementsByTagName('tbody')[0];
	var tbodyTds = tbody.getElementsByTagName('td');	

	for (var i = 0, j = tbodyTds.length; i < j; i++) {
		that = this;		
		if (!tbodyTds[i].className.includes('grey')) {
			addEvent(tbodyTds[i], 'click', function(event){
				var e = event || window.event;
				var day = e.target.innerText;
				that.myNowDate = that.myDate + '-' + day;
				that.getSelected();
			});	
		}
	}
}

//给calendar初始化
calendar.prototype.init = function() {
	this.createCalendar();
	this.writeCalendar();
	this.getBannerEvent();
}
	
function init() {
	var testCalendar = new calendar('2017-3-16', $('main'));
	testCalendar.init();
}

window.onload=function(){
	init();
};












