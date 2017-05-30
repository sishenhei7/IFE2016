/**
 * 木桶布局插件 
 * 用法：直接在图片容器上面标注id="album-bucket"
 * @param  {Array}  firstRowNum   [default: 4]       -第一行图片个数范围
 * @param  {Array}  perRowNum     [default: [3, 6]]  -每行图片个数范围
 * @author CandyBullet
 */
;
(function(firstRowNum, perRowNum) {
//封装getElementById
function $ (id) {
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

/**
 * 创建一个类型为type的元素，加在ele的子节点后面，内容为str
 * @param  {string}  type   [require]
 * @param  {dom}     ele    [require]
 * @param  {string}  str 
 */
var createChildElement = function(type, ele, str){
	var myEle = document.createElement(type);
	
	if (str !== undefined && str !== '') {
		myEle.appendChild(document.createTextNode(str));
	}
	ele.appendChild(myEle);
	return myEle;
};

/**
 * 如果一行加载eles全部元素时，行高是多少
 * @param  	{[dom]}   eles     [require]
 * @return  {number}  height   [require] 
 */
function getRowHeight (eles) {
	var parentWidth = $('album-bucket').offsetWidth - 1;
	var allWidth = 0;
	var heightRefer = eles[0].offsetHeight;
	
	for (var i = 0, j = eles.length; i < j; i++) {
		allWidth = allWidth + eles[i].offsetWidth * (heightRefer/(eles[i].offsetHeight));
	}
	
	return heightRefer * (parentWidth/allWidth);
}

/**
 * 根据给定的height来缩放所有元素
 * @param  	{[dom]}   eles     [require]
 * @param  {number}   height   [require] 
 */
function scalePhotoes (eles, height) {
	for (var i = 0, j = eles.length; i < j; i++) {
		eles[i].style.width = eles[i].offsetWidth * (height/(eles[i].offsetHeight));
		eles[i].style.height = height;
	}	
}

//返回一个类数组的第x-y的元素
function eleSlice (ele, x, y) {
	var array = [];
	for (var i = x; i < y; i++) {
		array.push(ele[i]);
	}
	return array;
}

//全局变量，为动态加载做准备
var myHeightRefer;  //记录heightRefer
var myI;            //记录倒数第一列的第一个元素的序号

/**
 * 根据给定的heightRefer来对imgs的图片进行木桶布局
 * @param  	{[dom]}   imgs          [require]
 * @param  {number}   heightRefer   [require]
 * @param  {number}   startpoint   
 */
function bucketStream (imgs, heightRefer, startpoint) {	
	if (startpoint === undefined) {
		var i = firstRowNum;
	} else {
		var i = startpoint;
	}
	var rowStream = [];
	var j = imgs.length;
	var heightDeff = 9999999;
	var heightOptinal = heightRefer;
	var iOriginal = i;
	var iOptional = i;

	//找出每行的最接近heightRefer的高度并缩放	
	while (i < j) {
		var rowStreamLength = rowStream.length;
		
		//如果这一行照片数没达到上限则添加照片
		if (rowStreamLength < perRowNum[1]) {
			rowStream.push(imgs[i]);
		}
		
		//比较高度大小
		if ((perRowNum[0] - 1) <= rowStreamLength && rowStreamLength < perRowNum[1]) {
			var nowHeight = getRowHeight(rowStream);
			var nowheightDeff = Math.abs(nowHeight - heightRefer);
			
			if (nowheightDeff < heightDeff) {
				heightDeff = nowheightDeff;
				heightOptinal = nowHeight;
				iOptional = i;
			}
		}
		
		//每行达到最大照片数时选择最优照片数
		if (rowStreamLength === (perRowNum[1] - 1)) {
			scalePhotoes(eleSlice(imgs, iOriginal, iOptional + 1), heightOptinal);
			iOriginal = iOptional + 1;
			i = iOptional;
			heightDeff = 9999999;
			rowStream = [];
		}
		
		//最后如果元素不够就强行排成一行
		if (i === (j - 1)) {
			scalePhotoes(eleSlice(imgs, iOriginal, j), heightOptinal);
			myI = iOriginal;	
		}
		
		i++;
	}
}


//对相册的所有的相片进行木桶布局
function bucketAlbum () {
	var myParent = $('album-bucket');
	var imgs = myParent.getElementsByTagName('img');
	var heightRefer = getRowHeight(eleSlice(imgs, 0, firstRowNum));
	myHeightRefer = heightRefer;
	scalePhotoes(eleSlice(imgs, 0, firstRowNum + 1), heightRefer);	
	
	bucketStream (imgs, heightRefer);
}


//给图片和滚轮加载事件
function addEvents () {
	//给图片加载点击事件
	var imgs = $('album-bucket').getElementsByTagName('img');
	for (var i = 0, j = imgs.length; i < j; i++) {
		imgs[i].style.float = 'left';

		addEvent(imgs[i], 'click', function(event){
			var e = event || window.event;
			fullScreen(e.target.src);
		});
	}	
	
	//给滚轮加载事件(动态加载)
	addEvent(document, 'scroll', function(event){
		if (document.body.scrollTop > (document.body.scrollHeight - document.body.clientHeight - 100)) {
			loadXMLDoc();
		}
	});	
}

//图片点击的时候全屏显示该图
function fullScreen (src) {
	var wrapper = createChildElement('div', $('main'));
	wrapper.className = 'full-screen-wrapper';
	wrapper.style.top = document.body.scrollTop;
	
	var img = createChildElement('img', $('main'));
	img.src = src;
	img.className = 'full-screen-photo';
	img.style.marginTop = document.body.scrollTop;
	
	$('main').style.overflow  = 'hidden';
	
	addEvent(wrapper, 'click', function(){
		$('main').removeChild(wrapper);
		$('main').removeChild(img);
		$('main').style.overflow  = 'auto';
	});
}

//根据一个数组给album-waterfall添加图片
function addPhoto (array) {
	var album = $('album-bucket');
	
	//先添加img
	for (var i = 0, j = array.length; i < j; i++) {
		var img = createChildElement('img', album);
		img.src = '../photo/' + array[i];
		img.style.float = 'left';
		
		addEvent(img, 'click', function(event){
			var e = event || window.event;
			fullScreen(e.target.src);
		});
	}
	
	//然后处理剩余的img使之是木桶布局
	var imgs = album.getElementsByTagName('img');
	bucketStream (imgs, myHeightRefer, myI);
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
	
	xmlhttp.open("GET","task_1_45_1.txt",true);
	xmlhttp.send();
}
		
window.onload = function() {
	addEvents ();
	bucketAlbum ();
}	
})(4, [3, 6]);



























