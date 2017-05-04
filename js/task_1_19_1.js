//根据id查找元素的函数
var $ = function(id) {
    return document.getElementById(id)
};

//建立闭包存放全局变量
var golElement = {};
var golInitial = function() {
    golElement.actionSection = $("action-section");
    golElement.blocksSection = $("blocks-section");
    golElement.inputNumber = $("input-number");
    golElement.ordering = $("ordering");
    golElement.leftIn = $("left-in");
    golElement.rightIn = $("right-in");
    golElement.leftOut = $("left-out");
    golElement.rightOut = $("right-out");
	golElement.count = 0;
};

//增加一个box并渲染
var addBox = function(number) {
	golElement.count++;
    var box = document.createElement("div");
    box.style.color = "white";
    box.style.backgroundColor = "red";
    box.style.height = number*2 + "px";
    box.style.width = "25px";
    box.style.textAlign = "center";
    box.style.display = "inline-block";
    box.style.fontSize = "20px";
    box.style.verticalAlign = "middle";
	box.style.marginRight = "5px";
	box.style.marginTop = (220 - parseInt(number)*2) + "px";
	box.style.float = "left";
    box.appendChild(document.createTextNode(number));
    box.onclick = boxRemove;
    return box;
};

//左侧入和右侧入按钮的判断逻辑
var boxText = function(){
	if (/\D/g.test(golElement.inputNumber.value)) {
		alert("只能输入数字哦！！！");
		return false;
	} else if (golElement.inputNumber.value == "") {
		alert("请先输入数字哦！！！");
		return false;
	} else if (parseInt(golElement.inputNumber.value) < 10 || parseInt(golElement.inputNumber.value) > 100) {
		alert("请输入10-100以内的数字哦！！！");
		return false;
	} else if (golElement.count >= 60) {
		alert("最多只能输入60个数字哦！！！");
		return false;
	} else {
		return true;
	}
};

//排序按钮的事件
var boxSort = function(){
	var boxes = golElement.blocksSection.getElementsByTagName("div");
	var boxesLength = boxes.length;
	for (var i = boxesLength-1; i >= 0; i--) {
		for (var j = 0; j <= i; j++){
			if (parseInt(boxes[i].innerHTML) < parseInt(boxes[j].innerHTML)) {
				golElement.blocksSection.insertBefore(boxes[i],boxes[j]);
			}
		}
	}
};

//给各个按钮添加事件
var buttonClick = function() {
    golElement.leftIn.onclick = function() {
        if (!boxText()) {
            golElement.inputNumber.value = null;
			golElement.inputNumber.focus();
		} else {
            var box = addBox(golElement.inputNumber.value);
            if (golElement.blocksSection.firstChild) {
                golElement.blocksSection.insertBefore(box, golElement.blocksSection.firstChild);
            } else {
                golElement.blocksSection.appendChild(box);
            };
            golElement.inputNumber.value = null;
			golElement.inputNumber.focus();
        };
    };
    golElement.rightIn.onclick = function() {
        if (!boxText()) {
            golElement.inputNumber.value = null;
			golElement.inputNumber.focus();
		} else {
            var box = addBox(golElement.inputNumber.value);
            golElement.blocksSection.appendChild(box);
            golElement.inputNumber.value = null;
			golElement.inputNumber.focus();
        };
    };
    golElement.leftOut.onclick = function() {
		golElement.count--;
        var fistBox = golElement.blocksSection.firstChild.innerText;
        golElement.blocksSection.removeChild(golElement.blocksSection.firstChild);
        alert(fistBox);
    };
    golElement.rightOut.onclick = function() {
		golElement.count--;
        var lastBox = golElement.blocksSection.lastChild.innerText;
        golElement.blocksSection.removeChild(golElement.blocksSection.lastChild);
        alert(lastBox);
    };
	golElement.ordering.onclick = function() {
		if (golElement.count == 0) {
			alert("请先输入数字哦");
		} else {
			boxSort();
		}
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