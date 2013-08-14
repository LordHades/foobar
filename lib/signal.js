module.exports = {
	greet: function(data){
		try{
			var user = data.user[0];
			var welcome = 'Welcome to ' + roomname + ' @' + user.name;
			var greeting;
			for(i in mods){
				if(user.userid == mods[i]){
					greeting = modgreet + " , theme is: " + theme;
					bot.pm(greeting, user.userid);
					return;
				}
			}
			if(queue_mode){
				greeting = welcome + " " + queue_msg + " , the theme is: " + theme;
			}else if(battle_mode){
				greeting = welcome + " " + battle_msg + " , the theme is: " + theme;
			}else{
				greeting = welcome +  " "  + botgreet + " , the theme is: " + theme;
			}
			if(user.userid == botid){
				console.log('> running...');
                return;
			}
            bot.pm(greeting, user.userid);
		}catch(err){
			bot.signal.error(err);
		}
	},
	theme: function(data){
		if(theme == ''){
			bot.speak(theme);
		}else{
			bot.speak('the theme is ' + theme);
		}
	},
	meow: function(data){
		bot.roomInfo(true, function(data) {
			var currentDjName = data.room.metadata.current_song.djname;
			bot.speak('>^..^< @' + currentDjName);
		});
	},
	rage: function(data){
		var index = ragers.indexOf(data.userid);
		if(index == -1){	
			bot.roomInfo(true, function(data) {
				var currentDjName = data.room.metadata.current_song.djname;
				bot.speak("(╯°□°)╯︵ @" + currentDjName);
		        var raging = setTimeout(function(){
		            bot.speak("http://goo.gl/eZH5r");
		        }, 300);
			});
			ragers.push(data.userid);		
		}
		else{
			bot.speak('stop being a :trollface: @' + data.name);
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
						bot.speak('You\'re up next! @' + q[0].name + ' You\'ve got ' + ((queue_wait_time * 1000) / 1000 ) + ' seconds...');
						var waitingfor = q[0].id;
						var calling = setTimeout(function() {
							if(q.length > 0 && q[0].id == waitingfor) {
								q.shift();
								bot.signal.call(data);
							}
						}, (queue_wait_time * 1000));
					}
				}
			});
		}catch(err){
			bot.signal.error(err);
		}
	},
	album: function(data){
		try{
			bot.speak('title: ' + title);
			var album1 = setTimeout(function () { 
				bot.speak('artist: ' + artist);
			}, 150);
			var album2 = setTimeout(function () { 
				bot.speak('album: ' + album);
			}, 300);
			var album3 = setTimeout(function () { 
				bot.speak('cover art: ' + cover);
			}, 450);
			var album4 = setTimeout(function () { 
				bot.speak('date: ' + date);
			}, 600);
		}catch(err){
			bot.signal.error(err);
		}
	},
	random: function(array){
		try{
			var random = Math.floor(Math.random() * array.length);
			var msg = array[random];
			bot.speak(msg);	
		}catch(err){
			bot.signal.error(err);
		}
	},
	props: function(data){
		var index = sirs.indexOf(data.userid);
		if(index == -1){
			bot.roomInfo(true, function(data) {
				var currentDjName = data.room.metadata.current_song.djname;
				bot.speak(':clap: @' + currentDjName);
				sirs.push(data.userid);
			});
		}
		else{
			bot.speak('stop being a :trollface:');
		}
	},
	meow: function(data){
		bot.roomInfo(true, function(data) {
			var currentDjName = data.room.metadata.current_song.djname;
			bot.speak('>^..^< @' + currentDjName);
		});
	},
	fan: function(data){
		bot.becomeFan(data.userid, function(res) {
			if(res.success){
				bot.speak(':star: @' + data.name);
				bot.becomeFan(data.userid);
			}else{
				bot.speak('I already fanned u @' + data.name);
			}
		});
	},
	list: function(data){
		if(queue_mode){
			bot.queue.print();
		}else if(battle_mode){
			bot.djbattle.print();
		}
		else{
			bot.speak(ffa_msg);
		}
	},
	cats: function(data){
		try{
			bot.$.ajax({
				url: ' http://catfacts-api.appspot.com/api/facts',
				dataType: "json",
				type: "GET",
				success: function(result) {
					bot.speak(result.facts);
				}
			});bot.speak('game mode is off...');
		}catch(err){
			bot.signal.error(err);
		}	
	},
	quotes: function(data){
		try{
			bot.$.ajax({
				url: 'http://iheartquotes.com/api/v1/random?source=liberty+forrestgump+xfiles+futurama+simpsons_chalkboard+starwars+hitchhiker',
				dataType: "json",
				type: "GET",
				success: function(result){
					bot.speak(result);
				},
				error: function(err){
					bot.speak(err.responseText);
				}
			});
		}catch(err){
			bot.signal.error(err);
		}
	},
	quakes: function(data){
		try{
			bot.$.ajax({
				url: 'http://www.seismi.org/api/eqs?limit=3',
				dataType: "json",
				type: "GET",
				success: function(result) {
					var quakes = result.earthquakes;
						bot.speak(quakes[0].region + " had a " + quakes[0].magnitude + " quake @" + quakes[0].timedate);
					setTimeout(function(){
						bot.speak(quakes[1].region + " had a " + quakes[1].magnitude + " quake @" + quakes[1].timedate);
					});
					setTimeout(function(){
						bot.speak(quakes[2].region + " had a " + quakes[2].magnitude + " quake @" + quakes[2].timedate);
					});
				}
			});
		}catch(err){
			bot.signal.error(err);
		}
	},
	joke: function(data){
		try{
			bot.$.ajax({
				url: 'http://iheartquotes.com/api/v1/random?source=riddles',
				dataType: "json",
				type: "GET",
				success: function(result){
					bot.speak(result);
				},
				error: function(err){
					bot.speak(err.responseText);
				}
			});
		}catch(err){
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
					bot.speak(weed);
				}
			});
		}catch(err){
			bot.signal.error(err);
		};
	},
	google: function(data){
		try{
			if(data.text.match(/\/google/)){
				var word = data.text.split("/google ");
				var term = word[1];
				if(term !== undefined){
					var search = term.replace(/ /g,'+');
					var ggl = 'http://lmgtfy.com/?q=' + search;
					bot.speak(ggl);
				}else if(err >= 1){
					bot.speak('i\'m sorry @' + data.name + ' i cannot let you do that');
					err = 0;
				}
			}
		}catch(err){
			bot.signal.error(err);
		}
	},
	stalk: function(data){
		var msg = data.text.split('/stalk ');
		var query = msg[1];
		var id;
		if(query !== undefined){
			bot.getUserId(query, function(data){
			id = data.userid;
			});
			setTimeout(function(){
				bot.stalk(id, true, function(data){
					if(data.success == false){
						bot.speak(data.err);
						return;
					}
					bot.speak('they are hanging out in ' + data.room.name);
					setTimeout(function(){
						bot.speak('i\'m gonna go check it out...xD');
					}, 500);
					setTimeout(function(){
						bot.speak(':v:');
					}, 1000);
					setTimeout(function(){
						bot.roomDeregister();
						bot.roomRegister(data.room.roomid);
					}, 1150);
				});
			}, 750);
		}else if(err >= 1){
			bot.speak('i\'m sorry @' + data.name + ' i cannot let you do that');
			err = 0;
		}
	},
	tweeter: function(data){
		var word = data.text.split("/define ");
		var twit = word[1];
		if(twit !== undefined){
			tweeter.post('statuses/update', {
				status: tweet_trend + " " + twit + " " + tweet_mention
			}, function(err, reply) {console.log(err, reply);});
			bot.speak("https://twitter.com/" + bot_twitter);
		}else if(err >= 1){
			bot.speak('i\'m sorry @' + data.name + ' i cannot let you do that');
			err = 0;
		}
	},
	add: function(data){
		if(battle_mode){
			for(i in battle_djs){
				if(battle_djs[i].id == data.userid){
					bot.speak('you\'re already signed up @' + data.name);
					return false;
				}
			}
			bot.djbattle.add(data);
		}else if(queue_mode){
			bot.queue.add(data);
		}else{
			bot.speak(ffa_msg);
		}
	},
	remove: function(data){
		if(battle_mode){
			for(i in battle_djs){
				var id;
				if(data.command == "pmmed"){
					id = data.senderid;
				}else{
					id = data.userid;
				}
				if(battle_djs[i].id == id){
					battle_djs.splice(i, 1);
					bot.speak('@' + data.name + ' you have been removed from the battle list');
				}
			}
		}else if(queue_mode){
			bot.queue.remove(data);
		}else{
			bot.speak(ffa_msg);
		}
	},
	nuke: function(data){
		if(armed){
			var clear = false;
			var index = mods.indexOf(data.userid);
			for(i in mods){
				if(index >= 0){
					clear = true;
				}else{
					clear = false;
				}
			}
			if(clear){
				bot.speak('teh launch codes pl0x?');
				bot.nuke.check();
			}else{
				bot.speak('you do not have proper clearance @' + data.name);
			}
		}else{
			if(data.userid == botid){
				bot.signal.error(err);
			}else{
				bot.speak(':trollface:');
			}	
		}
	},
    order: function(data){
		try{
		    var word = data.text.split("/order ");
			var item = word[1];
			if(item !== undefined){
                bot.menu.server(data, item);
			}else if(err >= 1){
				bot.speak('i\'m sorry @' + data.name + ' i cannot let you do that');
				err = 0;
			}
		}catch(err){
			bot.signal.error(err);
		}
	},
	tweet: function(data){
		try{
			bot.roomInfo(true, function(data) {
				var rm = data.room.metadata;
				var roomname = data.room.name;
				var listeners = rm.listeners;
				var djcount = rm.djcount;
				var song = rm.current_song;
			    var djname = data.room.metadata.current_song.djname;	
				var title = song.metadata.song;
				var artist = song.metadata.artist;
				var tweets = [
					'i r listening to ' + title + ' by ' + artist + ' in ' + roomname ,
					djname + ' is currently playing ' + title + ' by ' + artist + ' in ' + roomname];
				var	random = Math.floor(Math.random() * tweets.length);
				msg = tweets[random];
				tweeter.post('statuses/update', {
					status: msg
				}, function(err, reply) {
					bot.signal.error(err);
				});	
			});
		}catch(err){
			bot.signal.error(err);
		}
	},
	define: function(data){
		try{
			var word = data.text.split("/define ");
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
							bot.speak(response);
						}
					}catch(err){
						bot.speak('no results...');
					}	
				}
			});
		}catch(err){
			bot.signal.error(err);
		}
	},
	party: function(data){
		try{
            bot.roomInfo(true, function(data){
				var cur_dj = data.room.metadata.current_dj;
				var cur_pts;
				var name;
				for(i in users){
					if(cur_dj == users[i].userid){
						name = users[i].name;
						cur_pts = users[i].points;
						var random = Math.floor(Math.random() * congrats_msgs.length);
						var msg = congrats_msgs[random];
                        var points = parseFloat(cur_pts);
                        if(points % 1000 === 0){
                            var str = points.toString().split("");
                            for(i in str){
                                switch(str[i]){
                                    case "0":
                                        str[i] = ":zero:";
                                    break;
                                    case "1":
                                        str[i] = ":one:";
                                    break;
                                    case "2":
                                        str[i] = ":two:";
                                    break;
                                    case "3":
                                        str[i] = ":three:";
                                    break;
                                    case "4":
                                        str[i] = ":four:";
                                    break;
                                    case "5":
                                        str[i] = ":five:";
                                    break;
                                    case "6":
                                        str[i] = ":six:";
                                    break;
                                    case "7":
                                        str[i] = ":seven:";
                                    break;
                                    case "8":
                                        str[i] = ":eight:";
                                    break;
                                    case "9":
                                        str[i] = ":nine:";
                                    break;
                                }
                            }
                            bot.speak(msg);
                            var congrats = setTimeout(function() {
                                bot.speak(str.join("") + " @" + user[i].name);
                            }, 1000);
                        }
					}
				}
			});
		}catch(err){
			bot.signal.error(err);
		}
	},
	features: function(id){
		try{
			features = [
				{
					name: "queue mode",
					value: queue_mode
				},
				{
					name: "auto queue",
					value: auto_queue
				},
				{
					name: "chat mode",
					value: chat_mode
				},
				{
					name: "battle mode",
					value: battle_mode
				},
				{
					name: "autodj mode",
					value: autodj_mode
				},
				{
					name: "solo mode",
					value: solo_mode
				},
				{
					name: "afk mode",
					value: afk_mode
				},
    			{
					name: "tweet mode",
					value: tweet_mode
				},
    			{
					name: "announce mode",
					value: announce_mode
				},
        		{
					name: "game mode",
					value: game_mode
				},
            	{
					name: "ttstats boot mode",
					value: stat_boot
				},
                {
					name: "troll cop",
					value: troll_cop
				},
                {
					name: "event mode",
					value: event_mode
				}
			];
            var callout = setTimeout(function(){
        			var str = "Enabled Features: ";
                    for (i in features) {
                        if(features[i].value === true){
                            str += (' ' + features[i].name + ', ');
                        }
                    }
                    bot.speak(str);
            }, 500);
		}catch(err){
			bot.signal.error(err);
		}
	},
	rules: function(data){
		try{
			if(battle_mode){
				bot.speak(battle_msg);
				var ruleset = setTimeout(function(){
					for(i in rules){
						bot.speak(rules[i]);
					}
				}, 1000);
			}else if(queue_mode){
				bot.speak(queue_msg);
					var ruleset = setTimeout(function(){
						for(i in rules){
							bot.speak(rules[i]);
						}
					}, 1000);
			}else{
				bot.speak(ffa_msg);
				setTimeout(function(){
					for(i in rules){
						bot.speak(rules[i]);
					}
				}, 1000);
			}
		}catch(err){
			bot.signal.error(err);
		}
	},
	clever: function(data){
		if(data.command == "pmmed"){
			if(data.usererid == botid){
				return;
			}	
			var cb = new bot.clever;
			cb.write(data.text,function(resp){
				bot.pm(resp.message, data.senderid);
			});
		}
	},
	troll: function(data){
		var random = Math.floor(Math.random() * memes.length);
		msg = memes[random];
		for(i in djs){
			bot.pm(msg, djs[i]);	
		}
		bot.speak('attack successful :trollface:');
	},	
	log: function(data){
		try{
			ts = new Date(),
			year = ts.getFullYear(),
			month = ts.getMonth(),
			day = ts.getDate(),
			hour = ts.getHours(),
			minutes = ts.getMinutes(),
			seconds = ts.getSeconds(),
			time = month + '/' + day + '/' + year + ' ' + hour + ':' + minutes + ':' + seconds + ' ... '
			console.log(time + ' ' + data.name + ': ' + data.text);
		}catch(err){
			bot.signal.error(err);
		}
	},
	error: function(err){
		if (typeof err === 'object') {
            if(err !== null){
    			if (err.message) {
    				console.log('\nMessage: ' + err.message)
    			}
    			if(err.stack){
    				console.log('\nStacktrace:')
    				console.log('====================')
    				console.log(err.stack);
    			}
            }
		}else{
			console.log('dumpError :: argument is not an object');
		}
	}
}