module.exports = {
	init: function(data){
		try{
			winner = '';
			battle_djs = [];
			if(debug){
				console.log('battle(init) running...');
			}
		}catch(err){
			console.log('error in battle(init)...');
			bot.signal.error(err);
		}
	},
	add: function(data){
		try{
			battle_djs.push({name: data.name, id: data.userid, win: 0, lose: 0, votes: 0, songs: 0});
			if(battle){
				if(battle_djs.length == 0){
					bot.speak('we need the first 2 djs to start the battle');
				}else if(battle_djs.length == 1){
					bot.speak('we need a dj to battle @' + battle_djs[0].name);
				}
				else if(battle_djs.length == 2){
					bot.speak('let the games begin!');
					bot.djbattle.start(data);
				}
				else{
					bot.speak(name + ' is ready to battle');
				}
			}
			if(debug){
				console.log('battle(add) running...');
			}
		}catch(err){
			console.log('error in battle(add)...');
			bot.signal.error(err);
		}
	},
	start: function(data){
		try{
			stagehand = true;
			queue_mode = false;
			for(i in djs){
				bot.pm('clearing the decks :P, you\'ve got 10 seconds', djs[i].userid);
			}
			setTimeout(function(){
				bot.nuke.launch();
			}, 10500);
			setTimeout(function(){
				bot.djbattle.run(data);
			}, 15000);
			if(debug){
				console.log('battle(start) running...');
			}
		}catch(err){
			console.log('error in battle(start)...');
			bot.signal.error(err);
		}
	},
	run: function(data){
		try{
			setTimeout(function(){
				bot.speak('@' + battle_djs[0].name + ' & ' + '@' + battle_djs[1].name + ' plz hop up.');
			}, 750);
			if(debug){
				console.log('battle(run) running...');
			}
		}catch(err){
			console.log('error in battle(run)...');
			bot.signal.error(err);
		}
	},
	vote: function(data){
		try{
			poll = true;
			bot.roomInfo(true, function(data) {
				currentDjId = data.room.metadata.current_dj;
				try{
					currentDjName = data.room.metadata.current_song.djname;	
				}catch(err){
					bot.speak('there are no djs?');
					battle = false;
					setTimeout(function(){
						bot.speak('dj battle is off...');
					}, 500);
				}
				
			});
			for (i in battle_djs){
				if(battle_djs[i].id == currentDjId){
					currentDjName = battle_djs[i].name;
					bot.speak('plz type +1 to vote for @' + currentDjName);
				}
			}
			if(debug){
				console.log('battle(vote) running...');
			}
		}catch(err){
			console.log('error in battle(vote)...');
			bot.signal.error(err);
		}
	},
	call: function(data){
		try{
			if(battle_djs.length > 1){
				var waitingfor = battle_djs[1].id;
				setTimeout(function() {
				if(battle_djs.length > 1 && battle_djs[1].id == waitingfor) {
					battle_djs.splice(1, 1);
					bot.djbattle.call(data);
				}
			}, 10000);
				bot.speak('You\'re up next! @' + battle_djs[1].name +' You\'ve got 10 seconds...');
			}else{
				bot.speak('there are no more challengers... You are the new champion @' + winner + '!');
				battle_mode = false;
				setTimeout(function(){
					battle_djs = [];
					bot.speak('dj battle is off...');
					battle_mode = false;
					stagehand = false;
					poll = false;
				}, 500);
			}
			if(debug){
				console.log('battle(call) running...');
			}
		}catch(err){
			console.log('error in battle(call)...');
			bot.signal.error(err);
		}
	},
	print: function(){
		try{
			if(battle_mode){
				if(battle_djs.length > 0){
					var str = "Battle List:";
		            var j = 0;
		            for (i in battle_djs) {
		                j++;
		                str += (' ' + battle_djs[i].name + '[' + j + '], ');
		            }
		            bot.talk(str.substring(0, str.length - 2));
		        }else{
		        	bot.talk('Battle List is empty...');
		        }
			}else{
				bot.talk('Dj Battle is off');
			}
			if(debug){
				console.log('battle(print) running...');
			}
		}catch(err){
			console.log('error in battle(print)...');
			bot.signal.error(err);
		}
	},
}