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
    golElement.leftIn = $("left-in");
    golElement.rightIn = $("right-in");
    golElement.leftOut = $("left-out");
    golElement.rightOut = $("right-out");
};

//增加一个box的函数
var addBox = function(number) {
    var box = document.createElement("div");
    box.style.color = "white";
    box.style.backgroundColor = "red";
    box.style.height = "50px";
    box.style.width = "50px";
    box.style.textAlign = "center";
    box.style.display = "inline-block";
    box.style.fontSize = "20px";
    box.style.lineHeight = "2.3em";
    box.style.marginRight = "10px";
    box.style.float = "left";
    box.style.marginTop = "10px";
    box.appendChild(document.createTextNode(number));
    box.onclick = boxRemove;
    return box;
};

//按钮的事件
var buttonClick = function() {
    golElement.leftIn.onclick = function() {
        if (/\D/g.test(golElement.inputNumber.value)) {
            alert("只能输入数字哦！！！");
            golElement.inputNumber.value = null;
        } else {
            var box = addBox(golElement.inputNumber.value);
            if (golElement.blocksSection.firstChild) {
                golElement.blocksSection.insertBefore(box, golElement.blocksSection.firstChild);
            } else {
                golElement.blocksSection.appendChild(box);
            };
            golElement.inputNumber.value = null;
        };
    };
    golElement.rightIn.onclick = function() {
        if (/\D/g.test(golElement.inputNumber.value)) {
            alert("只能输入数字哦！！！");
            golElement.inputNumber.value = null;
        } else {
            var box = addBox(golElement.inputNumber.value);
            golElement.blocksSection.appendChild(box);
            golElement.inputNumber.value = null;
        };
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
};

//点击红色框框会删除它的事件
var boxRemove = function(event) {
    golElement.blocksSection.removeChild(event.target);
}

function init() {
    golInitial();
    buttonClick();
}
window.onload = function() {
    init();
};