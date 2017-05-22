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
	var that = this;
	
	function init(){
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
	}
	return {startFlight, stopFlight};
};

//var aa = new ship;
//aa.powerSystem.startFlight();


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

//信号接收系统
ship.prototype.signalSystem = function() {
	var that = this;
	var getSignal = function(signal){
		if (that.shipId === signal.id) {
			if (signal.command === 'start') {
				that.powerSystem().startFlight();
			} else if (signal.command === 'stop') {
				that.powerSystem().stopFlight();
			} else if (signal.command === 'destroy') {
				that.selfSystem().selfDestroy();
			}
		}
	};
	return {getSignal};
};

//自爆系统
ship.prototype.selfSystem = function() {
	var that = this;
	var selfDestroy = function(){
		var universe = $("universe");
		universe.removeChild(that.airship);
	}
	return {selfDestroy};
}

//指挥官
commander = {
	ships: [],
	shipNumber: 0,
}

//模仿丢包率
var packetLoss = function(packetLossRate, transmitTime){
	var randomNumber = Math.random();
	if (randomNumber >= packetLossRate) {
		return true;
	} else {
		return false;
	}
}

//给所有飞船下达命令
var controlAllAirship = function(shipcommand){
	if (packetLoss(0.3)) {
		setTimeout(function(){
			for (var i = 0, j = commander.ships.length; i < j; i++) {
				commander.ships[i].signalSystem().getSignal(shipcommand);
			}
		}, 1000);
	}
}

//发射飞船后建立表单
var createAirshipForm = function (shipNumber) {
	var commandArea = $('command-area');
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
	commandArea.appendChild(arshipControlDiv);
	
	addEvent(arshipStart, 'click', function(){
		controlAllAirship({id: shipNumber,command: 'start'});
	});
	
	addEvent(arshipStop, 'click', function(){
		controlAllAirship({id: shipNumber,command: 'stop'});
	});
	
	addEvent(arshipDestroy, 'click', function(){
		controlAllAirship({id: shipNumber,command: 'destroy'});
		commandArea.removeChild(arshipControlDiv);
		commander.shipNumber--;
	});
}

//指挥官的发射系统
commander.launchAirship = function(){
	if (commander.shipNumber < 4) {
		commander.shipNumber++;
		airship = new ship(commander.shipNumber);
		commander.ships.push(airship);
		createAirshipForm(commander.shipNumber);
	} else {
		alert('您最多只能发射4只飞船！');
	}	
}

function init() {
	var newAirship = $("new-airship");
	addEvent(newAirship, 'click', commander.launchAirship);

}

window.onload=function(){
	init();
};
