//遍历动画辅助参数
var i, delay, searchMark;

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
//nodeChildren[0] && nodeChildren[0].nodeName.toUpperCase() === "SPAN" && 
	if (nodeChildren[0] && nodeChildren[0].firstChild.nodeValue.trim() == searchText) {
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

function init() {
	var divOne = document.getElementById("div-one");
	var preButton = document.getElementById("preorder");
	var postButton = document.getElementById("postorder");
	var searchButton = document.getElementById("search-button");
	addEvent(preButton, "click", function(){
		i = 1;
		delay = parseInt(document.getElementById("delay").value, 10);
		preOrdering(divOne);
	})
	addEvent(postButton, "click", function(){
		i = 1;
		delay = parseInt(document.getElementById("delay").value, 10);
		postOrdering(divOne);
	})
	addEvent(searchButton, "click", function(){
		i = 1;
		searchMark = 0;
		searchText = document.getElementById("search-text").value.trim();
		delay = parseInt(document.getElementById("delay").value, 10);
		search(divOne, searchText);
		if (searchMark === 0) {
			setTimeout(function(){alert("很可惜没有找到！");}, (2*i+1)*delay);
		}
	})
}
window.onload=function(){
	init();
};
