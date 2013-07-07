module.exports = {
	get: function(data){
		try{	
		  	bot.afk.count(data);
			console.log('init complete...');
		}catch(err){
			console.log('error in ready(get)...');
			bot.signal.error(err);
		}
	}
}