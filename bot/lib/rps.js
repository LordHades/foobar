module.exports = {
	shoot: function(data){
		try{
			var id;
			var random = Math.floor(Math.random() * rps.length);
			msg = rps[random];
			bot.speak(msg);
			if(data.command == "pmmed"){
				id = data.senderid;
			}else{
				id = data.userid;
			}
			rpsGame.push({name:name, id:id, rps:msg});
			setTimeout(
				function(){
					rpsGame.splice(0, rpsGame.length);
				}, 10000);
			if(rpsGame.length == 2){
				a = rpsGame.pop();
				b = rpsGame.pop();
				setTimeout(function () {
					if(a.rps == "rock"){
						if(b.rps == "rock")
							setTimeout(function(){
								bot.speak("Tie. Lame. :\(");
							}, 500);
						if(b.rps == "paper")
							setTimeout(function(){
								bot.speak(b.name + " wins.");
							}, 500);
						if(b.rps == "scissors")
							setTimeout(function(){
								bot.speak(a.name + " wins.");
							}, 500);
					}else if(a.rps == "paper"){
						if(b.rps == "rock")
							setTimeout(function(){
								bot.speak(a.name + " wins.");
							}, 500);
						if(b.rps == "paper")
							setTimeout(function(){
								bot.speak("Tie. Lame. :\(");
							}, 500);
						if(b.rps == "scissors")
							setTimeout(function(){
								bot.speak(b.name + " wins.");
							}, 500);
					}else if(a.rps == "scissors"){
						if(b.rps == "rock")
							setTimeout(function(){
								bot.speak(b.name + " wins.");
							}, 500);
						if(b.rps == "paper")
							setTimeout(function(){
								bot.speak(a.name + " wins.");
							}, 500);
						if(b.rps == "scissors")
							setTimeout(function(){
								bot.speak("Tie. Lame. :\(");
							}, 500);
					}
				}, 150);
			}
			if(debug){
				console.log('rps(shoot) running...');
			}
		}catch(err){
			console.log('error in rps(shoot)...');
			bot.signal.error(err);
		}
	}
}