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

//动画函数，使元素在高宽和角度变化时产生动画
var boxAnimation = function(box, height, width, angle){
	var time = parseInt($('box-time').value, 10);            //动画的时间
	box.style.transition = 'width ' + time +
	                       's, height ' + time +
						   's, transform '+ time +
						   's, -webkit-transform '+ time + 's';
	box.style.height = height;
	box.style.width = width;
	box.style.transform = 'rotate(' + angle + 'deg)';
	box.style.webkitTransform = 'rotate(' + angle + 'deg)';
}

//标识函数，在转向时给元素标识，type=1是向右，type=2是向下，type=3是向左，type=4是向上
var boxDirection = function(Box, classArry, type){
	var BoxClassNameIndex = classArry.indexOf(Box.className);
	var BoxClassNameIndexChanged = (BoxClassNameIndex+type)%4;
	Box.className = classArry[BoxClassNameIndexChanged];
}

//旋转函数，type=1是向右，type=3是向左
var boxRotation = function (Box, type) {
	var angle = parseInt(Box.style.transform.slice(7,-4),10);
	angle = angle + 90*(2 - type);
	boxAnimation(Box, '40px', '40px', angle);
}

//旋转函数，向某个方向旋转
var boxDirectionRotation = function (Box, direction) {
	var directions = ['up', 'right', 'down', 'left'];
	var boxAngle = parseInt(Box.style.transform.slice(7,-4),10);
	var boxDirection = ( boxAngle/90 ) % 4;
	angle = boxAngle + 90*((directions.indexOf(direction) - boxDirection + 1)%4 - 1);
	boxAnimation(Box, '40px', '40px', angle);
}

//获得box面朝的方向
var boxLookForwards = function(bigBox, classArry){
	var directions = ['up', 'right', 'down', 'left'];
	var bigBoxClassNameIndex = classArry.indexOf(bigBox.className);
	return directions[bigBoxClassNameIndex];
}

//解析方向
var parseDirection = function(direction){
	var directionNumbers = [[0,-1], [1,0], [0,1], [-1,0]];
	var directions = ['up', 'right', 'down', 'left'];
	var directionIndex = directions.indexOf(direction);
	return directionNumbers[directionIndex];
}

//朝方向前进boxMoveDistance格
var moveDirection = function(topBox, leftBox, directionNumber, boxMoveDistance){
	if (boxMoveDistance === undefined) {
		boxMoveDistance = 1;
	}
	var topBoxHeight = parseInt(topBox.style.height.slice(0,-2),10)+ 40*directionNumber[1]*boxMoveDistance;
	var leftBoxWidth = parseInt(leftBox.style.width.slice(0,-2),10) + 40*directionNumber[0]*boxMoveDistance;
	if ((topBoxHeight < 0) || (topBoxHeight > 360) || (leftBoxWidth < 0) || (leftBoxWidth > 360)){
		alert("行动不能超出边界");
	} else {
		boxAnimation(topBox, topBoxHeight + 'px', '400px', 0);	
		boxAnimation(leftBox, (400-topBoxHeight) + 'px', leftBoxWidth + 'px', 0);	
	}
}

//根据一条指令返回指令的移动距离
var moveDistance = function(order){
	var orderWords = order.split(' ');
	orderLastWord = orderWords[orderWords.length - 1];
	var distance = parseInt(orderLastWord, 10);
	if (isNaN(distance)) {
		return 1;
	} else {
		return distance;
	}
}

//处理一条指令，如果没写移动距离则加上1
var orderWithDistance = function(order){
	var distance = parseInt(order.slice(-1), 10);
	if (isNaN(distance)) {
		return order + ' 1';
	} else {
		return order;
	}
}

