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
				foo.signal.party(data);
				foo.roomInfo(true, function(data){
					for(i in data.users){
						if(data.users[i]._id == vid){
							if(vote == 'down'){
								try{
									vname = data.users[i].name;
									foo.speak('y u :thumbsdown: @' + vname + '????');
									votes.push({id:vid, name: vname, vote: vote});
								}catch(err){
									console.log('error in votes(get)...');
								}
							}
						}
					}
				});	
			}
			foo.roomInfo(true, function(data) {
				var listeners = data.room.metadata.listeners;
				var half = Math.floor(listeners/2);
					if(ups == half){
						goodsong = true;
						foo.bop();
						var random = Math.floor(Math.random() * boppin.length);
						var msg = boppin[random];
						foo.speak(msg);
					}
			});
			if(debug){
				console.log('votes(get) running...');
			}
		}catch(err){
			console.log('error in votes(get)...');
		}
	}
}