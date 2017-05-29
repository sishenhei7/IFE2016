//封装getElementById
var $ = function (id) {
	return document.getElementById(id);
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
}

function init() {
	var gallery_1 = new gallery($('gallery-1'));
	gallery_1.photoes.push('../photo/task_3_43_1.jpg');
	gallery_1.init();
	
	var gallery_2 = new gallery($('gallery-2'));
	gallery_2.photoes.push('../photo/task_3_43_1.jpg');
	gallery_2.photoes.push('../photo/task_3_43_2.jpg');
	gallery_2.init();
	
	var gallery_3 = new gallery($('gallery-3'));
	gallery_3.photoes.push('../photo/task_3_43_1.jpg');
	gallery_3.photoes.push('../photo/task_3_43_2.jpg');
	gallery_3.photoes.push('../photo/task_3_43_3.jpg');
	gallery_3.init();
		
	var gallery_4 = new gallery($('gallery-4'));
	gallery_4.photoes.push('../photo/task_3_43_1.jpg');
	gallery_4.photoes.push('../photo/task_3_43_2.jpg');
	gallery_4.photoes.push('../photo/task_3_43_3.jpg');
	gallery_4.photoes.push('../photo/task_3_43_4.jpg');
	gallery_4.init();
		
	var gallery_5 = new gallery($('gallery-5'));
	gallery_5.photoes.push('../photo/task_3_43_1.jpg');
	gallery_5.photoes.push('../photo/task_3_43_2.jpg');
	gallery_5.photoes.push('../photo/task_3_43_3.jpg');
	gallery_5.photoes.push('../photo/task_3_43_4.jpg');
	gallery_5.photoes.push('../photo/task_3_43_5.jpg');	
	gallery_5.init();
		
	var gallery_6 = new gallery($('gallery-6'));
	gallery_6.photoes.push('../photo/task_3_43_1.jpg');
	gallery_6.photoes.push('../photo/task_3_43_2.jpg');
	gallery_6.photoes.push('../photo/task_3_43_3.jpg');
	gallery_6.photoes.push('../photo/task_3_43_4.jpg');
	gallery_6.photoes.push('../photo/task_3_43_5.jpg');
	gallery_6.photoes.push('../photo/task_3_43_6.jpg');
	gallery_6.init();	
}

window.onload=function(){
	init();
};












