//根据id查找元素的函数
var $ = function(id) {
    return document.getElementById(id)
};

//建立闭包存放全局变量
var golElement = {};
var golInitial = function() {
    golElement.tagSection = $("tag-section");
    golElement.tagboxesSection = $("tagboxes-section");
    golElement.hobbySection = $("hobby-section");
    golElement.hobbyboxesSection = $("hobbyboxes-section");
	golElement.inputTag = $("input-tag");
	golElement.hobbyText = $("hobby-text");
	golElement.confirmButton = $("confirm-button");
	golElement.hobbyText.setAttribute("placeholder", "请输入兴趣爱好!(最多10个)");
	golElement.hobbyText.setAttribute("cols", "45");
	golElement.inputTag.focus();
	golElement.tagSection.style.marginBottom = "-10px";
	golElement.tagboxesSection.style.marginBottom = "80px";
	golElement.hobbySection.style.marginBottom = "-10px";
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
};

//增加一个box并渲染
var addBox = function(content) {
    var box = document.createElement("div");
    box.style.color = "white";
    box.style.backgroundColor = "#61c5fe";
    box.style.height = "25px";
    box.style.textAlign = "center";
    box.style.display = "inline-block";
    box.style.fontSize = "20px";
    box.style.verticalAlign = "middle";
	box.style.marginRight = "10px";
	box.style.marginTop = "20px";
	box.style.float = "left";
	box.style.cursor = "pointer";
    box.appendChild(document.createTextNode(content));
    addEvent(box,"click", boxRemove);
	addEvent(box,"mouseover", boxMouseover);
	addEvent(box,"mouseout", boxMouseout);
    return box;
};

//确保输入内容
var boxText = function(){
	if (golElement.hobbyText.value == "") {
		alert("请输入内容啦！！！");
		return false;
	} else {
		return true;
	}
};

//对取得的NodeList去重(没有删去，只是弄成了空字符)
var removeDup = function(boxes , boxesLength){
	var i,j;
	for (i = boxesLength-1; i >= 0; i--) {
		for (j = 0; j < i; j++) {
			if (boxes[i].trim() === boxes[j].trim()) {
				boxes[i] = "";
			}
		}
	return boxes;
	}
}


//返回所有子节点的内容（数组）
var childContents = function(nodeList){
	var nodeListLength = nodeList.length;
	var i,content;
	var list = [];
	for (i = 0; i < nodeListLength; i++){
		content = nodeList[i].innerHTML;
		list.push(content);
	}
	return list;
}

//给各个按钮添加事件
var buttonClick = function() {
	addEvent(golElement.inputTag,"keyup", tagKeyDown);
	addEvent(golElement.confirmButton,"click", hobbyClick);
};

//点击红色框框会删除它的事件
var boxRemove = function(event) {
	var e = event || window.event || arguments.callee.caller.arguments[0];
    e.target.parentNode.removeChild(e.target);
};

//鼠标悬停事件
var boxMouseover = function(event){
	var e = event || window.event || arguments.callee.caller.arguments[0];
	e.target.insertBefore(document.createTextNode("删除"),e.target.firstChild);
	e.target.style.backgroundColor = "red";
}

//鼠标移开事件
var boxMouseout = function(event){
	var e = event || window.event || arguments.callee.caller.arguments[0];
	e.target.removeChild(e.target.firstChild);
	e.target.style.backgroundColor = "#61c5fe";
}

//tag的键盘事件
var tagKeyDown = function(){
	var nullStr = 0;
	var box, tagBoxText;
	var e = event || window.event || arguments.callee.caller.arguments[0];
	var tagList = childContents(golElement.tagboxesSection.getElementsByTagName("div"));
	var tagCount = tagList.length;
	if(e && (e.keyCode === 13 || e.keyCode === 32 || e.keyCode === 188)){
		tagCount++;
		tagBoxText = golElement.inputTag.value.trim();
		if (tagBoxText === "" || tagList.indexOf(tagBoxText) >= 0){
			nullStr = 1;
		} else if (tagCount > 10) {
			tagCount--;
			box = addBox(tagBoxText);
			golElement.tagboxesSection.appendChild(box);
			golElement.tagboxesSection.removeChild(golElement.tagboxesSection.firstChild);
		} else {
			box = addBox(tagBoxText);
			golElement.tagboxesSection.appendChild(box);
		}
		if (nullStr > 0){
			alert("您没有输入内容或者您输入的内容与之前的重复！");
		}
	golElement.inputTag.value = null;
	golElement.inputTag.focus();
    }
}

//兴趣爱好输入框事件
var hobbyClick = function(){
	var nullStr = 0;
	var i, box, boxesLength;
	var hobbyList = childContents(golElement.hobbyboxesSection.getElementsByTagName("div"));
	var hobbyCount = hobbyList.length;
	if (!boxText()) {
		golElement.hobbyText.value = null;
		golElement.hobbyText.focus();
	} else {
		boxes = golElement.hobbyText.value.split(/[^\u4e00-\u9fa5\w]/);
		boxesLength = boxes.length;
		boxes = removeDup(boxes , boxesLength);
		for (i = 0; i < boxesLength; i++) {
			hobbyCount++;
			if (boxes[i].trim() === "" || hobbyList.indexOf(boxes[i].trim()) >= 0){
				nullStr = 1;	
			} else if (hobbyCount > 10) {
				hobbyCount--;
				box = addBox(boxes[i].trim());
				golElement.hobbyboxesSection.appendChild(box);
				golElement.hobbyboxesSection.removeChild(golElement.hobbyboxesSection.firstChild);
			} else {
				box = addBox(boxes[i]);
				golElement.hobbyboxesSection.appendChild(box);
			}
		}
		if (nullStr > 0){
			alert("已自动删去无效输入和重复输入");
		}
		golElement.hobbyText.value = null;
		golElement.hobbyText.focus();
	}
};

function init() {
    golInitial();
    buttonClick();
};

window.onload = function() {
    init();
};