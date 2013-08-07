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
            var id;
            if(data.command == "pmmed"){
                id = data.senderid;
            }else{
                id = data.userid;
            }
            var index = rollers.indexOf(id);
            if(index == -1){
                var roll = Math.floor(Math.random() * 99) + 1;
                bot.speak('@' + name + " rolled a :game_die:" + roll);
                rollers.push(id);
                roll_scores.push({name: name, id: id, roll: roll});
                rolls.push(roll);
                clearTimeout(rolling);
                if(rollers.length > 1){
                    var rolling = setTimeout(function(){
                        for(i in roll_scores){
                            if(rolls.length > 1){
                                var winner = Math.max.apply(Math, rolls);
                                for(i in roll_scores){
                                    if(winner == roll_scores[i].roll){
                                        bot.speak('@' + roll_scores[i].name + " wins with a :game_die: of " + winner);
                                    }
                                }
                            }
                            roll_scores.splice(0, roll_scores.length);
                            rolls = [];
                            rollers = [];
                        }
                    }, 15000);
                }
            }else{
                bot.pm(":trollface:", id)
            }
            if(debug){
                console.log('games(roll) running...');
            }
        }catch(err){
            console.log('error in games(roll)...');
            bot.signal.error(err);
        }
    },
    blackjack: {
        deal: function(data){
            
            //build deck class
            var Deck = function(){
                this.cards = [];
                this.count = 52;
                this.suits = [
                    "hearts",
                    "diamonds",
                    "spades",
                    "clubs"
                ];
                this.emojis = [
                    ":two:",
                    ":three:",
                    ":four:",
                    ":five:",
                    ":six:",
                    ":seven:",
                    ":eight:",
                    ":nine:",
                    ":keycap_ten:",
                    "J",
                    "Q",
                    "K",
                    ":a:"
                ];
                for(i=0; i<4; i++){
                    for(j=0; j<13; j++){
                        switch(this.suits[i]){
                            case "hearts":
                                this.suits[i] = ":hearts:";
                            break;
                            case "diamonds":
                                this.suits[i] = ":diamonds:";
                            break;
                            case "clubs":
                                this.suits[i] = ":clubs:";
                            break;
                            case "spades":
                                this.suits[i] = ":spades:";
                            break;
                        }
                        this.cards.push({num: j, sym: this.emojis[j], suit: this.suits[i]});
                    }
                }            
            }
            
            //create new deck instance
            var deck = new Deck();
            
            //build player class
            var Player = function(name, acl){
                this.name = name;
                this.hand = [];
                this.score = 0;
                this.acl = acl;
            }
            Player.prototype.draw = function(data){
                var value = Math.floor(Math.random() * deck.cards.length);
                var card = {num:deck.cards[value].num, sym:deck.cards[value].sym, suit: deck.cards[value].suit};
                this.hand.push(card);
                this.score += card.num;
                deck.cards.splice(value, 1);
                this.check(this.hand);
            };
            Player.prototype.check = function(hand){  
                var str = '';
                if(hand.length == 2){
                    for(i in hand){
                        str += hand[i].num + hand[i].sym + hand[i].suit; 
                        bot.speak(name + " has " + str + " and a score of " + this.score);   
                    }
                }
            };
            
            //get players
            var user = new Player(data.name, 1);
            var dealer = new Player(botname, 0);

            //deal hands
            setTimeout(function(){
                user.draw();
            }, 0);
            setTimeout(function(){
                dealer.draw();
            }, 500);
            setTimeout(function(){
                user.draw();
            }, 1000);
            setTimeout(function(){
                dealer.draw();
            }, 1500);
        }
    }
}