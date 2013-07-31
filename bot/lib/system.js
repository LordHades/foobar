module.exports = {
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
            bot.system.detect(data);
            console.log('init complete...');
		}catch(err){
			console.log('error in ready(get)...');
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
		  	if(debug){
				console.log('change(get) running...');
			}
		}catch(err){
			console.log('error in change(get)...');
			bot.signal.error(err);
		}
  	},
  	register: function(data){
		try{
			var user = data.user[0];
			if(greet_mode){
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
			if(debug){
				console.log('user(register) registered in room...');
			}
		}catch(err){
			console.log('error in user(get)...');
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
			if(debug){
				console.log('user(deregister) running...');
			}
		}catch(err){
			console.log('error in user(give)...');
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
			if(debug){
				console.log('boot(kick) running...');
			}
		}catch(err){
			console.log('error in boot(kick)...');
			bot.signal.error(err);
		}
	},
	pwn: function(data){
		try{
			var pwn;
			var index = text.indexOf('/');
			if(index >= 0){
				sym = '/';
			}else{
				sym = '.';
			}
			pwn = text.split( sym + 'boot ');
			var name = pwn[1];
			if(name !== undefined){
				bot.getUserId(name, function(data){
					var pwnId = data.userid;
		        	bot.bootUser(pwnId, boot_msg);
				});
			}
			if(debug){
				console.log('boot(pwn) running...');
			}
		}catch(err){
			console.log('error in boot(pwn)...');
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
            console.log('error in system(statboot)...');
            bot.signal.error(err);
        }
    }
}