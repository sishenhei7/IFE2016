/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {	
	var aqiCityValue = document.getElementById("aqi-city-input").value.trim();
	var aqiValueValue = document.getElementById("aqi-value-input").value.trim();
	var aqiCityReg = /^[a-zA-Z\u4E00-\u9FA5]+$/ ;
	var aqiValueReg = /^\d+$/ ;
	if ( !aqiCityReg.test(aqiCityValue) ){
		alert("城市名必须为中英文字符");
	}else if ( !aqiValueReg.test(aqiValueValue) ){
		alert("空气质量指数必须为整数");
	}else {
		if ( aqiCityValue ) {
		aqiData[aqiCityValue] = aqiValueValue;
	}}	
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var table = document.getElementById("aqi-table");
	table.innerHTML = null;
	var tbody = document.createElement("tbody");
	table.appendChild(tbody);
	tbody.insertRow(0);
	tbody.rows[0].insertCell(0);
	tbody.rows[0].cells[0].appendChild(document.createTextNode("城市"));
	tbody.rows[0].insertCell(1);
	tbody.rows[0].cells[1].appendChild(document.createTextNode("空气质量"));
	tbody.rows[0].insertCell(2);
	tbody.rows[0].cells[2].appendChild(document.createTextNode("操作"));
	var i = 0;
	for (data in aqiData){
		tbody.insertRow(i+1);
		tbody.rows[i+1].insertCell(0);
		tbody.rows[i+1].cells[0].appendChild(document.createTextNode(data));
		tbody.rows[i+1].insertCell(1);
		tbody.rows[i+1].cells[1].appendChild(document.createTextNode(aqiData[data]));
		tbody.rows[i+1].insertCell(2);
		var aqiDataButton = document.createElement("button");
		aqiDataButton.appendChild(document.createTextNode("删除"));
		tbody.rows[i+1].cells[2].appendChild(aqiDataButton);
		i++;
		}
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
	var aqiCity = document.getElementById("aqi-city-input");
	var aqiValue = document.getElementById("aqi-value-input");
	addAqiData();
	renderAqiList();
	aqiCity.value = "";
	aqiValue.value = "";
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(event) {
  // do sth.
	var city = event.target.parentNode.parentNode.firstChild.innerText;
	delete aqiData[city];
	renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数

  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
	var addBtn=document.getElementById("add-btn");
	var addTable=document.getElementById("aqi-table");
	var EventUtil={
		addHandler:function(element,type,handler){
			if (element.addEventListener){
				element.addEventListener(type,handler,false);
			} else if (element.attachEvent){
				element.attachEvent("on"+type,handler);
			} else {
				element["on"+type]=handler;
			}
		},
	};
	EventUtil.addHandler(addBtn,"click",addBtnHandle);
	EventUtil.addHandler(addTable,"click",delBtnHandle);
}

window.onload = function(){
	init();
}

