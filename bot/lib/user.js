module.exports = {
	register: function(data){
		try{
			var user = data.user[0];
			var welcome = setTimeout(function(){
				foo.signal.greet(data);
			}, 750);
			users.push({name:user.name, id:user.userid});
			foo.roomInfo(true, function(data){
				curusers = data.users;
			});
			foo.boot.kick(data);
			if(debug){
				console.log('user(register) running...');
			}
		}catch(err){
			console.log('error in user(get)...');
		}
	},
	deregister: function(data){
		try{
			var user = data.user[0];
			for(i in users){
				if(user.userid == users[i].id){
					users.splice(i, 1);
				}
			}
			if(debug){
				console.log('user(deregister) running...');
			}
		}catch(err){
			console.log('error in user(give)...');
		}
	}
}