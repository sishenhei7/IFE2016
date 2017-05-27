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
var calendar = function (myDate, ele, callBack, datePeriodLimit, datePeriodCallBack) {
	this.input = myDate;
	this.myDate = myDate.slice(0, myDate.lastIndexOf('-'));
	this.myNowDate = myDate;
	this.myParent = ele;
	this.callBack = callBack;
	this.datePeriod = [];
	this.datePeriodLimit = datePeriodLimit;
	this.datePeriodCallBack = datePeriodCallBack;
}

//初始化myDate和datePeriod
calendar.prototype.initDateOrPeriod = function() {
	if (this.input.includes(',')) {
		this.datePeriod = this.input.split(',');
		this.myDate = this.datePeriod[0].slice(0, this.datePeriod[0].lastIndexOf('-'));
		this.myNowDate = this.datePeriod[0];
	} else {
		this.myDate = this.input.slice(0, this.input.lastIndexOf('-'));
		this.myNowDate = this.input;
	}
}

//返回日期对象
calendar.prototype.getDate = function() {
	return (new Date(this.myNowDate)); 
}

//建立calendar标签
calendar.prototype.createCalendar = function() {
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
	
	//进行区间选中
	this.colorDatePeriod();
}

//给calendar标签添加值
calendar.prototype.writeCalendar = function() {
	//更新banner
	var section = this.myParent.getElementsByTagName('section')[0];
	var sectionDiv = section.getElementsByTagName('div')[0];
	sectionDiv.innerHTML = null;
	var fixedDate = this.myDate.replace('-', '年') + '月';
	sectionDiv.appendChild(document.createTextNode(fixedDate));	
	
	//更新table
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
			tbodyTds[i].className = 'grey-before';
			
		} else if (i >= (myDay + myDays)) {
			
			tbodyTds[i].innerHTML = i - myDay - myDays + 1;
			tbodyTds[i].className = 'grey-after';	
		}
	}
	
	this.getSelected();
}

//给datePeriod的区间涂色
calendar.prototype.colorDatePeriod = function() {
	if (this.checkeDatePeriod()) {
		//找出datePeriod中的最大和最小日期
		var maxDatePeriod = new Date(this.datePeriod[1]);
		var minDatePeriod = new Date(this.datePeriod[0]);
		if (maxDatePeriod < minDatePeriod ) {
			var maxDatePeriod = new Date(this.datePeriod[0]);
			var minDatePeriod = new Date(this.datePeriod[1]);
		}
		
		//可选区域的参数
		var NowDate = new Date(this.myDate);
		var maxDay = new Date(NowDate.getFullYear(), NowDate.getMonth() + 1, 0).getDate();
		var minDay = new Date(NowDate.getFullYear(), NowDate.getMonth(), 1).getDay();
		
		var tbody = this.myParent.getElementsByTagName('tbody')[0];
		var tbodyTds = tbody.getElementsByTagName('td');		
		
		for (var i = 0, j = tbodyTds.length; i < j; i++) {
			if (tbodyTds[i].className.includes('selected')){
				tbodyTds[i].className = tbodyTds[i].className.replace('selected', '');
				tbodyTds[i].className = tbodyTds[i].className.trim();
			}
			
			//i在可选区域中
			if ((minDay <= i) && (i <= minDay + maxDay - 1)) {  
				var iNowDate = new Date(NowDate.getFullYear(), NowDate.getMonth(), i - minDay + 1);
				
				//i在datePeriod的范围中
				if ((minDatePeriod <= iNowDate) && (iNowDate <= maxDatePeriod)) {
					tbodyTds[i].className = tbodyTds[i].className + ' ' + 'selected';
				}
			}
		}	
	}
}

