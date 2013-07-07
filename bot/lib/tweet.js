module.exports = {
	post: function(data){
		try{
			bot.roomInfo(true, function(data) {
				var rm = data.room.metadata;
				var roomname = data.room.name;
				var listeners = rm.listeners;
				var djcount = rm.djcount;
				var song = rm.current_song;
				var djname = song.djname;
				var title = song.metadata.song;
				var artist = song.metadata.artist;
				var tweets = [
					'i r listening to ' + title + ' by ' + artist + ' in ' + roomname ,
					djname + ' is currently playing ' + title + ' by ' + artist + ' in ' + roomname];
				var	random = Math.floor(Math.random() * tweets.length);
				msg = tweets[random];
				tweeter.post('statuses/update', {
					status: msg
				}, function(err, reply) {
					console.log(err, reply);
					bot.signal.error(err);
				});	
			});
			console.log('tweet(post) running...');
		}catch(err){
			console.log('error in tweet(post)...');
		}
	}
}