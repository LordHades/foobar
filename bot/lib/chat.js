module.exports = {
	cmds: function(data){
		try{
			if(poll == true){
				switch(data.text){
					case '+1':
					if(data.userid == currentDjId){
						bot.speak('you can\'t vote for yourself @' + data.name);
						return;
					}
					var index = voters.indexOf(data.userid);
					if(index == -1){
						for(i in battle_djs){
							if(currentDjId == battle_djs[i].id){
								voters.push(data.userid);
								++battle_djs[i].votes;
								bot.speak(battle_djs[0].name + ': ' + battle_djs[0].votes);
								setTimeout(function(){
									bot.speak(battle_djs[1].name + ': ' + battle_djs[1].votes);
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
				bot.talk = function(msg){
					this.speak(msg);
				}  
				if(data.userid == botid){
					console.log('> bot talking... : ' + data.text);
					return false;
				}
			}else if(data.command == 'pmmed'){
				for(i in curusers){
					if(data.senderid == curusers[i].userid){
						name = curusers[i].name;
					}
				}
				bot.talk = function(msg){
					this.pm(msg, data.senderid);
				}
				if(chatter){
					var cb = new clever;
					cb.write(data.text,function(resp){
						bot.pm(resp.message, data.senderid);
					});
				}
			}
			text = data.text.toLowerCase();
			bot.afk.give(data);
			bot.afk.update(data.userid);
			bot.logs.listen(data);
			bot.mod.cmds(data);
			if(text.match(/\/away/) || text.match(/\.away/) || text.match(/brb/)){
				try{
					bot.afk.get(data);
				}catch(err){
					console.log('error on chat(cmds) /away...');
					bot.signal.error(err);
				}
			}else if(text.match(/\/afks/) || text.match(/\.afks/)){
				try{
					bot.afk.print(data);
				}catch(err){
					console.log('error on chat(cmds) /afks...');
					bot.signal.error(err);
				}
			}else if(text.match(/\/fanme/) || text.match(/\.fanme/)){
				try{
					bot.becomeFan(data.userid, function(res) {
						if(res.success){
							bot.becomeFan(data.userid);
						}else{
							bot.talk('I already fanned u @' + name);
						}
					});
				}catch(err){
					console.log('error on chat(cmds) /fanme...');
					bot.signal.error(err);
				}
			}else if(text.match(/\/rules/) || text.match(/\.rules/)){
				try{
					bot.signal.rules(data);
				}catch(err){
					console.log('error on chat(cmds) /rules...');
					bot.signal.error(err);
				}
			}else if(text.match(/\/add/) || text.match(/\.add/)){
				try{
					if(battle){
						for(i in battle_djs){
							if(battle_djs[i].id == data.userid){
								bot.talk('you\'re already signed up @' + name);
								return false;
							}
						}
						bot.djbattle.add(data);
					}else if(on){
						bot.queue.add(data);
					}else{
						bot.talk('it\'s ffa, grab a spot or ask someone to hop down...');
					}
				}catch(err){
					console.log('error on chat(cmds) /add...');
					bot.signal.error(err);
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
								bot.talk('@' + name + ' you have been removed from the battle list');
							}
						}
					}else if(on){
						bot.queue.remove(data);
					}else{
						bot.talk('it\'s ffa, grab a spot or ask someone to hop down...');
					}
				}catch(err){
					console.log('error on chat(cmds) /remove...');
					bot.signal.error(err);
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
							bot.talk('teh launch codes pl0x?');
							bot.nuke.check();
						}else{
							bot.talk('you do not have proper clearance @' + name);
						}
					}else{
						if(data.userid == botid){
							console.log('bot talking to bot...');
							bot.signal.error(err);
						}else{
							bot.talk(':trollface:', data.userid);
						}	
					}
				}catch(err){
					console.log('error on chat(cmds) /nuke...');
					bot.signal.error(err);
				}
			}else if(text.match(/\/next/) || text.match(/\.next/)){
				try{
					bot.song.next(data);
				}catch(err){
					console.log('error on chat(cmds) /next...');
					bot.signal.error(err);
				}
			}else if(text.match(/\/mc/) || text.match(/\.mc/)){
				try{
					bot.talk('http://i.qkme.me/3oybjp.jpg');
				}catch(err){
					console.log('error on chat(cmds) /mc...');
					bot.signal.error(err);
				}
			}else if(text.match(/\/meow/) || text.match(/\.meow/)){
				try{
					bot.roomInfo(true, function(data) {
						var currentDjName = data.room.metadata.current_song.djname;
						bot.speak('>^..^< @' + currentDjName);
					});
				}catch(err){
					console.log('error on chat(cmds) /meow...');
					bot.signal.error(err);
				}
			}else if(text.match(/\/props/) || text.match(/\.props/)){
				try{
					var index = sirs.indexOf(data.userid);
					if(index == -1){
						bot.roomInfo(true, function(data) {
							var currentDjName = data.room.metadata.current_song.djname;
							bot.speak(':clap: @' + currentDjName);
							sirs.push(data.userid);
						});
					}
					else{
						bot.talk('stop being a :trollface:');
					}
				}catch(err){
					console.log('error on chat(cmds) /props...');
					bot.signal.error(err);
				}
			}else if(text.match(/\/umad?/) || text.match(/\.umad?/)){
				try{
					bot.signal.random(memes, msg);
				}catch(err){
					console.log('error on chat(cmds) /umad?...');
					bot.signal.error(err);
				}
			}else if(text.match(/\/molly/) || text.match(/\.molly/)){
				try{
					bot.signal.random(molly, msg);
				}catch(err){
					console.log('error on chat(cmds) /molly...');
					bot.signal.error(err);
				}
			}else if(text.match(/\/cispa/) || text.match(/\.cispa/)){
				try{
					bot.signal.random(actions, msg);
				}catch(err){
					console.log('error on chat(cmds) /cispa...');
					bot.signal.error(err);
				}
			}else if(text.match(/\/rage/) || text.match(/\.rage/)){
				try{
					var index = ragers.indexOf(data.userid);
					if(index == -1){	
						bot.roomInfo(true, function(data) {
							var currentDjName = data.room.metadata.current_song.djname;
							bot.talk("(╯°□°)╯︵ @" + currentDjName);
					        var raging = setTimeout(function(){
					            bot.speak("http://goo.gl/eZH5r");
					        }, 300);
						});
						ragers.push(data.userid);		
					}
					else{
						bot.talk('stop being a :trollface: @' + name);
					}
				}catch(err){
					console.log('error on chat(cmds) /rage...');
					bot.signal.error(err);
				}
			}else if(text.match(/\/fact/) || text.match(/\.fact/)){
				try{
					bot.signal.random(facts, msg);
				}catch(err){
					console.log('error on chat(cmds) /fact...');
					bot.signal.error(err);
				}
			}else if(text.match(/\/quote/) || text.match(/\.quote/)){
				try{
					if(nerd){
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
						bot.talk('nerd mode is off...');
					}
				}catch(err){
					console.log('error on chat(cmds) /quote...');
					bot.signal.error(err);
				}		
			}else if(text.match(/\/cats/) || text.match(/\.cats/)){
				try{
					bot.$.ajax({
						url: 'http://catfacts.nodester.com/',
						dataType: "json",
						type: "GET",
						success: function(result) {
							bot.talk(result.catFacts);
						}
					});
				}catch(err){
					console.log('error on chat(cmds) /cats...');
					bot.signal.error(err);
				}		
			}else if(text.match(/\/9001/) || text.match(/\.9001/)){
				try{
					var index = ragers.indexOf(data.userid);
					if(index == -1){
						bot.speak("┻━┻ ︵ヽ(`Д´)ﾉ︵ ┻━┻");
						ragers.push(data.userid);		
					}
					else{
						bot.talk('y u so mean? @' + name);
					}
				}catch(err){
					console.log('error on chat(cmds) /9001...');
					bot.signal.error(err);
				}
			}else if(text.match(/\/quakes/) || text.match(/\.quakes/)){
				try{
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
				}catch(err){
					console.log('error on chat(cmds) /quakes...');
					bot.signal.error(err);
				}
			}else if(text.match(/\/hump/) || text.match(/\.hump/)){
				try{
					bot.hump.cannon(data);
				}catch(err){
					console.log('error on chat(cmds) /hump...');
					bot.signal.error(err);
				}
			}else if(text.match(/\/spud/) || text.match(/\.spud/)){
				try{
					bot.spud.cannon(data);
				}catch(err){
					console.log('error on chat(cmds) /spud...');
					bot.signal.error(err);
				}
			}else if(text.match(/\/tpb/) || text.match(/\.tpb/)){
				try{
					bot.signal.random(tpb, msg);
				}catch(err){
					console.log('error on chat(cmds) /tpb...');
					bot.signal.error(err);
				}
			}else if(text.match(/\/tank/) || text.match(/\.tank/)){
				try{
					bot.talk('●████▄▄▄▄▄▄▄▄▄▄▄ ▄▄▅████████▅▄▃▂ ██████████████████► ◥☼▲⊙▲⊙▲⊙▲⊙▲⊙▲☼◤');
				}catch(err){
					console.log('error on chat(cmds) /tank...');
					bot.signal.error(err);
				}
			}else if(text.match(/\/schlong/) || text.match(/\.schlong/)){
				try{
					bot.schlong.fight(data);
				}catch(err){
					console.log('error on chat(cmds) /schlong...');
					bot.signal.error(err);
				}
			}else if(text.match(/\/album/) || text.match(/\.album/)){
				try{
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
				}catch(err){
					console.log('error on chat(cmds) /album...');
					bot.signal.error(err);
				}
			}else if(text.match(/\/rps/) || text.match(/\.rps/)){
				try{
					bot.rps.shoot(data);
				}catch(err){
					console.log('error on chat(cmds) /rps...');
					bot.signal.error(err);
				}
			}else if(text.match(/\/theme/) || text.match(/\.theme/)){
				try{
					if(theme == ''){
						bot.talk('feel free to play what you like, but check the .rules');
					}else{
						bot.talk('the theme is ' + theme);
					}
				}catch(err){
					console.log('error on chat(cmds) /theme...');
					bot.signal.error(err);
				}
			}else if(text.match(/\/pos/gi) || text.match(/\.pos/)){
				try{
					if(on){
						bot.queue.position(data);
					}
				}catch(err){
					console.log('error on chat(cmds) .q...');
					bot.signal.error(err);
				}
			}else if(text.match(/\/list/) || text.match(/\.list/)){
				try{
					if(on){
						bot.queue.print();
					}else if(battle){
						bot.djbattle.print();
					}
					else{
						bot.talk('it\'s ffa, grab a spot or ask someone to hop down...');
					}
				}catch(err){
					console.log('error on chat(cmds) /print...');
					bot.signal.error(err);
				}
			}else if(text.match(/\/help/) || text.match(/\.help/)){
				try{
					if(data.userid !== botid || data.senderid !== botid){
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
						bot.talk(helpmsg);
					}	
				}catch(err){
					console.log('error on chat(cmds) /help...');
					bot.signal.error(err);
				}
			}else if(text.match(/\/joke/) || text.match(/\.joke/)){
				try{
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
				}catch(err){
					console.log('error on chat(cmds) /quote...');
					bot.signal.error(err);
				}		
			}else if(text.match(/\/weed/) || text.match(/\.weed/)){
				try{
					bot.signal.weed(data);
				}catch(err){
					console.log('error on chat(cmds) /weed...');
					bot.signal.error(err);
				}	
			}else if(text.match(/\/blame/) || text.match(/\.blame/)){
				try{
					bot.talk('/whatever');
				}catch(err){
					console.log('error on chat(cmds) /blame...');
					bot.signal.error(err);
				}
			}else if(text.match(/\/thanks/) || text.match(/\.thanks/)){
				try{
					bot.talk(':) you\'re welcome @'+ name);
				}catch(err){
					console.log('error on chat(cmds) /thanks...');
					bot.signal.error(err);
				}
			}else if(text.match(/\/dive/) || text.match(/\.dive/)){
				try{
					bot.remDj(data.userid);
				}catch(err){
					console.log('error on chat(cmds) /dive...');
					bot.signal.error(err);
				}
			}else if(text.match(/\/bop/) || text.match(/\.bop/) || text.match(/\/dance/) || text.match(/\.dance/)){
				try{
					switch(data.userid || data.senderid){
						case 'xxxx'://dance with vip
							bot.talk('/me bops with @' + name);
						break;
						default:
							bot.signal.random(boppin, msg);
						break;
					}
					bot.bop();
				}catch(err){
					console.log('error on chat(cmds) /dance...');
					bot.signal.error(err);
				}
			}else if(text.match(/\.status/) || text.match(/\/status/)){
				try{
					bot.signal.status(data);
				}catch(err){
					console.log('error on chat(cmds) /status');
				}
			}else if(text.match(/\.define/) || text.match(/\/define/)){
				try{
					bot.signal.define(data);
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
							bot.talk(ggl);
						}else if(err >= 1){
							bot.talk('i\'m sorry @' + name + ' i cannot let you do that');
							err = 0;
						}
					}
				}catch(err){
					console.log('error on chat(cmds) /google...');
					bot.signal.error(err);
				}
			}
			bot.signal.mimic(data);
			bot.afk.listen(data);
		}catch(err){
			console.log('error in chat.js...');
			bot.signal.error(err);
		}	
		if(debug){
			console.log('chat(cmds) running...');
		}
	}
}