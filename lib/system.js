module.exports = {
	select: function(data){
		var cmd = data.command;
		if(cmd == 'speak'){
			name = data.name;
			bot.talk = function(msg){
				this.speak(msg);
			}  
			if(data.userid == botid){
				return false;
			}
		}else if(cmd == 'pmmed'){
			bot.roomInfo(true, function(){
				for(i in curusers){
					if(data.userid == curusers[i].userid){
						name = curusers[i].name;
					}else{
    				    name = "user not in room, id: "+ curusers[i].userid;   
					}
				}
				bot.talk = function(msg){
					if(data.senderid !== botid){
						this.pm(msg, data.senderid);
					}
				}
			});
		}
	},
	splice: function(data, term){
		var word = "";
		var sym = "";
		var index = data.text.indexOf('/');
		var item = "";
		if(index >= 0){
			sym = '/';
		}else{
			sym = '.';
		}
		word = data.text.split( sym + term + " ");
		item = word[1];
		return item;
	},
	toggle: function(mode, text){
		mode = mode;
		text = text;
		if(mode === false){
			bot.talk(text + " is now on");
	        return true;
    	}else{
    		bot.talk(text + " is now off");
    		return false;
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
            console.log('init complete...');
		}catch(err){
			bot.signal.error(err);
		}
	},
	change: function(data){
		try{
			if(autodj_mode){
				bot.stage.auto(data);
			}
			roomname = data.room.name;
		  	djs = data.room.metadata.djs;
		  	mods = data.room.metadata.moderator_id;
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
                curusers = data.users;
				for(i in curusers){
                    if(stat_boot){
                        bot.system.statboot(curusers[i].name, curusers[i].userid);
                    }
                    users.push({name:curusers[i].name, id: curusers[i].userid, heartbeat: (afklimit * 60000), afk: false});
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
			var name = bot.system.splice(data, "boot");
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
    statboot: function(check_name, check_id){
        try{
            if(stat_boot){
                var isbot = check_name.indexOf('ttstat');
                if(isbot >= 0){
                    bot.bootUser(check_id, boot_msg);
                }
            }
        }catch(err){
            bot.signal.error(err);
        }
    }
}