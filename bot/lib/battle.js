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
		}
	},
	add: function(data){
		try{
			battle_djs.push({name: data.name, id: data.userid, win: 0, lose: 0, votes: 0, songs: 0});
			if(battle){
				if(battle_djs.length == 0){
					foo.speak('we need the first 2 djs to start the battle');
				}else if(battle_djs.length == 1){
					foo.speak('we need a dj to battle @' + battle_djs[0].name);
				}
				else if(battle_djs.length == 2){
					foo.speak('let the games begin!');
					foo.djbattle.start(data);
				}
				else{
					foo.speak(name + ' is ready to battle');
				}
			}
			if(debug){
				console.log('battle(add) running...');
			}
		}catch(err){
			console.log('error in battle(add)...', err);
		}
	},
	start: function(data){
		try{
			stagehand = true;
			on = false;
			for(i in djs){
				foo.pm('clearing the decks :P, you\'ve got 10 seconds', djs[i].userid);
			}
			setTimeout(function(){
				foo.nuke.launch();
			}, 10500);
			setTimeout(function(){
				foo.djbattle.run(data);
			}, 15000);
			if(debug){
				console.log('battle(start) running...');
			}
		}catch(err){
			console.log('error in battle(start)...', err);
		}
	},
	run: function(data){
		try{
			setTimeout(function(){
				foo.speak('@' + battle_djs[0].name + ' & ' + '@' + battle_djs[1].name + ' plz hop up.');
			}, 750);
			if(debug){
				console.log('battle(run) running...');
			}
		}catch(err){
			console.log('error in battle(run)...', err);
		}
	},
	vote: function(data){
		try{
			poll = true;
			foo.roomInfo(true, function(data) {
				currentDjId = data.room.metadata.current_dj;
				try{
					currentDjName = data.room.metadata.current_song.djname;	
				}catch(err){
					foo.speak('there are no djs?');
					battle = false;
					setTimeout(function(){
						foo.speak('dj battle is off...');
					}, 500);
				}
				
			});
			for (i in battle_djs){
				if(battle_djs[i].id == currentDjId){
					currentDjName = battle_djs[i].name;
					foo.speak('plz type +1 to vote for @' + currentDjName);
				}
			}
			if(debug){
				console.log('battle(vote) running...');
			}
		}catch(err){
			console.log('error in battle(vote)...', err);
		}
	},
	call: function(data){
		try{
			if(battle_djs.length > 1){
				var waitingfor = battle_djs[1].id;
				setTimeout(function() {
				if(battle_djs.length > 1 && battle_djs[1].id == waitingfor) {
					battle_djs.splice(1, 1);
					foo.djbattle.call(data);
				}
			}, 10000);
				foo.speak('You\'re up next! @' + battle_djs[1].name +' You\'ve got 10 seconds...');
			}else{
				foo.speak('there are no more challengers... You are the new champion @' + winner + '!');
				battle = false;
				setTimeout(function(){
					battle_djs = [];
					foo.speak('dj battle is off...');
					battle = false;
					stagehand = false;
					poll = false;
				}, 500);
			}
			if(debug){
				console.log('battle(call) running...');
			}
		}catch(err){
			console.log('error in battle(call)...', err);
		}
	},
	print: function(){
		try{
			if(battle){
				if(battle_djs.length > 0){
					var str = "Battle List:";
		            var j = 0;
		            for (i in battle_djs) {
		                j++;
		                str += (' ' + battle_djs[i].name + '[' + j + '], ');
		            }
		            foo.talk(str.substring(0, str.length - 2));
		        }else{
		        	foo.talk('Battle List is empty...');
		        }
			}else{
				foo.talk('Dj Battle is off');
			}
			if(debug){
				console.log('battle(print) running...');
			}
		}catch(err){
			console.log('error in battle(print)...');
		}
	},
}