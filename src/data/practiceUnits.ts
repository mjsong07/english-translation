import type { Lesson, PracticeKind } from "../types/practice";

const UNIT_SIZE = 10;

const famousQuotesLines = [
  "Books is the ladder of human progress",
  "Walking among three people I find My teacher among them.",
  "A person who never made a mistake never tried anything new.",
  "Our true nationality is mankind",
  "yesterday is history, tomorrow is mystery , today is a gift",
  "keep yourself busy if you want to avoid depression. For me inactivity is enemy.",
  "Time is the father of truth , Its mother is our mind",
  "We cannot solve our problems with the same thinking that we used when we created them.",
  "Imagination is true magic carpet",
  "One loyal friend is worth ten thousand relatives",
  "If you make friends yourself. You will never be alone.",
  "Life isn't black and white. It's a million gray areas , don't you find?",
  "When a man opens a car door for his wife. It's either a new car or a new wife.",
  "Never go to a doctor whose office plants have died.",
  "Tired minds don't plan well. Sleep first , plan later",
  "You are never too old to start learning. You are never too young to achieve great things.",
  "Give a man a fish and you feed him for a day, tech a man to fish and you feed him for a lifetime.",
  "my father always said， never trust anyone whose tv is bigger than their book shelf . So I make sure I read.",
  "A room without book like a body without soul.",
  "Eduction is the key to unlock the golden door of freedom.",
  "When one door closes, another window is opens.",
  "The world is a book, and those who do not travel read only a page",
  "Just remember, you can't climb the ladder of success with your hands in your pockets.",
  "Someone is sitting in the shade today. Because someone planted a tree a long time ago.",
  "When trouble comes, it's your family that supports you",
  "If you want to shine like a sun, first burn like a sun.",
  "The difference between the impossible and the possible lies in a man's determination.",
  "If all you have is a hammer, everything looks like a nail.",
  "Believe in yourself, listen to your gut, and do what you love.",
  "Life without dreams is like a bird with a broken wing - it can't fly",
  "Love isn't something you find. Love is something that finds you.",
  "The best and most beautiful things in the world cannot be seen or even touched- they must be felt with the heart.",
  "If you want to lift yourself up, lift up someone else.",
  "The way I see it, if you want the rainbow, you gotta put up with the rain",
  "The present was an egg laid by the past that had the future inside its shell",
  "if you tell the truth, you don't have to remember anything.",
  "A good marriage would be between a blind wife and a deaf husband.",
  "Solitude is pleasant. Loneliness is not.",
  "It always seems impossible until it's done.",
  "Strength does not come from winning. Your struggles develop your strengths.",
  "Dream as if you'll live forever. Live as if you'll die today.",
  "Don't watch the clock; do what it does. Keep going.",
  "Time is the most valuable thing a man can spend.",
  "Trust is the glue of life. It's the most essential ingredient in effective communication.",
  "Never confuse the size of your paycheck with the size of your talent.",
  "Yesterday is past, tomorrow is future, but today is a gift.",
  "The best doctors in the world are Doctor Diet, Doctor Quiet, and Doctor Merry man.",
  "Always laugh when you can. It is cheap medicine.",
  "It is better to be feared than loved, if you cannot be both.",
  "It is better to keep your mouth closed and let people think you are a fool than to open it and remove all doubt",
  "All work and no play makes Jack a dull boy",
  "I remind myself every morning: Nothing I say this day will teach me anything. So if I'm going to learn, I must do it by listening.",
  "Defeat doesn't finish a man, quit does.A man is not finished when he's defeated. He's finished when he quits.",
  "You cannot be a winner without maturity and consistency.",
  "If you change the way you look at things, the things you look at change.",
  "A positive attitude can really make dreams come true - it did for me.",
  "It does not matter how slowly you go as long as you do not stop.",
  "Learning and innovation go hand in hand. The arrogance of success is to think that what you did yesterday will be sufficient for tomorrow.",
  "you can cut all the flowers but you cannot keep spring from coming.",
  "The most beautiful thing you can wear is confidence.",
  "Money can't buy happiness, but it can make you awfully comfortable while you're being miserable.",
  "Life's most persistent and urgent question is, 'What are you doing for others?'",
  "I came, I saw, I conquered.",
  "All human wisdom is summed up in two words; wait and hope.",
  "Perseverance is not a long race; it is many short races one after the other.",
  "Patience is bitter, but its fruit is sweet.",
  "The world is changing quickly and we must be ready to change with it or risk being left behind.",
  "The secret of success is to be ready when your opportunity comes.",
  "Never leave that till tomorrow which you can do today",
  "When you leave a beautiful place, you carry it with you wherever you go.",
  "Do your best and leave the rest to God.",
  "The city is not a concrete jungle, it is a human zoo.",
  "Good, better, best. Never let it rest. 'Til your good is better and your better is best.",
  "If you do what you love, you'll never work a day in your life.",
  "Don't make things too complicated. Try to relax, enjoy every moment, get used to everything.",
  "I'm not perfect; I make mistakes all the time. All I can do is to try my best to learn from my mistakes, take responsibility for them, and do a better job tomorrow.",
  "The most important thing is to try and inspire people so that they can be great in whatever they want to do.",
  "In order to succeed, we must first believe that we can.",
  "Wise men speak because they have something to say; Fools because they have to say something.",
  "You usually have to wait for that which is worth waiting for",
  "Life is a dream for the wise, a game for the fool, a comedy for the rich, a tragedy for the poor.",
  "People may hear your words, but they feel your attitude.",
  "Life without dreams is like a bird with a broken wing - it can't fly.",
  "Rome wasn't built in a day.",
  "Perfection is not attainable, but if we chase perfection we can catch excellence.",
  "Peace is not absence of conflict, it is the ability to handle conflict by peaceful means.",
  "I believe every human has a finite number of heartbeats. I don't intend to waste any of mine.",
  "The Earth does not belong to us, we belong to the Earth.",
  "You can have everything in life you want, if you will just help other people get what they want.",
  "Work like you don't need the money. Love like you've never been hurt. Dance like nobody's watching.",
  "You're only here for a short visit. Don't hurry, don't worry. And be sure to smell the flowers along the way.",
  "Procrastination is like a credit card: it's a lot of fun until you get the bill.",
  "Life's like a movie, write your own ending. Keep believing, keep pretending.",
  "The heart and soul of good writing is research; you should write not what you know but what you can find out",
  "When something is important enough, you do it even if the odds are not in your favor",
  "No bird soars too high if he soars with his own wings.",
  "If you can't explain it simply, you don't understand it well enough.",
  "Never interrupt your enemy when he is making a mistake.",
  "Impossible is a word to be found only in the dictionary of fools.",
  "An error doesn't become a mistake until you refuse to correct it.",
  "It's pretty scary to know how quickly time flies.",
  "The higher the voice the smaller the intellect.",
  "Strive for continuous improvement, instead of perfection.",
  "Many receive advice, only the wise profit from it.",
  "The best and most beautiful things in the world cannot be seen or even touched -they must be felt with the heart.",
  "Although children are only 24 percent of the population, they're 100 percent of our future and we cannot afford to provide any child with a substandard education.",
  "A friend to all is a friend to none.",
  "There is nothing permanent except change.",
  "The stupid neither forgive nor forget; the naive forgive and forget; the wise forgive but do not forget.",
  "It always seems impossible until it's done.",
  "Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less.",
  "To get rich, you have to be making money while you're asleep.",
  "Time is the coin of your life. It is the only coin you have, and only you can determine how it will be spent. Be careful you let other people spend it for you.",
  "Leadership is the other side of the coin of loneliness, and he who is a leader must always act alone. And acting alone, accept everything alone.",
  "Patience is not simply the ability to wait -it's how we behave while we're waiting.",
  "The great thing about social media was how it gave a voice to voiceless people.",
  "If you want a happy ending, that depends, of course, on where you stop your story",
  "Tell me and I forget. Teach me and I remember. Involve me and I learn.",
  "I hear and I forget. I see and I remember. I do and I understand.",
  "If you don't like the road you're walking, start paving another one.",
  "I guess real maturity, which most of us never achieve, is when you realize that you're not the center of the universe.",
  "Out of difficulties grow miracles",
  "Let's be naughty and save Santa the trip.",
  "My memories mean a lot to me, and I hold them close to my heart.",
  "Whatever must happen ultimately should happen immediately.",
  "An investment in knowledge pays the best interest",
  "I'm more interested in being good than being famous.",
  "Education has produced a vast population able to read but unable to distinguish what is worth reading.",
  "Life is a dream for the wise, a game for the fool, a comedy for the rich, a tragedy for the poor.",
  "If you can dream it, you can do it.",
  "Vanity can easily overtake wisdom. It usually overtakes common sense.",
  "Nobody on this earth is perfect. Everybody has their flaws; everybody has their dark secrets and vices.",
  "Life is too short to worry about anything.You had better enjoy it because the next day promises nothing.",
  "I never worry about the problem. I worry about the solution.",
  "When fake news is repeated, it becomes difficult for the public to discern what's real.",
  "Honesty is the first chapter in the book of wisdom.",
  "Some people die at 25 and aren't buried until 75.",
  "If I get married in the future, I want to have a relationship like friends with my other half. It'd be best if we can communicate often.",
  "If you introduce kids to fishing, they become good citizens.",
  "Three can keep a secret, if two of them are dead.",
  "Whenever you do a thing, act as if all the world were watching.",
  "You will never win if you never begin.",
  "Happiness doesn't depend on any external conditions, it is governed by our mental attitude.",
  "The bottom line is to have fun and enjoy life.",
  "The difference between ordinary and extraordinary is that little extra.",
  "I'm excited about what the future will bring and I think the best is yet to come."
];

