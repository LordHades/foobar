module.exports = {
	get: function(data){
		try{
			dj = data.room.metadata.current_dj;
			newsong = data.room.metadata.current_song.metadata;
			album = newsong.album;
			cover = newsong.coverart;
			date = newsong.releasedate;
			title = newsong.song;
			artist = newsong.artist;
			length = data.room.metadata.current_song.metadata.length;
			snags = 0;
			poll = false;
			sirs = [];
			ragers = [];
			schlongs = [];
			snaggers = [];
			qtrolls = [];
			boos = [];
			if(autodj){
				bot.stage.auto(data);
			}
			listeners = data.room.metadata.listeners;
			bot.song.listen(data);

			if(solo){
				bot.roomInfo(true, function(data) {
					var djnum = data.room.metadata.djcount;
					if(djnum < 3){
						if(data.room.metadata.current_dj == botid){
							bot.skip();
							bot.talk('skipping myself for solo mode...');
						}
					}else{
						solo = false;
						bot.speak('solo mode is off');
					}
				});
			}
			if(on){
				var tweets = setTimeout(function(){
					tweeter.post(data);
				}, 1800000);
			}
			if(battle){
				var alarm = (length - 30) * 1000;
				voter = setTimeout(function(){
					bot.djbattle.vote(data);
				}, alarm);
				bot.roomInfo(true, function(data) {
					currentDjId = data.room.metadata.current_dj;			
				});
				for (i in battle_djs){
					if(battle_djs[i].id == currentDjId){
						++battle_djs[i].songs;
					}
				}
			}
			if(debug){
				console.log('song(get) running...');
			}
		}catch(err){
			console.log('error in song(get)...');
			bot.signal.error(err);
		}
	},
	listen: function(data){
		try{
			clearInterval(counting);
			var length = data.room.metadata.current_song.metadata.length;
			var stuck = (length) + 5000;
			var counter = 0;
			var counting = setInterval(function(){
				counter++;
			}, 1000);
			if(counter == stuck){
				bot.remDj(currentDjId);
				bot.roomInfo(true, function(data) {
					var currentDjName = data.room.metadata.current_song.djname;
					bot.speak('skipped you @' + currentDjName + ' bc ur song was stuck');
				});
			}
			if(debug){
				console.log('song(listen) running...');
			}
		}catch(err){
			console.log('error in song(listen)...');
			bot.signal.error(err);
		}
	},
	next: function(data){
		try{
			bot.playlistAll( function(data) {
				bot.talk(data.list[0].metadata.song + " by " + data.list[0].metadata.artist);
			});
			if(debug){
				console.log('song(next) running...');
			}
		}catch(err){
			console.log('error in song(next)...');
			bot.signal.error(err);
		}
	},
	snag: function(data){
		try{
			bot.roomInfo(true, function(data) {
				bot.playlistAll(function(playlist){
				    var i = playlist.list.length;
				    newsong = data.room.metadata.current_song._id;
	                newsongname = songname = data.room.metadata.current_song.metadata.song;
				    while (i--) {
				      if (playlist.list[i]._id===newsong) {
				        bot.talk("I already have this!");
				        return;
				      }
				    }
				    bot.talk(':musical_note: '+ artist + ' ~ ' + newsongname + ' added to my Q :musical_note:');
				    bot.playlistAdd(newsong, playlist.list.length);
				    bot.snag();
				});
			 });
			if(debug){
				console.log('song(snag) running...');
			}
		}catch(err){
			console.log('error in song(snag)...');
			bot.signal.error(err);
		}
	},
	toss: function(data){
		try{
			bot.roomInfo(true, function(data) {
				bot.playlistAll(function(playlist){
				    var i = playlist.list.length;
				    newsong = data.room.metadata.current_song._id;
	                newsongname = songname = data.room.metadata.current_song.metadata.song;
				    while (i--) {
				      if (playlist.list[i]._id===newsong) { 
				      	bot.talk('/me removed ' + newsongname + ' from  its Q');
				        bot.playlistRemove(i);
				        return;
				      }
				    }
				});
			});
			if(debug){
				console.log('song(toss) running...');
			}	
		}catch(err){
			console.log('error in song(toss)...');
			bot.signal.error(err);
		}
	},
	snagged: function(data){
		++snags;
		bot.afk.update(data.userid);
	},
	theme: function(data){
		try{
			var setTheme;
			var index = text.indexOf('/');
			if(index >= 0){
				sym = '/';
			}else{
				sym = '.';
			}
			setTheme = text.split( sym + 'set ');
			theme = setTheme[1];
			var settheme = setTimeout(function(){
					bot.talk('the theme is ' + theme);
			}, 500);
			if(debug){
				console.log('song(theme) running...');
			}
		}catch(err){
			console.log('error in song(theme)...');
			bot.signal.error(err);
		}
	},
	shuffle: function(data){
		try{
			bot.playlistAll(function(playlist) {
				var x = Math.ceil(Math.random() * playlist.list.length);
				bot.playlistReorder(0, x);
			    bot.talk("/me shuffles its playlist");
			});
			if(debug){
				console.log('song(shuffle) running...');
			}
		}catch(err){
			console.log('error in song(shuffle)...');
			bot.signal.error(err);
		}
	}
}