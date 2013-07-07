module.exports = {
	greet: function(data){
		try{
			var user = data.user[0];
			var info = 'Welcome to ' + roomname + ' @' + user.name;
			var botstuff = ' /help for ' + botname + ' commands'
			var greeting;
			if(on){
				greeting = info + ' ' + Qinfo;
			}else if(battle){
				greeting = info + ' ' + rules;
			}else{
				greeting = info;
			}
			if(user.userid !== botid){
				bot.pm(greeting + botstuff, user.userid);
			}else{
				console.log('> running...');
			}
			if(debug){
				console.log('signal(greet) running...');
			}
		}catch(err){
			console.log('error in signal(greet)...');
			bot.signal.error(err);
		}
	},
	call: function(data){
		try{		
			var id;
			switch(data.command){
				case 'speak':
					id = data.userid;
				break;
				case 'rem_dj':
					id = data.user[0].userid;
				break;
				default: 
					if(q.length > 0){
						id = q[0].id;
					}
				break;
			}
			var djnum;
			bot.roomInfo(true, function(data) {
				djnum = data.room.metadata.djcount;
				for(i in djs){
					if(djs[i].id == id) {
						return false;
					}
				}
				if(djnum < 5){
					if(q.length > 0){
						bot.speak('You\'re up next! @' + q[0].name + ' You\'ve got 30 seconds...');
						var waitingfor = q[0].id;
						var calling = setTimeout(function() {
							if(q.length > 0 && q[0].id == waitingfor) {
								q.shift();
								bot.signal.call(data);
							}
						}, 30000);
					}
				}
			});
			if(debug){
				console.log('signal(call) running...');
			}
		}catch(err){
			console.log('error in signal(call)...');
			bot.signal.error(err);
		}
	},
	random: function(array, msg){
		try{
			var random = Math.floor(Math.random() * array.length);
			var msg = array[random];
			bot.talk(msg);	
			if(debug){
				console.log('signal(random) running...');
			}
		}catch(err){
			console.log('error in signal(random)...');
			bot.signal.error(err);
		}
	},
	weed: function(data){
		try{
			bot.$.ajax({
				url: 'http://www.leafly.com/api/strains',
				type: "GET",
				success: function(result) {
					var random = Math.floor(Math.random() * 554);
					var strain = result[random];
					var name = strain.Name;
					var category = strain.Category;
					var rating = strain.Rating;
					var url = "http://budgenius.com/";
					var effect = strain.TopEffect;
					var medical = strain.TopMedical;
					var activity = strain.TopActivity;
					var weed = name + ', rated: ' + rating + ', is a ' + category + ' and it has a ' + effect + ' high, try to ' + activity + '. It is best when smoked for ' + medical + '. ' + url;
					bot.talk(weed);
				}
			});
			if(debug){
				console.log('signal(weed) running...');
			}
		}catch(err){
			console.log('error in signal(weed)...');
			bot.signal.error(err);
		};
	},
	define: function(data){
		try{
			if(nerd){
				var word;
				var index = text.indexOf('/');
				if(index >= 0){
					sym = '/';
				}else{
					sym = '.';
				}
				word = text.split( sym + 'define ');
				var term = word[1];
				var def = 'http://api.urbandictionary.com/v0/define?term=' + term;
				bot.$.ajax({
					url: def,
					dataType: "json",
					type: "GET",
					success: function(result) {
						try{
							var response = result.list[0].definition;
							if(response !== undefined){
								bot.talk(response);
							}
						}catch(err){
							bot.talk('no results...');
						}	
					}
				});
			}else{
				bot.talk('nerd mode is off...');
			}
			if(debug){
				console.log('signal(define) running...');
			}
		}catch(err){
			console.log('error in signal(define)...');
			bot.signal.error(err);
		}
	},
	party: function(data){
		try{
			bot.roomInfo(true, function(data){
				var cur_dj = data.room.metadata.current_dj;
				var cur_pts;
				var name;
				for(i in data.users){
					if(cur_dj == data.users[i].userid){
						name = data.users[i].name;
						cur_pts = data.users[i].points;
						var random = Math.floor(Math.random() * party.length);
						var msg = party[random];
						if(cur_pts == "100"){
							bot.speak(':one: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "500"){
							bot.speak(':five: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "1000"){
							bot.speak(':one: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "2000"){
							bot.speak(':two: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "3000"){
							bot.speak(':three: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "4000"){
							bot.speak(':four: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "5000"){
							bot.speak(':five: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "6000"){
							bot.speak(':six: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "7000"){
							bot.speak(':seven: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "8000"){
							bot.speak(':eight: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "9000"){
							bot.speak(':nine: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "10000"){
							bot.speak(':one: :zero: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "11000"){
							bot.speak(':one: :one: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "12000"){
							bot.speak(':one: :two: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "13000"){
							bot.speak(':one: :three: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "14000"){
							bot.speak(':one: :four: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "15000"){
							bot.speak(':one: :five: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "16000"){
							bot.speak(':one: :six: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "17000"){
							bot.speak(':one: :seven: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "18000"){
							bot.speak(':one: :eight: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "19000"){
							bot.speak(':one: :nine: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "20000"){
							bot.speak(':two: :zero: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "21000"){
							bot.speak(':two: :one: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "22000"){
							bot.speak(':two: :two: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "23000"){
							bot.speak(':two: :three: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "24000"){
							bot.speak(':two: :four: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "25000"){
							bot.speak(':two: :five: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "26000"){
							bot.speak(':two: :six: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "27000"){
							bot.speak(':two: :seven: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "28000"){
							bot.speak(':two: :eight: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "29000"){
							bot.speak(':two: :nine: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "30000"){
							bot.speak(':three: :zero: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "31000"){
							bot.speak(':three: :one: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "32000"){
							bot.speak(':three: :two: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "33000"){
							bot.speak(':three: :three: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "34000"){
							bot.speak(':three: :four: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "35000"){
							bot.speak(':three: :five: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "36000"){
							bot.speak(':three: :six: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "37000"){
							bot.speak(':three: :seven: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "38000"){
							bot.speak(':three: :eight: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "39000"){
							bot.speak(':three: :nine: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "40000"){
							bot.speak(':four: :zero: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "41000"){
							bot.speak(':four: :one: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "42000"){
							bot.speak(':four: :two: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "43000"){
							bot.speak(':four: :three: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "44000"){
							bot.speak(':four: :four: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "45000"){
							bot.speak(':four: :five: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "46000"){
							bot.speak(':four: :six: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "47000"){
							bot.speak(':four: :seven: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "48000"){
							bot.speak(':four: :eight: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "49000"){
							bot.speak(':four: :nine: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "50000"){
							bot.speak(':five: :zero: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "60000"){
							bot.speak(':six: :zero: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "70000"){
							bot.speak(':seven: :zero: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "80000"){
							bot.speak(':eight: :zero: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "90000"){
							bot.speak(':nine: :zero: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "100000"){
							bot.speak(':one: :zero: :zero: :zero: :zero: :zero: ' + msg + ' @' + name);
						}
					}
				}
			});
			if(debug){
				console.log('signal(party) running...');
			}
		}catch(err){
			console.log('error in signal(party)...');
			bot.signal.error(err);
		}
	},
	status: function(data){
		try{
			var que = "off";
			var chat = "off";
			var arm = "disarmed";
			var fight = "off";
			var bug = "off";
			var auto = "off";
			var one = "off";
			var brain = "off";
			var annoy = "off";
			var stat = "off";
			var away = "off";
			if(chatter){
				chat = "on";
			}
			if(on){
				que = "on";
			}	
			if(armed){
				arm = "armed";
			}
			if(battle){
				fight = "on";
			}
			if(debug){
				bug = "on";
			}
			if(autodj){
				auto = "on";
			}
			if(solo){
				one = "on";
			}
			if(nerd){
				brain = "on";
			}
			if(mimic){
				annoy = "on";
			}
			if(stats){
				stat = "on";
			}
			if(afk){
				away = "on";
			}
				bot.talk('Q mode is ' + que);
			var time0 = setTimeout(function(){
				bot.talk('chat mode is ' + chat);
			}, 150);
			var time1 = setTimeout(function(){
				bot.talk('the nuke is ' + arm);
			}, 300);
			var time2 = setTimeout(function(){
				bot.talk('battle mode is ' + fight);
			}, 450);
			var time3 = setTimeout(function(){
				bot.talk('debug mode is ' + bug);
			}, 600);
			var time4 = setTimeout(function(){
				bot.talk('solo mode is ' + one);
			}, 750);
			var time5 = setTimeout(function(){
				bot.talk('nerd mode is ' + brain);
			}, 900);
			var time6 = setTimeout(function(){
				bot.talk('auto dj mode is ' + auto);
			}, 1050);
			var time7 = setTimeout(function(){
				bot.talk('mimic mode is ' + annoy);
			}, 1300);
			var time8 = setTimeout(function(){
				bot.talk('song stats are ' + stat);
			}, 1450);
			var time9 = setTimeout(function(){
				bot.talk('afk watch is ' + away);
			}, 1600);
			if(debug){
				console.log('signal(status) running...');
			}
		}catch(err){
			console.log('error in signal(status)...');
			bot.signal.error(err);
		}
	},
	rules: function(data){
		try{
			if(battle == true){
				bot.talk(rules);
			}else if(on){
				bot.talk(Qinfo);
			}else{		
				setTimeout(function(){
					bot.talk("☞ No AFK on deck! Please bop/chat");
				},150);
				setTimeout(function(){
					bot.talk("☞ 8 minute song length limit");
				},300);
				setTimeout(function(){
					bot.talk("☞Zero tolerance policy for bullshit");
				},450);
				setTimeout(function(){
					bot.talk("☞Save the Vulgar songs til later at night (EST)");
				},600);
				setTimeout(function(){
					bot.talk("☞Bop on stage plz!");
				},750);
			}
			if(debug){
				console.log('signal(rules) running...');
			}
		}catch(err){
			console.log('error in signal(rules)...');
			bot.signal.error(err);
		}
	},
	mimic: function(data){
		if(mimic){
			bot.speak(data.text);
		}
	},
	error: function(err){
		if (typeof err === 'object') {
			if (err.message) {
				console.log('\nMessage: ' + err.message)
			}
			if(err.stack){
				console.log('\nStacktrace:')
				console.log('====================')
				console.log(err.stack);
			}
		}else{
			console.log('dumpError :: argument is not an object');
		}
	}
}