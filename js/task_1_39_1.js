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

//给thead，tbody或tfoot插入一行
function createTableRow (theadTbodyTfoot, array) {
	
	var row = theadTbodyTfoot.insertRow();
	for (var i = 0, j = array.length; i < j; i++) {
		var cell = row.insertCell();
		cell.appendChild(document.createTextNode(array[i]));
	}
	
}

//生成一个table,接受一个数组
function createTable (array) {
	
	var myTable = document.createElement('table');
	var myThead = document.createElement('thead');
	var myTbody = document.createElement('tbody');
	
	createTableRow (myThead, array[0]);
	for (var i = 1, j = array.length; i < j; i++) {
		createTableRow (myTbody, array[i]);
	}	
	
	myTable.appendChild(myThead);
	myTable.appendChild(myTbody);
	
	return myTable;
	
}

//默认排序接口
function defaultSort (event) {
	var e = event || window.event;
	var table = document.getElementsByTagName('table')[0];
	var thead = document.getElementsByTagName('thead')[0];
	var tbody = document.getElementsByTagName('tbody')[0];
	var theadCells = thead.rows[0].cells;
	var tbodyRows = tbody.rows;
	
	//找出是第几列
	var cols = -1;
	for (var i = 1, j = theadCells.length; i < j; i++) {
		if (e.target == theadCells[i]) {
			cols = i;
		}
	}
	
	//把tbody的每一行储存在数组中
	var tbodyList = [];
	var tbodyListCopy = [];
	for (var i = 0, j = tbodyRows.length; i < j; i++) {
		tbodyList[i] = tbodyRows[i];
		tbodyListCopy[i] = tbodyRows[i];
	}
	
	//对tbodyList排序
	tbodyList.sort(function (a, b) {
		return (parseInt(a.cells[cols].innerHTML, 10) - parseInt(b.cells[cols].innerHTML, 10));
	})
	
	//判断tbodyList是否变化
	var sortOrNot = true;
	for (var i = 0, j = tbodyList.length; i < j; i++) {
		if (tbodyList[i].cells[0] != tbodyListCopy[i].cells[0]) {
			sortOrNot = false;
		}
	}
	
	//如果没变那么反向排序
	if (sortOrNot) {
		tbodyList.sort(function (a, b) {
		return (parseInt(b.cells[cols].innerHTML, 10) - parseInt(a.cells[cols].innerHTML, 10))
		});
	} 
	
	//将结果插到table里面
	var myTbody = document.createElement('tbody');
	for (var i = 0, j = tbodyList.length; i < j; i++) {  
        myTbody.appendChild(tbodyList[i]);  
    } 

	table.removeChild(tbody);
	table.appendChild(myTbody);
}

//获取元素到document顶部的距离
function getTop (ele) {
	var offset = ele.offsetTop;
	if(ele.offsetParent!=null) {
		offset += getTop(ele.offsetParent);
	}
	return offset;	
}

//table下部的填充物以供测试
function testInit () {
	var div = document.createElement('div');
	div.style.height = '1000px';
	div.style.backgroundColor = 'green';
	$('test-Wrapper').appendChild(div);
}

function init() {
	var tableArray = "[['姓名', '语文', '数学', '英语', '总分'], " +
                     "['小明', '80', '90', '70', '240'], " +
				     "['小红', '90', '60', '90', '240'], " +
					 "['小红1', '90', '60', '90', '240'], " +
					 "['小红2', '90', '60', '90', '240'], " +
					 "['小红3', '90', '60', '90', '240'], " +
					 "['小红4', '90', '60', '90', '240'], " +
					 "['小红5', '90', '60', '90', '240'], " +
					 "['小红6', '90', '60', '90', '240'], " +
					 "['小红7', '90', '60', '90', '240'], " +
					 "['小红8', '90', '60', '90', '240'], " +
					 "['小红9', '90', '60', '90', '240'], " +
					 "['小红10', '90', '60', '90', '240'], " +
					 "['小红11', '90', '60', '90', '240'], " +
					 "['小红12', '90', '60', '90', '240'], " +
					 "['小红13', '90', '60', '90', '240'], " +
					 "['小红14', '90', '60', '90', '240'], " +
					 "['小红15', '90', '60', '90', '240'], " +
					 "['小红16', '90', '60', '90', '240'], " +
					 "['小红17', '90', '60', '90', '240'], " +
					 "['小红18', '90', '60', '90', '240'], " +
					 "['小红191', '90', '60', '90', '240'], " +
					 "['小红192', '90', '60', '90', '240'], " +
					 "['小红193', '90', '60', '90', '240'], " +
					 "['小红194', '90', '60', '90', '240'], " +
					 "['小红195', '90', '60', '90', '240'], " +
					 "['小红196', '90', '60', '90', '240'], " +
					 "['小红197', '90', '60', '90', '240'], " +
					 "['小红198', '90', '60', '90', '240'], " +
					 "['小红199', '90', '60', '90', '240'], " +
					 "['小红190', '90', '60', '90', '240'], " +
					 "['小红1911', '90', '60', '90', '240'], " +
				     "['小亮20', '60', '100', '70', '230']]";
	testInit();
	$('input-array').value = tableArray;
	
	addEvent($('create-table-button'), 'click', function() {
		
		var array = $('input-array').value;
		
		//把字符串解析为数组
		array = eval(array);
		
		$('table-Wrapper').innerHTML = '';
		$('table-Wrapper').appendChild(createTable(array));
		
		//给表头加上点击事件
		var thead = document.getElementsByTagName('thead')[0];
		var cells = thead.rows[0].cells;
		for (var i = 1, j = cells.length; i < j; i++) {
			addEvent(cells[i], 'click', defaultSort);
		}

		//把表头智能漂浮
		var body = document.getElementsByTagName('tbody')[0];
		var docBody = document.body;
		var theadTop = getTop(thead);
		var theadBottom = getTop(body.rows[body.rows.length - 1]);
		
		addEvent(document, 'scroll', function() {
			if (docBody.scrollTop >= theadBottom) {
				thead.className = '';
			} else if (docBody.scrollTop >= theadTop) {
				thead.className = 'fixed-thead';
			} else {
				thead.className = '';
			}
		});
	});
}

window.onload=function(){
	init();
};












