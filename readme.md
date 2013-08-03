##Chat Commands:

	/help: will print a list of all available commands to you, mods will see mod commands

	/features: will print a list of currently enabled features

	/away: will mark you as away, you will get a pm of any conversation containing your name

	/brb: will mark you as away, you will get a pm of any conversation containing your name

	/album: will print the album info for the currently playing song

	/theme: will print the current theme

	/dive: will remove you from the stage

	/bop: will start to bop

	/fanme: will fan you

	/rules: will explain the rules for whichever mode is enabled

	/next: will announce the next song in my playlist

	/add: will add you to the waitlist of the currently enabled mode

	/remove: will remove you from the waitlist of the currently enabled mode

	/afks: will show a list of currently afk users

	/list: will show the current waitlist

	/pos: will show your position in the current waitlist

	+1: will add your vote to the current dj in dj battle mode

	/meow: will purrr at the current dj

	/props: will clap for the current dj

	/rage: will flip the table at the current dj

	/9001: will rage over nine thousand

	/umad?: will send a link to a meme

	/tank: will show orionVW\'s ascii art

	/molly: will help you find molly

	/joke: will tell a random joke

	/weed: will show the medicinal effects of a random strain

	/fact: will share a random snapple fact

	/quote: will quote from some of the best sources known on earth

	/cats: haz catfacts

	/quakes: will report the top three most recent earthquakes in the world

	/tpb: will send a random image of trailer park boys

	/define: will search urban dictionary for you

	/google: will google that for you

	/order: will serve you a delightful something or other from the menu

	/menu: will show you the items available for order

	/rsps: will start a game of rock, paper, scissor, lizard, spock

	/schlong: will start a schlong measuring contest

	/blame: will take the blame

	/thanks: will be here all night ;)

	/about: will show you my make


##Mod Commands

	/getup: will start djing

	/getdown:  will quit djing

	/solo: will toggle solo mode and bot will skip so you can dj with yourself

	/set: will set a theme

	/event: will toggle event mode, so that only the set amount of event djs are allowed up

	/watch: will toggle afk watch mode, you have a limited time of inactivity before you are marked as afk... if you are djing you will be kindly removed. if you are next in queue, you will be removed

	/chat: will toggle chat mode, so we can have conversations like humans. (pm only)

	/tweeter: will post the text following this command to my tweeter account.

	/queue: will toggle queue mode, where each dj gets 1 play before being removed. /Add yourself to the waitlist

	/bump: will move a V.I.P. to the front of the line in queue mode

	/boot: will boot the user following this command

	/skip: will skip the song if currently playing

	/snag: will add the current song to it's playlist

	/toss: will remove the current song from my playlist

	/battle: will toggle dj battle mode, where two djs face off with 1 song play each. Winner remains on deck to face next challenger in line

	/armed: will arm the nuke system, preparing for nuke to be run

	/nuke: will clear the decks of all djs as long as the proper launch codes and clearance levels are met

	/djs: will send a secret troll message to all djs

	/debug: will print out each of my running functions, as they are processed(console)

	/trollcop: will toggle troll:cop: mode. if queue mode is on, you will be booted for hopping up out of turn three times in a row

	/announce: will toggle announce mode, this controls whether i am announcing when i bop and when users downvote

	/autodj: will act as autodj, will hop up if there are less than 3 djs on deck

	/autoq: will toggle auto queue, the queue will turn on when there are 5 djs on deck and will turn off once only 2 djs are on deck

	/stalk: will follow the name after this command to the room they are currently in

	/games: will toggle game mode, this controls the order menu, playing rpsls and schlong, and a lot of the fun chat commands are available

	/mc: 10 10 10 20 = 50

	/ttstats: will toggle ttstats boot mode, PEW PEW PEW

	/twitter: will tweet out currently playing songs


##Features:
###Default Mode:
	Description: The bot will run at it's most basic level of features/interactivity. The commands available are for interaction with turntable events for the most part.

	
	Mod Commands: 
	/debug,
	/nuke,
	/armed,
	/tweeter,
	/djs,
	/chat (pm only)
	/snag,
	/queue,
	/announce 
	/autodj
	/twitter
	/autoq,
	/battle
	/games,
	/event,
	/ttstats,
	/solo,
	/watch, 
	/trollcop,
	/toss,
	/skip,
	/boot,
	/set,
	/getdown,
	/getup
	
	Commands: 
	/help,
	/features,
	/thanks,
	/blame,
	/mc,
	/umad?,
	/9001,
	/rage,
	/props,
	/meow,
	/tank,
	/next,
	/rules,
	/fanme,
	/bop,
	/dive,
	/theme,
	/about,
	/away,
	brb

###Queue Mode:	
	Description: The bot will keep a waitlist for listeners waiting to dj. users can "/add" themselves to the list and are called up in order to the stage. A dj is allowed to play the designated song limit before being escorted. 

	Mod Commands:
	/bump

	Commands:
	/add,
	/remove,
	/pos,
	/list


###Chat Mode: 
	Description: The bot will carry on a conversation with users through private messages(pm). Powered by [cleverbot](http://www.cleverbot.com/).

###Battle Mode:
	Description: The bot will allow a battle list to be built, where users can add themselves. The users face off 1v1 with the designated amount of "rounds" or songs. A voting window will open up with 30 seconds left for each song played. The dj with the most votes counted is the winner.

	Commands:
	/add,
	/remove,
	/list,
	+1

###Autodj Mode:
	Description: When the bot notices there are only two djs or less, it will hop up on stage to dj.

###Solo Mode:
	Description: The bot will stay on deck with an individual and skip itself on it's turn, so someone can dj with themselves. Once a 3rd dj hops up, solo mode is deactivated.

##Afk Mode,
	Description: Afk watch starts when a user enters the room, with the designated time limit given to them to stay active. This time is constantly draining against them, every second. Once a user chats, votes, snags or hops up to dj their afklimit is refreshed. If a user does not do any of these activities, the bot will consider and mark you afk(away from keyboard). If you are on deck and afk, you will be given the designated time to return before being removed from the stage. When you are afk & in queue waitlist, you will be skipped one your turn.

###Tweet Mode:
	Description: The bot will tweet various designated messages when new songs are playing, including the current song and room information.

###Announce Mode,
	Description: The bot will announce when a user downvotes a currently playing song, will greet a user when they enter the room, will announce song stats at the end of each play and will show an emoji when it is dancing.

###Game Mode:
	Description: Various game type features will be toggled that usually are called "spam", appropriately. Thing is they are pretty fun for most people it seems. Some example features are urban dictionary search, let me google that for you, i heart quotes randoms and riddles. There are actual games too, like a schlong measuring contest, rock paper scissors lizard spock, and a high number roll game.

	Commands:
	/roll,
	/schlong,
	/order,
	/menu,
	/define,
	/album,
	/cats,
	/fact,
	/joke,
	/quote,
	/quakes,
	/weed,
	/google,
	/tpb,
	/molly

###ttStats Boot Mode:
	Description: A lot of people would rather not use the [opt out](http://www.ttstats.info/optout) but would rather boot the ttstats, here ya go.

###Event Mode:
	Description: 
 
###Troll Cop:
	Description: 
