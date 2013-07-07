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
				bot.talk = function(msg){
					this.speak(msg);
				}  
				if(data.userid == botid){
					console.log('bot talking... : ' + data.text);
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
			var index = mods.indexOf(data.userid);
			if(index >= 0){
				var text = data.text.toLowerCase();
				if(text.match(/\.bump/) || text.match(/\/bump/)){
					try{
						bot.queue.vip(data);	
					}catch(err){
						console.log('error with mod(cmds) /bump...');
					}
				}else if(text.match(/\.set/) || text.match(/\/set/)){
					try{
						bot.song.theme(data);	
					}catch(err){
						console.log('error with mod(cmds) /set...');
					}
				}else if(text.match(/\.boot/) || text.match(/\/boot/)){
					try{
						bot.boot.pwn(data);	
					}catch(err){
						console.log('error with mod(cmds) /boot...');
					}
				}else if(text.match(/\.chat/) || text.match(/\/chat/)){
					try{
						if(data.command == "pmmed"){
							if(chatter){
			        			chatter = false;
			        			bot.talk('chat mode off');
				        	}else{
				        		chatter = true;
				        		bot.talk('chat mode on');
				        	}	
				        }
					}catch(err){
						console.log('error with mod(cmds) /chat...');
						bot.signal.error(err);
					}
				}else if(text.match(/\.auto/) || text.match(/\/auto/)){
					try{
						if(autodj){
		        			autodj = false;
		        			bot.talk('auto dj off');
			        	}else{
			        		autodj = true;
			        		bot.stage.auto(data);
			        		bot.talk('auto dj on');
			        	}
					}catch(err){
						console.log('error with mod(cmds) /auto...');
						bot.signal.error(err);
					}
				}else if(text.match(/\.nerd/) || text.match(/\/nerd/)){
					try{
						if(nerd){
		        			nerd = false;
		        			bot.talk('nerd mode off');
			        	}else{
			        		nerd = true;
			        		bot.talk('nerd mode on');
			        	}
					}catch(err){
						console.log('error with mod(cmds) /nerd...');
						bot.signal.error(err);
					}
				}else if(text.match(/\/stalk/) || text.match(/\.stalk/)){
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
										bot.speak('hey there @' + query + ' , i found ya');
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
			}else if(text.match(/\.battle/) || text.match(/\/battle/)){
					try{
						if(on){
							bot.speak('teh queue is now off...');
						}
						if(battle == true){
			        		battle = false;
			        		stagehand = false;
			        		poll = false;
			        		battle_djs = [];
			        		bot.talk('dj battle is off');
			        	}else{
			        		battle = true;
			        		bot.djbattle.init(data);
			        		bot.talk('dj battle is on, /rules for help');
			        	}
			        }catch(err){
			        	console.log('error with mod(cmds) /battle');
			        	bot.signal.error(err);
			        }
				}else if(text.match(/\.toss/) || text.match(/\/toss/)){
					try{
						bot.song.toss(data);
			        }catch(err){
			        	console.log('error with mod(cmds) /toss');
			        	bot.signal.error(err);
			        }
				}else if(text.match(/\.djs/) || text.match(/\/djs/)){
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
				}else if(text.match(/\.queue/) || text.match(/\/queue/)){
					try{
						if(battle){
							battle = false;
							bot.speak('dj battle is now off...');
						}
						if(on){
							on = false;
							bot.speak('teh queue is now off...');
						}
						else{
							on = true;
							bot.speak('the queue is now on. /rules for info');
						}
			        }catch(err){
			        	console.log('error with mod(cmds) /queue');
			        	bot.signal.error(err);
			        }
				}else if(text.match(/\/mimic/) || text.match(/\.mimic/)){
					try{
						if(mimic){
							bot.talk('mimic mode is off...');
							mimic = false;
						}else{
							bot.talk('mimic mode is on...');
							mimic = true;
						}
					}catch(err){
						console.log('error with mod(cmds) /mimc');
						bot.signal.error(err);
					}
				}else if(text.match(/\/watch/) || text.match(/\.watch/)){
					try{
						if(afk){
							bot.talk('afk watch mode is off...');
							afk = false;
						}else{
							bot.talk('afk watch mode is on...');
							afk = true;
						}
					}catch(err){
						console.log('error with mod(cmds) /watch');
						bot.signal.error(err);
					}
				}else if(text.match(/\.getup/) || text.match(/\/getup/)){
					try{
						bot.addDj();
			        }catch(err){
			        	console.log('error with mod(cmds) /up');
			        	bot.signal.error(err);
			        }
				}else if(text.match(/\.debug/) || text.match(/\/debug/)){
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
				}else if(text.match(/\.getdown/) || text.match(/\/getdown/)){
					try{
						bot.remDj();
			        }catch(err){
			        	console.log('error with mod(cmds) /down');
			        	bot.signal.error(err);
			        }
				}else if(text.match(/\.skip/) || text.match(/\/skip/)){
					try{
						bot.skip();
			        }catch(err){
			        	console.log('error with mod(cmds) /skip');
			        	bot.signal.error(err);
			        }
				}else if(text.match(/\.snag/) || text.match(/\/snag/)){
					try{
						bot.song.snag(data);
			        }catch(err){
			        	console.log('error with mod(cmds) /snag');
			        	bot.signal.error(err);
			        }
				}else if(text.match(/\.shuffle/) || text.match(/\/shuffle/)){
					try{
						bot.song.shuffle(data);
			        }catch(err){
			        	console.log('error with mod(cmds) /shuffle');
			        	bot.signal.error(err);
			        }
				}else if(text.match(/\.trollcop/) || text.match(/\/trollcop/)){
					try{
						if(data.userid !== botid){
							if(on){
								if(troll){
					        		troll = false;
					        		bot.talk('troll :cop: is off');
					        	}else{
					        		troll = true;
					        		bot.talk('troll :cop: is on');
					        	}
							}else{
								bot.talk('no need for :cop: right now...');
							}
				        }
			        }catch(err){
			        	console.log('error with mod(cmds) troll:cop:');
			        	bot.signal.error(err);
			        }
				}else if(text.match(/\.stats/) || text.match(/\/stats/)){
					try{
						if(stats){
			        		stats = false;
			        		bot.talk('song stats are off');
			        	}else{
			        		stats = true;
			        		bot.talk('song stats are on');
			        	}   
			        }catch(err){
			        	console.log('error with mod(cmds) /stats');
			        	bot.signal.error(err);
			        }
				}else if(text.match(/\.armed/) || text.match(/\/armed/)){
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
				}else if(text.match(/\.tweeter/) || text.match(/\/tweeter/)){
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
						var trend = '#fawkes ';
						var mention = ' @' + roomname;
						if(twit !== undefined){
							tweeter.post('statuses/update', {
								status: trend + twit + mention
							}, function(err, reply) {console.log(err, reply);});
							bot.talk('https://twitter.com/f0obarbaz');
						}else if(err >= 1){
							bot.talk('i\'m sorry @' + name + ' i cannot let you do that');
							err = 0;
						}
					}catch(err){
						console.log('error in mod(cmds) /tweeter...');
						bot.signal.error(err);
					}
				}else if(text.match(/\.solo/) || text.match(/\/solo/)){
					try{
						bot.roomInfo(true, function(data) {
							var djnum = data.room.metadata.djcount;
							if(djnum <= 2){
								if(solo){
					        		solo = false;
					        		bot.talk('solo mode is off');
					        	}else{
					        		solo = true;
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