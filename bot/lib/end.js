module.exports = {
	get: function(data){
		try{
			var djId = data.room.metadata.current_dj;
			var djcount = data.room.metadata.djcount;
			if(on){	
				foo.remDj(djId);
				delete djs[djId];
				currentsong = "";
			}
			foo.speak(':thumbsup:'+ ups +' :thumbsdown:'+ downs +' :heart:' + snags);
			snags = 0;
			if(battle){
				clearTimeout(voter);
				if(poll){
					if(battle_djs.length > 1){
						count++;
						poll = false;
						if((count % 2) == 0){
							var dj1 = battle_djs[0];
							var dj2 = battle_djs[1];
							voters = [];
							if(dj1.votes > dj2.votes){
								winner = dj1.name;
								foo.speak(dj1.name + ' wins!');
								++battle_djs[0].win;
								++battle_djs[1].lose;
								setTimeout(function(){
									foo.speak('@' + dj2.name + ' has lost & is getting ze :boot:');
								}, 500);
								setTimeout(function(){
									foo.remDj(dj2.id);
									battle_djs.splice(dj2.id, 1);
								}, 750);
								setTimeout(function(){
									foo.djbattle.call(data);
								}, 1000);		
							}else if(dj1.votes < dj2.votes){
								winner = dj2.name;
								foo.speak(dj2.name + ' wins!');
								++battle_djs[1].win;
								++battle_djs[0].lose;
								setTimeout(function(){
									foo.speak('@' + dj1.name + ' has lost & is getting ze :boot:');
								}, 500);
								setTimeout(function(){
									foo.remDj(dj1.id);
									battle_djs.splice(dj1.id, 1);
								}, 750);
								setTimeout(function(){
									foo.djbattle.call(data);
								}, 1000);
							}else if(dj1.votes == dj2.votes){
								foo.speak('@' + dj1.name + ' and @' + dj2.name + ' are tied!');
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
			console.log('error in end(get)...', err);
		}
	}
}