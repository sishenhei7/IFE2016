//这是gallery库

(function() {
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

//创建一个图片，src为src，类型名字为className, alt为alt，加在ele的子节点后面
var insertImg = function(src, ele, className, alt){
	var photo = document.createElement('img');
	photo.src = src;
	
	if (className !== undefined && className !== '') {
		photo.className = className;
	}
	
	if (alt !== undefined && className !== '') {
		photo.alt = alt;
	}
	
	ele.appendChild(photo);
	return photo;
};

//创建一个gallery库
if (!window['gallery']) {
	window['gallery'] = {};
}	
	
//建立一个gallery对象
window['gallery'] = function (ele) {
	this.photoes = [];
	this.galleryParent = ele;
}	

//按照photoes的地址添加照片
gallery.prototype.createGallery = function (order) {
	var photoes = this.photoes;
	var photoesLength = this.photoes.length;
	var album = createChildElement('div', '', this.galleryParent);
	
	if (photoesLength === 1) {
		album.className = 'album-1';
		insertImg(photoes[0], album);
		
	} else if (photoesLength === 2) {
		album.className = 'album-2';
		insertImg(photoes[0], album);
		insertImg(photoes[1], album);

	} else if (photoesLength === 3) {
		album.className = 'album-3';
		insertImg(photoes[0], album);
		insertImg(photoes[1], album);
		insertImg(photoes[2], album);

	} else if (photoesLength === 4) {
		album.className = 'album-4';
		insertImg(photoes[0], album);
		insertImg(photoes[1], album);
		insertImg(photoes[2], album);
		insertImg(photoes[3], album);

	} else if (photoesLength === 5) {
		album.className = 'album-5';
		insertImg(photoes[0], album);
		insertImg(photoes[1], album);
		insertImg(photoes[2], album);
		insertImg(photoes[3], album);
		insertImg(photoes[4], album);

	} else if (photoesLength === 6) {
		album.className = 'album-6';
		insertImg(photoes[0], album);
		insertImg(photoes[1], album);
		insertImg(photoes[2], album);
		insertImg(photoes[3], album);
		insertImg(photoes[4], album);
		insertImg(photoes[5], album);
	}
}

//添加一张照片
gallery.prototype.add = function (address, order) {	
	if (order === undefined) {
		this.photoes.push(address);
	} else if (order < 0) {
		this.photoes.splice(0, 1, address);
	} else if (order > photoesLength ) {
		this.photoes.push(address);
	} else {
		this.photoes.splice(order, 1, address);
	}
	
	this.createGallery();
}

//gallery初始化
gallery.prototype.init = function () {
	this.createGallery();
}

})();


























