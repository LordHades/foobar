module.exports = {
	get: function(data){
		try{
			var user = data.user[0];
			djs.push(user.userid);
			foo.roomInfo(true, function(data){
				djcount = data.room.metadata.djcount;
				djs = data.room.metadata.djs;
			});
			if(solo){
				foo.roomInfo(true, function(data) {
				var djnum = data.room.metadata.djcount;
					if(djnum > 2){
						solo = false;
						foo.speak('solo mode is off...');
					}
				});
			}
			if(autodj){
				foo.stage.auto(data);
			}
			if(stagehand){
				if(djcount >= 2){		
					foo.remDj(user.userid);
					foo.speak('@' + user.name + ' plz, there is a battle going on');
				}else{
					if(battle_djs[0].id == user.userid || battle_djs[1].id == user.userid){
						foo.speak('@' + user.name + ', has taken a spot');
					}else{
						foo.remDj(user.userid);
						foo.speak('you are not in this battle @' + user.name);
					}	
				}
			}
			if(on){
				var allowed = false;
				console.log(djcount);
				if(djcount > 3){
					for(i in q) {
						if(q[i].id == user.userid){
							if(q[0].id == user.userid){
								allowed = true;
								for (i in q) {
						            if (q[i].name == user.name) {
						                q.shift();
						                if(q.length >= 1 && djs.length < 5) {
											foo.signal.call(data);
										}
						            }
						        }
							}else{
								allowed = false;
								foo.remDj(user.userid);
								foo.speak('You\'re not next in teh Q. @' + user.name);
							}
							break;
						}
					}
					if(!allowed){
						foo.speak('You\'re not in teh Q!, type /add  @' + user.name);
						foo.remDj(user.userid);
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
									foo.speak(' i\'m going to boot you @' + user.name);
									foo.pm(' i\'m going to boot you @' + user.name, user.userid);
								}
								if(qtrolls[i].trollct >= 3){
									foo.bootUser(qtrolls[i].id, 'Pew Pew Pew');
								}
							}
						}else{
							foo.pm(':trollface:', user.userid);
						}	
			       	}
				}else{
					allowed = true;
					foo.speak(user.name + ' grabbed a free spot');
				}
				foo.user.update(data);
			}
			if(debug){
				console.log('stage(get) running...');
			}
		}catch(err){
			console.log('error in stage(get)...', err);
		}
	},
	give: function(data){
		if(autodj){
			foo.stage.auto(data);
		}
		try{var user = data.user[0];
			var userid = user.userid;
			var djind = djs.indexOf(user.userid);
			djs.splice(djs.indexOf(djind, 1));
			foo.roomInfo(true, function(data){
				djcount = data.room.metadata.djcount;
				djs = data.room.metadata.djs;
			});
			if(q.length >= 1 && djs.length < 5) {
				foo.signal.call(data);
			}
			if(debug){
				console.log('stage(give) running...');
			}
		}catch(err){
			console.log('error in stage(give)...', err);
		}
	},
	auto: function(data){
		try{
			foo.roomInfo(true, function(data) {
				var djnum = data.room.metadata.djcount;
				if(djnum < 3 && autodj == true){
					foo.addDj();
					foo.speak('/me is auto dj');
					autodj = true;
				}
				if(autodj == true && djnum > 3){
					foo.speak('there\'s enough djs, i\'m gonna hop down');
					var timer = setTimeout(function(){
						foo.remDj();
					}, 300);
					autodj = false;
				}

			});
			if(debug){
				console.log('stage(auto) running...');
			}
		}catch(err){
			console.log('error in stage(auto)...', err);
		}
	}
}