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

//返回标签下选中的单选选项
var getCheckedInput = function(id){
	var label = $(id);
	var list = label.getElementsByTagName('input');
	for (var i = 0, j = list.length; i < j; i++) {
		if (list[i].checked) {
			return list[i].value;
		}
	}
}

//动力和能源系统标签的解析器
var parsePowerAndEnergySystem = function (value) {
	switch(value) {
		case 'qianjin' :
			return ['ship-qianjin', 0.05];
		case 'benteng' :
			return ['ship-benteng', 0.07];
		case 'chaoyue' :
			return ['ship-chaoyue', 0.09];
		case 'jinliang' :
			return 0.02;
		case 'guangneng' :
			return 0.03;			
		case 'yongjiu' :
			return 0.04;						
	}
}

//动力和能源系统标签解析为汉字
var parsePowerAndEnergySystemInTable = function (value) {
	switch(value) {
		case 'qianjin' :
			return '前进号';
		case 'benteng' :
			return '奔腾号';
		case 'chaoyue' :
			return '超越号';
		case 'jinliang' :
			return '劲量型';
		case 'guangneng' :
			return '光能型';			
		case 'yongjiu' :
			return '永久型';						
	}
}

//吧飞船状态解析为二进制串
var parseCondition = function (airship) {
	var conditionSignal = [];
	switch(airship.shipId){
		case  1 :
			conditionSignal[0] = '0001';
			break;
		case  2 :
			conditionSignal[0] = '0010';
			break;
		case  3:
			conditionSignal[0] = '0100';
			break;
		case  4 :
			conditionSignal[0] = '1000';
			break;
	};
	switch(airship.state){
		case 'running' :
			conditionSignal[1] = '0001';
			break;
		case 'paused' :
			conditionSignal[1] = '0010';
			break;
		case 'destroy' :
			conditionSignal[1] = '1100';
			break;
	};
	conditionSignal[2] = (airship.energy * 100).toString(2);
	while (conditionSignal[2].length < 8) {
		conditionSignal[2] = '0' + conditionSignal[2];
	}
	conditionSignal = conditionSignal.join('');
	return conditionSignal;
}

//飞船对象
var ship = function(number){
	this.speed = 30;
	this.energy = 1;
	this.energyConsumption = 0.05;
	this.energyProduction = 0.02;
	this.state = 'paused';
	this.airship = undefined;
	this.shipId = number;
	this.shipName = "ship-" + number;
	this.energyInterval = undefined;
	this.conditionInterval = undefined;
	var that = this;
	
	function createAirship(){
		var universe = $("universe");
		var ship = document.createElement('div');
		ship.className = 'ship';
		ship.style.animationDuration = this.speed + 's';
		universe.appendChild(ship);
		var shipEnergy = document.createElement('div');
		shipEnergy.className = 'ship-energy';
		ship.appendChild(shipEnergy);
		var shipText = number + "号-" +  (that.energy*100) + "%";
		ship.appendChild(document.createTextNode(shipText));
		that.airship = ship;
	};
	
	function loadPowerSystem(){
		var powerSystemValue = getCheckedInput("power-system");
		var powerSystemSet = parsePowerAndEnergySystem(powerSystemValue);
		that.airship.className = powerSystemSet[0];
		that.energyConsumption = powerSystemSet[1];
		var powerSystemInTable = parsePowerAndEnergySystemInTable(powerSystemValue);
		var conditionTable = $('condition-table');
		var shipConditionsInTable = conditionTable.children;
		shipConditionsInTable[1 + that.shipId*5].removeChild(shipConditionsInTable[1 + that.shipId*5].firstChild);
		shipConditionsInTable[1 + that.shipId*5].appendChild(document.createTextNode(powerSystemInTable));
	};
	
	function loadEnergySystem(){
		var energySystemValue = getCheckedInput("energy-system");
		var energySystemSet = parsePowerAndEnergySystem(energySystemValue);
		that.energyProduction = energySystemSet;
		var energySystemInTable = parsePowerAndEnergySystemInTable(energySystemValue);
		var conditionTable = $('condition-table');
		var shipConditionsInTable = conditionTable.children;
		shipConditionsInTable[2 + that.shipId*5].removeChild(shipConditionsInTable[2 + that.shipId*5].firstChild);
		shipConditionsInTable[2 + that.shipId*5].appendChild(document.createTextNode(energySystemInTable));
	};	
	
	function sendConditionSignal() {
		that.conditionInterval = window.setInterval(function(){
			shipCondition = parseCondition(that);
			commander.shipConditionList[that.shipId - 1] = shipCondition;
		}, 1000);
	}
	function init() {
		createAirship();
		loadPowerSystem();
		loadEnergySystem();
		sendConditionSignal();
	}
	
	init();
};

