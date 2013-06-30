module.exports = {
	kick: function(data){
		try{
			var user = data.user[0];
			for(i in bans){
				if(user.userid == bans[i]){
					foo.bootUser(user.userid, 'Pew Pew Pew');
					break;
				}
			}
			if(debug){
				console.log('boot(kick) running...');
			}
		}catch(err){
			console.log('error in boot(kick)...', err);
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
				foo.getUserId(name, function(data){
					var pwnId = data.userid;
		        	foo.bootUser(pwnId, 'Pew Pew Pew');
				});
			}
			if(debug){
				console.log('boot(pwn) running...');
			}
		}catch(err){
			console.log('error in boot(pwn)...', err);
		}
	}
}