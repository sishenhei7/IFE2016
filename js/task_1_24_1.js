//遍历动画辅助参数
var i, delay, searchMark;
var markList = [];

//事件绑定函数，兼容浏览器差异
var addEvent = function(element, event, listener) {
    if (element.addEventListener) {
        element.addEventListener(event, listener, false);
    }
    else if (element.attachEvent) {
        element.attachEvent("on" + event, listener);
    }
    else {
        element["on" + event] = listener;
    }
};

//创建节点树
var createTree = function(Node){
	addBox("Dom", Node);
	addBox("apple", Node.children[0]);
	addBox("pear", Node.children[0].children[0]);
	addBox("pig", Node.children[0].children[0]);
	addBox("cola", Node.children[0].children[0]);
	addBox("soccer", Node.children[0].children[0]);
	addBox("phone", Node.children[0]);
	addBox("haha", Node.children[0]);
	addBox("book", Node.children[0].children[2]);	
	addBox("book", Node.children[0].children[2]);
	addBox("Note", Node);
	addBox("human", Node.children[1]);
	addBox("coda", Node.children[1].children[0]);
	addBox("operate", Node.children[1].children[0]);
	addBox("man", Node.children[1].children[0]);
	addBox("haha", Node.children[1]);
	addBox("be", Node.children[1].children[1]);
	addBox("c", Node.children[1].children[1].children[0]);
	addBox("grass", Node.children[1].children[1]);
	addBox("fish", Node);
}

//前序遍历
var preOrdering = function(Node){
	i++;
	setTimeout(function(){Node.style.backgroundColor = "rgb(204, 118, 216)";}, (2*i-1)*delay);
	setTimeout(function(){Node.style.backgroundColor = "white";}, (2*i)*delay);
	var j = 0;
	while (Node.children[j]) {
		if (Node.children[j].nodeName.toUpperCase() === "DIV"){
			preOrdering(Node.children[j]);
		}
		j++;
	}
}

//后序遍历
var postOrdering = function(Node){
	var j = 0;
	while (Node.children[j]) {
		if (Node.children[j].nodeName.toUpperCase() === "DIV"){
			preOrdering(Node.children[j]);
		}
		j++;
	}
	i++;
	setTimeout(function(){Node.style.backgroundColor = "rgb(204, 118, 216)";}, (2*i-1)*delay);
	setTimeout(function(){Node.style.backgroundColor = "white";}, (2*i)*delay);
}

//查找节点
var search = function(Node, searchText){
	i++;
	var nodeChildren = Node.children;
	if (Node.firstChild && Node.firstChild.nodeValue.trim() == searchText) {
		setTimeout(function(){Node.style.backgroundColor = "red";}, (2*i-1)*delay);
		setTimeout(function(){Node.style.backgroundColor = "red";}, (2*i)*delay);
		searchMark = 1;
	} else {
		setTimeout(function(){Node.style.backgroundColor = "rgb(204, 118, 216)";}, (2*i-1)*delay);
		setTimeout(function(){Node.style.backgroundColor = "white";}, (2*i)*delay);
	}
	var j = 0;
	while (nodeChildren[j]) {
		if (nodeChildren[j].nodeName.toUpperCase() === "DIV"){
			search(nodeChildren[j], searchText);
		}
		j++;
	}
}

var remove = function(markList, node){
	var index = markList.lastIndexOf(node);
	if (index >= 0){
		markList = markList.splice(index, 1)
	}
}

//添加节点 
var addBox = function(addText, parentNode){
	var textNode = document.createTextNode(addText);
	var boxNode = document.createElement("div");
	var parentHeight = parentNode.offsetHeight;
	var parentWidth = parentNode.offsetWidth;
	boxNode.style.height = Math.round(parentHeight*0.8) + "px";
	boxNode.style.display = "flex";
	boxNode.style.border = "1px solid black";
	boxNode.appendChild(textNode);
	parentNode.appendChild(boxNode);
//单击选定
//	addEvent(boxNode, "click", function(event){
//		var e = event || window.event;
//		e.target.style.border = "3px dotted red";
//		if (markList.indexOf(e.target) < 0){
//			markList.push(e.target);
//		}
//	})
//双击取消
//	addEvent(boxNode, "dblclick", function(event){
//		var e = event || window.event;
//		e.target.style.border = "1px solid black";
//		remove(markList, e.target);
//	})
//单击选定，单击取消，但是貌似有bug，我也不知道为什么
//	addEvent(boxNode, "click", function(event){
//		var e = event || window.event;
//		if (markList.indexOf(e.target) < 0){
//			markList.push(e.target);
//			e.target.style.border = "3px dotted red";
//		} else {
//			remove(markList, e.target);
//			e.target.style.border = "1px solid black";
//			
//		}
//	})
}

