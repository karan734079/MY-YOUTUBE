const quotes = [
    "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    "Silly things do cease to be silly if they are done by sensible people in an impudent way.",
    "Life seems but a quick succession of busy nothings.",
    "Our scars make us know that our past was for real.",
    "I cannot speak well enough to be unintelligible.",
    "One cannot be always laughing at a man without now and then stumbling on something witty.",
    "Men were put into the world to teach women the law of compromise.",
    "The person, be it gentlemen or lady, who has not pleasure in a good novel, must be intolerably stupid."
];

export const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
};

const alphabet ="ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const getRandomAlphabet = () => {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    return alphabet[randomIndex];
}

const emoji = ['😀', '😂', '😍', '🥳', '😎', '🤔', '😇', '😢', '😡', '🥺', '🎉', '💖', '🌟', '🌈', '🍕', '🌍', '🚀', '🎶', '🐶', '🐱'];

export const getRandomEmoji = () => {
    const randomIndex = Math.floor(Math.random() * emoji.length);
    return emoji[randomIndex];
}


var nameList = [
    'Time','Past','Future','Dev',
    'Fly','Flying','Soar','Soaring','Power','Falling',
    'Fall','Jump','Cliff','Mountain','Rend','Red','Blue',
    'Green','Yellow','Gold','Demon','Demonic','Panda','Cat',
    'Kitty','Kitten','Zero','Memory','Trooper','XX','Bandit',
    'Fear','Light','Glow','Tread','Deep','Deeper','Deepest',
    'Mine','Your','Worst','Enemy','Hostile','Force','Video',
    'Game','Donkey','Mule','Colt','Cult','Cultist','Magnum',
    'Gun','Assault','Recon','Trap','Trapper','Redeem','Code',
    'Script','Writer','Near','Close','Open','Cube','Circle',
    'Geo','Genome','Germ','Spaz','Shot','Echo','Beta','Alpha',
    'Gamma','Omega','Seal','Squid','Money','Cash','Lord','King',
    'Duke','Rest','Fire','Flame','Morrow','Break','Breaker','Numb',
    'Ice','Cold','Rotten','Sick','Sickly','Janitor','Camel','Rooster',
    'Sand','Desert','Dessert','Hurdle','Racer','Eraser','Erase','Big',
    'Small','Short','Tall','Sith','Bounty','Hunter','Cracked','Broken',
    'Sad','Happy','Joy','Joyful','Crimson','Destiny','Deceit','Lies',
    'Lie','Honest','Destined','Bloxxer','Hawk','Eagle','Hawker','Walker',
    'Zombie','Sarge','Capt','Captain','Punch','One','Two','Uno','Slice',
    'Slash','Melt','Melted','Melting','Fell','Wolf','Hound',
    'Legacy','Sharp','Dead','Mew','Chuckle','Bubba','Bubble','Sandwich','Smasher','Extreme','Multi','Universe','Ultimate','Death','Ready','Monkey','Elevator','Wrench','Grease','Head','Theme','Grand','Cool','Kid','Boy','Girl','Vortex','Paradox'
];  

export function generateRandomName() {
   return nameList[Math.floor( Math.random() * nameList.length )];
};

