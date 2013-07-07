module.exports = {
	cannon: function(data){
		try{
			if(userid == 'xxx'){
				fawkes.roomInfo(true, function(data) {
					var currentDjName = data.room.metadata.current_song.djname;
					var humps = [
						"http://goo.gl/oXkZZ",
						"http://goo.gl/XdEth",
						"http://goo.gl/YN6my",
						"http://goo.gl/B5tbO",
						"http://goo.gl/6dGUi",
						"http://goo.gl/Ru4rv",
						"http://goo.gl/ua6SG",
						"http://goo.gl/UXedc",
						"http://goo.gl/oW5uJ",
						"http://goo.gl/dRHR6",
						"http://goo.gl/eYDm2"
					];
					var random = Math.floor(Math.random() * humps.length);
					bot.speak(data.name + ' dry humps @' + currentDjName + "'s leg " + humps[random]);
				});
			}
			if(debug){
				console.log('hump(cannon) running...');
			}
		}catch(err){
			console.log('error in hump(cannon)...');
			bot.signal.error(err);
		}
	}
}