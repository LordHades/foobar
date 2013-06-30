module.exports ={
	get: function(data){
		try{
			for (i in afks){
				if(afks[i].id == data.userid){
	            	return false;
	            }
	        }
	        afks.push({name: data.name, id: data.userid});
			foo.speak(name + ' is afk');
			if(debug){
				console.log('afk(get) running...');
			}
		}catch(err){
			console.log('error in afk(get)...', err);
		}
	},
	give: function(data){
		try{
			for(i in afks){
				if(afks[i].id == data.userid){
					afks.splice(i, 1);
					foo.speak(name + ' is back');
				}
			}
			if(debug){
				console.log('afk(give) running...');
			}
		}catch(err){
			console.log('error in afk(give)...', err);
		}
	},
	print: function(){
		try{
			if(afks.length > 0){
				var str = "afks:";
	            for (i in afks) {
	            	if(afks[i].id == data.userid);
	            		return false;
	            	}
	                str += (' ' + afks[i].name);	 	         
	           		foo.talk(str);
	        }else{
	        	foo.talk('there are no afks...');
	        }
	        if(debug){
				console.log('afk(print) running...');
			}
		}catch(err){
			console.log('error in afk(print)...', err);
		}
	},
	listen: function(data){
		try{
			for(i in afks){
				var sname = afks[i].name;
				var sid = afks[i].id;
				var mention = '@'+sname;
				if(data.userid !== '51958aa5eb35c1598caf8627'){
					if(data.text.match(sname) || data.text.match(mention) || data.text.match(mention) || data.text.match(sname)){
						var ts = new Date(),
							year = ts.getFullYear(),
							month = ts.getMonth(),
							day = ts.getDate(),
							hour = ts.getHours(),
							minutes = ts.getMinutes(),
							seconds = ts.getSeconds(),
							time = month + '/' + day + '/' + year + ' ' + hour + ':' + minutes + ':' + seconds + ' ... '
							foo.pm(time + data.text, sid);
							foo.speak(sname + ' is afk...');
						return false;
					}
				}
			}
			if(debug){
				console.log('afk(listen) running...');
			}
		}catch(err){
			console.log('error in afk(listen)...', err);
		}
	}
}