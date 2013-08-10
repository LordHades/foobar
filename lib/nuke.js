module.exports = {
	check: function(data){
		try{
			var nuke = require('./nuke');
			launch = false;
			transmit = [];
			wiretap = 'true';
			var systems = setTimeout(function(){
				var x = transmit.indexOf(launchcodes[0]);
				var y = transmit.indexOf(launchcodes[1]);
				var z = transmit.indexOf(launchcodes[2]);
				if(x >= 0 && y >= 0 && z >= 0){
					launch = true;
					var count = setTimeout(function(){
						bot.nuke.countdown();
					},500);
				}else{
					launch = false;
					bot.nuke.evals();
				}
			}, 5000);
		}catch(err){
			bot.signal.error(err);
		}
	},
	countdown: function(){
		try{
			var three = setTimeout(function(){
				bot.speak('3');
			}, 1000);
			var two = setTimeout(function(){
				bot.speak('2');
			}, 2000);
			var one = setTimeout(function(){
				bot.speak('1');
			}, 3000);
			var eval = setTimeout(function(){
				bot.nuke.evals();
			}, 3500);
		}catch(err){
			bot.signal.error(err);
		}
	},
	evals: function(){
		try{
			wiretap = 'false';
			var controls = setTimeout(function(){
				if(launch){
					bot.nuke.launch();
					transmission = [];
				}
				else{
					bot.nuke.disarm();
					transmission = [];
				}
			}, 500);
		}catch(err){
			bot.signal.error(err);
		}
	},
	disarm: function(){
		try{
			bot.speak('teh nuke was disarmed...');
		}catch(err){
			bot.signal.error(err);
		}
	},
	launch: function(){
		try{
				bot.speak('nuclear targeting systems engaged');
			var warhead = setTimeout(function(){
				bot.speak('warhead armed');
			},1000);
			var nuked = setTimeout(function(data){
				for(i in djs){
					bot.remDj(djs[i]);
				}
			},3600);
		}catch(err){
			bot.signal.error(err);
		}
	}
}