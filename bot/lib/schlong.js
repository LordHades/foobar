module.exports = {
	fight: function(data){
		try{
			var id;
			if(data.command == "pmmed"){
				id = data.senderid;
			}else{
				id = data.userid;
			}
			var index = schlongs.indexOf(id);
			if(index == -1){
				var sDSize = Math.floor(Math.random() * 30) + 1;
				var sDInches = (sDSize / 2.5) + 1;
				var sDCm = (sDInches * 2.54);		     
				sDInches = sDInches.toFixed(1);		     
				sDCm = sDCm.toFixed(1);
				var sShaft = "=";
				while(sDSize) {
					sShaft += '=';
					sDSize--;
				}
				foo.speak('@' + name + "'s schlong is 8" + sShaft + 'D ' + sDInches + " Inches!" + ', or ' + sDCm + ' Centimeters!');
				schlongs.push(data.userid);
				schlongGame.push({name: name, id:data.id, in:sDInches, cm:sDCm});
				weiners.push(sDInches);
				clearTimeout(schlongRunning);
				if(schlongGame.length > 1){
					var schlongRunning = setTimeout(function(){
						for(i in schlongGame){
							schlongGame[i].in = parseFloat(schlongGame[i].in);
							if(weiners.length > 1){
								var weiner = Math.max.apply(Math, weiners);
								for(i in schlongGame){
									if(weiner == schlongGame[i].in){
										foo.speak('@' + schlongGame[i].name + "'s " + weiner + " inch .schlong wins a :trophy:");
									}
								}
							}
							schlongGame.splice(0, schlongGame.length);
							weiners = [];
						}
					}, 30000);
				}

			}else{
				foo.speak('stop being a :trollface: @' + name + ' get used to the .schlong u were born with');
			}
			if(debug){
				console.log('schlong(fight) running...');
			}
		}catch(err){
			console.log('error in schlong(fight)...');
		}
	}
}