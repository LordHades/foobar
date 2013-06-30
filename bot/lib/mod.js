module.exports = {
	get: function(data){
		for(i in curusers){
			if(data.userid == curusers[i].userid){
				name = curusers[i].name;
			}
		}
		foo.speak('gave mod powers to @' + name + ', respect their authority!');
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
		foo.speak('removed mod powers from @' + name + ', :cry:...');
	},
	cmds: function(data){
		try{
			var index = mods.indexOf(data.userid);
			if(index >= 0){
				if(data.command == 'speak'){
					var name = name;
					foo.talk = function(msg){
						this.speak(msg);
					}  
				}else if(data.command == 'pmmed'){
					var name = '';
					for(i in users){
						if(data.senderid == users[i].id){
							name = users[i].name;
						}
					}
					foo.talk = function(msg){
						this.pm(msg, data.senderid);
					}
				}
				var text = data.text.toLowerCase();
				if(text.match(/\.bump/) || text.match(/\/bump/)){
					try{
						foo.queue.vip(data);	
					}catch(err){
						console.log('error with mod(cmds) /bump...');
					}
				}else if(text.match(/\.set/) || text.match(/\/set/)){
					try{
						foo.song.theme(data);	
					}catch(err){
						console.log('error with mod(cmds) /set...');
					}
				}else if(text.match(/\.boot/) || text.match(/\/boot/)){
					try{
						foo.boot.pwn(data);	
					}catch(err){
						console.log('error with mod(cmds) /boot...');
					}
				}else if(text.match(/\.chat/) || text.match(/\/chat/)){
					try{
						if(data.command == "pmmed"){
							if(chatter){
			        			chatter = false;
			        			foo.talk('chat mode off');
				        	}else{
				        		chatter = true;
				        		foo.talk('chat mode on');
				        	}	
				        }
					}catch(err){
						console.log('error with mod(cmds) /chat...');
					}
				}else if(text.match(/\.auto/) || text.match(/\/auto/)){
					try{
						if(autodj){
		        			autodj = false;
		        			foo.talk('auto dj off');
			        	}else{
			        		autodj = true;
			        		foo.stage.auto(data);
			        		foo.talk('auto dj on');
			        	}
					}catch(err){
						console.log('error with mod(cmds) /auto...');
					}
				}else if(text.match(/\.nerd/) || text.match(/\/nerd/)){
					try{
						if(nerd){
		        			nerd = false;
		        			foo.talk('nerd mode off');
			        	}else{
			        		nerd = true;
			        		foo.talk('nerd mode on');
			        	}
					}catch(err){
						console.log('error with mod(cmds) /nerd...');
					}
				}else if(text.match(/\.battle/) || text.match(/\/battle/)){
					try{
						if(on){
							foo.speak('teh queue is now off...');
						}
						if(battle == true){
			        		battle = false;
			        		stagehand = false;
			        		poll = false;
			        		battle_djs = [];
			        		foo.talk('dj battle is off');
			        	}else{
			        		battle = true;
			        		foo.djbattle.init(data);
			        		foo.talk('dj battle is on, /rules for help');
			        	}
			        }catch(err){
			        	console.log('error with mod(cmds) /battle');
			        }
				}else if(text.match(/\.toss/) || text.match(/\/toss/)){
					try{
						foo.song.toss(data);
			        }catch(err){
			        	console.log('error with mod(cmds) /toss');
			        }
				}else if(text.match(/\.djs/) || text.match(/\/djs/)){
					try{
						var random = Math.floor(Math.random() * memes.length);
						msg = memes[random];
						for(i in djs){
							foo.pm(msg, djs[i]);	
						}
						foo.talk('attack successful :trollface:');
			        }catch(err){
			        	console.log('error with mod(cmds) /djs');
			        }
				}else if(text.match(/\.queue/) || text.match(/\/queue/)){
					try{
						if(battle){
							battle = false;
							foo.speak('dj battle is now off...');
						}
						if(on){
							on = false;
							foo.speak('teh Q is now off...');
						}
						else{
							on = true;
							foo.speak('teh Q is now on. /rules for info');
						}
			        }catch(err){
			        	console.log('error with mod(cmds) /queue');
			        }
				}else if(text.match(/\.getup/) || text.match(/\/getup/)){
					try{
						foo.addDj();
			        }catch(err){
			        	console.log('error with mod(cmds) /up');
			        }
				}else if(text.match(/\.debug/) || text.match(/\/debug/)){
					try{
						if(debug){
							debug = false;
							foo.talk('debugging off...');
						}else{
							debug = true;
							foo.talk('debugging on...');
						}
			        }catch(err){
			        	console.log('error with mod(cmds) /debug');
			        }
				}else if(text.match(/\.getdown/) || text.match(/\/getdown/)){
					try{
						foo.remDj();
			        }catch(err){
			        	console.log('error with mod(cmds) /down');
			        }
				}else if(text.match(/\.skip/) || text.match(/\/skip/)){
					try{
						foo.skip();
			        }catch(err){
			        	console.log('error with mod(cmds) /skip');
			        }
				}else if(text.match(/\.snag/) || text.match(/\/snag/)){
					try{
						foo.song.snag(data);
			        }catch(err){
			        	console.log('error with mod(cmds) /snag');
			        }
				}else if(text.match(/\.shuffle/) || text.match(/\/shuffle/)){
					try{
						foo.song.shuffle(data);
			        }catch(err){
			        	console.log('error with mod(cmds) /shuffle');
			        }
				}else if(text.match(/\.trollcop/) || text.match(/\/trollcop/)){
					try{
						if(data.userid !== '51958aa5eb35c1598caf8627'){
							if(on){
								if(troll){
					        		troll = false;
					        		foo.talk('troll :cop: is off');
					        	}else{
					        		troll = true;
					        		foo.talk('troll :cop: is on');
					        	}
							}else{
								foo.talk('no need for :cop: right now...');
							}
				        }
			        }catch(err){
			        	console.log('error with mod(cmds) troll:cop:');
			        }
				}else if(text.match(/\.armed/) || text.match(/\/armed/)){
					try{
						if(armed){
			        		armed = false;
			        		foo.talk('nuke is on standby');
			        	}else{
			        		armed = true;
			        		foo.talk('nuke is armed');
			        	}
			        }catch(err){
			        	console.log('error with mod(cmds) /armed');
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
							foo.talk('https://twitter.com/f0obarbaz');
						}else if(err >= 1){
							foo.talk('i\'m sorry @' + name + ' i cannot let you do that');
							err = 0;
						}
					}catch(err){
						console.log('error in mod(cmds) /tweeter...');
					}
				}else if(text.match(/\.solo/) || text.match(/\/solo/)){
					try{
						foo.roomInfo(true, function(data) {
							var djnum = data.room.metadata.djcount;
							if(djnum <= 2){
								if(solo){
					        		solo = false;
					        		foo.talk('solo mode is off');
					        	}else{
					        		solo = true;
					        		foo.talk('solo mode is on');
					        	}
					        }else{
					        	foo.speak('there are other djs on deck...');
					        }
					    });
			        }catch(err){
			        	console.log('error with mod(cmds) /solo');
			        }
				}
			}
			if(debug){
				console.log('mod(cmds) running...');
			}
		}catch(err){
			console.log('error in mod(cmds)...');
		}
	}
}