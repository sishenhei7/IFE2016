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

//向左的函数
var turnLeft = function(smallBox, classArry){
	var smallBoxClassNameIndex = classArry.indexOf(smallBox.className);
	var smallBoxClassNameIndexChanged = (smallBoxClassNameIndex+3)%4;
	smallBox.className = classArry[smallBoxClassNameIndexChanged];
}

//向右的函数
var turnRight = function(smallBox, classArry){
	var smallBoxClassNameIndex = classArry.indexOf(smallBox.className);
	var smallBoxClassNameIndexChanged = (smallBoxClassNameIndex+1)%4;
	smallBox.className = classArry[smallBoxClassNameIndexChanged];
}

//反向的函数
var turnBack = function(smallBox, classArry){
	var smallBoxClassNameIndex = classArry.indexOf(smallBox.className);
	var smallBoxClassNameIndexChanged = (smallBoxClassNameIndex+2)%4;
	smallBox.className = classArry[smallBoxClassNameIndexChanged];
}

//初始化box的位置
var boxInit = function(topBox, leftBox, bigBoxTop, bigBoxleft){
	topBox.style.height = bigBoxTop + 'px';
	topBox.style.width = '400px';
	leftBox.style.height = (400-bigBoxTop) + 'px';
	leftBox.style.width = bigBoxleft + 'px';
}

//前进的函数
var goForward = function(topBox, leftBox, classArry, smallBox){
	var assistArry = [[0,-1], [1,0], [0,1], [-1,0]];
	var smallBoxClassNameIndex = classArry.indexOf(smallBox.className);
	var direction = assistArry[smallBoxClassNameIndex];
	var topBoxHeight = parseInt(topBox.style.height.slice(0,-2),10)+ 40*direction[1];
	var leftBoxWidth = parseInt(leftBox.style.width.slice(0,-2),10) + 40*direction[0];
	if ((topBoxHeight < 0) || (topBoxHeight > 360) || (leftBoxWidth < 0) || (leftBoxWidth > 360)){
		alert("行动不能超出边界");
	} else {
		topBox.style.height = topBoxHeight + 'px';
		topBox.style.width = '400px';
		leftBox.style.height = (400-topBoxHeight) + 'px';
		leftBox.style.width = leftBoxWidth + 'px';
	}
}

function init() {
	var topBox = $('top-box');
	var leftBox = $('left-box');
	var smallBox = $('small-box');
	var tunLef = $('turn-left');
	var tunRig = $('turn-right');
	var tunBac = $('turn-back');
	var goFor = $('go-forward');
	var classArry = ['style-up', 'style-right', 'style-down', 'style-left'];
	var bigBoxTop = 200;     //初始化box的位置
	var bigBoxleft = 200;    //初始化box的位置
	boxInit(topBox, leftBox, bigBoxTop, bigBoxleft);
	addEvent(tunLef, 'click', function(){
		turnLeft(smallBox, classArry);
	})
	addEvent(tunRig, 'click', function(){
		turnRight(smallBox, classArry);
	})
	addEvent(tunBac, 'click', function(){
		turnBack(smallBox, classArry);
	})
	addEvent(goFor, 'click', function(){
		goForward(topBox, leftBox, classArry, smallBox);
	})
}
window.onload=function(){
	init();
};
