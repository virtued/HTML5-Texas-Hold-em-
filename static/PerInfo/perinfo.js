

window.get_event_position = function(e){
	if(window.touch_enable && e.touches){
		if(e.touches[0]){
			e.clientX =  e.touches[0].pageX;
			e.clientY =  e.touches[0].pageY;
		}
		else{
			e.clientX =  e.changedTouches[0].pageX;
			e.clientY =  e.changedTouches[0].pageY;
		}
	}
	return [e.clientX,e.clientY]
}
function decide_event(){
	window.event_up = "touchend";
	window.event_down = "touchstart"; 
	window.event_move = "touchmove";
	if(navigator.userAgent.match(/iPhone/i) ||
	 		navigator.userAgent.match(/Android/i) ||
			navigator.userAgent.match(/iPad/i) ||
			navigator.userAgent.match(/iPod/i) ||
			navigator.userAgent.match(/webOS/i) ||
			navigator.userAgent.match(/BlackBerry/)
	){
		event_up = "touchend";
		event_down = "touchstart"; 
		event_move = "touchmove";
		window.touch_enable = true;
	}
	else{
		event_up = "mouseup"; 
		event_down = "mousedown"; 
		event_move = "mousemove";
		window.touch_enable = false;
	}

	if( $.browser.webkit ) {
			eventTransitionEnd = "webkitTransitionEnd";
	} else if( $.browser.mozilla ) {
			eventTransitionEnd = "transitionend";
	} else if ($.browser.opera) {
			eventTransitionEnd = "oTransitionEnd";
	}
}

var info_init = function() {
	decide_event();

	window.bigframe = ["#info","#email","#market","#recharge","#friend"];

	document.getElementById('bigFrame1').style.display = "block";
	$("#info")[0].style.backgroundImage = "url(./image/left.png)";
	$("#portrait_box").click(function() {
		$("#change_por")[0].style.display = "block";
		uploadImage();
	});
	for(var i = 0; i <= bigframe.length; i++) {
		frameControl(bigframe[i], i);
	}
	recharge.drag();
};

var frameControl = function(frame, i) {
	$(frame).click(function() {	
		document.getElementById('bigFrame' + (i+1)).style.display = "block";
		for(var j = 0; j <= 4; j++) {
			if( j != i) {
				document.getElementById('bigFrame' + (j+1)).style.display = "none";
				$(bigframe[j])[0].style.backgroundImage = "";		//not "url()"
			}
		}
		if( i == 0) {
			$(frame)[0].style.backgroundImage = "url(./image/left.png)";
		}
		if( i == 4) {
			$(frame)[0].style.backgroundImage = "url(./image/right.png)";	
		}
		if( i > 0 && i < 4) {
			$(frame)[0].style.backgroundImage = "url(./image/middle.png)";	
		}
	});
};

var uploadImage = function() {
	var status = $('#status');
	$('form').ajaxForm({
		complete: function(xhr) {
			var data = JSON.parse(xhr.responseText);
			console.log(data);
			if(data.status == "success") {
				var url = "../." + data.url;
				console.log(url);
				status.html("upload success");
				var image = $('<img id="image1" src=' + url + ' />').appendTo($("#portrait_box"));
				$("#image1").css({'width': 102, 'height': 126, 'top': 6, 'left': 8, 'position': 'absolute'});
			}
		}
	});
};