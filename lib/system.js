module.exports = {
	skip: function(data){
        bot.roomInfo(true, function(data){
            var curdj = data.room.metadata.current_dj;  
            if(botid == curdj){
				bot.skip();
                var talkback = setTimeout(function(){
                    bot.talk('i see how it is @' + data.name);
                }, 500);
            }else{
                bot.speak('i\'m not even djing @' + data.name);
            }
        });
	},
	toggle: function(mode, text){
		if(mode){
			bot.speak(text + " is now off");
			return false;
    	}else{
    		bot.speak(text + " is now on");
    		return true;
    	}
	},
    detect: function(data){
        if(queue_mode === true && battle_mode === true){
            queue_mode = true;
            battle_mode = false;
        }
        if(solo_mode === true && event_mode === true){
            solo_mode = false;
            event_mode = true;
        }
        if(queue_mode === true && event_mode === true){
            queue_mode = true;
            event_mode = false;
        }
    },
	ready: function(data){
		try{
            bot.system.detect(data);
			bot.setAvatar(bot_avatar || 1);
			bot.modifyName(botname || "bot");
		  	bot.modifyLaptop(bot_laptop || "linux");
		  	bot.afk.count(data);
		  	bot.modifyProfile({ 
				name: botname || "bot", 
				twitter: bot_twitter || "",
				soundcloud: bot_soundcloud || "", 
				website: bot_website || "",
				facebook: bot_facebook || "", 
				about: bot_about || "",
				topartists: bot_favArtists || "",
				hangout: bot_hangout || ""}
			);
            console.log('running...');
		}catch(err){
			bot.signal.error(err);
		}
	},
	change: function(data){
		try{
			if(autodj_mode){
				bot.system.auto_dj(data);
			}
			roomname = data.room.name;
		  	djs = data.room.metadata.djs;
		  	mods = data.room.metadata.moderator_id;
 			for(i in data.users){
 				users.push({name:data.users[i].name, id:data.users[i].userid, heartbeat: (afklimit * 60000), afk: false});
 			}
		}catch(err){
			bot.signal.error(err);
		}
  	},
  	register: function(data){
		try{
			var user = data.user[0];
			if(announce_mode){
                var welcome = setTimeout(function(){
			    	bot.signal.greet(data);
			    }, 750);
			}
            if(stat_boot){
                bot.system.statboot(user.name, user.userid);
            }
            users.push({name:user.name, id:user.userid, heartbeat: (afklimit * 60000), afk: false});
			bot.roomInfo(true, function(data){
				for(i in data.users){
                    if(stat_boot){
                        bot.system.statboot(data.users[i].name, data.users[i].userid);
                    }
				}
			});
			bot.system.kick(data);
		}catch(err){
			bot.signal.error(err);
		}
	},
	deregister: function(data){
		try{
			var user = data.user[0];
			for(i in q){
				if(q[i].id == user.userid){
					bot.speak('@' + user.name + ' left the room and is removed from the q...');
					q.splice(i, 1);
				}
			}
			for(i in users){
				if(user.userid == users[i].id){
					users.splice(i, 1);
				}
			}
			for(i in afks){
				if(afks.userid == afks[i].id){
					afks.splice(i, 1);
				}
			}
		}catch(err){
			bot.signal.error(err);
		}
	},
	get_mod: function(data){
		for(i in users){
			if(data.userid == users[i].userid){
				name = users[i].name;
			}
		}
		bot.speak('gave mod powers to @' + name + ', respect their authority!');
		mods.push(data.userid);
	},
	give_mod: function(data){
		for(i in users){
			if(data.userid == users[i].userid){
				name = users[i].name;
			}
		}
		for(i in mods){
			if(data.userid == mods[i]){
				mods.splice(i, 1);
			}
		}
		bot.speak('removed mod powers from @' + name + ', :cry:...');
	},
	event: function(data){
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
	},
	kick: function(data){
		try{
			var user = data.user[0];
			for(i in banlist){
				if(user.userid == banlist[i]){
					bot.bootUser(user.userid, boot_msg);
					break;
				}
			}
		}catch(err){
			bot.signal.error(err);
		}
	},
	pwn: function(data){
		try{

			var word = data.text.split("/boot ");
			var name = word[1];
			if(name !== undefined){
				bot.getUserId(name, function(data){
					var pwnId = data.userid;
		        	bot.bootUser(pwnId, boot_msg);
				});
			}
		}catch(err){
			bot.signal.error(err);
		}
	},
	solo: function(data){
		bot.roomInfo(true, function(data) {
			var djnum = data.room.metadata.djcount;
			if(djnum <= 2){
                if(event_mode){
                    event_mode = false;
                    bot.speak('event mode is now off...');
                }
				if(solo_mode){
	        		solo_mode = false;
	        		bot.speak('solo mode is off');
	        	}else{
	        		solo_mode = true;
	        		bot.speak('solo mode is on');
	        	}
	        }else{
	        	bot.speak('there are other djs on deck...');
	        }
	    });
	},
    statboot: function(check_name, check_id){
        try{
        	bot.roomInfo(true, function(data){
                for(i in users){
                    bot.system.statboot(curusers[i].name, users[i].userid);
            	}
            });
            if(stat_boot){
                var isbot = check_name.indexOf('ttstat');
                if(isbot >= 0){
                    bot.bootUser(check_id, boot_msg);
                }
            }
        }catch(err){
            bot.signal.error(err);
        }
    },
    get_dj: function(data){
		try{
			var user = data.user[0];
			bot.afk.update(user.userid);
    	    bot.queue.detect(data);
			djs.push(user.userid);
			bot.roomInfo(true, function(data){
				djcount = data.room.metadata.djcount;
				djs = data.room.metadata.djs;
			});
			if(solo_mode){
				if(djcount >= 2){
					bot.speak('solo mode is now off...');
                    solo_mode = false;
				}
			}
            if(event_mode){
    			if(djcount >= event_djs){	
					bot.remDj(user.userid);
					bot.speak('@' + user.name + " " + event_warn);
                    bot.system.trollcop(data);
				}
			}
			if(autodj_mode){
				bot.system.auto_dj(data);
			}
			if(stagehand){
				if(djcount >= 2){		
					bot.remDj(user.userid);
					bot.speak('@' + user.name + " " + battle_warn);
                    bot.system.trollcop(data);
				}else{
					if(battle_djs[0].id == user.userid || battle_djs[1].id == user.userid){
						bot.speak('@' + user.name + ', has taken a spot');
					}else{
						bot.remDj(user.userid);
						bot.speak('you are not in this battle @' + user.name);
                        bot.system.trollcop(data);
					}	
				}
			}
			if(queue_mode){
				var allowed = false;
				if(djcount > 3 && q.length >= 1){
					for(i in q) {
						if(q[i].id == user.userid){
							if(q[0].id == user.userid){
								allowed = true;
								for (i in q) {
						            if (q[i].name == data.name) {
						                q.splice(i, 1);
						                if(q.length >= 1 && djs.length < 5) {
											bot.signal.call(data);
										}
						            }
						        }
							}else{
								allowed = false;
								bot.remDj(user.userid);
								bot.speak('You\'re not next in teh Q. @' + user.name);
							}
							break;
						}
					}
					if(!allowed){
						bot.speak('You\'re not in teh Q!, type /add  @' + user.name);
						bot.remDj(user.userid);
						var djind = djs.indexOf(user.userid); 
						delete djs[{name:user.name, id:user.userid}];
						djs.splice(djind, 1);
						bot.system.trollcop(data);
			       	}
				}else{
					allowed = true;
					for(i in q){
						if(user.userid == q[i].id){
							q.splice(i, 1);
							bot.speak(user.name + " took their spot");
						}
					}
					bot.speak(user.name + ' grabbed an open spot');
				}
			}
		}catch(err){
			bot.signal.error(err);
		}
	},
	give_dj: function(data){
		bot.queue.detect(data);
        if(autodj_mode){
			bot.system.auto_dj(data);
		}
		try{var user = data.user[0];
			var userid = user.userid;
			var djind = djs.indexOf(user.userid);
			djs.splice(djs.indexOf(djind, 1));
			bot.roomInfo(true, function(data){
				djcount = data.room.metadata.djcount;
				djs = data.room.metadata.djs;
			});
			if(q.length >= 1 && djs.length < 5) {
				bot.signal.call(data);
			}
		}catch(err){
			bot.signal.error(err);
		}
	},
	auto_dj: function(data){
		try{
			bot.roomInfo(true, function(data) {
				var djnum = data.room.metadata.djcount;
				if(djnum < 3 && autodj_mode === true){
					var isdj = data.djids.indexOf(botid);
                    if(isdj == -1){
                        bot.speak(autodjup_msg);
        				var timer = setTimeout(function(){
    						bot.addDj();
    					}, 3000);
    					autodj_mode = true;
                    }
                }
				if(autodj_mode === true && djnum > 3){
                    bot.roomInfo(true, function(data) {
        				if(data.room.metadata.current_dj == botid){
    						bot.speak(autodjdown_msg_later);
                            stepdown = true;
        				}else{
            			    bot.speak(autodjdown_msg_now);
                            bot.remDj();   
        				}
    				});
				}
			});
		}catch(err){
			bot.signal.error(err);
		}
	},
    trollcop: function(data){
        var user = data.user[0];
        if(troll_cop){
		 	for(i in qtrolls){
		 		if(qtrolls[i].id == user.userid){
		 			++qtrolls[i].trollct;
		 			checktroll();
		 			return false;
		 		}
		 	}
		 	qtrolls.push({name: user.name, id: user.userid, trollct: 1});
			function checktroll(){
				if(qtrolls[i].trollct == 2){
					bot.speak(':heavy_exclamation_mark: i\'m going to boot you @' + user.name);
					bot.pm(':heavy_exclamation_mark: i\'m going to boot you @' + user.name, user.userid);
				}
				if(qtrolls[i].trollct >= 3){
					bot.bootUser(qtrolls[i].id, boot_msg);
				}
			}
		}else{
			bot.pm(':trollface:', user.userid);
		}	
    },
    dive: function(data){
    	for(i in djs){
			if(djs[i] == data.userid){
                bot.speak(data.name + " " + dive_msg);
			    bot.remDj(data.userid);
			}
		}
    }
}