//动力系统
ship.prototype.powerSystem = function() {
	var that = this;
	var startFlight = function(){
		that.airship.style.animationPlayState = 'running';
		that.state = 'running';
		that.energyInterval = window.setInterval(function(){
			that.energySystem().energyChange();
		}, 1000);
	};
	
	var stopFlight = function(){
		that.airship.style.animationPlayState = 'paused';
		that.state = 'paused';
		window.clearInterval(that.energyInterval);
	};
	return {startFlight, stopFlight};
};

//能源系统
ship.prototype.energySystem = function() {
	var that = this;
	var energyChange = function(){
		that.energy = that.energy + that.energyProduction - that.energyConsumption;
		that.energy = Math.round(that.energy*100)/100;
		if (that.energy <= 0) {
			that.energy = 0;
			that.powerSystem().stopFlight();
		}
		that.airship.removeChild(that.airship.lastChild);
		var shipText = that.shipId + "号-" +  Math.round(that.energy*100) + "%";
		that.airship.appendChild(document.createTextNode(shipText));
		var shipEnergy = that.airship.getElementsByClassName('ship-energy')[0];
		shipEnergy.style.width = (that.energy*120) + 'px';
	};
	return {energyChange};
}

//信号系统
ship.prototype.signalSystem = function() {
	var that = this;
	var getSignal = function(signal){
		signal = that.signalSystem().adapter(signal);
		if (that.shipId === signal.id) {
			if (signal.command === 'start' && that.state === 'paused') {
				that.powerSystem().startFlight();
			} else if (signal.command === 'stop' && that.state === 'running') {
				that.powerSystem().stopFlight();
			} else if (signal.command === 'destroy') {
				that.selfSystem().selfDestroy();
			}
		}
	};
	
	var adapter = function(signal){
		var shipIdBinary = signal.slice(0,4);
		var shipCommandBinary = signal.slice(4,8);
		var id,command;
		switch(shipIdBinary){
			case '0001' :
				id = 1;
				break;
			case '0010' :
				id = 2;
				break;
			case '0100' :
				id = 3;
				break;
			case '1000' :
				id = 4;
				break;
		};
		switch(shipCommandBinary){
			case '0001' :
				command = 'start';
				break;
			case '0010' :
				command = 'stop';
				break;
			case '1100' :
				command = 'destroy';
				break;
		};
		return {id, command};
	}
	return {getSignal, adapter};
};

//自爆系统
ship.prototype.selfSystem = function() {
	var that = this;
	var selfDestroy = function(){
		that.state = 'destroy';
		setTimeout(function(){
			var universe = $("universe");
			universe.removeChild(that.airship);	
			clearInterval(that.energyInterval);			
			clearInterval(that.conditionInterval);
		}, 1500);
	}
	return {selfDestroy};
}

//指挥官
commander = {
	ships: [],
	shipNumber: 0,
	shipIdList: [],
	shipConditionList: [],
	conditionInterval: undefined,
}

//模仿丢包率
var packetLoss = function(packetLossRate){
	var randomNumber = Math.random();
	if (randomNumber >= packetLossRate) {
		return true;
	} else {
		return false;
	}
}

//指令转化为二进制
var commanderAdapter = function(shipcommand) {
	var signal = [];
	switch(shipcommand.id){
		case  1 :
			signal[0] = '0001';
			break;
		case  2 :
			signal[0] = '0010';
			break;
		case  3:
			signal[0] = '0100';
			break;
		case  4 :
			signal[0] = '1000';
			break;
	};
	switch(shipcommand.command){
		case 'start' :
			signal[1] = '0001';
			break;
		case 'stop' :
			signal[1] = '0010';
			break;
		case 'destroy':
			signal[1] = '1100';
			break;
	};
	signal = signal.join('');
	return signal;
}

//显示传输成功或者失败
var showWhetherSpread = function(spread){
	var consoleArea = $('console-area');
	var showInformation = document.createElement('div');
	if (spread) {
		showInformation.appendChild(document.createTextNode('传输成功'));
	} else {
		showInformation.appendChild(document.createTextNode('传输失败，尝试重新传输'));
	}
	consoleArea.appendChild(showInformation);
	setTimeout(function(){
		consoleArea.removeChild(consoleArea.children[0]);
	}, 3000);
}

