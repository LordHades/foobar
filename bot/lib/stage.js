module.exports = {
	get: function(data){
		try{
			var user = data.user[0];
			bot.afk.update(user.userid);
			djs.push(user.userid);
			bot.roomInfo(true, function(data){
				djcount = data.room.metadata.djcount;
				djs = data.room.metadata.djs;
			});
			if(solo){
				bot.roomInfo(true, function(data) {
				var djnum = data.room.metadata.djcount;
					if(djnum > 2){
						solo = false;
						bot.speak('solo mode is off...');
					}
				});
			}
			if(autodj){
				bot.stage.auto(data);
			}
			if(stagehand){
				if(djcount >= 2){		
					bot.remDj(user.userid);
					bot.speak('@' + user.name + ' plz, there is a battle going on');
				}else{
					if(battle_djs[0].id == user.userid || battle_djs[1].id == user.userid){
						bot.speak('@' + user.name + ', has taken a spot');
					}else{
						bot.remDj(user.userid);
						bot.speak('you are not in this battle @' + user.name);
					}	
				}
			}
			if(on){
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
						if(troll){	
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
									bot.bootUser(qtrolls[i].id, 'Pew Pew Pew');
								}
							}
						}else{
							bot.pm(':trollface:', user.userid);
						}	
			       	}
				}else{
					allowed = true;
					for(i in q){
						if(user.userid == q[i].id){
							q.splice(i, 1);
						}
					}
					bot.speak(user.name + ' grabbed a free spot');
				}
			}
			if(debug){
				console.log('stage(get) running...');
			}
		}catch(err){
			console.log('error in stage(get)...');
			bot.signal.error(err);
		}
	},
	give: function(data){
		if(autodj){
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
			if(debug){
				console.log('stage(give) running...');
			}
		}catch(err){
			console.log('error in stage(give)...');
			bot.signal.error(err);
		}
	},
	auto: function(data){
		try{
			bot.roomInfo(true, function(data) {
				var djnum = data.room.metadata.djcount;
				if(djnum < 3 && autodj == true){
					bot.addDj();
					autodj = true;
				}
				if(autodj == true && djnum > 3){
					bot.speak('there\'s enough djs, i\'m gonna hop down');
					var timer = setTimeout(function(){
						bot.remDj();
					}, 3000);
					autodj = false;
				}
			});
			if(debug){
				console.log('stage(auto) running...');
			}
		}catch(err){
			console.log('error in stage(auto)...');
			bot.signal.error(err);
		}
	}
}