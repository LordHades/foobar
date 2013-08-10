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
			}
			if(index >= 0){
				var text = data.text.toLowerCase();
				if(text.match(/\/bump/) || text.match(/\.bump/)){
					try{
						bot.queue.vip(data);	
					}catch(err){
						bot.signal.error(err);
					}
				}else if(text.match(/^\/event$/) || text.match(/^\.event$/)){
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
						bot.signal.error(err);
					}
				}else if(text.match(/\/set/) || text.match(/\.set/)){
					try{
						bot.song.theme(data);	
					}catch(err){
						bot.signal.error(err);
					}
				}else if(text.match(/\/boot/) || text.match(/\.boot/)){
					try{
						bot.system.pwn(data);	
					}catch(err){
						bot.signal.error(err);
					}
				}else if(text.match(/^\/announce$/) || text.match(/^\.announce$/)){
        			try{
        				bot.system.toggle(announce_mode, "announce mode");
						// if(announce_mode){
		    //     			announce_mode = false;
		    //     			bot.talk('announce mode off');
			   //      	}else{
			   //      		announce_mode = true;
			   //      		bot.talk('announce mode on');
			   //      	}	
				    }catch(err){
						bot.signal.error(err);
					}
				}else if(text.match(/^\/twitter$/) || text.match(/^\.twitter$/)){
        			try{
						if(tweet_mode){
		        			tweet_mode = false;
		        			bot.talk('tweet mode off');
			        	}else{
			        		tweet_mode = true;
			        		bot.talk('tweet mode on');
			        	}	
				    }catch(err){
						bot.signal.error(err);
					}
				}else if(text.match(/^\/bugs$/) || text.match(/^\.bugs$/)){
					try{
						bot.speak('https://github.com/theylive/foobar/issues');
					}catch(err){
						bot.signal.error(err);
					}
				}else if(text.match(/^\/games$/) || text.match(/^\.games$/)){
    				try{
						if(game_mode){
		        			game_mode = false;
		        			bot.talk('game mode off');
			        	}else{
			        		game_mode = true;
			        		bot.talk('game mode on');
			        	}	
				    }catch(err){
						bot.signal.error(err);
					}
				}else if(text.match(/^\/ttstats$/) || text.match(/^\.ttstats$/)){
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
						bot.signal.error(err);
					}
				}else if(text.match(/^\/chat$/) || text.match(/^\.chat$/)){
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
						bot.signal.error(err);
					}
				}else if(text.match(/^\/autodj$/) || text.match(/^\.autodj$/)){
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
						bot.signal.error(err);
					}
				}else if(text.match(/^\/autoq$/) || text.match(/^\.autoq$/)){
					try{
						if(auto_queue){
		        			auto_queue = false;
		        			bot.talk('auto queue off');
			        	}else{
			        		auto_queue = true;
			        		bot.stage.auto(data);
			        		bot.talk('auto queue on');
			        	}
					}catch(err){
						bot.signal.error(err);
					}
				}else if(text.match(/^\/battle$/) || text.match(/^\.battle$/)){
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
			        	bot.signal.error(err);
			        }
				}else if(text.match(/^\/toss$/) || text.match(/^\.toss$/)){
					try{
						bot.song.toss(data);
			        }catch(err){
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
			        	bot.signal.error(err);
			        }
				}else if(text.match(/^\/queue$/) || text.match(/^\.queue$/)){
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
			        	bot.signal.error(err);
			        }
				}else if(text.match(/^\/watch$/) || text.match(/^\.watch$/)){
					try{
						if(afk_mode){
							bot.talk('afk watch mode is off...');
							afk_mode = false;
						}else{
							bot.talk('afk watch mode is on...');
							afk_mode = true;
						}
					}catch(err){
						bot.signal.error(err);
					}
				}else if(text.match(/^\/getup$/) || text.match(/^\.getup$/)){
					try{
						bot.addDj();
			        }catch(err){
			        	bot.signal.error(err);
			        }
				}else if(text.match(/^\/getdown$/) || text.match(/^\.getdown$/)){
					try{
						bot.remDj();
			        }catch(err){
			        	bot.signal.error(err);
			        }
				}else if(text.match(/^\/skip$/) || text.match(/^\.skip$/)){
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
			        	bot.signal.error(err);
			        }
				}else if(text.match(/^\/snag$/) || text.match(/^\.snag$/)){
					try{
						bot.song.snag(data);
			        }catch(err){
			        	bot.signal.error(err);
			        }
				}else if(text.match(/^\/shuffle$/) || text.match(/^\.shuffle$/)){
					try{
						bot.song.shuffle(data);
			        }catch(err){
			        	bot.signal.error(err);
			        }
				}else if(text.match(/^\/trollcop$/) || text.match(/^\.trollcop$/)){
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
			        	bot.signal.error(err);
			        }
				}else if(text.match(/^\/armed$/) || text.match(/^\.armed$/)){
					try{
						if(armed){
			        		armed = false;
			        		bot.talk('nuke is on standby');
			        	}else{
			        		armed = true;
			        		bot.talk('nuke is armed');
			        	}
			        }catch(err){
			        	bot.signal.error(err);
			        }
				}else if(text.match(/\/tweeter/) || text.match(/\.tweeter/)){
					try{
						var twit = bot.system.splice(data, "tweeter");
						if(twit !== undefined){
							tweeter.post('statuses/update', {
								status: tweet_trend + " " + twit + " " + tweet_mention
							}, function(err, reply) {console.log(err, reply);});
							bot.talk("https://twitter.com/" + bot_twitter);
						}else if(err >= 1){
							bot.talk('i\'m sorry @' + name + ' i cannot let you do that');
							err = 0;
						}
					}catch(err){
						bot.signal.error(err);
					}
				}else if(text.match(/^\/solo$/) || text.match(/^\.solo$/)){
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
			        	bot.signal.error(err);
			        }
				}
			}
		}catch(err){
			bot.signal.error(err);
		}
	}
}