//给所有飞船下达命令
var spreadMediumBus = function(shipcommand){
	var signal = commanderAdapter(shipcommand);
	if (packetLoss(0.1)) {
		setTimeout(function(){
			for (var i = 0, j = commander.ships.length; i < j; i++) {
				commander.ships[i].signalSystem().getSignal(signal);
			}
		}, 300);
		showWhetherSpread(true);
	} else {
		showWhetherSpread(false);
		spreadMediumBus(shipcommand);
	}
}

//发射飞船后建立表单
var createAirshipForm = function (shipNumber) {
	var commandSubarea = $('command-subarea');
	var arshipControlDiv = document.createElement('div');
	arshipControlDiv.appendChild(document.createTextNode('对' + shipNumber + '号飞船下达命令:'));
	var arshipStart = document.createElement('button');
	arshipStart.appendChild(document.createTextNode('开始飞行'));
	var arshipStop = document.createElement('button');
	arshipStop.appendChild(document.createTextNode('停止飞行'));
	var arshipDestroy = document.createElement('button');
	arshipDestroy.appendChild(document.createTextNode('销毁'));
	arshipControlDiv.appendChild(arshipStart);
	arshipControlDiv.appendChild(arshipStop);
	arshipControlDiv.appendChild(arshipDestroy);
	commandSubarea.appendChild(arshipControlDiv);
	
	addEvent(arshipStart, 'click', function(){
		spreadMediumBus({id: shipNumber,command: 'start'});
	});
	
	addEvent(arshipStop, 'click', function(){
		spreadMediumBus({id: shipNumber,command: 'stop'});
	});
	
	addEvent(arshipDestroy, 'click', function(){
		spreadMediumBus({id: shipNumber,command: 'destroy'});
		commandSubarea.removeChild(arshipControlDiv);
		setTimeout(function(){
			commander.ships.splice(commander.shipIdList.indexOf(shipNumber), 1);
			commander.shipIdList.splice(commander.shipIdList.indexOf(shipNumber), 1);
		}, 300);
		commander.shipNumber--;
	});
}

//指挥官的发射系统
commander.launchAirship = function(){
	if (commander.shipNumber < 4) {
		commander.shipNumber++;
		var newShipNumber;
		for (var i = 4; i >= 1; i--) {
			if (commander.shipIdList.indexOf(i) === -1) {
				newShipNumber = i;
			}
		}
		airship = new ship(newShipNumber);
		commander.shipIdList.push(newShipNumber);
		commander.ships.push(airship);
		createAirshipForm(newShipNumber);
	} else {
		alert('您最多只能发射4只飞船！');
	}	
}

//根据二进制信号转化为飞船状态
var binaryToCondition = function(conditionSignal) {
	var shipIdBinary = conditionSignal.slice(0,4);
	var shipCommandBinary = conditionSignal.slice(4,8);
	var shipEnergyBinary = conditionSignal.slice(8,16);
	var id, command, energyRemain;
	switch(shipIdBinary){
		case '0001' :
			id = 1;
			break;
		case '0010' :
			id = 2;
			break;
		case '0100' :
			id = 3;
			break;
		case '1000' :
			id = 4;
			break;
	};
	switch(shipCommandBinary){
		case '0001' :
			command = '飞行中';
			break;
		case '0010' :
			command = '停止';
			break;
		case '1100' :
			command = '已销毁';
			break;
	};
	energyRemain = parseInt(shipEnergyBinary, 2) + "%";
	return {id, command, energyRemain};
}

//更新飞船状态
var updateShipCondition = function () {
	var conditionTable = $('condition-table');
	var shipConditionsInTable = conditionTable.children;
	for (var i = 0; i < 4; i++) {
		if (commander.shipConditionList[i] != undefined) {
			shipConditionsFromShips = binaryToCondition(commander.shipConditionList[i]);
			shipConditionsInTable[8 + i*5].removeChild(shipConditionsInTable[8 + i*5].firstChild);
			shipConditionsInTable[8 + i*5].appendChild(document.createTextNode(shipConditionsFromShips.command));
			shipConditionsInTable[9 + i*5].removeChild(shipConditionsInTable[9 + i*5].firstChild);
			shipConditionsInTable[9 + i*5].appendChild(document.createTextNode(shipConditionsFromShips.energyRemain));	
		}
	}
}

//每秒更新一次状态
var updateConditionPerSec = function () {
	commander.conditionInterval = window.setInterval(updateShipCondition, 1000);
}

function init() {
	var newAirship = $("new-airship");
	addEvent(newAirship, 'click', commander.launchAirship);
	updateConditionPerSec();
}

window.onload=function(){
	init();
};
