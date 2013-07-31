module.exports = {
	cmds: function(data){
		try{
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
                console.log(data.senderid, curusers);
				for(i in curusers){
					if(data.senderid == curusers[i].userid){
						name = curusers[i].name;
					}else{
    				    name = "user not in room, id: "+ curusers[i].userid;   
					}
				}
				bot.talk = function(msg){
					this.pm(msg, data.senderid);
				}
				if(chat_mode && data.senderid !== botid){
					var cb = new clever;
					cb.write(data.text,function(resp){
						bot.pm(resp.message, data.senderid);
					});
				}
			}
			text = data.text.toLowerCase();
			bot.afk.give(data);
			bot.afk.update(data.userid);
			bot.afk.listen(data);
			bot.mod.cmds(data);
			bot.signal.log(data);
			if(wiretap){
				transmit.push(data.text);
			}
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
			if(text.match(/\/away|\.away|brb/)){
				try{
					bot.afk.get(data);
				}catch(err){
					console.log('error on chat(cmds) /away...');
					bot.signal.error(err);
				}
			}else if(text.match(/\/afks|\.afks/)){
				try{
					bot.afk.print(data);
				}catch(err){
					console.log('error on chat(cmds) /afks...');
					bot.signal.error(err);
				}
			}else if(text.match(/\/menu|\.menu/)){
    			try{
                    if(game_mode){
				    	bot.menu.print(data);
                    }else{
                        bot.speak('game mode is off...');
                    }
                }catch(err){
					console.log('error on chat(cmds) /menu...');
					bot.signal.error(err);
				}
			}else if(text.match(/\/fanme|\.fanme/)){
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
			}else if(text.match(/\/rules|\.rules/)){
				try{
					bot.signal.rules(data);
				}catch(err){
					console.log('error on chat(cmds) /rules...');
					bot.signal.error(err);
				}
			}else if(text.match(/\/about|\.about/)){
    			try{
					bot.speak("http://theylive.github.io/foobar/");
				}catch(err){
					console.log('error on chat(cmds) /rules...');
					bot.signal.error(err);
				}
			}else if(text.match(/\/add|\.add/)){
				try{
					if(battle_mode){
						for(i in battle_djs){
							if(battle_djs[i].id == data.userid){
								bot.talk('you\'re already signed up @' + name);
								return false;
							}
						}
						bot.djbattle.add(data);
					}else if(queue_mode){
						bot.queue.add(data);
					}else{
						bot.talk(ffa_msg);
					}
				}catch(err){
					console.log('error on chat(cmds) /add...');
					bot.signal.error(err);
				}
			}else if(text.match(/\/remove|\.remove/)){
				try{
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
								bot.talk('@' + name + ' you have been removed from the battle list');
							}
						}
					}else if(queue_mode){
						bot.queue.remove(data);
					}else{
						bot.talk(ffa_msg);
					}
				}catch(err){
					console.log('error on chat(cmds) /remove...');
					bot.signal.error(err);
				}
			}else if(text.match(/\/nuke|\.nuke/)){
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
			}else if(text.match(/\/list|\.list/)){
				try{
					if(queue_mode){
						bot.queue.print();
					}else if(battle_mode){
						bot.djbattle.print();
					}
					else{
						bot.talk(ffa_msg);
					}
				}catch(err){
					console.log('error on chat(cmds) /print...');
					bot.signal.error(err);
				}
			}else if(text.match(/\/meow|\.meow/)){
				try{
					bot.roomInfo(true, function(data) {
						var currentDjName = data.room.metadata.current_song.djname;
						bot.speak('>^..^< @' + currentDjName);
					});
				}catch(err){
					console.log('error on chat(cmds) /meow...');
					bot.signal.error(err);
				}
			}else if(text.match(/\/props|\.props/)){
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
			}else if(text.match(/\/rage|\.rage/)){
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
			}else if(text.match(/\/9001|\.9001/)){
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
			}else if(text.match(/\/next|\.next/)){
				try{
					bot.song.next(data);
				}catch(err){
					console.log('error on chat(cmds) /next...');
					bot.signal.error(err);
				}
			}else if(text.match(/\/mc|\.mc/)){
				try{
					bot.talk('http://i.qkme.me/3oybjp.jpg');
				}catch(err){
					console.log('error on chat(cmds) /mc...');
					bot.signal.error(err);
				}
			}else if(text.match(/\/umad\?|\.umad\?/)){
				try{
					bot.signal.random(memes);
				}catch(err){
					console.log('error on chat(cmds) /umad?...');
					bot.signal.error(err);
				}
			}else if(text.match(/\/molly|\.molly/)){
				try{
                    if(nerd_mode){
					    bot.signal.random(molly);
                    }else{
                        bot.speak('nerd mode is off...');
                    }
                }catch(err){
					console.log('error on chat(cmds) /molly...');
					bot.signal.error(err);
				}
			}else if(text.match(/\/fact|\.fact/)){
				try{
					if(nerd_mode){
						bot.signal.random(facts);
					}else{
						bot.talk('nerd mode is off...');
					}
				}catch(err){
					console.log('error on chat(cmds) /fact...');
					bot.signal.error(err);
				}
			}else if(text.match(/\/quote|\.quote/)){
				try{
					bot.signal.quotes(data);
				}catch(err){
					console.log('error on chat(cmds) /quote...');
					bot.signal.error(err);
				}		
			}else if(text.match(/\/cats|\.cats/)){
				try{
					bot.signal.cats(data);
				}catch(err){
					console.log('error on chat(cmds) /cats...');
					bot.signal.error(err);
				}		
			}else if(text.match(/\/quakes|\.quakes/)){
				try{
					bot.signal.quakes(data);
				}catch(err){
					console.log('error on chat(cmds) /quakes...');
					bot.signal.error(err);
				}
			}else if(text.match(/\/tpb|\.tpb/)){
				try{
                    if(nerd_mode){
					    bot.signal.random(tpb);
                    }else{
                        bot.speak('nerd mode is off...');
                    }
                }catch(err){
					console.log('error on chat(cmds) /tpb...');
					bot.signal.error(err);
				}
			}else if(text.match(/\/tank|\.tank/)){
				try{
					bot.talk('●████▄▄▄▄▄▄▄▄▄▄▄ ▄▄▅████████▅▄▃▂ ██████████████████► ◥☼▲⊙▲⊙▲⊙▲⊙▲⊙▲☼◤');
				}catch(err){
					console.log('error on chat(cmds) /tank...');
					bot.signal.error(err);
				}
			}else if(text.match(/\/schlong|\.schlong/)){
				if(game_mode){
                    try{
    					bot.games.schlong(data);
    				}catch(err){
    					console.log('error on chat(cmds) /schlong...');
    					bot.signal.error(err);
    				}
				}else{
    			    bot.talk('game mode is off...');   
				}
			}else if(text.match(/\/album|\.album/)){
				try{
					bot.signal.album(data);
				}catch(err){
					console.log('error on chat(cmds) /album...');
					bot.signal.error(err);
				}
			}else if(text.match(/\/roll|\.roll/)){
				if(game_mode){
                    try{
    					bot.games.rpsls(data);
    				}catch(err){
    					console.log('error on chat(cmds) /roll...');
    					bot.signal.error(err);
    				}
				}else{
    			    bot.talk('game mode is off...');   
				}
			}else if(text.match(/\/theme|\.theme/)){
				try{
					if(theme == ''){
						bot.talk(theme);
					}else{
						bot.talk('the theme is ' + theme);
					}
				}catch(err){
					console.log('error on chat(cmds) /theme...');
					bot.signal.error(err);
				}
			}else if(text.match(/\/pos|\.pos/gi)){
				try{
					if(queue_mode){
						bot.queue.position(data);
					}
				}catch(err){
					console.log('error on chat(cmds) .q...');
					bot.signal.error(err);
				}
			}else if(text.match(/\/help|\.help/)){
				try{
					bot.help.desk(data);
				}catch(err){
					console.log('error on chat(cmds) /help...');
					bot.signal.error(err);
				}
			}else if(text.match(/\/joke|\.joke/)){
				try{
					bot.signal.joke(data);
				}catch(err){
					console.log('error on chat(cmds) /quote...');
					bot.signal.error(err);
				}		
			}else if(text.match(/\/weed|\.weed/)){
                try{
					bot.signal.weed(data);
				}catch(err){
					console.log('error on chat(cmds) /weed...');
					bot.signal.error(err);
				}	
			}else if(text.match(/\/blame|\.blame/)){
				try{
					bot.talk('/whatever');
				}catch(err){
					console.log('error on chat(cmds) /blame...');
					bot.signal.error(err);
				}
			}else if(text.match(/\/thanks|\.thanks/)){
				try{
					bot.talk(':) you\'re welcome @'+ name);
				}catch(err){
					console.log('error on chat(cmds) /thanks...');
					bot.signal.error(err);
				}
			}else if(text.match(/\/dive|\.dive/)){
				try{
                    for(i in djs){
    					if(djs[i] == data.userid){
                            bot.speak(data.name + " " + dive_msg);
						    bot.remDj(data.userid);
						}
					}
				}catch(err){
					console.log('error on chat(cmds) /dive...');
					bot.signal.error(err);
				}
			}else if(text.match(/\/bop|\.bop|\/dance|\.dance/)){
				try{
					bot.bop();
				}catch(err){
					console.log('error on chat(cmds) /dance...');
					bot.signal.error(err);
				}
			}else if(text.match(/\.features|\/features/)){
				try{
					bot.signal.features(data.userid);
				}catch(err){
					console.log('error on chat(cmds) /features');
				}
			}else if(text.match(/\.define|\/define/)){
				try{
					bot.signal.define(data);
				}catch(err){
					console.log('error in chat(cmds) /define');
				}
			}else if(text.match(/\/google|\.google/)){
				try{
					bot.signal.google(data);
				}catch(err){
					console.log('error on chat(cmds) /google...');
					bot.signal.error(err);
				}
			}else if(text.match(/\/order|\.order/)){
    			try{
					if(game_mode){
                        bot.signal.order(data);
					}else{
    				    bot.talk('game mode is off...');   
					}
				}catch(err){
					console.log('error on chat(cmds) /order...');
					bot.signal.error(err);
				}
			}
		}catch(err){
			console.log('error in chat.js...');
			bot.signal.error(err);
		}	
		if(debug){
			console.log('chat(cmds) running...');
		}
	}
}