type SourceUnit = {
  id: string;
  title: string;
  items: Array<{ id: string; english: string }>;
};

type SourceCategory = {
  id: Exclude<PracticeKind, "all">;
  name: string;
  description: string;
  units: SourceUnit[];
};

function chunkIntoUnits(categoryId: string, titlePrefix: string, lines: string[], unitSize = UNIT_SIZE): SourceUnit[] {
  const cleaned = lines.map((line) => line.trim()).filter(Boolean);
  const units: SourceUnit[] = [];
  let quoteIndex = 0;

  for (let i = 0; i < cleaned.length; i += unitSize) {
    const part = cleaned.slice(i, i + unitSize);
    const unitNumber = units.length + 1;
    const items = part.map((english) => {
      quoteIndex += 1;
      const padded = String(quoteIndex).padStart(4, "0");
      return {
        id: `${categoryId}-${padded}`,
        english
      };
    });

    units.push({
      id: `${categoryId}-unit-${String(unitNumber).padStart(2, "0")}`,
      title: `${titlePrefix} ${unitNumber}`,
      items
    });
  }

  return units;
}

const peppaSeason1Units: SourceUnit[] = [
  {
    id: "daily-dialog-peppa-s1-e01",
    title: "Peppa S1E01 · Muddy Puddles",
    items: [
      {
        id: "daily-dialog-s1e01-01",
        english: "It is raining today."
      },
      {
        id: "daily-dialog-s1e01-02",
        english: "So, Peppa and George cannot play outside."
      },
      {
        id: "daily-dialog-s1e01-03",
        english: "Daddy, it's stopped raining."
      },
      {
        id: "daily-dialog-s1e01-04",
        english: "Can we go out to play?"
      },
      {
        id: "daily-dialog-s1e01-05",
        english: "Alright, run along you two."
      },
      {
        id: "daily-dialog-s1e01-06",
        english: "Peppa loves jumping in muddy puddles."
      },
      {
        id: "daily-dialog-s1e01-07",
        english: "I love muddy puddles."
      },
      {
        id: "daily-dialog-s1e01-08",
        english: "Peppa. If you jump in muddy puddles, you must wear your boots."
      },
      {
        id: "daily-dialog-s1e01-09",
        english: "Sorry, Mummy."
      },
      {
        id: "daily-dialog-s1e01-10",
        english: "George likes to jump in muddy puddles, too."
      },
      {
        id: "daily-dialog-s1e01-11",
        english: "George. If you jump in muddy puddles, you must wear your boots."
      },
      {
        id: "daily-dialog-s1e01-12",
        english: "Peppa likes to look after her little brother, George."
      },
      {
        id: "daily-dialog-s1e01-13",
        english: "George, let's find some more puddles."
      },
      {
        id: "daily-dialog-s1e01-14",
        english: "Peppa and George are having a lot of fun."
      },
      {
        id: "daily-dialog-s1e01-15",
        english: "Peppa has found a little puddle."
      },
      {
        id: "daily-dialog-s1e01-16",
        english: "George has found a big puddle."
      },
      {
        id: "daily-dialog-s1e01-17",
        english: "Look, George. There's a really big puddle."
      },
      {
        id: "daily-dialog-s1e01-18",
        english: "George wants to jump into the big puddle first."
      },
      {
        id: "daily-dialog-s1e01-19",
        english: "Stop, George. I must check if it's safe for you."
      },
      {
        id: "daily-dialog-s1e01-20",
        english: "Good. It is safe for you."
      },
      {
        id: "daily-dialog-s1e01-21",
        english: "Sorry, George. It's only mud."
      },
      {
        id: "daily-dialog-s1e01-22",
        english: "Peppa and George love jumping in muddy puddles."
      },
      {
        id: "daily-dialog-s1e01-23",
        english: "Come on, George. Let's go and show Daddy."
      },
      {
        id: "daily-dialog-s1e01-24",
        english: "Goodness me."
      },
      {
        id: "daily-dialog-s1e01-25",
        english: "Daddy. Daddy. Guess what we've been doing."
      },
      {
        id: "daily-dialog-s1e01-26",
        english: "Let me think..."
      },
      {
        id: "daily-dialog-s1e01-27",
        english: "Have you been watching television?"
      },
      {
        id: "daily-dialog-s1e01-28",
        english: "No. No. Daddy."
      },
      {
        id: "daily-dialog-s1e01-29",
        english: "Have you just had a bath?"
      },
      {
        id: "daily-dialog-s1e01-30",
        english: "No. No."
      },
      {
        id: "daily-dialog-s1e01-31",
        english: "I know. You've been jumping in muddy puddles."
      },
      {
        id: "daily-dialog-s1e01-32",
        english: "Yes. Yes. Daddy. We've been jumping in muddy puddles."
      },
      {
        id: "daily-dialog-s1e01-33",
        english: "Ho. Ho. And look at the mess you're in."
      },
      {
        id: "daily-dialog-s1e01-34",
        english: "Oooh..."
      },
      {
        id: "daily-dialog-s1e01-35",
        english: "Oh, well, it's only mud."
      },
      {
        id: "daily-dialog-s1e01-36",
        english: "Let's clean up quickly before Mummy sees the mess."
      },
      {
        id: "daily-dialog-s1e01-37",
        english: "Daddy, when we've cleaned up, will you and Mummy come and play, too?"
      },
      {
        id: "daily-dialog-s1e01-38",
        english: "Yes, we can all play in the garden."
      },
      {
        id: "daily-dialog-s1e01-39",
        english: "Peppa and George are wearing their boots."
      },
      {
        id: "daily-dialog-s1e01-40",
        english: "Mummy and Daddy are wearing their boots."
      },
      {
        id: "daily-dialog-s1e01-41",
        english: "Peppa loves jumping up and down in muddy puddles."
      },
      {
        id: "daily-dialog-s1e01-42",
        english: "Everyone loves jumping up and down in muddy puddles."
      },
      {
        id: "daily-dialog-s1e01-43",
        english: "Oh, Daddy pig,look at the mess you're in."
      },
      {
        id: "daily-dialog-s1e01-44",
        english: "It's only mud."
      },
    ]
  },
  {
    id: "daily-dialog-peppa-s1-e02",
    title: "Peppa S1E02 · Mr Dinosaur is Lost",
    items: [
      {
        id: "daily-dialog-s1e02-01",
        english: "George's favourite toy is Mr. Dinosaur."
      },
      {
        id: "daily-dialog-s1e02-02",
        english: "DineDine SawSaw."
      },
      {
        id: "daily-dialog-s1e02-03",
        english: "George loves Mr. Dinosaur."
      },
      {
        id: "daily-dialog-s1e02-04",
        english: "Grrrrrrrrrrrrrrrr.."
      },
      {
        id: "daily-dialog-s1e02-05",
        english: "Sometimes, George likes to scare Peppa with Mr."
      },
      {
        id: "daily-dialog-s1e02-06",
        english: "Dinosaur."
      },
      {
        id: "daily-dialog-s1e02-07",
        english: "Sometimes, George likes to scare Peppa with Mr."
      },
      {
        id: "daily-dialog-s1e02-08",
        english: "Dinosaur."
      },
      {
        id: "daily-dialog-s1e02-09",
        english: "Grrrrrrrrrrrrrrrrrrrr."
      },
      {
        id: "daily-dialog-s1e02-10",
        english: "Eeek. Too scary."
      },
      {
        id: "daily-dialog-s1e02-11",
        english: "At suppertime,"
      },
      {
        id: "daily-dialog-s1e02-12",
        english: "Mr. Dinosaur sits next to George."
      },
      {
        id: "daily-dialog-s1e02-13",
        english: "I beg your pardon."
      },
      {
        id: "daily-dialog-s1e02-14",
        english: "Was that you George, or was it Mr. Dinosaur?"
      },
      {
        id: "daily-dialog-s1e02-15",
        english: "DineDine SawSaw."
      },
      {
        id: "daily-dialog-s1e02-16",
        english: "At bath time,"
      },
      {
        id: "daily-dialog-s1e02-17",
        english: "George shares his bath with Mr. Dinosaur"
      },
      {
        id: "daily-dialog-s1e02-18",
        english: "Grrrrrrrrrrrrr."
      },
      {
        id: "daily-dialog-s1e02-19",
        english: "Goodnight, Peppa."
      },
      {
        id: "daily-dialog-s1e02-20",
        english: "Goodnight, Mummy."
      },
      {
        id: "daily-dialog-s1e02-21",
        english: "Goodnight, George."
      },
      {
        id: "daily-dialog-s1e02-22",
        english: "And goodnight, Mr. Dinosaur."
      },
      {
        id: "daily-dialog-s1e02-23",
        english: "Grrrrrrrrr."
      },
      {
        id: "daily-dialog-s1e02-24",
        english: "When George goes to bed,"
      },
      {
        id: "daily-dialog-s1e02-25",
        english: "Mr. Dinosaur is tucked up with him."
      },
      {
        id: "daily-dialog-s1e02-26",
        english: "George's favourite game is"
      },
      {
        id: "daily-dialog-s1e02-27",
        english: "throwing Mr. Dinosaur up in the air..."
      },
      {
        id: "daily-dialog-s1e02-28",
        english: "Wheeeeeee."
      },
      {
        id: "daily-dialog-s1e02-29",
        english: "...and catching him when he falls back down."
      },
      {
        id: "daily-dialog-s1e02-30",
        english: "Wheeeeeeeee."
      },
      {
        id: "daily-dialog-s1e02-31",
        english: "Peppa and Daddy Pig are playing draughts."
      },
      {
        id: "daily-dialog-s1e02-32",
        english: "I win, Daddy."
      },
      {
        id: "daily-dialog-s1e02-33",
        english: "Oh, well done, Peppa."
      },
      {
        id: "daily-dialog-s1e02-34",
        english: "Whhhhaaaaaaaaaaa。"
      },
      {
        id: "daily-dialog-s1e02-35",
        english: "George?"
      },
      {
        id: "daily-dialog-s1e02-36",
        english: "Whaaaaaaaaa."
      },
      {
        id: "daily-dialog-s1e02-37",
        english: "George, what's the matter?"
      },
      {
        id: "daily-dialog-s1e02-38",
        english: "DineDine SawSaw..."
      },
      {
        id: "daily-dialog-s1e02-39",
        english: "George, have you lost Mr. Dinosaur?"
      },
      {
        id: "daily-dialog-s1e02-40",
        english: "George has lost Mr. Dinosaur."
      },
      {
        id: "daily-dialog-s1e02-41",
        english: "Don't worry George."
      },
      {
        id: "daily-dialog-s1e02-42",
        english: "We'll find Mr. Dinosaur."
      },
      {
        id: "daily-dialog-s1e02-43",
        english: "It's a job for a detective."
      },
      {
        id: "daily-dialog-s1e02-44",
        english: "Daddy, what is a detective?"
      },
      {
        id: "daily-dialog-s1e02-45",
        english: "A detective is a very important person who is good at finding things."
      },
      {
        id: "daily-dialog-s1e02-46",
        english: "Me. Me. I'm good at finding things."
      },
      {
        id: "daily-dialog-s1e02-47",
        english: "Alright. Peppa is the detective."
      },
      {
        id: "daily-dialog-s1e02-48",
        english: "George. I am the detective."
      },
      {
        id: "daily-dialog-s1e02-49",
        english: "I will help you find Mr. Dinosaur."
      },
      {
        id: "daily-dialog-s1e02-50",
        english: "Maybe the detective should ask"
      },
      {
        id: "daily-dialog-s1e02-51",
        english: "George some simple questions."
      },
      {
        id: "daily-dialog-s1e02-52",
        english: "George? where's Mr. Dinosaur?"
      },
      {
        id: "daily-dialog-s1e02-53",
        english: "Whaaaaaaaaaa."
      },
      {
        id: "daily-dialog-s1e02-54",
        english: "George does not know where Mr. Dinosaur is."
      },
      {
        id: "daily-dialog-s1e02-55",
        english: "The detective could try and guess where Mr. Dinosaur might be."
      },
      {
        id: "daily-dialog-s1e02-56",
        english: "I know. I know where he is."
      },
      {
        id: "daily-dialog-s1e02-57",
        english: "George always has Mr. Dinosaur with him in the bath."
      },
      {
        id: "daily-dialog-s1e02-58",
        english: "So Mr. Dinosaur is in the bath."
      },
      {
        id: "daily-dialog-s1e02-59",
        english: "Mr. Dinosaur is not in the bath."
      },
      {
        id: "daily-dialog-s1e02-60",
        english: "Oh. I know."
      },
      {
        id: "daily-dialog-s1e02-61",
        english: "I know where Mr. Dinosaur is."
      },
      {
        id: "daily-dialog-s1e02-62",
        english: "George always has Mr."
      },
      {
        id: "daily-dialog-s1e02-63",
        english: "Dinosaur in his bed at night."
      },
      {
        id: "daily-dialog-s1e02-64",
        english: "So that's where he is."
      },
      {
        id: "daily-dialog-s1e02-65",
        english: "Mr. Dinosaur is not in George's bed."
      },
      {
        id: "daily-dialog-s1e02-66",
        english: "Oh."
      },
      {
        id: "daily-dialog-s1e02-67",
        english: "Maybe we should try the garden."
      },
      {
        id: "daily-dialog-s1e02-68",
        english: "Yes, the garden."
      },
      {
        id: "daily-dialog-s1e02-69",
        english: "I was going to say that."
      },
      {
        id: "daily-dialog-s1e02-70",
        english: "Where is Mr. Dinosaur?"
      },
      {
        id: "daily-dialog-s1e02-71",
        english: "Mr. Dinosaur is very hard to find."
      },
      {
        id: "daily-dialog-s1e02-72",
        english: "Oh. Mr. Dinosaur isn't anywhere."
      },
    ]
  },
  {
    id: "daily-dialog-peppa-s1-e03",
    title: "Peppa S1E03 · Best Friend",
    items: [
      {
        id: "daily-dialog-s1e03-01",
        english: "I want to be a doctor."
      },
      {
        id: "daily-dialog-s1e03-02",
        english: "But who’s going to be the sick person?"
      },
      {
        id: "daily-dialog-s1e03-03",
        english: "Peppa is waiting for her best friend, Suzy Sheep."
      },
      {
        id: "daily-dialog-s1e03-04",
        english: "George!"
      },
      {
        id: "daily-dialog-s1e03-05",
        english: "Hello, Suzy."
      },
      {
        id: "daily-dialog-s1e03-06",
        english: "Peppa and Suzy love playing doctors and nurses."
      },
      {
        id: "daily-dialog-s1e03-07",
        english: "Hello, Peppa."
      },
      {
        id: "daily-dialog-s1e03-08",
        english: "So does George."
      },
      {
        id: "daily-dialog-s1e03-09",
        english: "Suzy Sheep has come to play with Peppa."
      },
      {
        id: "daily-dialog-s1e03-10",
        english: "Peppa listens to George’s chest."
      },
      {
        id: "daily-dialog-s1e03-11",
        english: "Peppa loves Suzy. Suzy loves Peppa. They are best friends."
      },
      {
        id: "daily-dialog-s1e03-12",
        english: "Now, George, take a big breath in, then cough."
      },
      {
        id: "daily-dialog-s1e03-13",
        english: "Peppa, why don’t you and Suzy go and play in your bedroom?"
      },
      {
        id: "daily-dialog-s1e03-14",
        english: "Hmm, I think your heart’s a bit loose. I’ll put a plaster on it."
      },
      {
        id: "daily-dialog-s1e03-15",
        english: "Open wide, please."
      },
      {
        id: "daily-dialog-s1e03-16",
        english: "Yes, Mummy."
      },
      {
        id: "daily-dialog-s1e03-17",
        english: "Suzy takes George’s temperature."
      },
      {
        id: "daily-dialog-s1e03-18",
        english: "George wants to play, too."
      },
      {
        id: "daily-dialog-s1e03-19",
        english: "Oh dear, you’re very very hot."
      },
      {
        id: "daily-dialog-s1e03-20",
        english: "Peppa and Suzy love playing in Peppa’s bedroom."
      },
      {
        id: "daily-dialog-s1e03-21",
        english: "I think you have to stay in bed for three years."
      },
      {
        id: "daily-dialog-s1e03-22",
        english: "Daddy Pig has come to find George."
      },
      {
        id: "daily-dialog-s1e03-23",
        english: "No, George. This game is just for big girls."
      },
      {
        id: "daily-dialog-s1e03-24",
        english: "Oh, no! What’s wrong with George?"
      },
      {
        id: "daily-dialog-s1e03-25",
        english: "Go and play with your own toys."
      },
      {
        id: "daily-dialog-s1e03-26",
        english: "Don’t worry, Daddy. It’s only a game."
      },
      {
        id: "daily-dialog-s1e03-27",
        english: "Peppa and Suzy want to play on their own."
      },
      {
        id: "daily-dialog-s1e03-28",
        english: "George is our patient."
      },
      {
        id: "daily-dialog-s1e03-29",
        english: "I’m a tiny little fairy princess."
      },
      {
        id: "daily-dialog-s1e03-30",
        english: "Oh, I see."
      },
    ]
  },
  {
    id: "daily-dialog-peppa-s1-e04",
    title: "Peppa S1E04 · Polly Parrot",
    items: [
      {
        id: "daily-dialog-s1e04-01",
        english: "What noisy little ones you are!"
      },
      {
        id: "daily-dialog-s1e04-02",
        english: "Peppa and her family are visiting Granny Pig and Grandpa Pig."
      },
      {
        id: "daily-dialog-s1e04-03",
        english: "Granny, please can we leave the table and go and see Polly Parrot?"
      },
      {
        id: "daily-dialog-s1e04-04",
        english: "Granny Pig! Grandpa Pig!"
      },
      {
        id: "daily-dialog-s1e04-05",
        english: "Are you sure you’ve completely finished your cake?"
      },
      {
        id: "daily-dialog-s1e04-06",
        english: "Ganny ‘ig! Baba ‘ig!"
      },
      {
        id: "daily-dialog-s1e04-07",
        english: "Off you go, then."
      },
      {
        id: "daily-dialog-s1e04-08",
        english: "Hello, my little ones. Come inside. We have a surprise."
      },
      {
        id: "daily-dialog-s1e04-09",
        english: "Hurray!"
      },
      {
        id: "daily-dialog-s1e04-10",
        english: "What is it?"
      },
      {
        id: "daily-dialog-s1e04-11",
        english: "George, say something to Polly."
      },
      {
        id: "daily-dialog-s1e04-12",
        english: "We have a new pet. Can you guess what it is?"
      },
      {
        id: "daily-dialog-s1e04-13",
        english: "George is a little bit shy."
      },
      {
        id: "daily-dialog-s1e04-14",
        english: "Dinosaur?"
      },
      {
        id: "daily-dialog-s1e04-15",
        english: "Hello."
      },
      {
        id: "daily-dialog-s1e04-16",
        english: "No. It’s not a dinosaur. Come and see."
      },
      {
        id: "daily-dialog-s1e04-17",
        english: "Granny Pig and Grandpa Pig have a pet parrot."
      },
      {
        id: "daily-dialog-s1e04-18",
        english: "Peppa and George are really enjoying playing with Polly Parrot."
      },
      {
        id: "daily-dialog-s1e04-19",
        english: "Peppa, George, this is our pet parrot. She’s called Polly. Pretty Polly."
      },
      {
        id: "daily-dialog-s1e04-20",
        english: "I’m Peppa Pig!"
      },
      {
        id: "daily-dialog-s1e04-21",
        english: "Pretty Polly."
      },
      {
        id: "daily-dialog-s1e04-22",
        english: "George, say something."
      },
    ]
  },
  {
    id: "daily-dialog-peppa-s1-e05",
    title: "Peppa S1E05 · Hide and Seek",
    items: [
      {
        id: "daily-dialog-s1e05-01",
        english: "Oink."
      },
      {
        id: "daily-dialog-s1e05-02",
        english: "George, I could see you too easily."
      },
      {
        id: "daily-dialog-s1e05-03",
        english: "Now it is Peppa’s turn to hide."
      },
      {
        id: "daily-dialog-s1e05-04",
        english: "Peppa and George are pretending to be parrots."
      },
      {
        id: "daily-dialog-s1e05-05",
        english: "One... um... three."
      },
      {
        id: "daily-dialog-s1e05-06",
        english: "I’m Polly Parrot."
      },
      {
        id: "daily-dialog-s1e05-07",
        english: "I’ll help George to count."
      },
      {
        id: "daily-dialog-s1e05-08",
        english: "Peppa is thinking of something else to say to Polly Parrot."
      },
      {
        id: "daily-dialog-s1e05-09",
        english: "One... two... three... four... five... six... seven... eight... nine... ten."
      },
      {
        id: "daily-dialog-s1e05-10",
        english: "I’m a noisy parrot. Oink!"
      },
      {
        id: "daily-dialog-s1e05-11",
        english: "Okay, George, open your eyes."
      },
      {
        id: "daily-dialog-s1e05-12",
        english: "George has to find where Peppa is hiding."
      },
      {
        id: "daily-dialog-s1e05-13",
        english: "Peppa, George, have you been playing with Polly?"
      },
      {
        id: "daily-dialog-s1e05-14",
        english: "Oh."
      },
      {
        id: "daily-dialog-s1e05-15",
        english: "Yes, Granny."
      },
      {
        id: "daily-dialog-s1e05-16",
        english: "Polly is such a sweet parrot."
      },
      {
        id: "daily-dialog-s1e05-17",
        english: "I’m a clever parrot."
      },
      {
        id: "daily-dialog-s1e05-18",
        english: "I’m a noisy parrot. Oink! I’m a noisy parrot. Oink!"
      },
      {
        id: "daily-dialog-s1e05-19",
        english: "Oh!"
      },
      {
        id: "daily-dialog-s1e05-20",
        english: "Peppa isn’t hiding under the table."
      },
      {
        id: "daily-dialog-s1e05-21",
        english: "George, have you thought of looking upstairs?"
      },
      {
        id: "daily-dialog-s1e05-22",
        english: "Peppa isn’t under the bed."
      },
      {
        id: "daily-dialog-s1e05-23",
        english: "What was that strange noise?"
      },
      {
        id: "daily-dialog-s1e05-24",
        english: "Peppa isn’t behind the curtain."
      },
      {
        id: "daily-dialog-s1e05-25",
        english: "There is that strange noise again."
      },
      {
        id: "daily-dialog-s1e05-26",
        english: "What can it be?"
      },
      {
        id: "daily-dialog-s1e05-27",
        english: "Oh, my word!"
      },
    ]
  },
  {
    id: "daily-dialog-peppa-s1-e06",
    title: "Peppa S1E06 · The Playgroup",
    items: [
      {
        id: "daily-dialog-s1e06-01",
        english: "Peppa and George are going to the playgroup. It is George’s first day."
      },
      {
        id: "daily-dialog-s1e06-02",
        english: "Hello. This is my little brother, George."
      },
      {
        id: "daily-dialog-s1e06-03",
        english: "Hello, George."
      },
      {
        id: "daily-dialog-s1e06-04",
        english: "I wish I had a little brother like George."
      },
      {
        id: "daily-dialog-s1e06-05",
        english: "Really?"
      },
      {
        id: "daily-dialog-s1e06-06",
        english: "Hello! I’m Danny Dog. Woof woof! Is that a dinosaur?"
      },
      {
        id: "daily-dialog-s1e06-07",
        english: "It’s just a toy dinosaur."
      },
      {
        id: "daily-dialog-s1e06-08",
        english: "Grrr! Dinosaur."
      },
      {
        id: "daily-dialog-s1e06-09",
        english: "Brilliant. Woof woof!"
      },
      {
        id: "daily-dialog-s1e06-10",
        english: "Dinosaur. Grrr!"
      },
      {
        id: "daily-dialog-s1e06-11",
        english: "Ah!"
      },
      {
        id: "daily-dialog-s1e06-12",
        english: "Ah! Really scary."
      },
      {
        id: "daily-dialog-s1e06-13",
        english: "That’s brilliant."
      },
      {
        id: "daily-dialog-s1e06-14",
        english: "George, are you looking forward to the playgroup?"
      },
      {
        id: "daily-dialog-s1e06-15",
        english: "George is my brother. He’s brilliant."
      },
      {
        id: "daily-dialog-s1e06-16",
        english: "Oink, oink."
      },
      {
        id: "daily-dialog-s1e06-17",
        english: "Peppa is proud of her little brother George."
      },
      {
        id: "daily-dialog-s1e06-18",
        english: "Daddy, maybe George is too small to go to my playgroup?"
      },
      {
        id: "daily-dialog-s1e06-19",
        english: "Shall we show George how we paint pictures?"
      },
      {
        id: "daily-dialog-s1e06-20",
        english: "He’ll be fine, Peppa. There’ll be you and Mr Dinosaur there to keep him company."
      },
      {
        id: "daily-dialog-s1e06-21",
        english: "George is not very good at painting."
      },
      {
        id: "daily-dialog-s1e06-22",
        english: "Yes, I’m very good. I will show him how to paint a flower."
      },
      {
        id: "daily-dialog-s1e06-23",
        english: "But I want to play with the big children, not George and his toy dinosaur."
      },
      {
        id: "daily-dialog-s1e06-24",
        english: "Oh dear, Peppa doesn’t want George to go to her playgroup."
      },
      {
        id: "daily-dialog-s1e06-25",
        english: "Well, maybe you could help him?"
      },
      {
        id: "daily-dialog-s1e06-26",
        english: "George, today I’m going to teach you how to paint a flower."
      },
      {
        id: "daily-dialog-s1e06-27",
        english: "Oink oink."
      },
      {
        id: "daily-dialog-s1e06-28",
        english: "First you paint a big circle."
      },
    ]
  },
  {
    id: "daily-dialog-peppa-s1-e07",
    title: "Peppa S1E07 · Mummy Pig at Work",
    items: [
      {
        id: "daily-dialog-s1e07-01",
        english: "No, George. That’s the wrong colour."
      },
      {
        id: "daily-dialog-s1e07-02",
        english: "Now you paint the flower’s petals."
      },
      {
        id: "daily-dialog-s1e07-03",
        english: "George! That’s the wrong shape."
      },
      {
        id: "daily-dialog-s1e07-04",
        english: "Now you paint the stalk and the leaves."
      },
      {
        id: "daily-dialog-s1e07-05",
        english: "Perfect."
      },
      {
        id: "daily-dialog-s1e07-06",
        english: "George, you’ve done it all wrong."
      },
      {
        id: "daily-dialog-s1e07-07",
        english: "Now what do we have here?"
      },
      {
        id: "daily-dialog-s1e07-08",
        english: "I’ve painted a flower."
      },
      {
        id: "daily-dialog-s1e07-09",
        english: "That’s very good, Peppa. And George has painted a dinosaur."
      },
      {
        id: "daily-dialog-s1e07-10",
        english: "Grrr! Dinosaur."
      },
      {
        id: "daily-dialog-s1e07-11",
        english: "Woof! Brilliant."
      },
      {
        id: "daily-dialog-s1e07-12",
        english: "I think George and Peppa’s pictures should go on the wall."
      },
      {
        id: "daily-dialog-s1e07-13",
        english: "Hurray!"
      },
      {
        id: "daily-dialog-s1e07-14",
        english: "Peppa, you must be very proud of your little brother."
      },
      {
        id: "daily-dialog-s1e07-15",
        english: "Yes, I am."
      },
      {
        id: "daily-dialog-s1e07-16",
        english: "It is home time and the children’s parents are here to pick them up."
      },
      {
        id: "daily-dialog-s1e07-17",
        english: "Can George come next time?"
      },
      {
        id: "daily-dialog-s1e07-18",
        english: "Yes, and he can paint us another lovely picture. And what will you paint next time, George?"
      },
      {
        id: "daily-dialog-s1e07-19",
        english: "Dinosaur. Grrr!"
      },
      {
        id: "daily-dialog-s1e07-20",
        english: "Another dinosaur picture? Well, maybe you can show us all how to paint a dinosaur."
      },
      {
        id: "daily-dialog-s1e07-21",
        english: "Oink oink!"
      },
      {
        id: "daily-dialog-s1e07-22",
        english: "Yes! Brilliant."
      },
      {
        id: "daily-dialog-s1e07-23",
        english: "Brilliant."
      },
      {
        id: "daily-dialog-s1e07-24",
        english: "Mummy Pig is working on her computer. Daddy Pig is making soup for lunch."
      },
      {
        id: "daily-dialog-s1e07-25",
        english: "Daddy, can we go and watch Mummy on her computer?"
      },
      {
        id: "daily-dialog-s1e07-26",
        english: "Yes, as long as you don’t disturb her. She has a lot of important work to do today."
      },
      {
        id: "daily-dialog-s1e07-27",
        english: "Thank you, Daddy."
      },
      {
        id: "daily-dialog-s1e07-28",
        english: "Mummy Pig has a lot of important work to do."
      },
      {
        id: "daily-dialog-s1e07-29",
        english: "Mummy, can George and I sit on your lap and watch you work?"
      },
      {
        id: "daily-dialog-s1e07-30",
        english: "Yes, if you both sit quietly."
      },
      {
        id: "daily-dialog-s1e07-31",
        english: "Peppa and George love to watch Mummy work on the computer."
      },
      {
        id: "daily-dialog-s1e07-32",
        english: "Mummy, can we play that computer game, Happy Mrs Chicken?"
      },
      {
        id: "daily-dialog-s1e07-33",
        english: "We can play Happy Mrs Chicken later. But now I have to work."
      },
      {
        id: "daily-dialog-s1e07-34",
        english: "Mummy, can we help you work?"
      },
      {
        id: "daily-dialog-s1e07-35",
        english: "No, Peppa. You mustn’t touch the computer. And George, you mustn’t touch the computer, either."
      },
      {
        id: "daily-dialog-s1e07-36",
        english: "Yes, George, you mustn’t do this."
      },
      {
        id: "daily-dialog-s1e07-37",
        english: "Peppa, stop."
      },
      {
        id: "daily-dialog-s1e07-38",
        english: "Sorry, Mummy. I was just showing George what not to do."
      },
      {
        id: "daily-dialog-s1e07-39",
        english: "Oh, dear. The computer is not meant to do that."
      },
      {
        id: "daily-dialog-s1e07-40",
        english: "Daddy Pig. Daddy Pig."
      },
      {
        id: "daily-dialog-s1e07-41",
        english: "What is it, Mummy Pig?"
      },
      {
        id: "daily-dialog-s1e07-42",
        english: "Daddy Pig, can you mend the computer?"
      },
      {
        id: "daily-dialog-s1e07-43",
        english: "Uh..."
      },
      {
        id: "daily-dialog-s1e07-44",
        english: "I’ll finish the lunch while you mend the computer."
      },
      {
        id: "daily-dialog-s1e07-45",
        english: "Uh, right you are, Mummy Pig, but I’m not very good with these things."
      },
      {
        id: "daily-dialog-s1e07-46",
        english: "Oh, thank you, Daddy Pig."
      },
      {
        id: "daily-dialog-s1e07-47",
        english: "Daddy Pig is going to mend the computer."
      },
      {
        id: "daily-dialog-s1e07-48",
        english: "Mmm... Mmm... Um, maybe if I just switch it off, and then switch it on again."
      },
    ]
  },
  {
    id: "daily-dialog-peppa-s1-e08",
    title: "Peppa S1E08 · Piggy in the Middle",
    items: [
      {
        id: "daily-dialog-s1e08-01",
        english: "George has caught the ball."
      },
      {
        id: "daily-dialog-s1e08-02",
        english: "Well done, George. Now you throw the ball to Peppa."
      },
      {
        id: "daily-dialog-s1e08-03",
        english: "Oop! Try again. Oh! Try again."
      },
      {
        id: "daily-dialog-s1e08-04",
        english: "George can not throw the ball past Mummy Pig."
      },
      {
        id: "daily-dialog-s1e08-05",
        english: "Come on, George. Give the ball to me."
      },
      {
        id: "daily-dialog-s1e08-06",
        english: "Silly George. I can do that too."
      },
      {
        id: "daily-dialog-s1e08-07",
        english: "Peppa wanted to copy George, but she’s too big and has got stuck."
      },
      {
        id: "daily-dialog-s1e08-08",
        english: "I’ve got the ball. Peppa, now it’s your turn to be piggy. George, catch."
      },
      {
        id: "daily-dialog-s1e08-09",
        english: "George is playing with his ball in the garden. Peppa wants to play, too."
      },
      {
        id: "daily-dialog-s1e08-10",
        english: "George, you’re doing it all wrong. This is how to catch a ball."
      },
      {
        id: "daily-dialog-s1e08-11",
        english: "Catch the ball, George."
      },
      {
        id: "daily-dialog-s1e08-12",
        english: "Caught it! George, you’re the piggy. George, catch."
      },
      {
        id: "daily-dialog-s1e08-13",
        english: "Catch, George."
      },
      {
        id: "daily-dialog-s1e08-14",
        english: "Not like this. That’s what you do."
      },
      {
        id: "daily-dialog-s1e08-15",
        english: "George, catch."
      },
      {
        id: "daily-dialog-s1e08-16",
        english: "What a cheeky little one Peppa is."
      },
      {
        id: "daily-dialog-s1e08-17",
        english: "Here’s the ball, George. Whee!"
      },
      {
        id: "daily-dialog-s1e08-18",
        english: "George, come back! You little piggy!"
      },
      {
        id: "daily-dialog-s1e08-19",
        english: "Maybe Peppa is teasing George just a bit too much."
      },
      {
        id: "daily-dialog-s1e08-20",
        english: "Oh, dear. Peppa, you shouldn’t tease George like that."
      },
      {
        id: "daily-dialog-s1e08-21",
        english: "Sorry, George."
      },
      {
        id: "daily-dialog-s1e08-22",
        english: "Peppa, have you been teasing George?"
      },
      {
        id: "daily-dialog-s1e08-23",
        english: "What’s all the noise?"
      },
      {
        id: "daily-dialog-s1e08-24",
        english: "Not really, Mummy. I was teaching him how to catch."
      },
      {
        id: "daily-dialog-s1e08-25",
        english: "Daddy, George is too little to play Piggy in the Middle."
      },
      {
        id: "daily-dialog-s1e08-26",
        english: "Oh, I’m sure he’s big enough."
      },
      {
        id: "daily-dialog-s1e08-27",
        english: "No, he isn’t. Daddy, watch!"
      },
      {
        id: "daily-dialog-s1e08-28",
        english: "Catch it, George."
      },
      {
        id: "daily-dialog-s1e08-29",
        english: "That’s not fair."
      },
      {
        id: "daily-dialog-s1e08-30",
        english: "Yes, it is. I just gave George a helping hand."
      },
    ]
  },
  {
    id: "daily-dialog-peppa-s1-e09",
    title: "Peppa S1E09 · Daddy Loses His Glasses",
    items: [
      {
        id: "daily-dialog-s1e09-01",
        english: "Daddy Pig wears glasses. He needs to wear glasses to see clearly. When Daddy Pig wears his glasses, everything looks fine. But when Daddy Pig takes his glasses off, he can’t see things clearly. Everything looks a bit soft and fuzzy. So it is very important that Daddy Pig knows where his glasses are."
      },
      {
        id: "daily-dialog-s1e09-02",
        english: "Sometimes Daddy Pig loses his glasses."
      },
      {
        id: "daily-dialog-s1e09-03",
        english: "Peppa, George, have you seen Daddy Pig’s glasses? He can’t find them anywhere."
      },
      {
        id: "daily-dialog-s1e09-04",
        english: "No, Mummy."
      },
      {
        id: "daily-dialog-s1e09-05",
        english: "Peppa and George do not know where Daddy Pig’s glasses are."
      },
      {
        id: "daily-dialog-s1e09-06",
        english: "Oh, dear. Daddy Pig cannot see a thing without them. And it makes him very grumpy."
      },
      {
        id: "daily-dialog-s1e09-07",
        english: "Without his glasses on, Daddy Pig cannot read his newspaper."
      },
      {
        id: "daily-dialog-s1e09-08",
        english: "Oh."
      },
      {
        id: "daily-dialog-s1e09-09",
        english: "Let’s look upstairs in Mummy and Daddy’s bedroom."
      },
      {
        id: "daily-dialog-s1e09-10",
        english: "Peppa and George are looking in Mummy and Daddy Pig’s bedroom."
      },
      {
        id: "daily-dialog-s1e09-11",
        english: "George, be careful not to knock anything over."
      },
      {
        id: "daily-dialog-s1e09-12",
        english: "Argh! It’s not funny."
      },
      {
        id: "daily-dialog-s1e09-13",
        english: "Peppa looks under the pillows. But Daddy Pig’s glasses are not there."
      },
      {
        id: "daily-dialog-s1e09-14",
        english: "George looks in Daddy’s slippers. But the glasses are not there, either."
      },
      {
        id: "daily-dialog-s1e09-15",
        english: "Let’s look in the bathroom."
      },
      {
        id: "daily-dialog-s1e09-16",
        english: "Peppa and George are looking in the bathroom. The glasses are not in the bath."
      },
      {
        id: "daily-dialog-s1e09-17",
        english: "The glasses are not in the toilet."
      },
      {
        id: "daily-dialog-s1e09-18",
        english: "This is ridiculous. I can’t see anything. Somebody must have put my glasses somewhere."
      },
      {
        id: "daily-dialog-s1e09-19",
        english: "Hmm! It’s too difficult."
      },
      {
        id: "daily-dialog-s1e09-20",
        english: "Do you remember where you last put them, Daddy Pig?"
      },
      {
        id: "daily-dialog-s1e09-21",
        english: "Peppa and George cannot find Daddy Pig’s glasses anywhere."
      },
      {
        id: "daily-dialog-s1e09-22",
        english: "When I don’t wear them, I always put them in my pocket. But they aren’t there now."
      },
      {
        id: "daily-dialog-s1e09-23",
        english: "We’ve looked everywhere. But we can’t find Daddy’s glasses."
      },
      {
        id: "daily-dialog-s1e09-24",
        english: "Daddy, can we help find your glasses?"
      },
      {
        id: "daily-dialog-s1e09-25",
        english: "Oh, dear. Now what can we do?"
      },
    ]
  },
  {
    id: "daily-dialog-peppa-s1-e10",
    title: "Peppa S1E10 · Gardening",
    items: [
      {
        id: "daily-dialog-s1e10-01",
        english: "Grandpa, Grandpa! I want to plant a seed."
      },
      {
        id: "daily-dialog-s1e10-02",
        english: "Would you like to plant a strawberry seed?"
      },
      {
        id: "daily-dialog-s1e10-03",
        english: "Yes, please."
      },
      {
        id: "daily-dialog-s1e10-04",
        english: "This seed will grow into a lovely strawberry plant."
      },
      {
        id: "daily-dialog-s1e10-05",
        english: "First, make a little hole."
      },
      {
        id: "daily-dialog-s1e10-06",
        english: "Then I put the seed in and cover it with earth."
      },
      {
        id: "daily-dialog-s1e10-07",
        english: "Shall I water it for you?"
      },
      {
        id: "daily-dialog-s1e10-08",
        english: "Peppa and George are playing at Granny Pig and Grandpa Pig’s house."
      },
      {
        id: "daily-dialog-s1e10-09",
        english: "No, no! I want to water it."
      },
      {
        id: "daily-dialog-s1e10-10",
        english: "Grandpa, catch."
      },
      {
        id: "daily-dialog-s1e10-11",
        english: "Good. Now we wait for it to grow."
      },
      {
        id: "daily-dialog-s1e10-12",
        english: "Ho ho ho ho. Catch."
      },
      {
        id: "daily-dialog-s1e10-13",
        english: "Peppa and George are waiting for the seed to grow."
      },
      {
        id: "daily-dialog-s1e10-14",
        english: "What’s this?"
      },
      {
        id: "daily-dialog-s1e10-15",
        english: "It’s not doing anything."
      },
      {
        id: "daily-dialog-s1e10-16",
        english: "Dinosaur. Grrr!"
      },
      {
        id: "daily-dialog-s1e10-17",
        english: "A dinosaur? Ho ho ho ho."
      },
      {
        id: "daily-dialog-s1e10-18",
        english: "Ho ho ho ho ho. You’ll have to be patient, Peppa. It will take a long time to grow."
      },
      {
        id: "daily-dialog-s1e10-19",
        english: "Grandpa, what are you doing?"
      },
      {
        id: "daily-dialog-s1e10-20",
        english: "Peppa! George! It’s time to go home."
      },
      {
        id: "daily-dialog-s1e10-21",
        english: "I’m planting these seeds."
      },
      {
        id: "daily-dialog-s1e10-22",
        english: "But we’re waiting for my strawberry plant to grow. I want these strawberries for tea."
      },
      {
        id: "daily-dialog-s1e10-23",
        english: "Seeds? What do seeds do?"
      },
      {
        id: "daily-dialog-s1e10-24",
        english: "Seeds grow into plants."
      },
      {
        id: "daily-dialog-s1e10-25",
        english: "Don’t worry, Peppa. Next time you come, the seed will have grown into a plant."
      },
      {
        id: "daily-dialog-s1e10-26",
        english: "I just make a little hole and put the seed in. Then I cover it with earth and water it."
      },
      {
        id: "daily-dialog-s1e10-27",
        english: "And we will have strawberries!"
      },
      {
        id: "daily-dialog-s1e10-28",
        english: "Everything in my garden grows from tiny seeds like these."
      },
      {
        id: "daily-dialog-s1e10-29",
        english: "Yes."
      },
      {
        id: "daily-dialog-s1e10-30",
        english: "Even the big apple tree?"
      },
      {
        id: "daily-dialog-s1e10-31",
        english: "Bye bye, Grandpa. Bye bye, strawberry."
      },
      {
        id: "daily-dialog-s1e10-32",
        english: "Oh, yes. This tiny seed will grow into a little apple tree, like this."
      },
      {
        id: "daily-dialog-s1e10-33",
        english: "Grandpa Pig looks after Peppa’s strawberry plant. After many days, Grandpa Pig finds a tiny plant growing. Day by day, the plant grows bigger and bigger. Then one day, Grandpa Pig finds something very special."
      },
      {
        id: "daily-dialog-s1e10-34",
        english: "Come on, Peppa."
      },
    ]
  },
];

