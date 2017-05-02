/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: "北京",
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
	var barList=chartData[pageState.nowSelectCity][pageState.nowGraTime];
	var barListLength=Object.getOwnPropertyNames(barList).length;
  // 先创建一个背景图
	var aqiChart = document.getElementById("aqi-chart-wrap");
	aqiChart.style.height="450px";
	aqiChart.style.width="100%";
	aqiChart.style.position="absolute";
	aqiChart.style.textAlign="center";
  // 然后来画柱形
	var barWidth=100/barListLength;
	var barMaxHeight=0;
	for (var t in barList){
		if (barList[t]>barMaxHeight){
			barMaxHeight=barList[t];
		}
	}
	var i = 0;
	var barColors=["blue","pink","black","yellow","purple","red"];
	for (var t in barList){
		var bar=document.createElement("div");
		var barHeight=450*barList[t]/barMaxHeight;
		bar.setAttribute("title", t);
		bar.style.height=barHeight+"px";
		bar.style.width=barWidth+"%";
		bar.style.position="absolute";
		bar.style.bottom="0px";
		bar.style.left=(barWidth*i)+"%";
		bar.style.backgroundColor=barColors[i%6];
		aqiChart.appendChild(bar);
		i++;
	}
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 

  // 设置对应数据

  // 调用图表渲染函数
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 

  // 设置对应数据

  // 调用图表渲染函数
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
	var graTime = document.getElementById("form-gra-time");
	graTime.onclick = graTimeChange;
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
	var city = document.getElementById("city-select");
	for (var data in aqiSourceData){
		var cityOption = document.createElement("option");
		cityOption.appendChild(document.createTextNode(data));
		city.appendChild(cityOption);
	}
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
	city.onchange = citySelectChange;
}

/**
 * 初始化图表需要的数据格式
 */
function getDateMonthStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}

function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
	var weekStr="";
	var monthStr="";
	for (var c in aqiSourceData){
		var day={};
		var week={};
		var month={};
		var monthCount=0;
		var dayCount=0;	
		var weekCount=0;
		var weekDayCount=0;	
		var monthDayCount=0;	
		var weekSum=0;
		var monthSum=0;			
		var days=Object.getOwnPropertyNames(aqiSourceData[c]).length;
		for (var date in aqiSourceData[c]){
			dayCount++;
			weekDayCount++;
			monthDayCount++;
			dateToDate=new Date(date);
			day[date]=aqiSourceData[c][date];
			weekSum+=aqiSourceData[c][date];
			monthSum+=aqiSourceData[c][date];
			if (dateToDate.getDay()===6){
				weekCount++;
				weekStr=dateToDate.getFullYear() + '-' + (dateToDate.getMonth() + 1) + '-第' + weekCount + '周';
				week[weekStr]=Math.round(weekSum/weekDayCount);
				weekSum=0;
				weekDayCount=0;
			}
			if (dateToDate.getMonth()!=monthCount || dayCount===days){
				monthStr=dateToDate.getFullYear() + '-' + (monthCount+1);
				month[monthStr]=Math.round(monthSum/monthDayCount);
				monthCount++;
				monthSum=0;
				monthDayCount=0;
				weekCount=0;
			}
		}
		var cityData={};
		cityData["day"]=day;
		cityData["week"]=week;
		cityData["month"]=month;
		chartData[c]=cityData;
	}
}

/**
 * 初始化函数
 */
function init() {
	initGraTimeForm()
	initCitySelector();
	initAqiChartData();
	renderChart();
}
window.onload=function(){
	init();
};


