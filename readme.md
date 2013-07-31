>Chat Commands:
------
---

/help: will print a list of all available commands to you, mods will see mod commands

/features: will print a list of currently enabled featurs

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

/roll: will start a game of rock, paper, scissor, lizard, spock

/schlong: will start a schlong measuring contest

/blame: will take the blame

/thanks: will be here all night ;)

/about: will show you my make



>Mod Commands
---
---

/getup: will start djing

/getdown:  will quit djing

/stats: will toggle stats mode, where i will announce the votes at the end of each song

/solo: will toggle solo mode and bot will skip so you can dj with yourself

/set: will set a theme

/nerd: will toggle nerd mode, so that a lot of the fun chat commands are available

/event: will toggle event mode, so that only the set amount of event djs are allowed up

/watch: will toggle afk watch mode, you have a limited time of inactivity before you are 
marked as afk... if you are djing you will be kindly removed. if you are next in queue, you will be removed

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

/trollcop: will toggle troll:cop: mode. if queue mode is on, you will be booted for hopping 
up out of turn three times in a row

/announce: will toggle announce mode, this controls whether i am announcing when i bop and when users downvote

/auto: will act as autodj, will hop up if there are less than 3 djs on deck

/stalk: will follow the name after this command to the room they are currently in

/game: will toggle game mode, this controls the order menu, playing rpsls and schlong

/mc: 10 10 10 20 = 50

/ttstats: will toggle ttstats boot mode, PEW PEW PEW

/greet: will greet new users as they enter the room

/twitter: will tweet out currently playing songs



>Features:
-----
----
Default Mode:

Mod Commands: 
>/debug,
>/nuke,
>/armed,
>/tweeter,
>/djs,
>/snag,
>/toss,
>/skip,
>/boot,
>/set,
>/getdown,
>/getup
				
Global Commands: 
>/help,
>/features,
>/thanks,
>/blame,
>/mc,
>/umad?,
>/9001,
>/rage,
>/props,
>/meow,
>/tank,
>/next,
>/rules,
>/fanme,
>/bop,
>/dive,
>/theme,
>/about,
>/away,
>brb


###queue mode,
	value: queue_mode,
	mod: [
		/queue,
		/bump
	],
	available: [
		/add,
		/remove,
		/pos,
		/list
	]
},
{
	name: chat mode,
	value: chat_mode,
	mod: [
		/chat (pm only)
	],
	available: []
},
{
	name: battle mode,
	value: battle_mode,
	mod: [
		/battle
	],
	available: [
		/add,
		/remove,
		/list,
		+1
	]
},
{
	name: autodj mode,
	value: autodj_mode,
	mod: [
		/auto
	],
	available: []
},
{
	name: solo mode,
	value: solo_mode,
	mod: [
		/solo
	],
	available: []
},
{
	name: nerd mode,
	value: nerd_mode,
	mod: [
		/nerd
	],
	available: [
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
	]
},
{
	name: stats mode,
	value: stats_mode,
	mod: [
		/stats
	],
	available: []
},
{
	name: afk mode,
	value: afk_mode,
	mod: [
		/watch
	],
	available: []
},
{
	name: tweet mode,
	value: tweet_mode,
	mod: [
		/twitter
	],
	available: [
	]
},
{
	name: announce mode,
	value: announce_mode,
	mod: [
		/announce
	],
	available: []
},
{
	name: greet mode,
	value: greet_mode,
	mod: [
		/greet
	],
	available: [
	]
},
{
	name: game mode,
	value: game_mode,
	mod: [
		/game
	],
	available: [
		/roll,
		/schlong,
		/order,
		/menu
	]
},
{
	name: ttstats boot mode,
	value: stat_boot,
	mod: [
		/ttstats
	],
	available: []
},
{
	name: event mode,
	value: event_mode,
	mod: [
		/event
	],
	available: []
},
{
	name: troll cop,
	value: troll_cop,
	mod: [
		/trollcop
	],
	available: []
}
];
