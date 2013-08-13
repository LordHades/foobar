module.exports = {
    lexicon: [
        {
            "name": "/help",
            "help": "/me will print a list of all available commands to you, mods will see mod commands",
            "acl": 0,
            "mode": [default_mode],
            code: function(data){
                bot.commands.print(data);
            }
        },
        {
            "name": "/rules",
            "help": "/me will explain the rules for whichever mode is enabled",
            "acl": 0,
            "mode": [default_mode],
            code: function(data){
                bot.signal.rules(data);
            }
        },
        {
            "name": "/about",
            "help": "/me will show you my maker",
            "acl": 0,
            "mode": [default_mode],
            code: function(data){
                bot.speak("http://theylive.github.io/foobar/");
            }
        },
        {
            "name": "/bugs",
            "help": "/me will provide bug reporting url",
            "acl": 0,
            "mode": [default_mode],
            code: function(data){
                bot.speak('https://github.com/theylive/foobar/issues');
            }
        },
        {
            "name": "/features",
            "help": "/me will print a list of currently enabled features",
            "acl": 0,
            "mode": [default_mode],
            code: function(data){
                bot.signal.features(data.userid);
            }
        },
        {
            "name": "/deal",
            "help": "/me will deal 2 cards. (/hit, /split, /double, or /stay) will control your hands, in an attempt to beat dealer to 21, without exceeding, 'busting'. Keep your cards close and have fun! (*note - :a: value = 1 or 11, you decide)",
            "acl": 0,
            "mode": [game_mode],
            code: function(data){
                bot.games.blackjack.deal(data);
            }
        },
        {
            "name": "/roll",
            "help": "/me will roll a random #0-99 for you, winner will be announced after rolling stops",
            "acl": 0,
            "mode": [game_mode],
            code: function(data){
                bot.games.roll(data);
            }
        },
        {
            "name": "/schlong",
            "help": "/me will start a schlong measuring contest",
            "acl": 0,
            "mode": [game_mode],
            code: function(data){
                bot.games.schlong(data);
            }
        },
        {
            "name": "/rpsls",
            "help": "/me will start a game of rock, paper, scissor, lizard, spock",
            "acl": 0,
            "mode": [game_mode],
            code: function(data){
                bot.games.rpsls(data);
            }
        },
        {
            "name": "/quote",
            "help": "/me will quote from some of the best sources known on earth",
            "acl": 0,
            "mode": [game_mode],
            code: function(data){
                bot.signal.quotes(data);
            }
        },
        {
            "name": "/molly",
            "help": "/me will help you find molly",
            "acl": 0,
            "mode": [game_mode],
            code: function(data){
                bot.signal.random(molly);
            }
        },
        {
            "name": "/tpb",
            "help": "/me will send a random image of trailer park boys",
            "acl": 0,
            "mode": [game_mode],
            code: function(data){
                bot.signal.random(tpb);
            }
        },
        {
            "name": "/quake",
            "help": "/me will report the top three most recent earthquakes in the world",
            "acl": 0,
            "mode": [game_mode],
            code: function(data){
                bot.signal.quakes(data);
            }
        },
        {
            "name": "/tank",
            "help": "/me will show orionVW\'s ascii art",
            "acl": 0,
            "mode": [game_mode],
            code: function(data){
                bot.speak('●████▄▄▄▄▄▄▄▄▄▄▄ ▄▄▅████████▅▄▃▂ ██████████████████► ◥☼▲⊙▲⊙▲⊙▲⊙▲⊙▲☼◤');
            }
        },
        {
            "name": "/joke",
            "help": "/me will tell a random joke",
            "acl": 0,
            "mode": [game_mode],
            code: function(data){
                bot.signal.joke(data);
            }
        },
        {
            "name": "/weed",
            "help": "/me will show the medicinal effects of a random strain",
            "acl": 0,
            "mode": [game_mode],
            code: function(data){
                bot.signal.weed(data);
            }
        },
        {
            "name": "/define",
            "help": "/me will search urban dictionary for you",
            "acl": 0,
            "mode": [game_mode],
            code: function(data){
                bot.signal.define(data);
            }
        },
        {
            "name": "/google",
            "help": "/me will google that for you",
            "acl": 0,
            "mode": [game_mode],
            code: function(data){
                bot.signal.google(data);
            }
        },
        {
            "name": "/order",
            "help": "/me will serve you a delightful something or other from the menu",
            "acl": 0,
            "mode": [game_mode],
            code: function(data){
                bot.signal.order(data);
            }
        },
        {
            "name": "/menu",
            "help": "/me will show you the items available for order",
            "acl": 0,
            "mode": [game_mode],
            code: function(data){
                bot.menu.print(data);
            }
        },
        {
            "name": "/cats",
            "help": "/me haz catfacts",
            "acl": 0,
            "mode": [game_mode],
            code: function(data){
                bot.signal.cats(data);
            }
        },
        {
            "name": "/fact",
            "help": "/me will share a random snapple fact",
            "acl": 0,
            "mode": [game_mode],
            code: function(data){
                bot.signal.random(facts);
            }
        },
        {
            "name": "/bop",
            "help": "/me will start to bop",
            "acl": 0,
            "mode": [default_mode],
            code: function(data){
                bot.bop();
            }
        },
        {
            "name": "/away",
            "help": "/me will mark you as away, you will get a pm of any conversation containing your name",
            "acl": 0,
            "mode": [default_mode],
            code: function(data){
                bot.afk.get(data);
            }
        },
        {
            "name": "/afks",
            "help": "/me will show a list of currently afk users",
            "acl": 0,
            "mode": [default_mode],
            code: function(data){
                bot.afk.print(data);
            }
        },
        {
            "name": "/next",
            "help": "/me will add you to the waitlist of the currently enabled mode",
            "acl": 0,
            "mode": [default_mode],
            code: function(data){
                bot.song.next(data);
            }
        },
        {
            "name": "/album",
            "help": "/me will print the album info for the currently playing song",
            "acl": 0,
            "mode": [default_mode],
            code: function(data){
                bot.signal.album(data);
            }
        },
        {
            "name": "/thanks",
            "help": "/me will be here all night ;)",
            "acl": 0,
            "mode": [default_mode],
            code: function(data){
                bot.speak(':) you\'re welcome @'+ name);
            }
        },
        {
            "name": "/\+1/",
            "help": "/me will add your vote to the current dj in dj battle mode",
            "acl": 0,
            "mode": [battle_mode],
            code: function(data){
                bot.battle.pollbooth(data);
            }
        },
        {
            "name": "/blame",
            "help": "/me will take the blame",
            "acl": 0,
            "mode": [default_mode],
            code: function(data){
                bot.speak('/whatever');
            }
        },
        {
            "name": "/umad?",
            "help": "/me will send a link to a meme",
            "acl": 0,
            "mode": [default_mode],
            code: function(data){
                bot.signal.random(memes);
            }
        },
        {
            "name": "/dive",
            "help": "/me will remove you from the stage",
            "acl": 0,
            "mode": [default_mode],
            code: function(data){
                bot.system.dive(data);
            }
        },
        {
            "name": "/list",
            "help": "/me will show the current waitlist",
            "acl": 0,
            "mode": [queue_mode, battle_mode],
            code: function(data){
                bot.signal.list(data);
            }
        },
        {
            "name": "/pos",
            "help": "/me will show your position in the current waitlist",
            "acl": 0,
            "mode": [queue_mode],
            code: function(data){
                bot.queue.position(data);
            }
        },
        {
            "name": "/theme",
            "help": "/me will print the current theme",
            "acl": 0,
            "mode": [default_mode],
            code: function(data){
                bot.signal.theme(data);
            }
        },
        {
            "name": "/rage",
            "help": "/me will flip the table at the current dj",
            "acl": 0,
            "mode": [default_mode],
            code: function(data){
                bot.signal.rage(data);
            }
        },
        {
            "name": "/props",
            "help": "/me will clap for the current dj",
            "acl": 0,
            "mode": [default_mode],
            code: function(data){
                bot.signal.props(data);
            }
        },
        {
            "name": "/meow",
            "help": "/me will purrr at the current dj",
            "acl": 0,
            "mode": [default_mode],
            code: function(data){
                bot.signal.meow(data);
            }
        },
        {
            "name": "/remove",
            "help": "/me will remove you from the waitlist of the currently enabled mode",
            "acl": 0,
            "mode": [queue_mode, battle_mode],
            code: function(data){
                bot.signal.remove(data);
            }
        },
        {
            "name": "/add",
            "help": "/me will add you to the waitlist of the currently enabled mode",
            "acl": 0,
            "mode": [queue_mode, battle_mode],
            code: function(data){
                bot.signal.add(data);
            }
        },
        {
            "name": "/nuke",
            "help": "/me will clear the decks of all djs as long as the proper launch codes and clearance levels are met",
            "acl": 0,
            "mode": [default_mode],
            code: function(data){
                bot.signal.nuke(data);
            }
        },
        {
            "name": "/fanme",
            "help": "/me will fan you",
            "acl": 0,
            "mode": [default_mode],
            code: function(data){
                bot.signal.fan(data);
            }
        },
        {
            "name": "/bump",
            "help": "/me will move a V.I.P. to the front of the line in queue mode",
            "acl": 1,
            "mode": [default_mode],
            code: function(data){
                bot.queue.vip(data);
            }
        },
        {
            "name": "/set",
            "help": "/me will set a theme",
            "acl": 1,
            "mode": [default_mode],
            code: function(data){
                bot.song.theme(data);
            }
        },
        {
            "name": "/boot",
            "help": "/me will boot the user following this command",
            "acl": 1,
            "mode": [default_mode],
            code: function(data){
                bot.system.pwn(data);
            }
        },
        {
            "name": "/announce",
            "help": "/me will toggle announce mode, this controls greetings, end of song stats, announcing when i bop, and when users downvote",
            "acl": 1,
            "mode": [default_mode],
            code: function(data){
                announce_mode = bot.system.toggle(announce_mode, "announce mode");
            }
        },
        {
            "name": "/twitter",
            "help": "/me will tweet out currently playing songs",
            "acl": 1,
            "mode": [default_mode],
            code: function(data){
                tweet_mode = bot.system.toggle(tweet_mode, "tweet mode");
            }
        },
        {
            "name": "/games",
            "help": "/me will toggle game mode, this controls the order menu, playing rpsls and schlong, and a lot of the fun chat commands",
            "acl": 1,
            "mode": [default_mode],
            code: function(data){
                game_mode = bot.system.toggle(game_mode, "game mode");
            }
        },
        {
            "name": "/ttstats",
            "help": "/me will toggle ttstats boot mode, PEW PEW PEW",
            "acl": 1,
            "mode": [default_mode],
            code: function(data){
                stat_boot = bot.system.toggle(stat_boot, "ttstats boot mode");
            }
        },
        {
            "name": "/autodj",
            "help": "/me will act as autodj, will hop up if there are less than 3 djs on deck",
            "acl": 1,
            "mode": [default_mode],
            code: function(data){
                autodj_mode = bot.system.toggle(autodj_mode, "auto dj mode");
            }
        },
        {
            "name": "/autoq",
            "help": "/me will act toggle auto queue, will set the queue mode on when there are 5 djs, off when there are 2...",
            "acl": 1,
            "mode": [default_mode],
            code: function(data){
                auto_queue = bot.system.toggle(auto_queue, "auto queue mode");
            }
        },
        {
            "name": "/chat",
            "help": "/me will toggle chat mode, so we can have conversations like humans. (pm only)",
            "acl": 1,
            "mode": [default_mode],
            code: function(data){
                if(data.command == "pmmed"){
                    chat_mode = bot.system.toggle(chat_mode, "chat mode");
                }
            }
        },
        {
            "name": "/snag",
            "help": "/me will add the current song to it's playlist",
            "acl": 1,
            "mode": [default_mode],
            code: function(data){
                bot.song.snag(data);
            }
        },
        {
            "name": "/toss",
            "help": "/me will remove the current song from its playlist",
            "acl": 1,
            "mode": [default_mode],
            code: function(data){
                bot.song.toss(data);
            }
        },
        {
            "name": "/djs",
            "help": "/me will send a secret troll message to all djs",
            "acl": 1,
            "mode": [default_mode],
            code: function(data){
                bot.signal.troll(data);
            }
        },
        {
            "name": "/watch",
            "help": "/me will toggle afk watch mode, you have a limited time of inactivity before you are marked as afk... if you are djing you will be kindly removed. if you are next in queue, you will be removed",
            "acl": 1,
            "mode": [default_mode],
            code: function(data){
                afk_mode = bot.system.toggle(afk_mode, "afk watch mode");
            }
        },
        {
            "name": "/trollcop",
            "help": "/me will toggle troll:cop: mode. if queue mode is on, you will be booted for hopping up out of turn three times in a row",
            "acl": 1,
            "mode": [default_mode],
            code: function(data){
                troll_cop = bot.system.toggle(troll_cop, "troll cop mode");
            }
        },
        {
            "name": "/getup",
            "help": "/me will start djing",
            "acl": 1,
            "mode": [default_mode],
            code: function(data){
                bot.addDj();
            }
        },
        {
            "name": "/getdown",
            "help": "/me will quit djing",
            "acl": 1,
            "mode": [default_mode],
            code: function(data){
                bot.remDj();
            }
        },
        {
            "name": "/solo",
            "help": "/me will toggle solo mode and bot will skip so you can dj with yourself",
            "acl": 1,
            "mode": [default_mode],
            code: function(data){
                solo_mode = bot.system.toggle(solo_mode, "solo mode");
            }
        },
        {
            "name": "/event",
            "help": "/me will toggle event mode, so that only the set amount of event djs are allowed up",
            "acl": 1,
            "mode": [default_mode],
            code: function(data){
                event_mode = bot.system.toggle(event_mode, "event mode");
            }
        },,
        {
            "name": "/queue",
            "help": "/me will toggle queue mode, where each dj gets 1 play before being removed. /Add yourself to the waitlist",
            "acl": 1,
            "mode": [default_mode],
            code: function(data){
                if(battle_mode){
                    battle_mode = false;
                    bot.speak('dj battle is now off...');
                }
                queue_mode = bot.system.toggle(queue_mode, "queue mode");
            }
        },
        {
            "name": "/skip",
            "help": "/me will skip the song if currently playing",
            "acl": 1,
            "mode": [default_mode],
            code: function(data){
                bot.system.skip(data);
            }
        },
        {
            "name": "/shuffle",
            "help": "/me will shuffle its playlist",
            "acl": 1,
            "mode": [default_mode],
            code: function(data){
                bot.song.shuffle(data);
            }
        },
        {
            "name": "/battle",
            "help": "/me will toggle dj battle mode, where two djs face off with 1 song play each. Winner remains on deck to face next challenger in line",
            "acl": 1,
            "mode": [default_mode],
            code: function(data){
                if(queue_mode){
                    queue_mode = false;
                    bot.speak('queue mode is now off...');
                }
                battle_mode = bot.system.toggle(battle_mode, "battle mode");
            }
        },
        {
            "name": "/armed",
            "help": "/me will arm the nuke system, preparing for nuke to be run",
            "acl": 1,
            "mode": [default_mode],
            code: function(data){
                armed = bot.system.toggle(armed, "nuke");
            }
        },
        {
            "name": "/tweeter",
            "help": "/me will post the text following this command to its tweeter account.",
            "acl": 1,
            "mode": [default_mode],
            code: function(data){
                bot.signal.tweeter(data);
            }
        },
        {
            "name": "/stalk",
            "help": "/me will follow the name after this command to the room they are currently in",
            "acl": 2,
            "mode": [default_mode],
            code: function(data){
                bot.signal.stalk(data);
            }
        }
    ],
    listen: function(data){
        bot.signal.clever(data);
        bot.signal.log(data);
        bot.afk.give(data);
        bot.afk.update(data.userid);
        bot.afk.listen(data);
        bot.commands.help(data);
        if(wiretap){
            transmit.push(data.text);s
        }           
        if(betting_one){
            data_holder.push({name: data.name, id: data.userid, text: data.text});
        }
        if(poll == true){
            bot.battle.pollbooth(data);
        }
        var commands = bot.commands.lexicon;
        var name = data.name;
        var text = data.text.toLowerCase();
        for(i in commands){
            if(text.match("" + commands[i].name + "")){
                try{
                    var mod = mods.indexOf(data.userid);
                    if(mod >= 0){
                        if(commands[i].acl === 0 || 1){
                            if(data.userid == botid){
                                break;
                            }
                            commands[i].code(data);
                        }
                    }else{
                        if(commands[i].acl === 0){
                            if(data.userid == botid){
                                break;
                            }
                            commands[i].code(data);
                        }
                    }
                }catch(err){
                    bot.signal.error(err);
                }
            }
        }
    },
    help: function(data){
        var commands = bot.commands.lexicon;
        var text = data.text.toLowerCase();
        for(i in commands){
            if(text == "help " + commands[i].name){
                try{
                    bot.speak(commands[i].help);
                }catch(err){
                    bot.signal.error(err);
                }
            }
        }
    },
    print: function(data){
        var commands = bot.commands.lexicon;
        var text = data.text.toLowerCase();
        var index = mods.indexOf(data.userid);
        var str = "available commands:";
        for (i in commands) {
            var len = commands[i].mode;
                for(j in len){
                    if(commands[i].mode[j]){
                        str += ( " " + commands[i].name);
                    }    
                }
        }
        bot.speak(str); 
    }
}