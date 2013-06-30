module.exports = {
	cmds: function(data){
		try{
			if(poll == true){
				switch(data.text){
					case '+1':
					if(data.userid == currentDjId){
						foo.speak('you can\'t vote for yourself @' + data.name);
						return;
					}
					var index = voters.indexOf(data.userid);
					if(index == -1){
						for(i in battle_djs){
							if(currentDjId == battle_djs[i].id){
								voters.push(data.userid);
								++battle_djs[i].votes;
								foo.speak(battle_djs[0].name + ': ' + battle_djs[0].votes);
								setTimeout(function(){
									foo.speak(battle_djs[1].name + ': ' + battle_djs[1].votes);
								}, 250);
							}
						}
					}
					break;
				}
			}
			if(wiretap){
				transmit.push(data.text);
			}
			if(data.command == 'speak'){
				name = data.name;
				foo.talk = function(msg){
					this.speak(msg);
				}  
				if(data.userid == '51958aa5eb35c1598caf8627' || data.userid == '51785f4baaa5cd1833b1d746'){
					console.log('bot talking... : ' + data.text);
					return;
				}
			}else if(data.command == 'pmmed'){
				for(i in curusers){
					if(data.senderid == curusers[i].userid){
						name = curusers[i].name;
					}
				}
				foo.talk = function(msg){
					this.pm(msg, data.senderid);
				}
				if(chatter){
					var cb = new clever;
					cb.write(data.text,function(resp){
						foo.pm(resp.message, data.senderid);
					});
				}
			}
			text = data.text.toLowerCase();
			foo.afk.give(data);
			foo.logs.listen(data);
			foo.mod.cmds(data);
			if(text.match(/\/away/) || text.match(/\.away/) || text.match(/brb/)){
				try{
					foo.afk.get(data);
				}catch(err){
					console.log('error on chat(cmds) /away...', err);
				}
			}else if(text.match(/\/afks/) || text.match(/\.afks/)){
				try{
					foo.afk.print(data);
				}catch(err){
					console.log('error on chat(cmds) /afks...', err);
				}
			}else if(text.match(/\/fanme/) || text.match(/\.fanme/)){
				try{
					foo.becomeFan(data.userid, function(res) {
						if(res.success){
							foo.becomeFan(data.userid);
						}else{
							foo.talk('I already fanned u @' + name);
						}
					});
				}catch(err){
					console.log('error on chat(cmds) /fanme...', err);
				}
			}else if(text.match(/\/rules/) || text.match(/\.rules/)){
				try{
					foo.signal.rules(data);
				}catch(err){
					console.log('error on chat(cmds) /rules...', err);
				}
			}else if(text.match(/\/add/) || text.match(/\.add/)){
				try{
					if(battle){
						for(i in battle_djs){
							if(battle_djs[i].id == data.userid){
								foo.talk('you\'re already signed up @' + name);
								return false;
							}
						}
						foo.djbattle.add(data);
					}else if(on){
						foo.queue.add(data);
					}else{
						foo.talk('it\'s ffa, grab a spot or ask someone to hop down...');
					}
				}catch(err){
					console.log('error on chat(cmds) /add...', err);
				}
			}else if(text.match(/\/remove/) || text.match(/\.remove/)){
				try{
					if(battle){
						for(i in battle_djs){
							var id;
							if(data.command == "pmmed"){
								id = data.senderid;
							}else{
								id = data.userid;
							}
							if(battle_djs[i].id == id){
								battle_djs.splice(i, 1);
								foo.talk('@' + name + ' you have been removed from the battle list');
							}
						}
					}else if(on){
						foo.queue.remove(data);
					}else{
						foo.talk('it\'s ffa, grab a spot or ask someone to hop down...');
					}
				}catch(err){
					console.log('error on chat(cmds) /remove...', err);
				}
			}else if(text.match(/\/nuke/) || text.match(/\.nuke/)){
				try{
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
							foo.talk('teh launch codes pl0x?');
							foo.nuke.check();
						}else{
							foo.talk('you do not have proper clearance @' + name);
						}
					}else{
						if(data.userid == '51958aa5eb35c1598caf8627' || data.userid == '51785f4baaa5cd1833b1d746'){
							console.log('bot talking to bot...', err);
						}else{
							foo.talk(':trollface:', data.userid);
						}	
					}
				}catch(err){
					console.log('error on chat(cmds) /nuke...', err);
				}
			}else if(text.match(/\/next/) || text.match(/\.next/)){
				try{
					foo.song.next(data);
				}catch(err){
					console.log('error on chat(cmds) /next...', err);
				}
			}else if(text.match(/\/mc/) || text.match(/\.mc/)){
				try{
					foo.talk('http://i.qkme.me/3oybjp.jpg');
				}catch(err){
					console.log('error on chat(cmds) /mc...', err);
				}
			}else if(text.match(/\/meow/) || text.match(/\.meow/)){
				try{
					foo.roomInfo(true, function(data) {
						var currentDjName = data.room.metadata.current_song.djname;
						foo.speak('>^..^< @' + currentDjName);
					});
				}catch(err){
					console.log('error on chat(cmds) /meow...', err);
				}
			}else if(text.match(/\/props/) || text.match(/\.props/)){
				try{
					var index = sirs.indexOf(data.userid);
					if(index == -1){
						foo.roomInfo(true, function(data) {
							var currentDjName = data.room.metadata.current_song.djname;
							foo.speak(':clap: @' + currentDjName);
							sirs.push(data.userid);
						});
					}
					else{
						foo.talk('stop being a :trollface:');
					}
				}catch(err){
					console.log('error on chat(cmds) /props...', err);
				}
			}else if(text.match(/\/umad?/) || text.match(/\.umad?/)){
				try{
					foo.signal.random(memes, msg);
				}catch(err){
					console.log('error on chat(cmds) /umad?...', err);
				}
			}else if(text.match(/\/molly/) || text.match(/\.molly/)){
				try{
					foo.signal.random(molly, msg);
				}catch(err){
					console.log('error on chat(cmds) /molly...', err);
				}
			}else if(text.match(/\/cispa/) || text.match(/\.cispa/)){
				try{
					foo.signal.random(actions, msg);
				}catch(err){
					console.log('error on chat(cmds) /cispa...', err);
				}
			}else if(text.match(/\/rage/) || text.match(/\.rage/)){
				try{
					var index = ragers.indexOf(data.userid);
					if(index == -1){	
						foo.roomInfo(true, function(data) {
							var currentDjName = data.room.metadata.current_song.djname;
							foo.talk("(╯°□°)╯︵ @" + currentDjName);
					        var raging = setTimeout(function(){
					            foo.speak("http://goo.gl/eZH5r");
					        }, 300);
						});
						ragers.push(data.userid);		
					}
					else{
						foo.talk('stop being a :trollface: @' + name);
					}
				}catch(err){
					console.log('error on chat(cmds) /rage...', err);
				}
			}else if(text.match(/\/fact/) || text.match(/\.fact/)){
				try{
					foo.signal.random(facts, msg);
				}catch(err){
					console.log('error on chat(cmds) /fact...', err);
				}
			}else if(text.match(/\/quote/) || text.match(/\.quote/)){
				try{
					if(nerd){
						foo.$.ajax({
							url: 'http://iheartquotes.com/api/v1/random?source=liberty+forrestgump+xfiles+futurama+simpsons_chalkboard+starwars+hitchhiker',
							dataType: "json",
							type: "GET",
							success: function(result){
								foo.talk(result);
							},
							error: function(err){
								foo.talk(err.responseText);
							}
						});
					}else{
						foo.talk('nerd mode is off...');
					}
				}catch(err){
					console.log('error on chat(cmds) /quote...', err);
				}		
			}else if(text.match(/\/cats/) || text.match(/\.cats/)){
				try{
					foo.$.ajax({
						url: 'http://catfacts.nodester.com/',
						dataType: "json",
						type: "GET",
						success: function(result) {
							foo.talk(result.catFacts);
						}
					});
				}catch(err){
					console.log('error on chat(cmds) /cats...', err);
				}		
			}else if(text.match(/\/9001/) || text.match(/\.9001/)){
				try{
					var index = ragers.indexOf(data.userid);
					if(index == -1){
						foo.speak("┻━┻ ︵ヽ(`Д´)ﾉ︵ ┻━┻");
						ragers.push(data.userid);		
					}
					else{
						foo.talk('y u so mean? @' + name);
					}
				}catch(err){
					console.log('error on chat(cmds) /9001...', err);
				}
			}else if(text.match(/\/quakes/) || text.match(/\.quakes/)){
				try{
					foo.$.ajax({
						url: 'http://www.seismi.org/api/eqs?limit=3',
						dataType: "json",
						type: "GET",
						success: function(result) {
							var quakes = result.earthquakes;
								foo.talk(quakes[0].region + " had a " + quakes[0].magnitude + " quake @" + quakes[0].timedate);
							setTimeout(function(){
								foo.talk(quakes[1].region + " had a " + quakes[1].magnitude + " quake @" + quakes[1].timedate);
							});
							setTimeout(function(){
								foo.talk(quakes[2].region + " had a " + quakes[2].magnitude + " quake @" + quakes[2].timedate);
							});
						}
					});
				}catch(err){
					console.log('error on chat(cmds) /quakes...', err);
				}
			}else if(text.match(/\/hump/) || text.match(/\.hump/)){
				try{
					foo.hump.cannon(data);
				}catch(err){
					console.log('error on chat(cmds) /hump...', err);
				}
			}else if(text.match(/\/spud/) || text.match(/\.spud/)){
				try{
					foo.spud.cannon(data);
				}catch(err){
					console.log('error on chat(cmds) /spud...', err);
				}
			}else if(text.match(/\/tpb/) || text.match(/\.tpb/)){
				try{
					foo.signal.random(tpb, msg);
				}catch(err){
					console.log('error on chat(cmds) /tpb...', err);
				}
			}else if(text.match(/\/tank/) || text.match(/\.tank/)){
				try{
					foo.talk('●████▄▄▄▄▄▄▄▄▄▄▄ ▄▄▅████████▅▄▃▂ ██████████████████► ◥☼▲⊙▲⊙▲⊙▲⊙▲⊙▲☼◤');
				}catch(err){
					console.log('error on chat(cmds) /tank...', err);
				}
			}else if(text.match(/\/schlong/) || text.match(/\.schlong/)){
				try{
					foo.schlong.fight(data);
				}catch(err){
					console.log('error on chat(cmds) /schlong...', err);
				}
			}else if(text.match(/\/album/) || text.match(/\.album/)){
				try{
					foo.talk('title: ' + title);
					var album1 = setTimeout(function () { 
						foo.talk('artist: ' + artist);
					}, 150);
					var album2 = setTimeout(function () { 
						foo.talk('album: ' + album);
					}, 300);
					var album3 = setTimeout(function () { 
						foo.talk('cover art: ' + cover);
					}, 450);
					var album4 = setTimeout(function () { 
						foo.talk('date: ' + date);
					}, 600);
				}catch(err){
					console.log('error on chat(cmds) /album...', err);
				}
			}else if(text.match(/\/rps/) || text.match(/\.rps/)){
				try{
					foo.rps.shoot(data);
				}catch(err){
					console.log('error on chat(cmds) /rps...', err);
				}
			}else if(text.match(/\/theme/) || text.match(/\.theme/)){
				try{
					if(theme == ''){
						foo.talk('feel free to play what you like, but check the .rules');
					}else{
						foo.talk('the theme is ' + theme);
					}
				}catch(err){
					console.log('error on chat(cmds) /theme...', err);
				}
			}else if(text.match(/\/pos/gi) || text.match(/\.pos/)){
				try{
					if(on){
						foo.queue.position(data);
					}
				}catch(err){
					console.log('error on chat(cmds) .q...', err);
				}
			}else if(text.match(/\/list/) || text.match(/\.list/)){
				try{
					if(on){
						foo.queue.print();
					}else if(battle){
						foo.djbattle.print();
					}
					else{
						foo.talk('it\'s ffa, grab a spot or ask someone to hop down...');
					}
				}catch(err){
					console.log('error on chat(cmds) /print...', err);
				}
			}else if(text.match(/\/help/) || text.match(/\.help/)){
				try{
					if(data.userid !== '51785f4baaa5cd1833b1d746' || data.senderid !== '51785f4baaa5cd1833b1d746'){
						var helpmsg = '';
						var index = mods.indexOf(data.userid);
						var str = 'type "." or "/" before ';
						if(index >= 0){
							helpmsg = str + chatCommands + modCommands;
						}else if(data.userid == 'xxx'){
							helpmsg = str + chatCommands + cptCommands; 
						}else{
							helpmsg = str + chatCommands;
						}
						foo.talk(helpmsg);
					}	
				}catch(err){
					console.log('error on chat(cmds) /help...', err);
				}
			}else if(text.match(/\/joke/) || text.match(/\.joke/)){
				try{
					foo.$.ajax({
						url: 'http://iheartquotes.com/api/v1/random?source=riddles',
						dataType: "json",
						type: "GET",
						success: function(result){
							foo.talk(result);
						},
						error: function(err){
							foo.talk(err.responseText);
						}
					});
				}catch(err){
					console.log('error on chat(cmds) /quote...', err);
				}		
			}else if(text.match(/\/weed/) || text.match(/\.weed/)){
				try{
					foo.signal.weed(data);
				}catch(err){
					console.log('error on chat(cmds) /weed...', err);
				}	
			}else if(text.match(/\/blame/) || text.match(/\.blame/)){
				try{
					foo.talk('/whatever');
				}catch(err){
					console.log('error on chat(cmds) /blame...', err);
				}
			}else if(text.match(/\/thanks/) || text.match(/\.thanks/)){
				try{
					foo.talk(':) you\'re welcome @'+ name);
				}catch(err){
					console.log('error on chat(cmds) /thanks...', err);
				}
			}else if(text.match(/\/dive/) || text.match(/\.dive/)){
				try{
					foo.remDj(data.userid);
				}catch(err){
					console.log('error on chat(cmds) /dive...', err);
				}
			}else if(text.match(/\/bop/) || text.match(/\.bop/) || text.match(/\/dance/) || text.match(/\.dance/)){
				try{
					switch(data.userid || data.senderid){
						case 'xxx'://dance with vip
							foo.talk('/me bops with @' + name);
						break;
						default:
							foo.signal.random(boppin, msg);
						break;
					}
					foo.bop();
				}catch(err){
					console.log('error on chat(cmds) /dance...', err);
				}
			}else if(text.match(/\.status/) || text.match(/\/status/)){
				try{
					foo.signal.status(data);
				}catch(err){
					console.log('error on chat(cmds) /status');
				}
			}else if(text.match(/\.define/) || text.match(/\/define/)){
				try{
					foo.signal.define(data);
				}catch(err){
					console.log('error in chat(cmds) /define');
				}
			}else if(text.match(/\/google/) || text.match(/\.google/)){
				try{
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
							foo.talk(ggl);
						}else if(err >= 1){
							foo.talk('i\'m sorry @' + name + ' i cannot let you do that');
							err = 0;
						}
					}
				}catch(err){
					console.log('error on chat(cmds) /google...', err);
				}
			}
			foo.afk.listen(data);
		}catch(err){
			console.log('error in chat.js...', err);
		}	
		if(debug){
			console.log('chat(cmds) running...');
		}
	}
}