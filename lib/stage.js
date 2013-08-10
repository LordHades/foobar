module.exports = {
	get: function(data){
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
                    bot.stage.trollcop(data);
				}
			}
			if(autodj_mode){
				bot.stage.auto(data);
			}
			if(stagehand){
				if(djcount >= 2){		
					bot.remDj(user.userid);
					bot.speak('@' + user.name + " " + battle_warn);
                    bot.stage.trollcop(data);
				}else{
					if(battle_djs[0].id == user.userid || battle_djs[1].id == user.userid){
						bot.speak('@' + user.name + ', has taken a spot');
					}else{
						bot.remDj(user.userid);
						bot.speak('you are not in this battle @' + user.name);
                        bot.stage.trollcop(data);
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
						bot.stage.trollcop(data);
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
	give: function(data){
		bot.queue.detect(data);
        if(autodj_mode){
			bot.stage.auto(data);
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
	auto: function(data){
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
    }
}