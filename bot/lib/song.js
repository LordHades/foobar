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
				foo.stage.auto(data);
			}
			listeners = data.room.metadata.listeners;
			foo.song.listen(data);

			if(solo){
				foo.roomInfo(true, function(data) {
					var djnum = data.room.metadata.djcount;
					if(djnum < 3){
						if(data.room.metadata.current_dj == '51958aa5eb35c1598caf8627'){
							foo.skip();
							foo.talk('skipping myself for solo mode...');
						}
					}else{
						solo = false;
						foo.speak('solo mode is off');
					}
				});
			}
			if(on){
				var tweets = setTimeout(function(){
					foo.twt.post(data);
				}, 1800000);
			}
			if(battle){
				var alarm = (length - 30) * 1000;
				voter = setTimeout(function(){
					foo.djbattle.vote(data);
				}, alarm);
				foo.roomInfo(true, function(data) {
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
			console.log('error in song(get)...', err);
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
				foo.remDj(currentDjId);
				foo.roomInfo(true, function(data) {
					var currentDjName = data.room.metadata.current_song.djname;
					foo.speak('skipped you @' + currentDjName + ' bc ur song was stuck');
				});
			}
			if(debug){
				console.log('song(listen) running...');
			}
		}catch(err){
			console.log('error in song(listen)...');
		}
	},
	next: function(data){
		try{
			foo.playlistAll( function(data) {
				foo.talk(data.list[0].metadata.song + " by " + data.list[0].metadata.artist);
			});
			if(debug){
				console.log('song(next) running...');
			}
		}catch(err){
			console.log('error in song(next)...');
		}
	},
	snag: function(data){
		try{
			foo.roomInfo(true, function(data) {
				foo.playlistAll(function(playlist){
				    var i = playlist.list.length;
				    newsong = data.room.metadata.current_song._id;
	                newsongname = songname = data.room.metadata.current_song.metadata.song;
				    while (i--) {
				      if (playlist.list[i]._id===newsong) {
				        foo.talk("I already have this!");
				        return;
				      }
				    }
				    foo.talk(':musical_note: '+ artist + ' ~ ' + newsongname + ' added to my Q :musical_note:');
				    foo.playlistAdd(newsong, playlist.list.length);
				    foo.snag();
				});
			 });
			if(debug){
				console.log('song(snag) running...');
			}
		}catch(err){
			console.log('error in song(snag)...');
		}
	},
	toss: function(data){
		try{
			foo.roomInfo(true, function(data) {
				foo.playlistAll(function(playlist){
				    var i = playlist.list.length;
				    newsong = data.room.metadata.current_song._id;
	                newsongname = songname = data.room.metadata.current_song.metadata.song;
				    while (i--) {
				      if (playlist.list[i]._id===newsong) { 
				      	foo.talk('/me removed ' + newsongname + ' from  its Q');
				        foo.playlistRemove(i);
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
		}
	},
	snagged: function(){
		++snags;
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
					foo.talk('the theme is ' + theme);
			}, 500);
			if(debug){
				console.log('song(theme) running...');
			}
		}catch(err){
			console.log('error in song(theme)...');
		}
	},
	shuffle: function(data){
		try{
			foo.playlistAll(function(playlist) {
				var x = Math.ceil(Math.random() * playlist.list.length);
				foo.playlistReorder(0, x);
			    foo.talk("/me shuffles its playlist");
			});
			if(debug){
				console.log('song(shuffle) running...');
			}
		}catch(err){
			console.log('error in song(shuffle)...');
		}
	}
}