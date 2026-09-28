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
        english: "Guess what we’ve been doing."
      },
      {
        id: "daily-dialog-s1e01-02",
        english: "Let me think..."
      },
      {
        id: "daily-dialog-s1e01-03",
        english: "It is raining today. So Peppa and George cannot play outside."
      },
      {
        id: "daily-dialog-s1e01-04",
        english: "Daddy, it’s stopped raining."
      },
      {
        id: "daily-dialog-s1e01-05",
        english: "Can we go out to play?"
      },
      {
        id: "daily-dialog-s1e01-06",
        english: "All right, run along you two."
      },
      {
        id: "daily-dialog-s1e01-07",
        english: "Peppa loves jumping in muddy puddles."
      },
      {
        id: "daily-dialog-s1e01-08",
        english: "I love muddy puddles."
      },
      {
        id: "daily-dialog-s1e01-09",
        english: "Peppa! If you jump in muddy puddles, you must wear your boots."
      },
      {
        id: "daily-dialog-s1e01-10",
        english: "Sorry, Mummy."
      },
      {
        id: "daily-dialog-s1e01-11",
        english: "George likes to jump in muddy puddles, too."
      },
      {
        id: "daily-dialog-s1e01-12",
        english: "George. If you jump in muddy puddles, you must wear your boots."
      }
    ]
  },
  {
    id: "daily-dialog-peppa-s1-e02",
    title: "Peppa S1E02 · Mr Dinosaur is Lost",
    items: [
      {
        id: "daily-dialog-s1e02-01",
        english: "George has lost Mr Dinosaur."
      },
      {
        id: "daily-dialog-s1e02-02",
        english: "Don’t worry, George. We’ll find Mr Dinosaur."
      },
      {
        id: "daily-dialog-s1e02-03",
        english: "It’s a job for a detective."
      },
      {
        id: "daily-dialog-s1e02-04",
        english: "Daddy, what is a detective?"
      },
      {
        id: "daily-dialog-s1e02-05",
        english: "I beg your pardon."
      },
      {
        id: "daily-dialog-s1e02-06",
        english: "A detective is a very important person who is good at finding things."
      },
      {
        id: "daily-dialog-s1e02-07",
        english: "Was that you George, or was it Mr Dinosaur?"
      },
      {
        id: "daily-dialog-s1e02-08",
        english: "Me! Me! I’m good at finding things."
      },
      {
        id: "daily-dialog-s1e02-09",
        english: "Dinosaur!"
      },
      {
        id: "daily-dialog-s1e02-10",
        english: "All right. Peppa is the detective."
      },
      {
        id: "daily-dialog-s1e02-11",
        english: "At bath time, George shares his bath with Mr Dinosaur."
      },
      {
        id: "daily-dialog-s1e02-12",
        english: "George. I am the detective. I will help you find Mr Dinosaur."
      }
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
      }
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
      }
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
      }
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
      }
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
      }
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
      }
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
      }
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
      }
    ]
  }
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
    description: "小猪佩奇第一季前 10 节（每节 12 句）",
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
