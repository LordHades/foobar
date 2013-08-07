global.features = [];
global.users = [];
global.curusers = [];
global.mods = [];
global.djs = [];
global.q = [];
global.afks = [];
global.afkdjs = [];
global.afkusers = [];
global.transmit = [];
global.sirs = [];
global.ragers = [];
global.rpsGame = [];
global.rolls = [];
global.roll_scores = [];
global.rollers = [];
global.schlongGame = [];
global.battledjs = [];
global.battling = [];
global.schlongs = [];
global.qtrolls = [];
global.voters = [];
global.votes = [];
global.snaggers = [];
global.weiners = [];
global.boos = [];
global.escorts = [];
global.data_holder = [];
global.roomname = '';
global.newsongname = '';
global.songname = '';
global.artist = '';
global.album = '';
global.cover = '';
global.date = '';
global.title = '';
global.currentDjName = '';
global.currentDjId = '';
global.name = '';
global.winner = '';
global.snags = 0;
global.ups = 0;
global.downs = 0;
global.length = 0;
global.voter;
global.boo;
global.rounds = 1;
global.count = 0;
global.err = 0;
global.trollct = 0;
global.listenSong = null;
global.stuckTimer = null;
global.lastdj = null;
global.votelog = null;
global.newsong = null;
global.djcount = null,
global.listeners = null;
global.betting_one = false;
global.stepdown = false;
global.armed = false;
global.stagehand = false;
global.poll = false;
global.wiretap = false;
global.debug = false;
global.tweeter = new tweet({
	consumer_key: consumer_key,
	consumer_secret: consumer_secret,
	access_token: access_token,
	access_token_secret: access_token_secret
});
global.rpsls = [
	"rock",
	"paper",
	"scissors",
	"lizard",
	"spock"
];
global.molly = [
	"/me pops molly, he\'s sweating", 
	"/me is rolling face :stuck_out_tongue_closed_eyes:", 
	"Ermagerd is this Levels?!?!"
];
global.boppin = [
	'/me dances',
	':metal:',
	'/me is groovin',
	':dancers:',
	':notes:',
	':+1:',
	':dizzy:',
	':yum:',
	':joy:', 
	':sunglasses:',
	':star:', 
	':scream_cat:', 
	':heart_eyes:', 
	':heart_decoration:',
	':ok_hand:',
	':raised_hands:',
	':bow:',
	':mega:',
	':gem:',
	':fireworks:',
	':heavy_exclamation_mark:',
	':boom:',
	':tada:',
	':musical_score:',
	':octocat:',
	':astonished:',
	':microphone:'
];
global.tpb = [
	'http://goo.gl/r9NCi',
	'http://goo.gl/doQFb',
	'http://i.imgur.com/SNLhWje.jpg',
	'http://i.imgur.com/mRZIHiZ.jpg',
	'http://i.imgur.com/TnZGV7S.jpg',
	'http://i.imgur.com/3b4h8Dz.png',
	'http://i.imgur.com/EEX16Qs.jpg',
	'http://i.imgur.com/0rLjzOR.jpg',
	'http://i.imgur.com/KmmHI1c.png',
	'http://i.imgur.com/bgb1O24.jpg',
	'http://i.imgur.com/AMlOszp.jpg',
	'http://i.imgur.com/YAciwoy.jpg',
	'http://i.imgur.com/H6XFkc1.jpg',
	'http://i.imgur.com/PXy4Uip.jpg'
];
global.facts = [
	"A Goldfish's attention span is three seconds",
	"Animals that lay eggs don't have belly buttons",
	"Beavers can hold their breathe for 45 minutes under water",
	"Slugs have 4 noses",
	"Camels have 3 eyelids",
	"A honey bee can fly at 15mph", 
	"A queen bee can lay 800-1500 eggs per day ",
	"A bee has 5 eyes ",
	"The average speed of a housefly is 4.5 mph ",
	"Mosquitoes are attracted to people who just ate bananas ",
	"Flamingos are pink because they eat shrimp ",
	"Emus and Kangaroos cannot walk backward ",
	"Cats have over 100 vocal chords ",
	"Camel's milk does not curdle ",
	"All porcupines float in water ",
	"The world's termites outweigh the world's humans 10 to 1 ",
	"A hummingbird weighs less then a penny ",
	"A jellyfish is 95% water ",
	"Children grow faster in the spring ",
	"Broccoli is the only vegetable that is also a flower ",
	"Almonds are part of the peach family ",
	"Alaska has the highest percentage of people who walk to work ",
	"The San Francisco Cable cars are the only mobile national monument ",
	"The state of Maine has 62 lighthouses ",
	"The only food that does not spoil is honey ",
	"The Hawaiian alphabet only has 12 letters ",
	"A ball of glass will bounce higher then a ball of rubber ",
	"Chewing gum while peeling onions will prevent you from crying ",
	"On average a human will spend up to 2 weeks kissing in his/her lifetime ",
	"Fish have eyelids ",
	"The average human will eat an average of 8 spiders while sleeping ",
	"There is one million ants to every human in the world ",
	"Termites eat through wood two times faster when listening to rock music! ",
	"If you keep a goldfish in a dark room it will eventually turn white ",
	"Elephants only sleep 2 hours a day ",
	"A duck's quack doesn't echo ",
	"A snail breathes through its foot ",
	"Fish cough.",
	"An ant's smell is stronger then a dog's ",
	"It is possible to lead a cow up stairs but not down ",
	"Shrimp can only swim backward ",
	"Frogs cannot swallow with their eyes open ",
	"A cat's lower jaw cannot move sideways ",
	"The bullfrog is the only animal that never sleeps ",
	"Elephants are capable of swimming 20 miles per day ",
	"Elephants are the only mammal that cannot jump ",
	"Giraffes have no vocal chords ",
	"Cats can hear ultrasound ",
	"Despite its hump...camels has a straight spine ",
	"Mosquitoes have 47 teeth 51 - There is 63,360 inches in a mile ",
	"11% of people in the world are left-handed",
	"The average women consumes 6lbs of lipstick in her lifetime ",
	"The average smell weighs 760 nanograms *",
	"A human brain weighs about 3lbs ",
	"1/4 of the bones in your body are in your feet ",
	"You blink over 10,000,000 times a year ",
	"A sneeze travels out of your nose at 100mph ",
	"Brain waves can be used to power an electric train ",
	"The tongue is the fastest healing part of the body ",
	"Pigs get sunburn ",
	"The lifespan of a taste bud is 10 days ",
	"The average human produces 10,000 gallons of saliva in a lifetime ",
	"Strawberries contain more Vitamin C then oranges ",
	"A one-day weather forecast requires about 10 billion math calculations ",
	"Americans on average eat 18 acres of pizza a day ",
	"There are 18 different animal shapes in the Animal cracker zoo ",
	'The longest one syllable word is "screeched" ',
	"No word in the English language rhymes with month",
	'A "jiffy" is actually 1/100 of a second ',
	'There is a town called "Big Ugly" in West Virginia',
	"The average person uses 150 gallons of water per day for personal use ",
	"The average person spends 2 weeks of its life waiting for a traffic light to change ",
	"You share your birthday with 9 million others in the world ",
	"The average person makes 1,140 phone calls per year ",
	"The average person spends 2 years on the phone in his/her lifetime ",
	"No piece of paper can be folded more then 7 times ",
	"Alaska is the most eastern and western state in the US ",
	"There are 119 grooves on the edge of a quarter ",
	"About 18% of Animal owners share their bed with their pet ",
	"Alaska has more caribou then people ",
	"August has the highest percent of births ",
	"Googol is a number (1 followed by 100 zeros) ",
	"Oysters can change genders back and forth ",
	"The Mona Lisa has no eyebrows ",
	"Until the 19th century solid blocks of tea were used as money in Siberia ",
	"A mile on the ocean and a mile on land are not the same distance ",
	"A ten gallon hat holds less then one gallon of liquid ",
	"The average American walks 18,000 steps a day ",
	"The average raindrop falls at 7mph ",
	"There are more telephones than people in Washington D.C. ",
	"Fish can drown ",
	"A Kangaroo can jump 30 feet ",
	"Lizards communicate by doing push-ups ",
	"Squids can have eyeballs the size of volleyballs ",
	"The average American will eat 35,000 cookies in his/her lifetime ",
	"A turkey can run at 20mph ",
	"When the moon is directly over you, you weigh less ",
	"You burn 20 calories an hour chewing gum ",
	"In a year, the average person walks 4 miles making their bed",
	"About half of all Americans are on a diet at any given time ",
	"A one-minute kiss burns 26 calories ",
	"Frowning burns more calories then smiling ",
	"There are more then 30,000 diets on public record ",
	"You will burn 7% more calories walking on hard dirt then pavement ",
	"You way less at the top of a mountain then sea level ",
	"You burn more calories sleeping then watching TV ",
	"Licking a stamp burns 10 calories ",
	"Smelling apples and/or bananas can help you lose weight ",
	"Frogs never drink ",
	"Only male turkeys gobble ",
	"At birth, a Dalmation is always pure white",
	"The fastest recorded speed of a racehorse was over 43 mph ",
	"The oldest known animal was a tortoise, which lived to be 152 years old ",
	"Bamboo makes up 99% of a panda's diet ",
	"The largest fish is the whale shark - It can be over 50 feet long and weigh 2 tons ",
	"The starfish is the only animal that can turn its stomach inside out ",
	"Honeybees are the only insects that create a form of food for humans ",
	"The hummingbird is the only bird that can fly backwards ",
	"The only continent without native reptiles or snakes is Antarctica ",
	"The only bird that can swim and not fly is a penguin ",
	"A duck can't walk without bobbing its head ",
	"Beavers were once the size of bears ",
	"Seals sleep only one and a half minutes at a time ",
	"Pigeons have been trained by the U.S. Coast Guard to spot people lost at sea ",
	"A pigeon's feathers are heavier than its bones ",
	"A hummingbird's heart beats 1,400 times a minute ",
	"Dragonflies have six legs but can't walk ",
	"Mosquitos have 47 teeth ",
	"Koala and humans are the only animals with unique fingerprints ",
	"Penguins have an organ above their eyes that converts seawater to fresh water ",
	"A crocodile cannot move its tongue ",
	"Honeybees navigate by using the sun as a compass ",
	"An ant can lift 50 times its own weight ",
	"A single coffee tree produces only about a pound of coffee beans per year ",
	"Strawberries are the only fruits whose seeds grow on the outside ",
	"The city of Los Angeles has three times more automobiles than people ",
	"Hawaii is the only U.S. state that grows coffee ",
	"Hawaii is the only state with one school district ",
	"Holland is the only country with a national dog ",
	"The square dance is the official dance of the state of Washington ",
	"Hawaii is the only U.S. state never to report a temperature of zero degrees F or below ",
	'"Q" is the only letter in the alphabet not appearing in the name of any U.S. state ',
	"Texas is the only state that permits residents to cast absentee ballots from space ",
	"Lake Superior is the world's largest lake ",
	"The smallest county in America is New York County, better known as Manhattan ",
	"Panama is the only place in the world where you can see the sun rise on the Pacific and set on the Atlantic ",
	"The tallest man was 8 ft. 11 in ",
	"Theodore Roosevelt was the only president who was blind in one eye ",
	"The first sport to be filmed was boxing in 1894",
	"The fastest served ball in tennis was clocked at 154 mph in 1963 ",
	"In 1985, the fastest bicyclist was clocked at 154 mph ",
	"The speed limit in NYC was 8 mph in 1895 ",
	"Americans spend more than $630 million a year on golf balls ",
	"In 1926, the first outdoor mini-golf courses were built on rooftops in NYC ",
	"Swimming pools in the U.S. contain enough water to cover San Francisco ",
	"The first TV soap opera debuted in 1946 ",
	'The first MTV video was "Video Killed the Radio Star," by the Buggles ',
	'The first TV show ever to be put into reruns was "The Lone Ranger" ',
	'One alternative title that had been considered for NBC\'s hit "Friends" was "Insomnia Cafe" ',
	'The first TV network kids show in the U.S. was "Captain Kangaroo" ',
	"The temperature of the sun can reach up to 15 million degrees fahrenheit ",
	'The first penny had the motto "Mind your own business" ',
	"The first vacuum was so large, it was brought to a house by horses ",
	"Panama is the only place in the world where you can see the sun rise ",
	"Before mercury, brandy was used to fill thermometers ",
	"You have to play ping-pong for 12 hours to lose one pound ",
	"One brow wrinkle is the result of 200,000 frowns ",
	"The first human-made object to break the sound barrier was a whip ",
	"In 1878, the first telephone book ever issued contained only 50 names ",
	"The most sensetive parts of the body are the mouth and the fingertips ",
	"The eye makes movements 50 times every second ",
	"Chinese is the most spoken language in the world ",
	"The world's biggest pyramid is not in Egypt, but in Mexico ",
	"In 1634, tulip bulbs were a form of currency in Holland ",
	"The first bike was called a hobbyhorse ",
	"The first sailing boats were built in Egypt ",
	"The first ballpoint pens were sold in 1945 for $12.00 ",
	"The first lighthouse to use electricity was the Statue of Liberty in 1886 ",
	"The first VCR was made in 1956 and was the size of a piano ",
	"The first jukebox was located in San Francisco in 1899 ",
	"A rainbow can only be seen in the morning or late afternoon ",
	"he Capitol building in Washington DC has 365 steps to represent every day of the year ",
	"The most used letters in the English language are E, T, A, O, I and N ",
	"A male kangaroo is called a Boomer ",
	"A female kangaroo is called a flyer ",
	"There are over 61,000 pizzerias in the U.S ",
	"Antarctica is the driest, coldest, windiest, and highest continent on earth ",
	"The Sahara Desert stretches father than the distance from California to New York ",
	'Thailand means "Land of the Free" ',
	"Popcorn was invented by the American Indians ",
	"Jupiter spins so fast that there is a new sunrise nearly every ten hours ",
	"The year that read the same upside down was 1961. That won't happen again until 6009 ",
	"You don't have to be a lawyer to be a Supreme Court Justice ",
	"Eleven of the fifty states are named after and actual person ",
	"If you doubled one penny every day for 30 days, you would have $5, 368, 709 ",
	"The first person crossed Niagra Falls by tightrope in 1859",
	"The US is the largest country names after an actual person (Amerigo Vespucci)", 
	"The largest cheesecake ever-made weighed 57,508 lbs",
	"The first country to use postcards was Austria"
];
