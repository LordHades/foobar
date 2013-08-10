module.exports = {
    detect: function(data){
        try{
        	if(auto_queue){
	        	switch(data.command) {
		            case "add_dj":
		                if(!queue_mode){
		                    bot.roomInfo(true, function(data){
		                        if(data.djids.length > 4){
		                            queue_mode = true;
		                            bot.speak(start_queue_msg);
		                            var automsg = setTimeout(function(){
		                                bot.speak(queue_msg);
		                            }, 750);
		                        }  
		                    });
		                }
		            break;
		            case "rem_dj":
		                if(queue_mode){
		                    bot.roomInfo(true, function(data){
		                        if(data.djids.length < 3){
		                            queue_mode = false;
		                            bot.speak(slow_queue_msg);
		                        }  
		                    });
		                }
		            break;
		        }
		    }
	    }catch(err){
	    	bot.signal.error(err);
	    }
    },
	add: function(data){
		try{
			if(queue_mode){
				switch(data.command){
					case 'speak':
						for(i in djs){
							if(djs[i] == data.userid){
								bot.talk('You\'re DJing... @' + name);
								return false;
							}
						}
						for(i in q){
							if(q[i].id == data.userid){
								bot.talk('You\'re in the queue already @' + name);
								return false;
							}
						}
						q.push({name:data.name, id:data.userid});
						bot.talk('You\'re #' + q.length + ' in the queue. @' + name);
						if(q.length > 0  && djs.length < 5) {
							var callout = setTimeout(function(){
								bot.signal.call(data);
							}, 500);
						}
					break;
					case 'pmmed':
						for(i in users){
							if(users[i].id == data.senderid){
								users[i].name = name;
							}
						}
						for(i in djs){
							if(djs[i] == data.senderid){
								bot.talk('You\'re DJing... @' + name);
								return false;
							}
						}
						for(i in q){
							if(q[i].id == data.senderid){
								bot.talk('You\'re in the queue already @' + name);
								return false;
							}
						}
						q.push({name:name, id:data.senderid});
						bot.talk('You\'re #' + q.length + ' in the queue. @' + name);
						if(q.length > 0  && djs.length < 5) {
							var callout = setTimeout(function(){
								bot.signal.call(data);
							}, 500);
						}
					break;
				}
			}else{
				bot.talk('the queue is now off.');
			}
		}catch(err){
			bot.signal.error(err);
		}
	},
	remove: function(data){
		try{
			if(queue_mode){
				var id;
				for(i in q){
					if(data.command == "pmmed"){
						id = data.senderid;
					}else{
						id = data.userid;
					}
	                if (q[i].id == id){
	                    q.splice(i, 1);
	                    bot.talk('You\'re deleted from the queue. @' + name);
	                }
	            }
			}else{
				bot.talk('the queue is now off.');
			}
		}catch(err){
			bot.signal.error(err);
		}
	},
	position: function(data){
		try{
			var j = 0;
		    if(q !== undefined){
		    	var qlen = q.length;
		    	var id;
			    for (i in q) {
			        j++;
			        if(data.command == "pmmed"){
			        	id = data.senderid;
			        }else{
			        	id = data.userid;
			        }
			        if (q[i].id == id) {
			            bot.talk('You\'re ' + j + '/' + qlen + ' @' + name);
			        }
			    }
			}
		}catch(err){
			bot.signal.error(err);
		}
	},
	print: function(){
		try{
			if(queue_mode){
				if(q.length > 0){
					var str = "Q:";
		            var j = 0;
		            for (i in q) {
		                j++;
		                str += (' ' + q[i].name + '[' + j + '], ');
		            }
		            bot.talk(str.substring(0, str.length - 2));
		        }else{
		        	bot.talk('the queue is empty...');
		        }
			}else{
				bot.talk('the queue is off');
			}
		}catch(err){
			bot.signal.error(err);
		}
	},
	vip: function(data){
		try{
			var vip;
			var index = text.indexOf('/');
			if(index >= 0){
				sym = '/';
			}else{
				sym = '.';
			}
			vip = text.split( sym + 'bump ');
			var name = vip[1];
			if(vip[1] !== undefined){
				bot.getUserId(name, function(data){
					var vipId = data.userid;
					for (i in q) {
		        		if (q[i].id == vipId) {
		           			name = q[i].name;
		           			q.splice(i, 1);
							q.unshift({name:name, id:vipId});
							bot.speak('@' + name +' has been moved to the front of the line.');
						}
					}
				});
			}
		}catch(err){
			bot.signal.error(err);
		}
	}
}