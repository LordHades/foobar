/* foobar is a creation of theylive, de nada */
global.Bot = require('ttapi');
global.tweet = require('twit');
Bot.prototype.$ = require('jquery');
Bot.prototype.clever = require('./node_modules/cleverbot-node/lib/cleverbot');
Bot.prototype.config = require('./config');
Bot.prototype.base = require('./lib/base');
Bot.prototype.system = require('./lib/system');
Bot.prototype.song = require('./lib/song');
Bot.prototype.signal = require('./lib/signal');
Bot.prototype.commands = require('./lib/commands');
Bot.prototype.games = require('./lib/games');
Bot.prototype.djbattle = require('./lib/battle');
Bot.prototype.queue = require('./lib/queue');
Bot.prototype.nuke = require('./lib/nuke');
Bot.prototype.menu = require('./lib/menu');
Bot.prototype.afk = require('./lib/afk');
global.repl = require('repl');
global.bot = new Bot(auth, botid, room);
repl.start('> ').context.bot = bot;
bot.on('ready', function(data){this.system.ready(data);});
bot.on('roomChanged', function (data){this.system.change(data);});
bot.on('registered', function (data){this.system.register(data);});
bot.on('add_dj', function (data){this.system.get_dj(data);});
bot.on('rem_dj', function (data){this.system.give_dj(data);});
bot.on('speak', function (data){this.commands.listen(data);});
bot.on('pmmed', function (data){this.commands.listen(data);});
bot.on('newsong', function (data){this.song.new(data);});
bot.on('endsong', function (data){this.song.end(data);});
bot.on('snagged', function (data){this.song.snagged(data);});
bot.on('update_votes', function (data){this.song.votes(data);});
bot.on('new_moderator', function (data){this.system.get_mod(data)});
bot.on('rem_moderator', function (data){this.system.give_mod(data)});
bot.on('deregistered', function (data){this.system.deregister(data);});