//根据id查找元素的函数
var $ = function(id) {
    return document.getElementById(id)
};

//建立闭包存放全局变量
var golElement = {};
var timer1;
var timer2;
var golInitial = function() {
    golElement.actionSection = $("action-section");
    golElement.blocksSection = $("blocks-section");
    golElement.inputText = $("input-text");
    golElement.leftIn = $("left-in");
    golElement.rightIn = $("right-in");
    golElement.leftOut = $("left-out");
    golElement.rightOut = $("right-out");
    golElement.inputQuery = $("input-query");
    golElement.queryButton = $("query-button");
	golElement.inputText.setAttribute("placeholder", "请输入内容!");
	golElement.inputText.setAttribute("cols", "45");
	golElement.inputText.focus();
	golElement.nullStr = 0;
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
    box.onclick = boxRemove;
    return box;
};

//左侧入和右侧入按钮的判断逻辑
var boxText = function(){
	if (golElement.inputText.value == "") {
		alert("请输入内容啦！！！");
		return false;
	} else {
		return true;
	}
};

//查询按钮的匹配函数
var queryMatch = function(Str){
	var queryMark = 0;
	var blockBoxes = golElement.blocksSection.getElementsByTagName("div");
	var blockBoxesLength = blockBoxes.length;
	for (var i = 0; i < blockBoxesLength; i++){
		blockBoxes[i].style.backgroundColor = "#61c5fe";
		if (blockBoxes[i].innerText.indexOf(Str) >= 0) {
			blockBoxes[i].style.backgroundColor = "red";
			queryMark = 1;
		}
	}
	if (queryMark == 0) {
		alert("没有你要找的内容哦!");
	}
}

//给各个按钮添加事件
var buttonClick = function() {
    golElement.leftIn.onclick = function() {
		golElement.nullStr = 0;
        if (!boxText()) {
            golElement.inputText.value = null;
			golElement.inputText.focus();
		} else {
			var boxes = golElement.inputText.value.split(/[^\u4e00-\u9fa5\w]/);
			var boxesLength = boxes.length;
            if (golElement.blocksSection.firstChild) {
				for (var i = boxesLength - 1; i >= 0; i--) {
					if (boxes[i] == ""){
						golElement.nullStr = 1;
					} else {
						var box = addBox(boxes[i]);
						golElement.blocksSection.insertBefore(box, golElement.blocksSection.firstChild);
					}
				}
			} else {
				for (var i = boxesLength - 1; i >= 0; i--) {
					if (boxes[i] == ""){
						golElement.nullStr = 1;
					} else {
						var box = addBox(boxes[i]);
						golElement.blocksSection.appendChild(box);
					}
				}
			}
			if (golElement.nullStr > 0){
				alert("已自动删去输入中两相邻分隔符造成的空字符串");
			}
			golElement.inputText.value = null;
			golElement.inputText.focus();
        }
    };
    golElement.rightIn.onclick = function() {
		golElement.nullStr = 0;
		if (!boxText()) {
            golElement.inputText.value = null;
			golElement.inputText.focus();
		} else {
			var boxes = golElement.inputText.value.split(/[^\u4e00-\u9fa5\w]/);
			var boxesLength = boxes.length;
            if (golElement.blocksSection.firstChild) {
				for (var i = 0; i < boxesLength; i++) {
					if (boxes[i] == ""){
						golElement.nullStr = 1;
					} else {
						var box = addBox(boxes[i]);
						golElement.blocksSection.appendChild(box);
					}
				}
			}
			if (golElement.nullStr > 0){
				alert("已自动删去输入中两相邻分隔符造成的空字符串");
			}
			golElement.inputText.value = null;
			golElement.inputText.focus();
		}
	};
    golElement.leftOut.onclick = function() {
        var fistBox = golElement.blocksSection.firstChild.innerText;
        golElement.blocksSection.removeChild(golElement.blocksSection.firstChild);
        alert(fistBox);
    };
    golElement.rightOut.onclick = function() {
        var lastBox = golElement.blocksSection.lastChild.innerText;
        golElement.blocksSection.removeChild(golElement.blocksSection.lastChild);
        alert(lastBox);
    };
	golElement.queryButton.onclick = function() {
		var queryStr = golElement.inputQuery.value;
		queryMatch(queryStr);
	};
};

//点击红色框框会删除它的事件
var boxRemove = function(event) {
	golElement.count--;
    golElement.blocksSection.removeChild(event.target);
};

function init() {
    golInitial();
    buttonClick();
};
window.onload = function() {
    init();
};