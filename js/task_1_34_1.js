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

//朝方向前进
var moveDirection = function(topBox, leftBox, directionNumber){
	var topBoxHeight = parseInt(topBox.style.height.slice(0,-2),10)+ 40*directionNumber[1];
	var leftBoxWidth = parseInt(leftBox.style.width.slice(0,-2),10) + 40*directionNumber[0];
	if ((topBoxHeight < 0) || (topBoxHeight > 360) || (leftBoxWidth < 0) || (leftBoxWidth > 360)){
		alert("行动不能超出边界");
	} else {
		boxAnimation(topBox, topBoxHeight + 'px', '400px', 0);	
		boxAnimation(leftBox, (400-topBoxHeight) + 'px', leftBoxWidth + 'px', 0);	
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
	var smallBox = $('small-box');
	var tunLef = $('turn-left');
	var tunRig = $('turn-right');
	var tunBac = $('turn-back');
	var goFor = $('go-forward');
	var moveLef = $('move-left');
	var moveUp = $('move-up');
	var moveRig = $('move-right');
	var moveDow = $('move-down');	
	var moveTunLef = $('move-turn-left');
	var moveTunUp = $('move-turn-up');
	var moveTunRig = $('move-turn-right');
	var moveTunDow = $('move-turn-down');	
	var classArry = ['direction-up', 'direction-right', 'direction-down', 'direction-left'];
	var bigBoxTop = 200;                      				 //初始化box的位置
	var bigBoxleft = 200;                     				 //初始化box的位置
	bigBox.className = 'direction-up';
	bigBox.style.transform = 'rotate(0deg)';
	boxInit(topBox, leftBox, bigBoxTop, bigBoxleft);
	addEvent(tunLef, 'click', function(){
		//type=1是向右，type=3是向左
		boxDirection(bigBox, classArry, 3);               
		boxRotation(bigBox, 3);
	})
	addEvent(tunRig, 'click', function(){
		boxDirection(bigBox, classArry, 1);                  
		boxRotation(bigBox, 1);
	})
	addEvent(tunBac, 'click', function(){
		boxDirection(bigBox, classArry, 3);                  
		boxRotation(bigBox, 3);
		boxDirection(bigBox, classArry, 3);                  
		boxRotation(bigBox, 3);
	})
	addEvent(goFor, 'click', function(){
		var direction = boxLookForwards(bigBox, classArry);
		var directionNumber = parseDirection(direction);
		moveDirection(topBox, leftBox, directionNumber);
	})
	addEvent(moveLef, 'click', function(){
		var directionNumber = parseDirection('left');
		moveDirection(topBox, leftBox, directionNumber);
	})
	addEvent(moveUp, 'click', function(){
		var directionNumber = parseDirection('up');
		moveDirection(topBox, leftBox, directionNumber);
	})
	addEvent(moveRig, 'click', function(){
		var directionNumber = parseDirection('right');
		moveDirection(topBox, leftBox, directionNumber);
	})
	addEvent(moveDow, 'click', function(){
		var directionNumber = parseDirection('down');
		moveDirection(topBox, leftBox, directionNumber);
	})
	addEvent(moveTunLef, 'click', function(){
		boxDirection(bigBox, classArry, 3);
		boxDirectionRotation(bigBox, 'left');
		var directionNumber = parseDirection('left');
		moveDirection(topBox, leftBox, directionNumber);
	})
	addEvent(moveTunUp, 'click', function(){
		boxDirection(bigBox, classArry, 2);
		boxDirectionRotation(bigBox, 'up');
		var directionNumber = parseDirection('up');
		moveDirection(topBox, leftBox, directionNumber);
	})
	addEvent(moveTunRig, 'click', function(){
		boxDirection(bigBox, classArry, 1);
		boxDirectionRotation(bigBox, 'right');
		var directionNumber = parseDirection('right');
		moveDirection(topBox, leftBox, directionNumber);
	})
	addEvent(moveTunDow, 'click', function(){
		boxDirection(bigBox, classArry, 4);
		boxDirectionRotation(bigBox, 'down');
		var directionNumber = parseDirection('down');
		moveDirection(topBox, leftBox, directionNumber);
	})	
}
window.onload=function(){
	init();
};
