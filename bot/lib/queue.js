module.exports = {
	add: function(data){
		try{
			if(on){
				switch(data.command){
					case 'speak':
						for(i in djs){
							if(djs[i] == data.userid){
								foo.talk('You\'re DJing... @' + name);
								return false;
							}
						}
						for(i in q){
							if(q[i].id == data.userid){
								foo.talk('You\'re in teh Q already @' + name);
								return false;
							}
						}
						q.push({name:data.name, id:data.userid});
							foo.talk('You\'re #' + q.length + ' in teh Q. @' + name);
						if(q.length > 0  && djs.length < 5) {
							foo.signal.call(data);
						}
					break;
					case 'pmmed':
						for(i in djs){
							if(djs[i] == data.senderid){
								foo.talk('You\'re DJing... @' + name);
								return false;
							}
						}
						for(i in q){
							if(q[i].id == data.senderid){
								foo.talk('You\'re in teh Q already @' + name);
								return false;
							}
						}
						q.push({name:data.name, id:data.senderid});
							foo.talk('You\'re #' + q.length + ' in teh Q. @' + name);
						if(q.length > 0  && djs.length < 5) {
							foo.signal.call(data);
						}
					break;
				}
			}else{
				foo.talk('teh Q is now off.');
			}
			if(debug){
				console.log('q(add) running...');
			}
		}catch(err){
			console.log('error in q(add)...');
		}
	},
	remove: function(data){
		try{
			if(on){
				var id;
				for(i in q){
					if(data.command == "pmmed"){
						id = data.senderid;
					}else{
						id = data.userid;
					}
	                if (q[i].id == id){
	                    q.splice(i, 1);
	                    foo.talk('You\'re deleted from teh Q. @' + name);
	                }
	            }
			}else{
				foo.talk('teh Q is now off.');
			}
			if(debug){
				console.log('q(remove) running...');
			}
		}catch(err){
			console.log('error in q(remove)...');
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
			            foo.talk('You\'re ' + j + '/' + qlen + ' @' + name);
			        }
			    }
			}
			if(debug){
				console.log('q(position) running...');
			}
		}catch(err){
			console.log('error in q(position)...');
		}
	},
	print: function(){
		try{
			if(on){
				if(q.length > 0){
					var str = "Q:";
		            var j = 0;
		            for (i in q) {
		                j++;
		                str += (' ' + q[i].name + '[' + j + '], ');
		            }
		            foo.talk(str.substring(0, str.length - 2));
		        }else{
		        	foo.talk('teh Q is empty...');
		        }
			}else{
				foo.talk('teh Q is off');
			}
			if(debug){
				console.log('q(print) running...');
			}
		}catch(err){
			console.log('error in q(print)...');
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
				foo.getUserId(name, function(data){
					var vipId = data.userid;
					for (i in q) {
		        		if (q[i].id == vipId) {
		           			name = q[i].name;
		           			q.splice(i, 1);
							q.unshift({name:name, id:vipId});
							foo.speak('@' + name +' has been moved to the front of the line.');
						}
					}
				});
			}
			if(debug){
				console.log('q(vip) running...');
			}
		}catch(err){
			console.log('error in q(vip)...');
		}
	}
}