//判断datePeriod的区间是否涂色
calendar.prototype.checkeDatePeriod = function() {
	if (this.datePeriod.length === 2) {
		var datePeriodDiff =  Math.abs(new Date(this.datePeriod[1]) - new Date(this.datePeriod[0]))/(1000 * 60 * 60 *24);
		
		if (this.limit !== undefined && datePeriodDiff >= this.limit) {
			if (this.datePeriodCallBack !== undefined) {
				this.datePeriodCallBack();
			}
			return false;
		} else {
			return true;
		}
	}
}

//给calendar的datePeriod赋值并且涂色
calendar.prototype.changeDatePeriod = function(date) {
	//选中后再点击会取消选中
	if (this.datePeriod.length === 2) {
		this.datePeriod.pop();
		this.datePeriod.pop();
		this.datePeriod.push(date);
		
	} else {
		this.datePeriod.push(date);
	}
}

//给calendar左右按钮绑定事件
calendar.prototype.getEvent = function() {
	var section = this.myParent.getElementsByTagName('section')[0];
	var sectionButtons = section.getElementsByTagName('button');
	var tbody = this.myParent.getElementsByTagName('tbody')[0];
	var tbodyTds = tbody.getElementsByTagName('td');		
	var that = this;

	//绑定banner元素
	for (var i = 0, j = sectionButtons.length; i < j; i++) {
		addEvent(sectionButtons[i], 'click', (function(k){
			//循环绑定用闭包解决
			return (function () {
				var date = new Date(that.myDate);
				var year = date.getFullYear();
				var month = date.getMonth();					
				
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
				that.writeCalendar();
			});
		})(i));
	}

	//绑定table元素
	for (var i = 0, j = tbodyTds.length; i < j; i++) {
		that = this;
		
		addEvent(tbodyTds[i], 'click', function(event){
			var e = event || window.event;
			var day = e.target.innerText;	
			var date = new Date(that.myDate);
			
			if (e.target.className.includes('grey-before')) {			
				date.setMonth(date.getMonth() - 1);
				that.myDate = date.getFullYear() + '-' + (date.getMonth() + 1);
				that.myNowDate = that.myDate + '-' + day;
				that.changeDatePeriod(that.myNowDate);
				that.writeCalendar();
			
			} else if (e.target.className.includes('grey-after')) {
				date.setMonth(date.getMonth() + 1);
				that.myDate = date.getFullYear() + '-' + (date.getMonth() + 1);
				that.myNowDate = that.myDate + '-' + day;
				that.changeDatePeriod(that.myNowDate);
				that.writeCalendar();
			
			} else {
				that.myNowDate = that.myDate + '-' + day;
				that.changeDatePeriod(that.myNowDate);
				that.getSelected();
			}
			
			//回调处理
			if (that.callBack !== undefined) {
				if (that.checkeDatePeriod()) {
					that.callBack(that.datePeriod);
				} else {
					that.callBack(that.getDate());
				}
			}			
		});
	}
}

//给calendar初始化
calendar.prototype.init = function() {
	this.initDateOrPeriod();
	this.createCalendar();
	this.writeCalendar();
	this.getEvent();
}

//把日期格式转化为年月日格式
function dateToChineseDate (date) {
	if (date instanceof Date) {
		return (date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate());
	} else {
		return date;
	}
}

//把日期输入到输入框里面
function dateToInput (date) {
	var inputDate = $("input-date");
	inputDate.value = dateToChineseDate(date);
}

//输入框的点击事件
function inputDateClick (count) {
	var e = event || window.event;
	var dateWrapper = $("date-wrapper");
	
	if (count%2 === 1) {
		var myCalendar = new calendar(e.target.value, dateWrapper, dateToInput);
		myCalendar.init();
	} else {
		dateWrapper.innerHTML = null;
	}
}

function init() {
	var inputDate = $("input-date");
	inputDateClickCount = 0;
	
	dateToInput(new Date);
	inputDate.focus();
	addEvent(inputDate, 'click', function(){
		inputDateClickCount++;
		inputDateClick(inputDateClickCount);
	});
}

window.onload=function(){
	init();
};












