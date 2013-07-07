module.exports = {
	get: function(data){
		try{
			votelog = data.room.metadata.votelog;
			for (i in votelog){
				var userid = votelog[i][0];
				lastsong = data.room.metadata;
				ups = lastsong.upvotes;
				downs = lastsong.downvotes;
				var vlog = data.room.metadata.votelog;
				var vname = '';
				var vid = vlog[0][0];
				var vote = vlog[0][1];
				bot.afk.update(vid);
				bot.signal.party(data);
				bot.roomInfo(true, function(data){
					for(i in data.users){
						if(data.users[i]._id == vid){
							if(vote == 'down'){
								try{
									vname = data.users[i].name;
									bot.speak('y u :thumbsdown: @' + vname + '????');
									votes.push({id:vid, name: vname, vote: vote});
								}catch(err){
									console.log('error in votes(get)...');
									bot.signal.error(err);
								}
							}
						}
					}
				});	
			}
			bot.roomInfo(true, function(data) {
				var listeners = data.room.metadata.listeners;
				var half = Math.floor(listeners/2);
					if(ups == half){
						goodsong = true;
						bot.bop();
						var random = Math.floor(Math.random() * boppin.length);
						var msg = boppin[random];
						bot.speak(msg);
					}
			});
			if(debug){
				console.log('votes(get) running...');
			}
		}catch(err){
			console.log('error in votes(get)...');
			bot.signal.error(err);
		}
	}
}