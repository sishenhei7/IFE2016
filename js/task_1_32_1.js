//封装getElementById
var $ = function (id) {
	return document.getElementById(id);
}

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

//点击事件，根据在校生和非在校生动态设置后面2个区域的显示与否
var checkStudent = function () {
	var stu = $('student');
	var uniField = $('university-field');
	var empField = $('employment-field');
	if (stu.checked) {
		uniField.style.display = "block";
		empField.style.display = "none";
	} else {
		uniField.style.display = "none";
		empField.style.display = "block";		
	}
}

//点击事件，根据省份动态设置大学显示与否
var checkProvince = function() {
	var province = $('province');
	var university = $('university');
	var provinceChar = province.value;
	var universityOption = university.children;
	var uniOptionLength = universityOption.length;
//检查university中的option的属性，如果不相等就用span包裹，相等就取出其中的option
	for (var i = 0; i < uniOptionLength; i++) {
		//先去掉span
		if (universityOption[i].nodeName.toUpperCase() === 'SPAN') {
			var getOption = universityOption[i].children[0];
			university.replaceChild(getOption, universityOption[i]);
		}
		//判断是否相等
		if (universityOption[i].className !== provinceChar) {
			var optionWrapper = document.createElement('span');
			optionWrapper.appendChild(universityOption[i].cloneNode(true));
			university.replaceChild(optionWrapper, universityOption[i]);
		}
	}
	
}

function init() {
	var stuField = $('student-field');
	var province = $('province');
	addEvent(stuField, 'click', checkStudent);
	addEvent(province, 'mouseout', checkProvince);
}
window.onload=function(){
	init();
};
