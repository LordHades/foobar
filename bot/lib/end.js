module.exports = {
	get: function(data){
		try{
			var djId = data.room.metadata.current_dj;
			var djcount = data.room.metadata.djcount;
			if(on){	
				bot.remDj(djId);
				delete djs[djId];
				currentsong = "";
			}
			var title = data.room.metadata.current_song.metadata.song;
			var artist = data.room.metadata.current_song.metadata.artist;
			if(stats){
				bot.speak(title + ' by ' + artist + ' got ' + ups + ':thumbsup: ' + downs + ':thumbsdown: ' + snags + ':heart:');
			}
			snags = 0;
			if(battle){
				if(poll){
				clearTimeout(voter);
					if(battle_djs.length > 1){
						count++;
						poll = false;
						if((count % 2) == 0){
							var dj1 = battle_djs[0];
							var dj2 = battle_djs[1];
							voters = [];
							if(dj1.votes > dj2.votes){
								winner = dj1.name;
								bot.speak(dj1.name + ' wins!');
								++battle_djs[0].win;
								++battle_djs[1].lose;
								setTimeout(function(){
									bot.speak('@' + dj2.name + ' has lost & is getting ze :boot:');
								}, 500);
								setTimeout(function(){
									bot.remDj(dj2.id);
									battle_djs.splice(dj2.id, 1);
								}, 750);
								setTimeout(function(){
									bot.djbattle.call(data);
								}, 1000);		
							}else if(dj1.votes < dj2.votes){
								winner = dj2.name;
								bot.speak(dj2.name + ' wins!');
								++battle_djs[1].win;
								++battle_djs[0].lose;
								setTimeout(function(){
									bot.speak('@' + dj1.name + ' has lost & is getting ze :boot:');
								}, 500);
								setTimeout(function(){
									bot.remDj(dj1.id);
									battle_djs.splice(dj1.id, 1);
								}, 750);
								setTimeout(function(){
									bot.djbattle.call(data);
								}, 1000);
							}else if(dj1.votes == dj2.votes){
								bot.speak('@' + dj1.name + ' and @' + dj2.name + ' are tied!');
								battle_djs[0].votes = 0;
								battle_djs[1].votes = 0;
								battle_djs[0].songs = 0;
								battle_djs[1].songs = 0;
							}
							for(i in battle_djs){
								battle_djs[i].votes = 0;
							}
						}
					}
				}
			}
			if(debug){
				console.log('end(get) running...');
			}
		}catch(err){
			console.log('error in end(get)...');
			bot.signal.error(err);
		}
	}
}