/**
 * Poem data store.
 * To add a new poem, append an object to POEMS with:
 *   title, author, category, painting, artist, image, body
 * The layout auto-generates rows for any count.
 */

const GETTY = 'https://www.getty.edu/tracingart/images/getty/';
const GETTY_SECTION = 'https://www.getty.edu/tracingart/images/';

const POEMS = [
  {
    title: "The Road Not Taken",
    author: "Robert Frost",
    category: "Reflection",
    painting: "The Drawing Lesson",
    artist: "Getty Collection",
    image: GETTY + "intro/The-Drawing-Lesson@lg.webp",
    body: [
      "Two roads diverged in a yellow wood,\nAnd sorry I could not travel both\nAnd be one traveler, long I stood\nAnd looked down one as far as I could\nTo where it bent in the undergrowth;",
      "Then took the other, as just as fair,\nAnd having perhaps the better claim,\nBecause it was grassy and wanted wear;\nThough as for that the passing there\nHad worn them really about the same,",
      "And both that morning equally lay\nIn leaves no step had trodden black.\nOh, I kept the first for another day!\nYet knowing how way leads on to way,\nI doubted if I should ever come back.",
      "I shall be telling this with a sigh\nSomewhere ages and ages hence:\nTwo roads diverged in a wood, and I\u2014\nI took the one less traveled by,\nAnd that has made all the difference."
    ]
  },
  {
    title: "Ozymandias",
    author: "Percy Bysshe Shelley",
    category: "Time",
    painting: "The Adoration of the Magi",
    artist: "Getty Collection",
    image: GETTY + "still-life/The-Adoration-of-the-Magi@lg.webp",
    body: [
      "I met a traveller from an antique land,\nWho said\u2014\u201CTwo vast and trunkless legs of stone\nStand in the desert. . . . Near them, on the sand,\nHalf sunk a shattered visage lies, whose frown,\nAnd wrinkled lip, and sneer of cold command,\nTell that its sculptor well those passions read\nWhich yet survive, stamped on these lifeless things,\nThe hand that mocked them, and the heart that fed;",
      "And on the pedestal, these words appear:\nMy name is Ozymandias, King of Kings;\nLook on my Works, ye Mighty, and despair!\nNothing beside remains. Round the decay\nOf that colossal Wreck, boundless and bare\nThe lone and level sands stretch far away.\u201D"
    ]
  },
  {
    title: "Invictus",
    author: "William Ernest Henley",
    category: "Courage",
    painting: "The Grand Canal in Venice",
    artist: "Getty Collection",
    image: GETTY + "still-life/The-Grand-Canal-in-Venice-from-Palazzo@lg.webp",
    body: [
      "Out of the night that covers me,\nBlack as the pit from pole to pole,\nI thank whatever gods may be\nFor my unconquerable soul.",
      "In the fell clutch of circumstance\nI have not winced nor cried aloud.\nUnder the bludgeonings of chance\nMy head is bloody, but unbowed.",
      "Beyond this place of wrath and tears\nLooms but the Horror of the shade,\nAnd yet the menace of the years\nFinds and shall find me unafraid.",
      "It matters not how strait the gate,\nHow charged with punishments the scroll,\nI am the master of my fate,\nI am the captain of my soul."
    ]
  },
  {
    title: "The Tyger",
    author: "William Blake",
    category: "Wonder",
    painting: "The Bird Catchers",
    artist: "Getty Collection",
    image: GETTY + "still-life/The-Bird-Catchers@lg.webp",
    body: [
      "Tyger Tyger, burning bright,\nIn the forests of the night;\nWhat immortal hand or eye,\nCould frame thy fearful symmetry?",
      "In what distant deeps or skies,\nBurnt the fire of thine eyes?\nOn what wings dare he aspire?\nWhat the hand, dare seize the fire?",
      "And what shoulder, & what art,\nCould twist the sinews of thy heart?\nAnd when thy heart began to beat,\nWhat dread hand? & what dread feet?",
      "What the hammer? what the chain,\nIn what furnace was thy brain?\nWhat the anvil? what dread grasp,\nDare its deadly terrors clasp!",
      "When the stars threw down their spears\nAnd water'd heaven with their tears:\nDid he smile his work to see?\nDid he who made the Lamb make thee?",
      "Tyger Tyger burning bright,\nIn the forests of the night:\nWhat immortal hand or eye,\nDare frame thy fearful symmetry?"
    ]
  },
  {
    title: "Daffodils",
    author: "William Wordsworth",
    category: "Nature",
    painting: "Irises at Yatsuhashi",
    artist: "Getty Collection",
    image: GETTY + "still-life/Irises-at-Yatsuhashi@lg.webp",
    body: [
      "I wandered lonely as a cloud\nThat floats on high o'er vales and hills,\nWhen all at once I saw a crowd,\nA host, of golden daffodils;\nBeside the lake, beneath the trees,\nFluttering and dancing in the breeze.",
      "Continuous as the stars that shine\nAnd twinkle on the milky way,\nThey stretched in never-ending line\nAlong the margin of a bay:\nTen thousand saw I at a glance,\nTossing their heads in sprightly dance.",
      "The waves beside them danced; but they\nOut-did the sparkling waves in glee:\nA poet could not but be gay,\nIn such a jocund company:\nI gazed\u2014and gazed\u2014but little thought\nWhat wealth the show to me had brought:",
      "For oft, when on my couch I lie\nIn vacant or in pensive mood,\nThey flash upon that inward eye\nWhich is the bliss of solitude;\nAnd then my heart with pleasure fills,\nAnd dances with the daffodils."
    ]
  },
  {
    title: "Sonnet 18",
    author: "William Shakespeare",
    category: "Love",
    painting: "Vicomtesse de Vaudreuil",
    artist: "Getty Collection",
    image: GETTY + "intro/The-Vicomtesse-de-Vaudreuil@lg.webp",
    body: [
      "Shall I compare thee to a summer's day?\nThou art more lovely and more temperate:\nRough winds do shake the darling buds of May,\nAnd summer's lease hath all too short a date;",
      "Sometime too hot the eye of heaven shines,\nAnd often is his gold complexion dimm'd;\nAnd every fair from fair sometime declines,\nBy chance or nature's changing course untrimm'd;",
      "But thy eternal summer shall not fade,\nNor lose possession of that fair thou ow'st;\nNor shall death brag thou wander'st in his shade,\nWhen in eternal lines to time thou grow'st:",
      "So long as men can breathe or eyes can see,\nSo long lives this, and this gives life to thee."
    ]
  },
  {
    title: "Fire and Ice",
    author: "Robert Frost",
    category: "Desire",
    painting: "Amsterdam Harbor Scene",
    artist: "Getty Collection",
    image: GETTY + "still-life/amsterdam_harbor_scene_2011.3.1@lg.webp",
    body: [
      "Some say the world will end in fire,\nSome say in ice.\nFrom what I\u2019ve tasted of desire\nI hold with those who favor fire.",
      "But if it had to perish twice,\nI think I know enough of hate\nTo say that for destruction ice\nIs also great\nAnd would suffice."
    ]
  },
  {
    title: "A Dream Within A Dream",
    author: "Edgar Allan Poe",
    category: "Mystery",
    painting: "View of the Grand Canal",
    artist: "Getty Collection",
    image: GETTY + "intro/View-of-the-Grand-Canal@lg.webp",
    body: [
      "Take this kiss upon the brow!\nAnd, in parting from you now,\nThus much let me avow \u2014\nYou are not wrong, who deem\nThat my days have been a dream;\nYet if hope has flown away\nIn a night, or in a day,\nIn a vision, or in none,\nIs it therefore the less gone?\nAll that we see or seem\nIs but a dream within a dream.",
      "I stand amid the roar\nOf a surf-tormented shore,\nAnd I hold within my hand\nGrains of the golden sand \u2014\nHow few! yet how they creep\nThrough my fingers to the deep,\nWhile I weep \u2014 while I weep!\nO God! Can I not grasp\nThem with a tighter clasp?\nO God! can I not save\nOne from the pitiless wave?\nIs all that we see or seem\nBut a dream within a dream?"
    ]
  },
  {
    title: "Hope is the thing with feathers",
    author: "Emily Dickinson",
    category: "Hope",
    painting: "Madonna of the Cherries",
    artist: "Getty Collection",
    image: GETTY + "intro/Madonna-of-the-Cherries@lg.webp",
    body: [
      "\u201CHope\u201D is the thing with feathers \u2014\nThat perches in the soul \u2014\nAnd sings the tune without the words \u2014\nAnd never stops \u2014 at all \u2014",
      "And sweetest \u2014 in the Gale \u2014 is heard \u2014\nAnd sore must be the storm \u2014\nThat could abash the little Bird\nThat kept so many warm \u2014",
      "I\u2019ve heard it in the chillest land \u2014\nAnd on the strangest Sea \u2014\nYet \u2014 never \u2014 in Extremity,\nIt asked a crumb \u2014 of me."
    ]
  },
  {
    title: "Annabel Lee",
    author: "Edgar Allan Poe",
    category: "Devotion",
    painting: "Portrait of Sisters",
    artist: "Getty Collection",
    image: GETTY + "still-life/Portrait-of-Sisters-Zenaide-and-Charlotte-Bonaparte@lg.webp",
    body: [
      "It was many and many a year ago,\nIn a kingdom by the sea,\nThat a maiden there lived whom you may know\nBy the name of Annabel Lee;\nAnd this maiden she lived with no other thought\nThan to love and be loved by me.",
      "I was a child and she was a child,\nIn this kingdom by the sea,\nBut we loved with a love that was more than love\u2014\nI and my Annabel Lee\u2014\nWith a love that the wing\u00e8d seraphs of Heaven\nCoveted her and me.",
      "And this was the reason that, long ago,\nIn this kingdom by the sea,\nA wind blew out of a cloud, chilling\nMy beautiful Annabel Lee;\nSo that her highborn kinsmen came\nAnd bore her away from me,\nTo shut her up in a sepulchre\nIn this kingdom by the sea."
    ]
  },
  {
    title: "Stopping by Woods on a Snowy Evening",
    author: "Robert Frost",
    category: "Solitude",
    painting: "Bouquet of Flowers in a Vase",
    artist: "Getty Collection",
    image: GETTY + "still-life/Bouquet-of-Flowers-in-a-Vase@lg.webp",
    body: [
      "Whose woods these are I think I know.\nHis house is in the village though;\nHe will not see me stopping here\nTo watch his woods fill up with snow.",
      "My little horse must think it queer\nTo stop without a farmhouse near\nBetween the woods and frozen lake\nThe darkest evening of the year.",
      "He gives his harness bells a shake\nTo ask if there is some mistake.\nThe only other sound\u2019s the sweep\nOf easy wind and downy flake.",
      "The woods are lovely, dark and deep,\nBut I have promises to keep,\nAnd miles to go before I sleep,\nAnd miles to go before I sleep."
    ]
  },
  {
    title: "If\u2014",
    author: "Rudyard Kipling",
    category: "Wisdom",
    painting: "Study of the Model Joseph",
    artist: "Getty Collection",
    image: GETTY + "intro/Study-of-the-Model-Joseph@lg.webp",
    body: [
      "If you can keep your head when all about you\nAre losing theirs and blaming it on you,\nIf you can trust yourself when all men doubt you,\nBut make allowance for their doubting too;",
      "If you can wait and not be tired by waiting,\nOr being lied about, don\u2019t deal in lies,\nOr being hated, don\u2019t give way to hating,\nAnd yet don\u2019t look too good, nor talk too wise:",
      "If you can dream\u2014and not make dreams your master;\nIf you can think\u2014and not make thoughts your aim;\nIf you can meet with Triumph and Disaster\nAnd treat those two impostors just the same;",
      "Yours is the Earth and everything that\u2019s in it,\nAnd\u2014which is more\u2014you\u2019ll be a Man, my son!"
    ]
  }
];

// Extra Getty images for hero floating art and backgrounds
const HERO_ARTS = [
  GETTY + "intro/Still-Life-with-Apples@lg.webp",
  GETTY + "still-life/Family-Group-in-an-Interior@lg.webp",
  GETTY + "intro/The-Italian-Comedians@lg.webp",
  GETTY + "still-life/Portrait-of-LouisXIV@lg.webp",
  GETTY + "intro/Peacock-table-lamp@lg.webp",
  GETTY + "still-life/Man-with-a-Hoe@lg.webp",
  GETTY + "still-life/The-Contest-for-the-Bouquet@lg.webp",
  GETTY + "still-life/Portrait-of-Madame-Brunet@lg.webp",
];

const HERO_BACKGROUNDS = [
  GETTY_SECTION + "section-1/zoom-img@lg.webp",
  GETTY_SECTION + "section-2/zoom-img@lg.webp",
  GETTY_SECTION + "section-2/transaction-2-img-1@lg.webp",
  GETTY_SECTION + "section-2/transaction-1@lg.webp",
];