//对指令做出动作
var parseOrder = function(order){
	var topBox = $('top-box');
	var leftBox = $('left-box');	
	var bigBox = $('big-box');	
	var classArry = ['direction-up', 'direction-right', 'direction-down', 'direction-left'];
	var boxMoveDistance = moveDistance(order);
	order = orderWithDistance(order);
	switch(order){
		case 'GO' + ' ' + boxMoveDistance:
			var direction = boxLookForwards(bigBox, classArry);
			var directionNumber = parseDirection(direction);
			moveDirection(topBox, leftBox, directionNumber, boxMoveDistance);
			break;
			
		case 'TUN LEF' + ' ' + boxMoveDistance:
			boxDirection(bigBox, classArry, 3);               
			boxRotation(bigBox, 3);
			break;
			
		case 'TUN RIG' + ' ' + boxMoveDistance:
			boxDirection(bigBox, classArry, 1);                  
			boxRotation(bigBox, 1);
			break;
			
		case 'TUN BAC' + ' ' + boxMoveDistance:
			boxDirection(bigBox, classArry, 3);                  
			boxRotation(bigBox, 3);
			boxDirection(bigBox, classArry, 3);                  
			boxRotation(bigBox, 3);
			break;
			
		case 'TRA LEF' + ' ' + boxMoveDistance:
			var directionNumber = parseDirection('left');
			moveDirection(topBox, leftBox, directionNumber, boxMoveDistance);
			break;
			
		case 'TRA TOP' + ' ' + boxMoveDistance:
			var directionNumber = parseDirection('up');
			moveDirection(topBox, leftBox, directionNumber, boxMoveDistance);
			break;
			
		case 'TRA RIG' + ' ' + boxMoveDistance:
			var directionNumber = parseDirection('right');
			moveDirection(topBox, leftBox, directionNumber, boxMoveDistance);
			break;
			
		case 'TRA BOT' + ' ' + boxMoveDistance:
			var directionNumber = parseDirection('down');
			moveDirection(topBox, leftBox, directionNumber, boxMoveDistance);
			break;
			
		case 'MOV LEF' + ' ' + boxMoveDistance:
			boxDirection(bigBox, classArry, 3);
			boxDirectionRotation(bigBox, 'left');
			var directionNumber = parseDirection('left');
			moveDirection(topBox, leftBox, directionNumber, boxMoveDistance);
			break;
			
		case 'MOV TOP' + ' ' + boxMoveDistance:
			boxDirection(bigBox, classArry, 2);
			boxDirectionRotation(bigBox, 'up');
			var directionNumber = parseDirection('up');
			moveDirection(topBox, leftBox, directionNumber, boxMoveDistance);
			break;
			
		case 'MOV RIG' + ' ' + boxMoveDistance:
			boxDirection(bigBox, classArry, 1);
			boxDirectionRotation(bigBox, 'right');
			var directionNumber = parseDirection('right');
			moveDirection(topBox, leftBox, directionNumber, boxMoveDistance);
			break;
			
		case 'MOV BOT' + ' ' + boxMoveDistance:
			boxDirection(bigBox, classArry, 4);
			boxDirectionRotation(bigBox, 'down');
			var directionNumber = parseDirection('down');
			moveDirection(topBox, leftBox, directionNumber, boxMoveDistance);
			break;
			
		default:
			alert('您输入的指令有误');
	}
}

//对输入的命令进行判断和切割
var orderSplit = function(){
	var boxOrders = $('box-orders').value.trim();
	if (boxOrders === '') {
		alert('请先输入指令');
		return false;
	} else {
		var boxOrdersList = boxOrders.split("\n");
		return boxOrdersList;
	}
}

//返回左边的文本框里面的最后一个数字
var lineLastNumber = function(){
	var numberTextarea = $('show-rows');
	var numberList = numberTextarea.value.split("\n");
	return parseInt(numberList[numberList.length - 1], 10);
}

//给左边的文本框添加一个数字
var setOrdersNumber = function(){
	var numberTextarea = $('show-rows');
	var setNumber = lineLastNumber() + 1;
	numberTextarea.value = numberTextarea.value + "\n" + setNumber;
	numberTextarea.scrollTop = numberTextarea.scrollHeight;
}

//给左边的文本框删除一个数字
var deleteOrdersNumber = function(){
	var numberTextarea = $('show-rows');
	var numberList = numberTextarea.value.split("\n");
	numberList.pop();
	numberTextarea.value = numberList.join("\n");
	numberTextarea.scrollTop = numberTextarea.scrollHeight;
}