function init() {
	var start = new Date();
	var divOne = document.getElementById("div-one");
	createTree(divOne);	
	var preButton = document.getElementById("preorder");
	var postButton = document.getElementById("postorder");
	var searchButton = document.getElementById("search-button");
	var addButton = document.getElementById("add-button");
	var removeButton = document.getElementById("remove-button");
	addEvent(preButton, "click", function(){
		var start = new Date(); 
		i = 1;
		delay = parseInt(document.getElementById("delay").value, 10);
		preOrdering(divOne);
		var stop = new Date();
		var time = "本次操作一共用了" + (stop - start) + "ms";
		var body = preButton.parentNode;
		var loadTime = document.createElement("div");
		loadTime.appendChild(document.createTextNode(time));
		body.appendChild(loadTime);
		loadTime.style.display = "inline" ;
		loadTime.style.textAlign = "center" ;
		loadTime.style.border = "none" ;
		loadTime.style.color = "grey" ;
		setTimeout(function(){
			body.removeChild(loadTime);
		},3000)
	})
	addEvent(postButton, "click", function(){
		var start = new Date(); 
		i = 1;
		delay = parseInt(document.getElementById("delay").value, 10);
		postOrdering(divOne);
		var stop = new Date();
		var time = "本次操作一共用了" + (stop - start) + "ms";
		var body = postButton.parentNode;
		var loadTime = document.createElement("div");
		loadTime.appendChild(document.createTextNode(time));
		body.appendChild(loadTime);
		loadTime.style.display = "inline" ;
		loadTime.style.textAlign = "center" ;
		loadTime.style.border = "none" ;
		loadTime.style.color = "grey" ;	
		setTimeout(function(){
			body.removeChild(loadTime);
		},3000)		
	})
	addEvent(searchButton, "click", function(){
		var start = new Date(); 
		i = 1;
		searchMark = 0;
		searchText = document.getElementById("search-text").value.trim();
		delay = parseInt(document.getElementById("delay").value, 10);
		search(divOne, searchText);
		if (searchMark === 0) {
			setTimeout(function(){alert("很可惜没有找到！");}, (2*i+1)*delay);
		}
		var stop = new Date();
		var time = "本次操作一共用了" + (stop - start) + "ms";
		var body = searchButton.parentNode;
		var loadTime = document.createElement("div");
		loadTime.appendChild(document.createTextNode(time));
		body.appendChild(loadTime);
		loadTime.style.display = "inline" ;
		loadTime.style.textAlign = "center" ;
		loadTime.style.border = "none" ;
		loadTime.style.color = "grey" ;	
		setTimeout(function(){
			body.removeChild(loadTime);
		},3000)
	})
	addEvent(addButton, "click", function(event){
		var start = new Date(); 
		var addText = document.getElementById("add-text").value;
		var markListCopy = markList;
		markListLength = markListCopy.length;
		if (markListLength > 0) {
			for (var i = 0; i < markListLength; i++) {
				addBox(addText, markListCopy[i]);
			}
		} else {
			alert("请先选中节点!!");
		}
		var stop = new Date();
		var time = "本次操作一共用了" + (stop - start) + "ms";
		var body = addButton.parentNode;
		var loadTime = document.createElement("div");
		loadTime.appendChild(document.createTextNode(time));
		body.appendChild(loadTime);
		loadTime.style.display = "inline" ;
		loadTime.style.textAlign = "center" ;
		loadTime.style.border = "none" ;
		loadTime.style.color = "grey" ;	
		setTimeout(function(){
			body.removeChild(loadTime);
		},3000)
	})
	addEvent(removeButton, "click", function(event){
		var start = new Date(); 
		var markListCopy = markList;
		markListLength = markListCopy.length;
		if (markListLength > 0) {
			for (var i = 0; i < markListLength; i++) {
				markListCopy[i].parentNode.removeChild(markListCopy[i]);
			}
			markList = [];
		} else {
			alert("请先选中节点!!");
		}
		var stop = new Date();
		var time = "本次操作一共用了" + (stop - start) + "ms";
		var body = removeButton.parentNode;
		var loadTime = document.createElement("div");
		loadTime.appendChild(document.createTextNode(time));
		body.appendChild(loadTime);
		loadTime.style.display = "inline" ;
		loadTime.style.textAlign = "center" ;
		loadTime.style.border = "none" ;
		loadTime.style.color = "grey" ;	
		setTimeout(function(){
			body.removeChild(loadTime);
		},3000)
	})
//给divOne绑定点击事件
//	addEvent(divOne, "click", function(event){
//		var e = event || window.event;
//		e.target.style.border = "3px dotted red";
//		if (markList.indexOf(e.target) < 0){
//			markList.push(e.target);
//		}
//	})
//	addEvent(divOne, "dblclick", function(event){
//		var e = event || window.event;
//		e.target.style.border = "1px solid black";
//		remove(markList, e.target);
//	})
//单击选定，单击取消，但是貌似有bug，我也不知道为什么  
	addEvent(divOne, "click", function(event){
		var e = event || window.event;
		if (e.target.style.borderStyle == "solid"){
			markList.push(e.target);
			e.target.style.border = "3px dotted red";
		} else {
			remove(markList, e.target);
			e.target.style.border = "1px solid black";
		}
	})
// 绑定bug已修复。
//原因有2个：
//第一个是重复绑定；
//第二个是JavaScript的样式和css样式独立，所以不能用javaScript语句来判断css样式
	var stop = new Date();
	var time = "本次网页加载一共用了" + (stop - start) + "ms";
	var body = document.getElementsByTagName("body")[0];
	var loadTime = document.createElement("div");
	loadTime.appendChild(document.createTextNode(time));
	body.appendChild(loadTime);
	loadTime.style.textAlign = "center" ;
	loadTime.style.border = "none" ;
	loadTime.style.color = "grey" ;	
	setTimeout(function(){
		body.removeChild(loadTime);
	},3000)
}
window.onload=function(){
	init();
};