export const practiceCategories: SourceCategory[] = [
  {
    id: "famous-quotes",
    name: "名人名言",
    description: "按每 10 条一句练习，点击中文可听英文发音。",
    units: chunkIntoUnits("famous-quotes", "Quotes Unit", famousQuotesLines)
  },
  {
    id: "daily-dialog",
    name: "生活对话",
    description: "小猪佩奇第一季前 10 节（每节按 PDF 自上而下、从左到右顺序显示）",
    units: peppaSeason1Units
  },
  {
    id: "interview-sentences",
    name: "面试句子",
    description: "预留分类：后续可直接追加句子并自动按单元拆分。",
    units: []
  }
];

export function buildLessons(): Lesson[] {
  const lessons: Lesson[] = [];
  let lessonNumber = 1;

  practiceCategories.forEach((category) => {
    category.units.forEach((unit) => {
      lessons.push({
        number: lessonNumber,
        title: unit.title,
        titleZh: `${category.name} · 第${lessonNumber}课`,
        questionEn: "Please translate the following sentences into English.",
        questionZh: "请把下列中文翻译成英文。",
        kindTag: category.id,
        items: unit.items.map((item) => ({
          id: item.id,
          english: item.english,
          speakerZh: "",
          speakerEn: ""
        }))
      });
      lessonNumber += 1;
    });
  });

  return lessons;
}
