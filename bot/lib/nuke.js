module.exports = {
	check: function(data){
		try{
			var nuke = require('./nuke');
			launch = false;
			transmit = [];
			wiretap = 'true';
			var systems = setTimeout(function(){
				var x = transmit.indexOf('foo');
				var y = transmit.indexOf('bar');
				var z = transmit.indexOf('baz');
				if(x >= 0 && y >= 0 && z >= 0){
					launch = true;
					var count = setTimeout(function(){
						foo.nuke.countdown();
					},500);
				}else{
					launch = false;
					foo.nuke.evals();
				}
			}, 5000);
			if(debug){
				console.log('nuke(check) running...');
			}
		}catch(err){
			console.log('error in nuke(check)...');
		}
	},
	countdown: function(){
		try{
			var three = setTimeout(function(){
				foo.speak('3');
			}, 1000);
			var two = setTimeout(function(){
				foo.speak('2');
			}, 2000);
			var one = setTimeout(function(){
				foo.speak('1');
			}, 3000);
			var eval = setTimeout(function(){
				foo.nuke.evals();
			}, 3500);
			if(debug){
				console.log('nuke(countdown) running...');
			}
		}catch(err){
			console.log('error in log(listen)...');
		}
	},
	evals: function(){
		try{
			wiretap = 'false';
			var controls = setTimeout(function(){
				if(launch){
					foo.nuke.launch();
					transmission = [];
				}
				else{
					foo.nuke.disarm();
					transmission = [];
				}
			}, 500);
			if(debug){
				console.log('nuke(evals) running...');
			}
		}catch(err){
			console.log('error in nuke(evals)...');
		}
	},
	disarm: function(){
		try{
			foo.speak('teh nuke was disarmed...');
			if(debug){
				console.log('nuke(disarm) running...');
			}
		}catch(err){
			console.log('error in nuke(disarm)...');
		}
	},
	launch: function(){
		try{
				foo.speak('nuclear targeting systems engaged');
			var warhead = setTimeout(function(){
				foo.speak('warhead armed');
			},1000);
			var nuked = setTimeout(function(data){
				for(i in djs){
					foo.remDj(djs[i]);
				}
			},3600);
			if(debug){
				console.log('nuke(launch) running...');
			}
		}catch(err){
			console.log('error in nuke(launch)...');
		}
	}
}