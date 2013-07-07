module.exports = {
	kick: function(data){
		try{
			var user = data.user[0];
			for(i in bans){
				if(user.userid == bans[i]){
					bot.bootUser(user.userid, 'Pew Pew Pew');
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
		        	bot.bootUser(pwnId, 'Pew Pew Pew');
				});
			}
			if(debug){
				console.log('boot(pwn) running...');
			}
		}catch(err){
			console.log('error in boot(pwn)...');
			bot.signal.error(err);
		}
	}
}