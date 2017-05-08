//遍历动画辅助参数
var searchMark, markBox;

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
	if (Node == null) {
		Node = document.getElementById("main");
	}
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
	addBox("cos", Node.children[1].children[1].children[0]);
	addBox("grass", Node.children[1].children[1]);
	addBox("fish", Node);
	Node.style.background = null;
}

//查找节点
var search = function(Node, searchText){
	var nodeChildren = Node.children;
	if (Node.firstChild && Node.firstChild.nodeValue.trim() == searchText) {
		Node.style.textDecoration = "underline";
		boxAppear(Node.parentNode);
		searchMark = 1;
	}
	var j = 0;
	while (nodeChildren[j]) {
		if (nodeChildren[j].nodeName.toUpperCase() === "DIV"){
			search(nodeChildren[j], searchText);
		}
		j++;
	}
}

//reset
var resetBox = function(Node){
	var j = 0;
	var nodeChildren = Node.children;
	if (Node.style.textDecoration === "underline") {
		Node.style.textDecoration = "none";		
	}
	while (nodeChildren[j]) {
		if (nodeChildren[j].nodeName.toUpperCase() === "DIV"){
			resetBox(nodeChildren[j], searchText);
		}
		j++;
	}
}

//添加一个字节点节点 
var addBox = function(addText, parentNode){
	var textNode = document.createTextNode(addText);
	var boxNode = document.createElement("div");
	boxNode.style.display = "block";
	boxNode.style.border = "none";
	boxNode.style.marginLeft = "10px";
	boxNode.appendChild(textNode);
	boxNode.style.color = "#c02c38";
	boxNode.style.textAlign = "left";
	boxNode.style.fontSize = "5px";
	boxNode.style.borderLeft = "1px dotted red";
	boxNode.style.background = "url(../photo/task_2_25_3.jpg) no-repeat top left";
	boxNode.style.paddingLeft = "20px"
	parentNode.appendChild(boxNode);
	parentNode.style.background = "url(../photo/task_2_25_1.jpg) no-repeat top left";
}
	
//添加一个兄弟节点
var addSiblingBox = function(addText, siblingNode){
	var textNode = document.createTextNode(addText);
	var boxNode = document.createElement("div");
	boxNode.style.display = "block";
	boxNode.style.border = "none";
	boxNode.style.marginLeft = "10px";
	boxNode.appendChild(textNode);
	boxNode.style.color = "#c02c38";
	boxNode.style.textAlign = "left";
	boxNode.style.fontSize = "5px";
	boxNode.style.borderLeft = "1px dotted red";
	boxNode.style.background = "url(../photo/task_2_25_3.jpg) no-repeat top left";
	boxNode.style.paddingLeft = "20px"
	siblingNode.parentNode.insertBefore(boxNode, siblingNode.nextSibling);
}

//点击时其它项颜色重置
var boxReset = function(Node){
	var j = 0;	
	Node.style.color = "#c02c38";
	while (Node.children[j]) {
		if (Node.children[j].nodeName.toUpperCase() === "DIV"){
			boxReset(Node.children[j]);	
		}
		j++;
	}
}

//隐藏子节点
var boxDisappear = function(Node){	
	var nodeLength = Node.children.length;
	for (var i = 0; i < nodeLength; i++) {
		Node.children[i].style.display = "none";
	}
}

//显示子节点
var boxAppear = function(Node){
	var nodeLength = Node.children.length;
	for (var i = 0; i < nodeLength; i++) {
		Node.children[i].style.display = "block";
	}
}

function init() {
	var start = new Date();
	createTree();	
	var main = document.getElementById("main");
	var searchButton = document.getElementById("search-button");
	var resetButton = document.getElementById("reset-button");
	var addChild = document.getElementById("add-child");
	var addSibling = document.getElementById("add-sibling");
	var removeButton = document.getElementById("remove-button");
	
	addEvent(searchButton, "click", function(){
		var start = new Date(); 
		searchMark = 0;
		searchText = document.getElementById("search-text").value.trim();
		search(main, searchText);
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
	
	addEvent(resetButton, "click", function(){
		var start = new Date(); 
		resetBox(main);
		var stop = new Date();
		var time = "本次操作一共用了" + (stop - start) + "ms";
		var body = resetButton.parentNode;
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
	
	addEvent(addChild, "click", function(event){
		var start = new Date(); 
		var addText = document.getElementById("add-text").value;
		var markBoxCopy = markBox;
		if (markBoxCopy) {
			addBox(addText, markBoxCopy);
		} else {
			alert("请先选中节点!!");
		}
		var stop = new Date();
		var time = "本次操作一共用了" + (stop - start) + "ms";
		var body = addChild.parentNode;
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
	
	addEvent(addSibling, "click", function(event){
		var start = new Date(); 
		var addText = document.getElementById("add-text").value;
		var markBoxCopy = markBox;
		if (markBoxCopy) {
			addSiblingBox(addText, markBoxCopy);
		} else {
			alert("请先选中节点!!");
		}
		var stop = new Date();
		var time = "本次操作一共用了" + (stop - start) + "ms";
		var body = addSibling.parentNode;
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

	addEvent(main, "click", function(event){
		var e = event || window.event;
		if (e.target.style.color === "rgb(192, 44, 56)"){
			boxReset(main);
			markBox = e.target;
			e.target.style.color = "#5ab43c";
		} else {
			markBox = null;
			boxReset(main);			
		}
	})
	
	addEvent(main, "dblclick", function(event){
		var e = event || window.event;
		var eLength = e.target.children.length;
		if (eLength > 0 && e.target.children[0].style.display == "block"){
			e.target.style.background = "url(../photo/task_2_25_2.jpg) no-repeat top left";
			boxDisappear(e.target);
		} else if (eLength > 0 && e.target.children[0].style.display == "none") {
			e.target.style.background = "url(../photo/task_2_25_1.jpg) no-repeat top left";	
			boxAppear(e.target);			
		}
	})
	
//性能测试
	var stop = new Date();
	var time = "本次网页加载一共用了" + (stop - start) + "ms";
	var loadTime = document.createElement("div");
	var body = document.getElementsByTagName("body")[0];
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
