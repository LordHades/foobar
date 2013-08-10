module.exports = {
	cmds: function(data){
		try{
			text = data.text.toLowerCase();
			bot.afk.give(data);
			bot.afk.update(data.userid);
			bot.afk.listen(data);
			bot.mod.cmds(data);
			bot.system.select(data);
			bot.signal.log(data);
			bot.signal.clever(data);
			if(wiretap){
				transmit.push(data.text);s
			}			
			if(betting_one){
				data_holder.push({name: data.name, id: data.userid, text: data.text});
			}
			if(poll == true){
				bot.battle.pollbooth(data);
			}
			if(text.match(/^\/away$/) || text.match(/^\.away$/) || text.match(/brb/)){
				try{
					bot.afk.get(data);
				}catch(err){
					bot.signal.error(err);
				}
			}else if(text.match(/^\/afks$/) || text.match(/^\.afks$/)){
				try{
					bot.afk.print(data);
				}catch(err){
					bot.signal.error(err);
				}
			}else if(text.match(/^\/menu$/) || text.match(/^\.menu$/)){
    			try{
                    if(game_mode){
				    	bot.menu.print(data);
                    }else{
                        bot.speak('game mode is off...');
                    }
                }catch(err){
					bot.signal.error(err);
				}
			}else if(text.match(/^\/deal$/) || text.match(/^\.deal$/)){
    			try{
                    if(game_mode){
				    	bot.games.blackjack.deal(data);
                    }else{
                        bot.pm('game mode is off...', data.senderid);
                    }
                }catch(err){
					bot.signal.error(err);
				}
			}else if(text.match(/^\/roll$/) || text.match(/^\.roll$/)){
    			try{
                    if(game_mode){
				    	bot.games.roll(data);
                    }else{
                        bot.speak('game mode is off...');
                    }
                }catch(err){
					bot.signal.error(err);
				}
			}else if(text.match(/^\/fanme$/) || text.match(/^\.fanme$/)){
				try{
					bot.becomeFan(data.userid, function(res) {
						if(res.success){
							bot.talk(':star: @' + data.name);
							bot.becomeFan(data.userid);
						}else{
							bot.talk('I already fanned u @' + name);
						}
					});
				}catch(err){
					bot.signal.error(err);
				}
			}else if(text.match(/^\/rules$/) || text.match(/^\.rules$/)){
				try{
					bot.signal.rules(data);
				}catch(err){
					bot.signal.error(err);
				}
			}else if(text.match(/^\/about$/) || text.match(/^\.about$/)){
    			try{
					bot.speak("http://theylive.github.io/foobar/");
				}catch(err){
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
					bot.signal.error(err);
				}
			}else if(text.match(/^\/remove$/) || text.match(/^\.remove$/)){
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
					bot.signal.error(err);
				}
			}else if(text.match(/^\/nuke$/) || text.match(/^\.nuke$/)){
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
							bot.signal.error(err);
						}else{
							bot.talk(':trollface:', data.userid);
						}	
					}
				}catch(err){
					bot.signal.error(err);
				}
			}else if(text.match(/^\/list$/) || text.match(/^\.list$/)){
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
					bot.signal.error(err);
				}
			}else if(text.match(/^\/meow$/) || text.match(/^\.meow$/)){
				try{
					bot.roomInfo(true, function(data) {
						var currentDjName = data.room.metadata.current_song.djname;
						bot.speak('>^..^< @' + currentDjName);
					});
				}catch(err){
					bot.signal.error(err);
				}
			}else if(text.match(/^\/props$/) || text.match(/^\.props$/)){
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
					bot.signal.error(err);
				}
			}else if(text.match(/^\/rage$/) || text.match(/^\.rage$/)){
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
					bot.signal.error(err);
				}
			}else if(text.match(/^\/9001$/) || text.match(/^\.9001$/)){
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
					bot.signal.error(err);
				}
			}else if(text.match(/^\/next$/) || text.match(/^\.next$/)){
				try{
					bot.song.next(data);
				}catch(err){
					bot.signal.error(err);
				}
			}else if(text.match(/\/mc|\.mc/)){
				try{
					bot.talk('http://i.qkme.me/3oybjp.jpg');
				}catch(err){
					bot.signal.error(err);
				}
			}else if(text.match(/\/umad\?|\.umad\?/)){
				try{
					bot.signal.random(memes);
				}catch(err){
					bot.signal.error(err);
				}
			}else if(text.match(/^\/molly$/) || text.match(/^\.molly$/)){
				try{
                    if(game_mode){
					    bot.signal.random(molly);
                    }else{
                        bot.speak('game mode is off...');
                    }
                }catch(err){
					bot.signal.error(err);
				}
			}else if(text.match(/^\/fact$/) || text.match(/^\.fact$/)){
				try{
					if(game_mode){
						bot.signal.random(facts);
					}else{
						bot.talk('game mode is off...');
					}
				}catch(err){
					bot.signal.error(err);
				}
			}else if(text.match(/^\/quote$/) || text.match(/^\.quote$/)){
				try{
					bot.signal.quotes(data);
				}catch(err){
					bot.signal.error(err);
				}		
			}else if(text.match(/^\/cats$/) || text.match(/^\.cats$/)){
				try{
					bot.signal.cats(data);
				}catch(err){
					bot.signal.error(err);
				}		
			}else if(text.match(/^\/quakes$/) || text.match(/^\.quakes$/)){
				try{
					bot.signal.quakes(data);
				}catch(err){
					bot.signal.error(err);
				}
			}else if(text.match(/^\/tpb$/) || text.match(/^\.tpb$/)){
				try{
                    if(game_mode){
					    bot.signal.random(tpb);
                    }else{
                        bot.speak('game mode is off...');
                    }
                }catch(err){
					bot.signal.error(err);
				}
			}else if(text.match(/^\/tank$/) || text.match(/^\.tank$/)){
				try{
					bot.talk('●████▄▄▄▄▄▄▄▄▄▄▄ ▄▄▅████████▅▄▃▂ ██████████████████► ◥☼▲⊙▲⊙▲⊙▲⊙▲⊙▲☼◤');
				}catch(err){
					bot.signal.error(err);
				}
			}else if(text.match(/^\/schlong$/) || text.match(/^\.schlong$/)){
				if(game_mode){
                    try{
    					bot.games.schlong(data);
    				}catch(err){
    					bot.signal.error(err);
    				}
				}else{
    			    bot.talk('game mode is off...');   
				}
			}else if(text.match(/^\/album$/) || text.match(/^\.album$/)){
				try{
					bot.signal.album(data);
				}catch(err){
					bot.signal.error(err);
				}
			}else if(text.match(/^\/rpsls$/) || text.match(/^\.rpsls$/)){
				if(game_mode){
                    try{
    					bot.games.rpsls(data);
    				}catch(err){
    					bot.signal.error(err);
    				}
				}else{
    			    bot.talk('game mode is off...');   
				}
			}else if(text.match(/^\/theme$/) || text.match(/^\.theme$/)){
				try{
					if(theme == ''){
						bot.talk(theme);
					}else{
						bot.talk('the theme is ' + theme);
					}
				}catch(err){
					bot.signal.error(err);
				}
			}else if(text.match(/\/pos|\.pos/gi)){
				try{
					if(queue_mode){
						bot.queue.position(data);
					}
				}catch(err){
					bot.signal.error(err);
				}
			}else if(text.match(/\/help|\.help/)){
				try{
					bot.help.desk(data);
				}catch(err){
					bot.signal.error(err);
				}
			}else if(text.match(/^\/joke$/) || text.match(/^\.joke$/)){
				try{
					bot.signal.joke(data);
				}catch(err){
					bot.signal.error(err);
				}		
			}else if(text.match(/^\/weed$/) || text.match(/^\.weed$/)){
                try{
					bot.signal.weed(data);
				}catch(err){
					bot.signal.error(err);
				}	
			}else if(text.match(/^\/blame$/) || text.match(/^\.blame$/)){
				try{
					bot.talk('/whatever');
				}catch(err){
					bot.signal.error(err);
				}
			}else if(text.match(/^\/thanks$/) || text.match(/^\.thanks$/)){
				try{
					bot.talk(':) you\'re welcome @'+ name);
				}catch(err){
					bot.signal.error(err);
				}
			}else if(text.match(/^\/dive$/) || text.match(/^\.dive$/)){
				try{
                    for(i in djs){
    					if(djs[i] == data.userid){
                            bot.speak(data.name + " " + dive_msg);
						    bot.remDj(data.userid);
						}
					}
				}catch(err){
					bot.signal.error(err);
				}
			}else if(text.match(/\/bop|\.bop|\/dance|\.dance/)){
				try{
					bot.bop();
				}catch(err){
					bot.signal.error(err);
				}
			}else if(text.match(/^\/features$/) || text.match(/^\.features$/)){
				try{
					bot.signal.features(data.userid);
				}catch(err){
				}
			}else if(text.match(/\.define|\/define/)){
				try{
					bot.signal.define(data);
				}catch(err){
				}
			}else if(text.match(/\/google|\.google/)){
				try{
					bot.signal.google(data);
				}catch(err){
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
					bot.signal.error(err);
				}
			}
			if(data.userid == master){
				if(text.match(/^\/stalk$/) || text.match(/^\.stalk$/)){
					try{
						var text = data.text;
						var msg;
						var index = text.indexOf('/');
						if(index >= 0){
							sym = '/';
						}else{
							sym = '.';
						}
						msg = text.split( sym + 'stalk');
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
							bot.talk('i\'m sorry @' + name + ' i cannot let you do that');
							err = 0;
						}
					}catch(err){
						bot.signal.error(err);
					}
				}
			}
		}catch(err){
			bot.signal.error(err);
		}
	}
}