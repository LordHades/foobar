module.exports = {
	rpsls: function(data){
		try{
			var id;
			var random = Math.floor(Math.random() * rpsls.length);
			msg = rpsls[random];
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
				}, 15000);
			if(rpsGame.length == 2){
				a = rpsGame.pop();
				b = rpsGame.pop();
				setTimeout(function () {
                    switch(a.rps){
    					case "rock":
                            switch(b.rps){
                                case "rock":
                                    setTimeout(function(){
            							bot.speak("Tie. Lame. :\(");
        							}, 500);  
                                break;
                                case "paper":
                                    setTimeout(function(){
            							bot.speak(b.name + " wins.");
        							}, 500);
                                    setTimeout(function(){
            							bot.speak("paper covers rock...");
        							}, 750); 
                                break;
                                case "scissors":
                                    setTimeout(function(){
            							bot.speak(a.name + " wins.");
        							}, 500);
                                    setTimeout(function(){
            							bot.speak("rock crushes scissors...");
        							}, 750); 
                                break;
                                case "lizard":
                                    setTimeout(function(){
                						bot.speak(a.name + " wins.");
        							}, 500);
                                    setTimeout(function(){
            							bot.speak("rock crushes lizard...");
        							}, 750); 
                                break;
                                case "spock":
                                    setTimeout(function(){
                						bot.speak(b.name + " wins.");
        							}, 500);
                                    setTimeout(function(){
            							bot.speak("spock throws rock...");
        							}, 750); 
                                break;
                            }
                        break;
                        case "paper":
                            switch(b.rps){
                                case "rock":
                                    setTimeout(function(){
                						bot.speak(a.name + " wins.");
        							}, 500);
                                    setTimeout(function(){
            							bot.speak("paper covers rock...");
        							}, 750);    
                                break;
                                case "paper":
                                    setTimeout(function(){
            							bot.speak("Tie. Lame. :\(");
        							}, 500);
                                break;
                                case "scissors":
                                    setTimeout(function(){
            							bot.speak(b.name + " wins.");
        							}, 500);
                                    setTimeout(function(){
            							bot.speak("scissors cut paper...");
        							}, 750); 
                                break;
                                case "lizard":
                                    setTimeout(function(){
                						bot.speak(b.name + " wins.");
        							}, 500);
                                    setTimeout(function(){
            							bot.speak("lizards tear paper...");
        							}, 750); 
                                break;
                                case "spock":
                                    setTimeout(function(){
                						bot.speak(a.name + " wins.");
        							}, 500);
                                    setTimeout(function(){
            							bot.speak("paper covers spock...");
        							}, 750); 
                                break;
                            }
                        break;
                        case "scissors":
                            switch(b.rps){
                                case "rock":
                                    setTimeout(function(){
                    					bot.speak(b.name + " wins.");
        							}, 500);
                                    setTimeout(function(){
            							bot.speak("rock crushes scissors...");
        							}, 750);    
                                break;
                                case "paper":
                                    setTimeout(function(){
            							bot.speak(a.name + " wins.");
        							}, 500);
                                    setTimeout(function(){
            							bot.speak("scissors cut paper...");
        							}, 750); 
                                break;
                                case "scissors":
                                    setTimeout(function(){
            							bot.speak("Tie. Lame. :\(");
        							}, 500);
                                break;
                                case "lizard":
                                    setTimeout(function(){
                						bot.speak(a.name + " wins.");
        							}, 500);
                                    setTimeout(function(){
            							bot.speak("scissors cut lizard...");
        							}, 750); 
                                break;
                                case "spock":
                                    setTimeout(function(){
                						bot.speak(b.name + " wins.");
        							}, 500);
                                    setTimeout(function(){
            							bot.speak("spock breaks scissors...");
        							}, 750); 
                                break;
                            }
                        break;
                        case "lizard":
                            switch(b.rps){
                                case "rock":
                                    setTimeout(function(){
                        				bot.speak(b.name + " wins.");
        							}, 500);
                                    setTimeout(function(){
            							bot.speak("rock crushes lizard...");
        							}, 750);     
                                break;
                                case "paper":
                                    setTimeout(function(){
            							bot.speak(a.name + " wins.");
        							}, 500);
                                    setTimeout(function(){
            							bot.speak("lizard tears paper...");
        							}, 750); 
                                break;
                                case "scissors":
                                    setTimeout(function(){
            							bot.speak(b.name + " wins.");
        							}, 500);
                                    setTimeout(function(){
            							bot.speak("scissors cut lizard...");
        							}, 750); 
                                break;
                                case "lizard":
                                    setTimeout(function(){
                						bot.speak("Tie. Lame. :\(");
        							}, 500);
                                break;
                                case "spock":
                                    setTimeout(function(){
                						bot.speak(a.name + " wins.");
        							}, 500);
                                    setTimeout(function(){
            							bot.speak("lizard kills spock...");
        							}, 750); 
                                break;
                            }
                        break;
                        case "spock":
                            switch(b.rps){
                                case "rock":
                                    setTimeout(function(){
                            			bot.speak(a.name + " wins.");
        							}, 500);
                                    setTimeout(function(){
            							bot.speak("spock throws rock...");
        							}, 750);     
                                break;
                                case "paper":
                                    setTimeout(function(){
            							bot.speak(b.name + " wins.");
        							}, 500);
                                    setTimeout(function(){
            							bot.speak("paper covers spock...");
        							}, 750); 
                                break;
                                case "scissors":
                                    setTimeout(function(){
            							bot.speak(a.name + " wins.");
        							}, 500);
                                    setTimeout(function(){
            							bot.speak("spock breaks scissors...");
        							}, 750); 
                                break;
                                case "lizard":
                                    setTimeout(function(){
                						bot.speak(b.name + " wins.");
        							}, 500);
                                    setTimeout(function(){
            							bot.speak("lizard kills spock...");
        							}, 750); 
                                break;
                                case "spock":
                                    setTimeout(function(){
                						bot.speak("Tie. Lame. :\(");
        							}, 500);
                                break;
                            }
                        break;
					}
				}, 150);
			}
			if(debug){
				console.log('rpsls(shoot) running...');
			}
		}catch(err){
			console.log('error in rpsls(shoot)...');
			bot.signal.error(err);
		}
	},
    schlong: function(data){
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
                bot.speak('@' + name + "'s schlong is 8" + sShaft + 'D ' + sDInches + " Inches!" + ', or ' + sDCm + ' Centimeters!');
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
                                        bot.speak('@' + schlongGame[i].name + "'s " + weiner + " inch .schlong wins a :trophy:");
                                    }
                                }
                            }
                            schlongGame.splice(0, schlongGame.length);
                            weiners = [];
                            schlongs = [];
                        }
                    }, 30000);
                }
            }else{
                bot.speak('stop being a :trollface: @' + name + ' get used to the .schlong u were born with');
            }
            if(debug){
                console.log('schlong(fight) running...');
            }
        }catch(err){
            console.log('error in schlong(fight)...');
            bot.signal.error(err);
        }
    },
    roll: function(data){
        try{
            var id = data.userid;
            var name = data.name;
            var index = rolls.indexOf(id);
            if(index == -1){
                rolls.push(id);
                var num = Math.floor(Math.random() * 99);
                roll_scores.push(num);
                bot.speak(data.name + " rolled a " + num);
                rollers.push({name: name, id: id, roll: num});
                var rollGame = setTimeout(function(){
                    var winner = Math.max.apply(Math, roll_scores);
                    for(i in rollers){
                        if(winner == rollers[i].roll){
                            bot.speak("@" + rollers[i].name + " wins with a roll of " + winner);
                        }
                        rollers.splice(0, rollers.length);
                        roll_scores = [];
                        rolls = [];
                    }
                }, 15000);
            }else{
                bot.pm(":trollface:", id);
            }
        }catch(err){
            console.log('error in games(roll)...');
            bot.signal.error(err);
        }
    }
}