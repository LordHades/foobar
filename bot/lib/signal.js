module.exports = {
	greet: function(data){
		try{
			var user = data.user[0];
			var welcome = 'Welcome to ' + roomname + ' @' + user.name;
			var greeting;
			if(queue_mode){
				greeting = welcome + ' ' + queue_msg;
			}else if(battle_mode){
				greeting = welcome + ' ' + battle_msg;
			}else{
				greeting = welcome +  " "  + botgreet;
			}
			if(user.userid == botid){
				console.log('> running...');
                return;
			}
            bot.pm(greeting, user.userid);
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
			if(debug){
				console.log('signal(call) running...');
			}
		}catch(err){
			console.log('error in signal(call)...');
			bot.signal.error(err);
		}
	},
	album: function(data){
		try{
			if(game_mode){
				bot.talk('title: ' + title);
				var album1 = setTimeout(function () { 
					bot.talk('artist: ' + artist);
				}, 150);
				var album2 = setTimeout(function () { 
					bot.talk('album: ' + album);
				}, 300);
				var album3 = setTimeout(function () { 
					bot.talk('cover art: ' + cover);
				}, 450);
				var album4 = setTimeout(function () { 
					bot.talk('date: ' + date);
				}, 600);
			}else{
				bot.talk('stats mode is off...');
			}
		}catch(err){
			console.log('error in signal(album)...');
			bot.signal.error(err);
		}
	},
	random: function(array){
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
	cats: function(data){
		try{
			if(game_mode){
				bot.$.ajax({
					url: 'http://catfacts.nodester.com/',
					dataType: "json",
					type: "GET",
					success: function(result) {
						bot.talk(result.catFacts);
					}
				});
			}else{
				bot.talk('game mode is off...');
			}
		}catch(err){
			console.log('error in signal(cats)...');
			bot.signal.error(err);
		}	
	},
	quotes: function(data){
		try{
			if(game_mode){
				bot.$.ajax({
					url: 'http://iheartquotes.com/api/v1/random?source=liberty+forrestgump+xfiles+futurama+simpsons_chalkboard+starwars+hitchhiker',
					dataType: "json",
					type: "GET",
					success: function(result){
						bot.talk(result);
					},
					error: function(err){
						bot.talk(err.responseText);
					}
				});
			}else{
				bot.talk('game mode is off...');
			}
		}catch(err){
			console.log('error in signal(quotes)...');
			bot.signal.error(err);
		}
	},
	quakes: function(data){
		try{
			if(game_mode){
				bot.$.ajax({
					url: 'http://www.seismi.org/api/eqs?limit=3',
					dataType: "json",
					type: "GET",
					success: function(result) {
						var quakes = result.earthquakes;
							bot.talk(quakes[0].region + " had a " + quakes[0].magnitude + " quake @" + quakes[0].timedate);
						setTimeout(function(){
							bot.talk(quakes[1].region + " had a " + quakes[1].magnitude + " quake @" + quakes[1].timedate);
						});
						setTimeout(function(){
							bot.talk(quakes[2].region + " had a " + quakes[2].magnitude + " quake @" + quakes[2].timedate);
						});
					}
				});
			}else{
				bot.talk('game mode is off...');
			}
		}catch(err){
			console.log('error in signal(quakes)...');
			bot.signal.error(err);
		}
	},
	joke: function(data){
		try{
			if(game_mode){
				bot.$.ajax({
					url: 'http://iheartquotes.com/api/v1/random?source=riddles',
					dataType: "json",
					type: "GET",
					success: function(result){
						bot.talk(result);
					},
					error: function(err){
						bot.talk(err.responseText);
					}
				});
			}else{
				bot.talk('game mode is off...');
			}
		}catch(err){
			console.log('error in signal(joke)...');
			bot.signal.error(err);
		}
	},
	weed: function(data){
		try{
			if(game_mode){
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
			}else{
				bot.talk('game mode is off...');
			}
		}catch(err){
			console.log('error in signal(weed)...');
			bot.signal.error(err);
		};
	},
	google: function(data){
		try{
			if(game_mode){
				if(text.match(/.google/)){
					var msg;
					var index = text.indexOf('/');
					if(index >= 0){
						sym = '/';
					}else{
						sym = '.';
					}
					msg = text.split( sym + 'google');
					var item = msg[1];
					if(item !== undefined){
						var search = item.replace(/ /g,'+');
						var ggl = 'http://lmgtfy.com/?q=' + search;
						bot.talk(ggl);
					}else if(err >= 1){
						bot.talk('i\'m sorry @' + name + ' i cannot let you do that');
						err = 0;
					}
				}
			}else{
				bot.talk('game mode is off...');
			}
		}catch(err){
			console.log('error in signal(google)...');
			bot.signal.error(err);
		}
	},
    order: function(data){
		try{
			if(game_mode){
			    var item;
    			var index = text.indexOf('/');
				if(index >= 0){
					sym = '/';
				}else{
					sym = '.';
				}
			    item = text.split( sym + 'order ');
				var order = item[1];
				if(order !== undefined){
                    bot.menu.server(data, order);
				}else if(err >= 1){
					bot.talk('i\'m sorry @' + name + ' i cannot let you do that');
					err = 0;
				}
			}else{
				bot.talk('game mode is off...');
			}
		}catch(err){
			console.log('error in signal(order)...');
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
			console.log('tweet(post) running...');
		}catch(err){
			console.log('error in tweet(post)...');
		}
	},
	define: function(data){
		try{
			if(game_mode){
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
				bot.talk('game mode is off...');
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
                                bot.speak(str.join("") + " @" + name);
                            }, 1000);
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
	features: function(id){
		try{
			features = [
				{
					name: "queue mode",
					value: queue_mode
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
                            str += (' ' + features[i].name + ' ');
                        }
                    }
                    bot.speak(str);
            }, 500);
        
			if(debug){
				console.log('signal(features) running...');
			}
		}catch(err){
			console.log('error in signal(features)...');
			bot.signal.error(err);
		}
	},
	rules: function(data){
		try{
			if(battle_mode){
				bot.talk(battle_msg);
			}else if(queue_mode){
				bot.talk(queue_msg);
			}else{		
				for(i in rules){
					bot.talk(rules[i]);
				}
			}
			if(debug){
				console.log('signal(rules) running...');
			}
		}catch(err){
			console.log('error in signal(rules)...');
			bot.signal.error(err);
		}
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
			console.log(time + ' ' + name + ': ' + data.text);
			if(debug){
				console.log('signal(log) running...');
			}
		}catch(err){
			console.log('error in signal(log)...');
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