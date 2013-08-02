module.exports = {
	new: function(data){
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
            for(i in banned_artists){
                if(artist == banned_artists[i]){
                    bot.remDj(dj);
                    var banned = setTimeout(function(){
                        bot.speak("we don\'t allow any " + artist + " to be played in this room...");
                    },750);
                }
            }
			listeners = data.room.metadata.listeners;
			bot.song.listen(data);
            if(autodj_mode){
    			bot.stage.auto(data);
			}
            if(solo_mode){
				bot.roomInfo(true, function(data) {
					if(data.room.metadata.current_dj == botid){
						bot.skip();
						bot.talk('skipping myself for solo mode...');
                        return;
					}
				});
			}
			if(battle_mode){
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
            if(listenSong != null){
                clearTimeout(listenSong);
                listenSong = null;
            }
            if(stuckTimer != null){
                clearTimeout(stuckTimer);
                stuckTimer = null;
                bot.speak('song was stuck, thanks for skipping...');
            }
            lastdj = data.room.metadata.current_dj;
            listenSong = setTimeout(function(){
                listenSong = null;
                bot.roomInfo(true, function(data) {
                	var currentDjName = data.room.metadata.current_song.djname;
			        bot.speak('song is stuck plz skip, @' + currentDjName + ' or you will be removed from deck in 10 seconds...');
                });
                stuckTimer = setTimeout(function(){
                    stuckTimer = null;
                    bot.remDj(lastdj);
                }, 10000);
            }, (length + 10) * 1000);
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
	},
	votes: function(data){
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
							if(announce_mode){
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
					}
				});	
			}
			bot.roomInfo(true, function(data) {
				var listeners = data.room.metadata.listeners;
				var half = Math.floor(listeners/2);
					if(ups == half){
						goodsong = true;
						bot.bop();
						if(announce_mode){
                            var random = Math.floor(Math.random() * boppin.length);
						    var msg = boppin[random];
						    bot.speak(msg);
						}
					}
			});
			if(debug){
				console.log('votes(get) running...');
			}
		}catch(err){
			console.log('error in votes(get)...');
			bot.signal.error(err);
		}
	},
	end: function(data){
		try{
			var djId = data.room.metadata.current_dj;
			var djcount = data.room.metadata.djcount;
			if(queue_mode){
                if(djcount > 3){
    				bot.remDj(djId);
	            	delete djs[djId];
		            currentsong = "";
		        }else{
		            bot.speak(slow_queue_msg);
                    queue_mode = false;
		        }        
			}
            if(stepdown){
                bot.remDj();
                stepdown = false;
            }
            if(tweet_mode){
                bot.signal.tweet(data);                
            }
			var title = data.room.metadata.current_song.metadata.song;
			var artist = data.room.metadata.current_song.metadata.artist;
			if(announce_mode){
				bot.speak(title + ' by ' + artist + ' got ' + ups + ':thumbsup: ' + downs + ':thumbsdown: ' + snags + ':heart:');
			}
			snags = 0;
			if(battle_mode){
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