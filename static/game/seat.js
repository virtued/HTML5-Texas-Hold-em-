
function Seat(id,pos){
	var seatObj = {};
		/*
		<div id="seat0" class="seat seatPos0">
			<div class="chip">
				<div id="tstake0" class="tstake">0</div>
			</div>
			<div id="name0" class="name">name</div>
			<div id="money0" class="money">money</div>
			<div id="countdown0"></div>
		</div>
		*/
	var divSeat = $('<div class="seat"></div>');
	var divSeatbg = $('<div class="seatbg"></div>');

	var divName = $('<div class="name">name</div>');
	var divMoney = $('<div class="money">money</div>');
	var divCountdown = $('<div class="countdown"></div>');
	var divChip = $('<div class="chip"> </div>');
	var divStake = $('<div class="tstake"></div>');
	var cur_pos = "seatPos" + pos;
	divStake.appendTo(divChip);
	divSeatbg.appendTo(divSeat);
	divChip.appendTo(divSeat);
	divName.appendTo(divSeat);
	divMoney.appendTo(divSeat);
	divCountdown.appendTo(divSeat);
	divSeat.addClass(cur_pos);
	divSeat.appendTo($("#container"));
	
	var IsSat = false;
	var table = 0;
	var chips = [];
	seatObj.getIsSat = function() {
			return IsSat;
	};
	seatObj.setIsSat = function(newIsSat) {
			IsSat = newIsSat;
	};

	seatObj.sit = function(_username,_stake,_user_id) {	
				seatObj.username 	= _username;
				seatObj.stake 		= _stake;
				seatObj.userid		= _user_id;

				divName.html(_username);
				divMoney.html(_stake);
				//document.getElementById("money" + id.slice(-1)).innerHTML = _stake;
				seatObj.setIsSat(true);
	};

	seatObj.setStake = function(newstake,newtable) {
			divMoney.html(newstake);
			var diff = newtable - table;
			if(diff > 0){
				var newChip = $('<div class="chipStart"></div>');
				newChip.prependTo(divSeat);
				newChip.addClass("chip100");

				setTimeout(function(){
					newChip.addClass("chip");

				},1);
				divStake.html(newtable);
				divStake.show();
				chips.push(newChip);
			}
	};
	seatObj.clearStake = function(){
		table = 0;
		divStake.hide();
	}

	seatObj.setCountdown = function(position) {
		divCountdown.removeClass("countdown");
		divCountdown.addClass("countdown");
	//	var ct = ".countdown" + position;
		//$(ct).css('height', );
		divCountdown.show();
		//$("#countdown" + countdownID).addClass("countdown");
		divCountdown.animate({ top: '92px', height: 0}, 10000, function() {
					divCountdown.hide();
					divCountdown.removeAttr("style");
				}
		);
	};

	seatObj.removeCountdown = function(position) {
		divCountdown.stop();
		divCountdown.hide();
		divCountdown.removeAttr("style");
	};

	seatObj.getSeatDIV = function(){
		return divSeat;
	};

	seatObj.getChipDIV = function(){
		return divChip;
	};

	seatObj.setPos = function(newpos) {
		divSeat.removeClass(cur_pos);
		cur_pos = "seatPos" + newpos;
		divSeat.addClass(cur_pos);
	};
	seatObj.getChips = function(){
		return chips;
	}
	//seatObj.sendChip = function(chip)

	seatObj.id = id;
	seatObj.pos = pos;
	seatObj.setIsSat(false);

	return seatObj;
};
function seatInit(){
	window.SeatList = [];
	for(i = 0; i < 9 ;i ++){
			SeatList.push(Seat(i,i));
	}
}
