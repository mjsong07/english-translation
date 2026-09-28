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
    description: "预留分类：后续可直接追加句子并自动按单元拆分。",
    units: []
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
