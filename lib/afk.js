module.exports ={
	get: function(data){
		try{
			for (i in afks){
                if(afks[i].id == data.userid){
                    return false;
                }
	        }
	        afks.push({name: data.name, id: data.userid, djing: (afk_dj_limit * 1000)});
			bot.speak(data.name + ' is afk');
		}catch(err){
			bot.signal.error(err);
		}
	},
	give: function(data){
		try{
			for(i in users){
				if(users[i].id == data.userid){
					bot.afk.update(users[i].id);
				}
			}
		}catch(err){
			bot.signal.error(err);
		}
	},
	print: function(data){
		try{
			if(afks.length > 0){
				var str = "afks:";
	            for (i in afks) {
	                str += (' ' + afks[i].name);
	           	}	 	         
	           	bot.speak(str);
	        }else{
	        	bot.speak('there are no afks...');
	        }
		}catch(err){
			bot.signal.error(err);
		}
	},
	count: function(){
		try{
            var counter = setInterval(function(){
				if(features.afk_mode){
					for(i in users){
						users[i].heartbeat -= 1000;
						if(users[i].heartbeat <= 0){
							users[i].heartbeat = 0;
							users[i].afk = true;
						}
					bot.afk.eval(users[i].id);
					}
				}
			}, 1000);
		}catch(err){
			bot.signal.error(err);
		}
	},
	update: function(id){
		try{
			for(i in users){
				if(id == users[i].id){
					users[i].heartbeat = (afklimit * 60000);
					users[i].afk = false;
				}
				for(i in afks){
					if(afks[i].id == id){
						bot.speak(afks[i].name + ' is back');
						afks[i].djing = (afk_dj_limit * 1000);
						afks.splice(i, 1);
					}
				}
				for(i in afkusers){
					if(afkusers[i] == id){
						afkusers.splice(i, 1);
					}
				}
				for(i in afkdjs){
					if(afkdjs[i] == id){
						afkdjs.splice(i, 1);
					}
				}
			}
		}catch(err){
			bog.signal.error(err);
		}
	},
	eval: function(id){
		try{
			for(a in afks){
				var index = djs.indexOf(afks[a].id);
				if(index >= 0){
					var ind = afkdjs.indexOf(afks[a].id);
					if(ind == -1){
						afkdjs.push(afks[a].id);
						bot.speak('@' + afks[a].name + ' , please return before being kindly escorted...');
						bot.afk.drain(afks[a].id);
					}
				}
			}
			for(i in afks){
				for(x in q){
					if(afks[i].id == q[x].id){
						bot.speak('@' + afks[i].name + ' , was removed from the queue, bc afk...');
						q.shift();
					}
				}
			}
			for(i in users){
				if(users[i].id == id){
					if(users[i].afk === true && (users[i].id !== botid)){
						var index = afkusers.indexOf(users[i].id);
						if(index == -1){
							afkusers.push(users[i].id);
							afks.push({name: users[i].name, id: users[i].id, djing: (afk_dj_limit * 1000)});
							bot.speak(users[i].name + ' is afk');						
							return true;
						}
					}
					return false;
				}
			}
		}catch(err){
			bot.signal.error(err);
		}
	},
	drain: function(id){
		try{
			var leech = setInterval(function(){
				for(i in afks){
					if(id == afks[i].id){
						afks[i].djing -= 1000;
						if(afks[i].djing <= 0){
							afks[i].djing = 0;
                            if(features.afk_mode){
    							bot.remDj(afks[i].id);
                            }
                        }
					}
				}
			}, 1000);
		}catch(err){
			bot.signal.error(err);
		}
	},
	listen: function(data){
		try{
			for(i in afks){
				var sname = afks[i].name;
				var sid = afks[i].id;
				var mention = '@'+sname;
				if(data.userid !== botid){
					if(data.text.match(sname|mention)){
						var ts = new Date(),
							year = ts.getFullYear(),
							month = ts.getMonth(),
							day = ts.getDate(),
							hour = ts.getHours(),
							minutes = ts.getMinutes(),
							seconds = ts.getSeconds(),
							time = month + '/' + day + '/' + year + ' ' + hour + ':' + minutes + ':' + seconds + ' ... '
							bot.pm(time + data.text, sid);
							bot.speak(sname + ' is afk...');
						return false;
					}
				}
			}
		}catch(err){
			bot.signal.error(err);
		}
	}
}