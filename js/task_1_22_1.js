//遍历动画辅助参数
var i, delay;

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
	var firstCh = Node.children[0];
	var lastCh = Node.children[1];
	setTimeout(function(){Node.style.backgroundColor = "rgb(204, 118, 216)";}, (2*i-1)*delay);
	setTimeout(function(){Node.style.backgroundColor = "white";}, (2*i)*delay);
	if (firstCh) {
		preOrdering(firstCh);
	}
	if (lastCh) {
		preOrdering(lastCh);
	}
}

//中序遍历
var inOrdering = function(Node){
	var firstCh = Node.children[0];
	var lastCh = Node.children[1];
	if (firstCh) {
		preOrdering(firstCh);
	}
	i++;
	setTimeout(function(){Node.style.backgroundColor = "rgb(204, 118, 216)";}, (2*i-1)*delay);
	setTimeout(function(){Node.style.backgroundColor = "white";}, (2*i)*delay);
	if (lastCh) {
		preOrdering(lastCh);
	}
}

//后序遍历
var postOrdering = function(Node){
	var firstCh = Node.children[0];
	var lastCh = Node.children[1];
	if (firstCh) {
		preOrdering(firstCh);
	}
	if (lastCh) {
		preOrdering(lastCh);
	}
	i++;
	setTimeout(function(){Node.style.backgroundColor = "rgb(204, 118, 216)";}, (2*i-1)*delay);
	setTimeout(function(){Node.style.backgroundColor = "white";}, (2*i)*delay);
}


function init() {
	var divOne = document.getElementById("div-one");
	var preButton = document.getElementById("preorder");
	var inButton = document.getElementById("inorder");
	var postButton = document.getElementById("postorder");
	addEvent(preButton, "click", function(){
		i = 1;
		delay = parseInt(document.getElementById("delay").value, 10);
		preOrdering(divOne);
	})
	addEvent(inButton, "click", function(){
		i = 1;
		delay = parseInt(document.getElementById("delay").value, 10);
		inOrdering(divOne);
	})
	addEvent(postButton, "click", function(){
		i = 1;
		delay = parseInt(document.getElementById("delay").value, 10);
		postOrdering(divOne);
	})
}
window.onload=function(){
	init();
};
