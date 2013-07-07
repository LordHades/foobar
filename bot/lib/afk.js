module.exports ={
	get: function(data){
		try{
			for (i in afks){
				if(afks[i].id == data.userid){
	            	return false;
	            }
	        }
	        afks.push({name: data.name, id: data.userid, djing: 15000});
			bot.speak(name + ' is afk');
			if(debug){
				console.log('afk(get) running...');
			}
		}catch(err){
			console.log('error in afk(get)...');
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
			if(debug){
				console.log('afk(give) running...');
			}
		}catch(err){
			console.log('error in afk(give)...');
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
	        if(debug){
				console.log('afk(print) running...');
			}
		}catch(err){
			console.log('error in afk(print)...');
			bot.signal.error(err);
		}
	},
	count: function(){
		try{
			var counter = setInterval(function(){
				if(afk){
					for(i in users){
						users[i].heartbeat -= 1000;
						if(users[i].heartbeat <= 0){
							users[i].heartbeat = 0;
							users[i].afk = true;
						}
						bot.afk.eval(users[i].id);
					};
				}
			}, 1000);
			if(debug){
				console.log('afk(count) running...');
			}
		}catch(err){
			console.log('error in afk(count)...');
		}
	},
	update: function(id){
		try{
			for(i in users){
				if(id == users[i].id){
					users[i].heartbeat = afklimit;
					users[i].afk = false;
				}
				for(i in afks){
					if(afks[i].id == id){
						bot.speak(afks[i].name + ' is back');
						afks[i].djing = 15000;
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
			if(debug){
				console.log('afk(update) running...');
			}
		}catch(err){
			console.log('error in afk(update)...');
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
						bot.speak('@' + afks[a].name + ' , you have 15 seconds to return before being kindly escorted...');
						bot.afk.drain(afks[a].id);
					}
				}
			}
			for(i in afks){
				for(x in q){
					if(afks[i].id == q[x].id){
						bot.speak('@' + afks[i].name + ' , you are being removed from the queue, bc afk...');
						q.shift();
					}
				}
			}
			for(i in users){
				if(users[i].id == id){
					if(users[i].afk == true && (users[i].id !== botid || users[i].id !== fourtwoid)){
						var index = afkusers.indexOf(users[i].id);
						if(index == -1){
							afkusers.push(users[i].id);
							afks.push({name: users[i].name, id: users[i].id, djing: 15000});
							bot.speak(users[i].name + ' is afk');						
							return true;
						}
					}
					return false;
				}
			}
			if(debug){
				console.log('afk(eval) running...');
			}
		}catch(err){
			console.log('error in afk(eval)...');
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
							bot.remDj(afks[i].id);
						}
					}
				}
			}, 1000);
			if(debug){
				console.log('afk(drain) is running...');
			}
		}catch(err){
			console.log('error in afk(drain)...');
		}
	},
	listen: function(data){
		try{
			for(i in afks){
				var sname = afks[i].name;
				var sid = afks[i].id;
				var mention = '@'+sname;
				if(data.userid !== botid){
					if(data.text.match(sname) || data.text.match(mention) || data.text.match(mention) || data.text.match(sname)){
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
			if(debug){
				console.log('afk(listen) running...');
			}
		}catch(err){
			console.log('error in afk(listen)...');
			bot.signal.error(err);
		}
	}
}