module.exports = {
	greet: function(data){
		try{
			var user = data.user[0];
			var info = 'Welcome to ' + roomname + ' @' + user.name + '. /help for @foobar commands';
			if(on){
				if(user.userid == '51958aa5eb35c1598caf8627'){
					console.log("running...");
				}
				foo.speak(info + Qinfo);
			}else{
				if(user.userid == '51958aa5eb35c1598caf8627'){
					console.log("running...");
				}
				foo.speak(info);
			}
			if(debug){
				console.log('signal(greet) running...');
			}
		}catch(err){
			console.log('error in signal(greet)...');
		}
	},
	call: function(data){
		try{
			foo.roomInfo(true, function(data) {
				var djnum = data.room.metadata.djcount;
				for(i in djs) {
					if(djs[i].id == data.userid) {
						return false;
					}
				}
				if(djnum < 5){
					if(q.length > 0 && djs.length < 5) {
						for(i in afks){
							if(afks[i].id == q[0].id){
								q.shift();
								foo.signal.call(data);
								return;
							}
						}
						foo.speak('You\'re up next! @' + q[0].name + ' You\'ve got 30 seconds...');
						var waitingfor = q[0].id;
						setTimeout(function() {
							if(q.length > 0 && q[0].id == waitingfor) {
								q.shift();
								foo.signal.call(data);
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
		}
	},
	random: function(array, msg){
		try{
			var random = Math.floor(Math.random() * array.length);
			var msg = array[random];
			foo.talk(msg);	
			if(debug){
				console.log('signal(random) running...');
			}
		}catch(err){
			console.log('error in signal(random)...');
		}
	},
	weed: function(data){
		try{
			foo.$.ajax({
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
					foo.talk(weed);
				}
			});
			if(debug){
				console.log('signal(weed) running...');
			}
		}catch(err){
			console.log('error in signal(weed)...');
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
				foo.$.ajax({
					url: def,
					dataType: "json",
					type: "GET",
					success: function(result) {
						try{
							var response = result.list[0].definition;
							if(response !== undefined){
								foo.talk(response);
							}
						}catch(err){
							foo.talk('no results...');
						}	
					}
				});
			}else{
				foo.talk('nerd mode is off...');
			}
			if(debug){
				console.log('signal(define) running...');
			}
		}catch(err){
			console.log('error in signal(define)...');
		}
	},
	party: function(data){
		try{
			foo.roomInfo(true, function(data){
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
							foo.speak(':one: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "500"){
							foo.speak(':five: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "1000"){
							foo.speak(':one: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "2000"){
							foo.speak(':two: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "3000"){
							foo.speak(':three: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "4000"){
							foo.speak(':four: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "5000"){
							foo.speak(':five: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "6000"){
							foo.speak(':six: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "7000"){
							foo.speak(':seven: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "8000"){
							foo.speak(':eight: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "9000"){
							foo.speak(':nine: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "10000"){
							foo.speak(':one: :zero: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "11000"){
							foo.speak(':one: :one: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "12000"){
							foo.speak(':one: :two: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "13000"){
							foo.speak(':one: :three: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "14000"){
							foo.speak(':one: :four: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "15000"){
							foo.speak(':one: :five: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "16000"){
							foo.speak(':one: :six: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "17000"){
							foo.speak(':one: :seven: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "18000"){
							foo.speak(':one: :eight: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "19000"){
							foo.speak(':one: :nine: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "20000"){
							foo.speak(':two: :zero: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "21000"){
							foo.speak(':two: :one: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "22000"){
							foo.speak(':two: :two: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "23000"){
							foo.speak(':two: :three: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "24000"){
							foo.speak(':two: :four: :zero: :zero: :zero: ' + msg + ' @' + name);
						}else if(cur_pts == "25000"){
							foo.speak(':two: :five: :zero: :zero: :zero: ' + msg + ' @' + name);
						}
					}
				}
			});
			if(debug){
				console.log('signal(party) running...');
			}
		}catch(err){
			console.log('error in signal(party)...');
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
				foo.talk('Q mode is ' + que);
			var time0 = setTimeout(function(){
				foo.talk('chat mode is ' + chat);
			}, 150);
			var time1 = setTimeout(function(){
				foo.talk('the nuke is ' + arm);
			}, 300);
			var time2 = setTimeout(function(){
				foo.talk('battle mode is ' + fight);
			}, 450);
			var time3 = setTimeout(function(){
				foo.talk('debug mode is ' + bug);
			}, 600);
			var time4 = setTimeout(function(){
				foo.talk('solo mode is ' + one);
			}, 750);
			var time5 = setTimeout(function(){
				foo.talk('nerd mode is ' + brain);
			}, 900);
			var time6 = setTimeout(function(){
				foo.talk('auto dj mode is ' + auto);
			}, 1050);
			if(debug){
				console.log('signal(status) running...');
			}
		}catch(err){
			console.log('error in signal(status)...');
		}
	},
	rules: function(data){
		try{
			if(battle == true){
				foo.talk(rules);
			}else if(on){
				foo.talk(Qinfo);
			}else{		
				setTimeout(function(){
					foo.talk("☞ No AFK on deck! Please bop/chat");
				},150);
				setTimeout(function(){
					foo.talk("☞ 8 minute song length limit");
				},300);
				setTimeout(function(){
					foo.talk("☞Zero tolerance policy for bullshit");
				},450);
				setTimeout(function(){
					foo.talk("☞Save the Vulgar songs til later at night (EST)");
				},600);
				setTimeout(function(){
					foo.talk("☞Bop on stage plz!");
				},750);
			}
			if(debug){
				console.log('signal(rules) running...');
			}
		}catch(err){
			console.log('error in signal(rules)...');
		}
	}
}