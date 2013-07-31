module.exports = {
    items: [
        {
            "name": "beer",
            "instructions": "/me pops a nice cold :beer: for ya"
        },
        {
            "name": "wine",
            "instructions": "/me pours :wine_glass: for"
        },
        {
            "name": "tropical drink",
            "instructions": "/me mixes up a :tropical_drink: for"
        },
        {
            "name": "cocktail",
            "instructions": "/me pours one :cocktail: stiff for"
        },
        {
            "name": "soda",
            "instructions": "/me pops a nice cold sodee pop for ya"
        },
        {
            "name": "coffee",
            "instructions": "/me brews up some :coffee: for"
        },
        {
            "name": "tea",
            "instructions": "/me steeps up some :tea: for"
        },
        {
            "name": "weed",
            "instructions": "/me rolls up the :herb: for"
        },
        {
            "name": "sushi",
            "instructions": "/me rolls up some :sushi: for"
        },
        {
            "name": "hamburger",
            "instructions": "/me regrets giving you this :hamburger:"
        },
        {
            "name": "chicken",
            "instructions": "/me has a :poultry_leg: for you"
        },
        {
            "name": "pizza",
            "instructions": "/me grabs a slice of :pizza: for"
        },
        {
            "name": "cookie",
            "instructions": "/me hands a :cookie: to"
        },
        {
            "name": "candy",
            "instructions": "/me has a :candy: for your sweet tooth"
        },
        {
            "name": "cake",
            "instructions": "/me cuts a piece of :cake: for"
        },
        {
            "name": "ice cream",
            "instructions": "/me grabs some yummeh :ice_cream: for"
        },
        {
            "name": "apple",
            "instructions": "/me grabs an :apple: for"
        },
        {
            "name": "tangerine",
            "instructions": "/me tosses a :tangerine: to"
        },
        {
            "name": "watermelon",
            "instructions": "/me eats some :watermelon: with"
        },
        {
            "name": "banana",
            "instructions": "/me throws a banana at"
        },
        {
            "name": "grapes",
            "instructions": "/me feeds :grapes: to"
        },
        {
            "name": "shit",
            "instructions": "/me serves up a healthy :poop: just for"
        },
        {
            "name": "order",
            "instructions": ":cop: really?"
        },
        {
            "name": "cat",
            "instructions": "meow :cat:"
        }
    ],
    server: function(data, order){
        for(i in this.items){
            if(this.items[i].name == order){
                bot.speak(this.items[i].instructions + " @" + data.name);
            }
        }
    },
    print: function(){
        var str = "Menu:";
        for (i in this.items) {
            str += (' ' + this.items[i].name + ', ');
        }
        bot.talk(str.substring(0, str.length - 2));
    }
}