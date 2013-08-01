module.exports = {
	get: function(data){
		for(i in curusers){
			if(data.userid == curusers[i].userid){
				name = curusers[i].name;
			}
		}
		bot.speak('gave mod powers to @' + name + ', respect their authority!');
		mods.push(data.userid);
	},
	give: function(data){
		for(i in curusers){
			if(data.userid == curusers[i].userid){
				name = curusers[i].name;
			}
		}
		for(i in mods){
			if(data.userid == mods[i]){
				mods.splice(i, 1);
			}
		}
		bot.speak('removed mod powers from @' + name + ', :cry:...');
	},
	cmds: function(data){
		try{
			if(data.command == 'speak'){
				name = data.name;
                var index = mods.indexOf(data.userid);
				bot.talk = function(msg){
					this.speak(msg);
				}  
				if(data.userid == botid){
					console.log('bot talking... : ' + data.text);
					return false;
				}
			}else if(data.command == 'pmmed'){
				var index = mods.indexOf(data.senderid);
                for(i in curusers){
					if(data.senderid == curusers[i].userid){
						name = curusers[i].name;
					}
				}
				bot.talk = function(msg){
					this.pm(msg, data.senderid);
				}
				if(chat_mode){
					var cb = new clever;
					cb.write(data.text,function(resp){
						bot.pm(resp.message, data.senderid);
					});
				}
			}
			if(index >= 0){
				var text = data.text.toLowerCase();
				if(text.match(/^\/bump$|\/^\.bump$/)){
					try{
						bot.queue.vip(data);	
					}catch(err){
						console.log('error with mod(cmds) /bump...');
					}
				}else if(text.match(/^\/event$|\/^\.event$/)){
        			try{
                        if(solo_mode){
                            solo_mode = false;
                            bot.speak("solo mode is now off...");
                        }
						if(event_mode){
		        			event_mode = false;
		        			bot.speak('event mode off');
			        	}else{
			        		event_mode = true;
			        		bot.speak('event mode on');
			        	}	
					}catch(err){
						console.log('error with mod(cmds) /event...');
						bot.signal.error(err);
					}
				}else if(text.match(/^\/$set|\/^\.set$/)){
					try{
						bot.song.theme(data);	
					}catch(err){
						console.log('error with mod(cmds) /set...');
					}
				}else if(text.match(/^\/boot$|\/^\.boot$/)){
					try{
						bot.system.pwn(data);	
					}catch(err){
						console.log('error with mod(cmds) /boot...');
					}
				}else if(text.match(/^\/announce$|\/^\.announce$/)){
        			try{
						if(announce_mode){
		        	        announce_mode = false;
		        			bot.talk('announce mode off');
			        	}else{
			        		announce_mode = true;
			        		bot.talk('announce mode on');
			        	}	
				    }catch(err){
						console.log('error with mod(cmds) /announce...');
						bot.signal.error(err);
					}
				}else if(text.match(/^\/twitter$|\/^\.twitter$/)){
        			try{
						if(tweet_mode){
		        			tweet_mode = false;
		        			bot.talk('tweet mode off');
			        	}else{
			        		tweet_mode = true;
			        		bot.talk('tweet mode on');
			        	}	
				    }catch(err){
						console.log('error with mod(cmds) /tweet...');
						bot.signal.error(err);
					}
				}else if(text.match(/^\/greet$|\/^\.greet$/)){
        			try{
						if(greet_mode){
		        			greet_mode = false;
		        			bot.talk('greet mode off');
			        	}else{
			        		greet_mode = true;
			        		bot.talk('greet mode on');
			        	}	
				    }catch(err){
						console.log('error with mod(cmds) /greet...');
						bot.signal.error(err);
					}
				}else if(text.match(/^\/bugs$|\/^\.bugs$/)){
					try{
						bot.speak('https://github.com/theylive/foobar/issues');
					}catch(err){
						console.log('error in mod(cmds) /bugs...');
						bot.signal.error(err);
					}
				}else if(text.match(/^\/games$|\/^\.games$/)){
    				try{
						if(game_mode){
		        			game_mode = false;
		        			bot.talk('game mode off');
			        	}else{
			        		game_mode = true;
			        		bot.talk('game mode on');
			        	}	
				    }catch(err){
						console.log('error with mod(cmds) /game...');
						bot.signal.error(err);
					}
				}else if(text.match(/^\/ttstats$|\/^\.ttstats$/)){
        			try{
						if(stat_boot){
		        		    stat_boot = false;
		        			bot.talk('ttstats boot mode off');
			        	}else{
			        		stat_boot = true;
                            bot.roomInfo(true, function(data){
                                curusers = data.users;
        		                for(i in curusers){
                                    bot.system.statboot(curusers[i].name, curusers[i].userid);
    		                	}
                            });
			        		bot.talk('ttstats boot mode on');
			        	}	
				    }catch(err){
						console.log('error with mod(cmds) /game...');
						bot.signal.error(err);
					}
				}else if(text.match(/^\/chat$|\/^\.chat$/)){
					try{
						if(data.command == "pmmed"){
							if(chat_mode){
			        			chat_mode = false;
			        			bot.talk('chat mode off');
				        	}else{
				        		chat_mode = true;
				        		bot.talk('chat mode on');
				        	}	
				        }
					}catch(err){
						console.log('error with mod(cmds) /chat...');
						bot.signal.error(err);
					}
				}else if(text.match(/^\/away$|\/^\.away$/)){
					try{
						if(autodj_mode){
		        			autodj_mode = false;
		        			bot.talk('auto dj off');
			        	}else{
			        		autodj_mode = true;
			        		bot.stage.auto(data);
			        		bot.talk('auto dj on');
			        	}
					}catch(err){
						console.log('error with mod(cmds) /auto...');
						bot.signal.error(err);
					}
				}else if(text.match(/^\/nerd$|\/^\.nerd$/)){
					try{
						if(nerd_mode){
		        			nerd_mode = false;
		        			bot.talk('nerd mode off');
			        	}else{
			        		nerd_mode = true;
			        		bot.talk('nerd mode on');
			        	}
					}catch(err){
						console.log('error with mod(cmds) /nerd...');
						bot.signal.error(err);
					}
				}else if(text.match(/^\/stalk$|\/^\.stalk$/)){
				try{
					if(text.match(/.stalk/)){
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
									console.log(data);
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
					}
				}catch(err){
					console.log('error on chat(cmds) /stalk...');
					bot.signal.error(err);
				}
			}else if(text.match(/^\/battle$|\/^\.battle$/)){
					try{
						if(queue_mode){
							bot.speak('teh queue is now off...');
                            queue_mode = false;
						}
						if(battle_mode == true){
			        		battle_mode = false;
			        		stagehand = false;
			        		poll = false;
			        		battle_djs = [];
			        		bot.talk('dj battle is off');
			        	}else{
			        		battle_mode = true;
			        		bot.djbattle.init(data);
			        		bot.talk('dj battle is on, /rules for help');
			        	}
			        }catch(err){
			        	console.log('error with mod(cmds) /battle');
			        	bot.signal.error(err);
			        }
				}else if(text.match(/^\/toss$|\/^\.toss$/)){
					try{
						bot.song.toss(data);
			        }catch(err){
			        	console.log('error with mod(cmds) /toss');
			        	bot.signal.error(err);
			        }
				}else if(text.match(/^\/djs$|\/^\.djs$/)){
					try{
						var random = Math.floor(Math.random() * memes.length);
						msg = memes[random];
						for(i in djs){
							bot.pm(msg, djs[i]);	
						}
						bot.talk('attack successful :trollface:');
			        }catch(err){
			        	console.log('error with mod(cmds) /djs');
			        	bot.signal.error(err);
			        }
				}else if(text.match(/^\/queue$|\/^\.queue$/)){
					try{
						if(battle_mode){
							battle_mode = false;
							bot.speak('dj battle is now off...');
						}
						if(queue_mode){
							queue_mode = false;
							bot.speak('teh queue is now off...');
						}
						else{
							queue_mode = true;
							bot.speak('the queue is now on. /rules for info');
						}
			        }catch(err){
			        	console.log('error with mod(cmds) /queue');
			        	bot.signal.error(err);
			        }
				}else if(text.match(/^\/watch$|\/^\.watch$/)){
					try{
						if(afk_mode){
							bot.talk('afk watch mode is off...');
							afk_mode = false;
						}else{
							bot.talk('afk watch mode is on...');
							afk_mode = true;
						}
					}catch(err){
						console.log('error with mod(cmds) /watch');
						bot.signal.error(err);
					}
				}else if(text.match(/^\/getup$|\/^\.getup$/)){
					try{
						bot.addDj();
			        }catch(err){
			        	console.log('error with mod(cmds) /up');
			        	bot.signal.error(err);
			        }
				}else if(text.match(/^\/debug$|\/^\.debug$/)){
					try{
						if(debug){
							debug = false;
							bot.talk('debugging off...');
						}else{
							debug = true;
							bot.talk('debugging on...');
						}
			        }catch(err){
			        	console.log('error with mod(cmds) /debug');
			        	bot.signal.error(err);
			        }
				}else if(text.match(/^\/getdown$|\/^\.getdown$/)){
					try{
						bot.remDj();
			        }catch(err){
			        	console.log('error with mod(cmds) /down');
			        	bot.signal.error(err);
			        }
				}else if(text.match(/^\/skip$|\/^\.skip$/)){
					try{
                        var name  = data.name;
                        bot.roomInfo(true, function(data){
                            var curdj = data.room.metadata.current_dj;  
                            if(botid == curdj){
            					bot.skip();
                                var talkback = setTimeout(function(){
                                    bot.talk('i see how it is @' + name);
                                }, 500);
                            }else{
                                bot.speak('i\'m not even djing @' + name);
                            }
                        });
			        }catch(err){
			        	console.log('error with mod(cmds) /skip');
			        	bot.signal.error(err);
			        }
				}else if(text.match(/^\/snag$|\/^\.snag$/)){
					try{
						bot.song.snag(data);
			        }catch(err){
			        	console.log('error with mod(cmds) /snag');
			        	bot.signal.error(err);
			        }
				}else if(text.match(/^\/shuffle$|\/^\.shuffle$/)){
					try{
						bot.song.shuffle(data);
			        }catch(err){
			        	console.log('error with mod(cmds) /shuffle');
			        	bot.signal.error(err);
			        }
				}else if(text.match(/^\/trollcop$|\/^\.trollcop$/)){
					try{
						if(data.userid !== botid){
							if(troll_cop){
				        		troll_cop = false;
				        		bot.talk('troll :cop: is off');
				        	}else{
				        		troll_cop = true;
				        		bot.talk('troll :cop: is on');
				        	}
				        }
			        }catch(err){
			        	console.log('error with mod(cmds) troll:cop:');
			        	bot.signal.error(err);
			        }
				}else if(text.match(/^\/stats$|\/^\.stats$/)){
					try{
						if(stats_mode){
			        		stats_mode = false;
			        		bot.talk('song stats are off');
			        	}else{
			        		stats_mode = true;
			        		bot.talk('song stats are on');
			        	}   
			        }catch(err){
			        	console.log('error with mod(cmds) /stats');
			        	bot.signal.error(err);
			        }
				}else if(text.match(/^\/armed$|\/^\.armed$/)){
					try{
						if(armed){
			        		armed = false;
			        		bot.talk('nuke is on standby');
			        	}else{
			        		armed = true;
			        		bot.talk('nuke is armed');
			        	}
			        }catch(err){
			        	console.log('error with mod(cmds) /armed');
			        	bot.signal.error(err);
			        }
				}else if(text.match(/^\/tweeter$|\/^\.tweeter$/)){
					try{
						var msg;
						var index = text.indexOf('/');
						if(index >= 0){
							sym = '/';
						}else{
							sym = '.';
						}
						msg = data.text.split(sym + 'tweeter ');
						var twit = msg[1];
						if(twit !== undefined){
							tweeter.post('statuses/update', {
								status: tweet_trend + " " + twit + " " + tweet_mention
							}, function(err, reply) {console.log(err, reply);});
							bot.talk(bot_twitter);
						}else if(err >= 1){
							bot.talk('i\'m sorry @' + name + ' i cannot let you do that');
							err = 0;
						}
					}catch(err){
						console.log('error in mod(cmds) /tweeter...');
						bot.signal.error(err);
					}
				}else if(text.match(/^\/solo$|\/^\.solo$/)){
					try{
						bot.roomInfo(true, function(data) {
							var djnum = data.room.metadata.djcount;
							if(djnum <= 2){
                                if(event_mode){
                                    event_mode = false;
                                    bot.speak('event mode is now off...');
                                }
								if(solo_mode){
					        		solo_mode = false;
					        		bot.talk('solo mode is off');
					        	}else{
					        		solo_mode = true;
					        		bot.talk('solo mode is on');
					        	}
					        }else{
					        	bot.speak('there are other djs on deck...');
					        }
					    });
			        }catch(err){
			        	console.log('error with mod(cmds) /solo');
			        	bot.signal.error(err);
			        }
				}
			}
			if(debug){
				console.log('mod(cmds) running...');
			}
		}catch(err){
			console.log('error in mod(cmds)...');
			bot.signal.error(err);
		}
	}
}