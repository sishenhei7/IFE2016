//这是gallery库
function init() {
//(function() {
//封装getElementById
var $ = function (id) {
	return document.getElementById(id);
};

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
	
	if (str !== undefined && str !== '') {
		myEle.appendChild(document.createTextNode(str));
	}
	ele.appendChild(myEle);
	return myEle;
};

//配置左右间距，下间距，栏目数和栏目宽度（栏目长度是自适应的）
var myMarginLeftAndRight = 16;
var myMarginBottom = 16;
var myColumn = 6;
var myColumnWidth = 200;  //单位是px

//将原图片按比例缩放，使他们的宽度和自定义的一样
function myScaleTool (ele) {
	var myHeight = ele.offsetHeight;
	ele.style.height = Math.round((myColumnWidth/(ele.offsetWidth)) * myHeight) + 'px';
	ele.style.width = myColumnWidth + 'px';
	return ele.style.height;
}

//初始化每栏图片的起始位置
var albumLefts = [];
var albumTops = [];
for (var i = 0; i < myColumn; i++) {
	albumLefts[i] = myMarginLeftAndRight * 0.5 * (i * 2 + 1) + myColumnWidth * i;
	albumTops[i] = 0;
}

//选取数组中的最小值，返回最小值序号
function selectTheSmallest(array) {
	var min = array[0];
	var index = 0;
	
	for (var i = 1, j = array.length; i < j; i++) {
		if (min > array[i]) {
			min = array[i];
			index = i;
		}
	}
	
	return index;
}

//更新每栏图片的起始位置
function updateLeftsAndTops (ele) {
	var myTop = selectTheSmallest(albumTops);
	ele.style.left = albumLefts[myTop] + 'px';
	ele.style.top = albumTops[myTop] + 'px';
	
	var height = myScaleTool(ele);
	albumTops[myTop] = albumTops[myTop] + parseInt(height.slice(0, -2), 10) + myMarginBottom;	
}

//将图片按瀑布排列
(function waterFall () {
	$('album-waterfall').style.position = 'relative';
	var myImgs = $('album-waterfall').getElementsByTagName('img');

	for (var i = 0, j = myImgs.length; i < j; i++) {
		myImgs[i].style.position = 'absolute';
		updateLeftsAndTops(myImgs[i]);
		addEvent(myImgs[i], 'click', function(event){
			var e = event || window.event;
			fullScreen(e.target.src);
		});
	}
})();

//图片点击的时候全屏显示该图
function fullScreen (src) {
	var wrapper = createChildElement('div', '', $('main'));
	wrapper.className = 'full-screen-wrapper';
	
	var img = createChildElement('img', '', $('main'));
	img.src = src;
	img.className = 'full-screen-photo';
	
	$('main').style.overflow  = 'hidden';
	
	addEvent(wrapper, 'click', function(){
		$('main').removeChild(wrapper);
		$('main').removeChild(img);
		$('main').style.overflow  = 'auto';
	});
}

//根据一个数组给album-waterfall添加图片
function addPhoto (array) {
	var album = $('album-waterfall');

	for (var i = 0, j = array.length; i < j; i++) {
		var img = createChildElement('img', '', album);
		img.src = '../photo/' + array[i];
		img.style.position = 'absolute';
		updateLeftsAndTops(img);
		
		addEvent(img, 'click', function(event){
			var e = event || window.event;
			fullScreen(e.target.src);
		});
	}
}

//ajax动态加载
function loadXMLDoc(){
	var xmlhttp;

	if (window.XMLHttpRequest){   // code for IE7+, Firefox, Chrome, Opera, Safari
	  xmlhttp = new XMLHttpRequest();
	
	} else {     // code for IE6, IE5
	  xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	  
	xmlhttp.onreadystatechange=function(){
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
			var srcs = eval(xmlhttp.responseText);
			addPhoto (srcs);
		}
	}
	
	xmlhttp.open("GET","task_1_44_1.txt",true);
	xmlhttp.send();
}

//当滚轮滑到最低端时启动自动加载
addEvent(document, 'scroll', function(event){
			if (document.body.scrollTop > (document.body.scrollHeight - document.body.clientHeight - 100)) {
				loadXMLDoc();
			}
		});
//})();
}

window.onload=function(){
	init();
};

























