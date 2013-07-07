module.exports = {
	register: function(data){
		try{
			var user = data.user[0];
			var welcome = setTimeout(function(){
				bot.signal.greet(data);
			}, 750);
			users.push({name:user.name, id:user.userid, heartbeat: afklimit, afk: false});
			bot.roomInfo(true, function(data){
				curusers = data.users;
				for(i in curusers){
					users.push({name:curusers[i].name, id: curusers[i].userid, heartbeat: afklimit, afk: false});
				}
			});
			bot.boot.kick(data);
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
	}
}