//返回右边的文本框里面的最后一个指令
var lastOrder = function(){
	var ordersTextarea = $('box-orders');
	var ordersList = ordersTextarea.value.split("\n");
	return ordersList[ordersList.length - 2];
}

//处理指令去掉后面的数字
var deleteNumber = function(order){
	var orderWords = order.split(' ');
	orderLastWord = orderWords[orderWords.length - 1];
	var distance = parseInt(orderLastWord, 10);
	if (isNaN(distance)) {
		return order;
	} else {
		return orderWords.splice(0, orderWords.length - 1).join(" ");
	}
}

//判断指令是否符合要求
var checkOrder = function(order){
	var allOrders = ['GO', 'TUN LEF', 'TUN RIG', 'TUN BAC', 'TRA LEF', 'TRA TOP', 'TRA RIG', 'TRA BOT', 'MOV LEF', 'MOV TOP', 'MOV RIG', 'MOV BOT'];
	order = deleteNumber(order);
	if (allOrders.indexOf(order) >= 0) {
		return true;
	} else {
		return false;
	}
}

//返回左右两边文本框的长度
var checkTextareaLength = function(){
	var numberTextareaLength = $('show-rows').value.split("\n").length;
	var ordersTextareaLength = $('box-orders').value.split("\n").length;
	return (numberTextareaLength - ordersTextareaLength);
}

//标上一个红色小点
var orderAreWrong = function(){
	var showArea = $('show-area');
	var circle = document.createElement('div');
	showArea.appendChild(circle);
	circle.className = 'wrong-circle';
	var circleStyleTop = 20 * (lineLastNumber() - 2);
	circle.style.top = circleStyleTop + 'px';
}

//去掉红点
var removeRedBox = function(){
	var showArea = $('show-area');
	if (showArea.children.length > 1) {
		showArea.removeChild(showArea.lastChild);
	}
}

//给左边的输入框删除或添加数字，使它与右边的输入框行数相等
var makeLinesEqual = function(){
	var lines = checkTextareaLength();
	if (lines > 0) {
		for (var i = 0; i < lines; i++) {
			deleteOrdersNumber();
		}
	} else if (lines < 0) {
		for (var i = 0; i + lines < 0; i++) {
			setOrdersNumber();
		}
	}
}

//给文本输入框添加行号并检查指令是否合法
//(每次右边的文本框输入回车的时候给左边的文本框添加数字)
var setLineNumber = function(event){
	var e = event || window.event;
	//回车键
	if (e.keyCode === 13) {
		setOrdersNumber();
		if (!checkOrder(lastOrder())) {
			orderAreWrong();
		} else {
			removeRedBox();
		}
	} else if (checkTextareaLength() !== 0) {
		makeLinesEqual();
	}
}

//初始化box的位置
var boxInit = function(topBox, leftBox, bigBoxTop, bigBoxleft){
	topBox.style.height = bigBoxTop + 'px';
	topBox.style.width = '400px';
	leftBox.style.height = (400-bigBoxTop) + 'px';
	leftBox.style.width = bigBoxleft + 'px';
}

function init() {
	var topBox = $('top-box');
	var leftBox = $('left-box');
	var bigBox = $('big-box');
	var ordersExecute = $('orders-execute');
	var ordersRefresh = $('orders-refresh');	
	var boxOrders = $('box-orders');
	var bigBoxTop = 200;                      				 //初始化box的位置
	var bigBoxleft = 200;                     				 //初始化box的位置
	bigBox.className = 'direction-up';
	bigBox.style.transform = 'rotate(0deg)';
	boxInit(topBox, leftBox, bigBoxTop, bigBoxleft);
	boxOrders.focus();
	
	addEvent(ordersExecute, 'click', function(){
		var boxOrdersList = orderSplit();
		if (boxOrdersList !== false) {
			for (var i = 0, boxOrdersLength = boxOrdersList.length; i < boxOrdersLength; i++) {
				parseOrder(boxOrdersList[i]);
			}			
		}
	});
	
	addEvent(ordersRefresh, 'click', function(){
		var boxOrders = $('box-orders');
		boxOrders.value = '';
		boxOrders.focus();
	});
	
	addEvent(boxOrders, 'keyup', setLineNumber);	
}
window.onload=function(){
	init();
};
