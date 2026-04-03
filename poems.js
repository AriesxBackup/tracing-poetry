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
    title: "ꯂꯣꯟꯊꯣꯛꯇꯕ ꯄꯥꯃꯦꯜ",
    author: "Lan Chungkham",
    category: "ꯋꯥꯈꯜ",
    painting: "The Drawing Lesson",
    artist: "Lan Collection",
    image: GETTY + "intro/The-Drawing-Lesson@lg.webp",
    body: [
      "lonthoktaba paamel,\nkhonjel thoktaba waakhal\nahaangba maalang,\nningtamba wakhal gee taibang",
      "phouna gee jagoi,\nkhorjei gee sathek,\nleppa naidana chelliba turel gee echel,\nathingba leitana chelliba wakhal gee echel\nangouba chebaangsing asida"
    ]
  },
  {
    title: "ꯋꯥꯈꯜꯒꯤ ꯅꯣꯡꯂꯩ",
    author: "Lan Chungkham",
    category: "ꯃꯤꯅꯨꯡꯁꯤ",
    painting: "The Adoration of the Magi",
    artist: "Lan Collection",
    image: GETTY + "still-life/The-Adoration-of-the-Magi@lg.webp",
    body: [
      "maikei khangdana humlakpa\nkallaba nonglei nungshitna humdokpiraba",
      "paanggal yaodraba akangba singnaanggum\nminungshi yaodana humdatpiraba\nthotla wakhal gee sakudaba leikol"
    ]
  },
  {
    title: " ꯄꯨꯟꯁꯤ ꯑꯃ",
    author: "Lan Chungkham",
    category: "ꯇꯥꯏꯕꯥꯡ",
    painting: "The Grand Canal in Venice",
    artist: "Lan Collection",
    image: GETTY + "still-life/The-Grand-Canal-in-Venice-from-Palazzo@lg.webp",
    body: [
      "oidaba wahei sasinnaba saklon kayana\nmachu sangjinkhraba taibang gee mami:",
      "waheina hoo chenba khoihee\nsaklonna waarakki tayaal angaangba,\nmachatni taibang meeoiba kayagee"
    ]
  },
  {
    title: "ꯑꯃꯟꯕ ꯃꯤꯍꯨꯠꯊꯣꯡ",
    author: "Lan Chungkham",
    category: "ꯅꯨꯃꯤꯠ",
    painting: "The Bird Catchers",
    artist: "Lan Collection",
    image: GETTY + "still-life/The-Bird-Catchers@lg.webp",
    body: [
      "amanba meehutthongni haiduna\nnumit ki mangaal di changlaktabrane?",
      "lairaba gee thongnaoni haiduna\nthabal gee mangaal na nongmata\ntheiduna chatkhibrane?",
      "mallaba fijol adu makhoisu\nhanjin-hanjin setningamgadrane?\nlairaba gee punshi di punshi nattabrane?"
    ]
  },
  {
    title: "ꯇꯨꯔꯦꯜ ꯑꯗꯨꯒꯤ ꯇꯣꯔꯕꯟ",
    author: "Lan Chungkham",
    category: "ꯅꯋꯥ",
    painting: "Irises at Yatsuhashi",
    artist: "Lan Collection",
    image: GETTY + "still-life/Irises-at-Yatsuhashi@lg.webp",
    body: [
      "turel adugi torban da sannariba\nnawa makhoi gisu leiramgani\nmakhoi gee oiba tongaanba manglaan kaya\nturel adumaktada kumduna",
      "leingoi pekliba sinmee makhoigisu leiramgani\nmakhoi gee oiba tangaifadaba thoudaang kaya"
    ]
  },
  {
    title: "ꯋꯥꯈꯜꯒꯤ ꯏꯔꯩꯗ",
    author: "Lan Chungkham",
    category: "ꯀꯥꯎꯁꯤꯡ",
    painting: "Vicomtesse de Vaudreuil",
    artist: "Lan Collection",
    image: GETTY + "intro/The-Vicomtesse-de-Vaudreuil@lg.webp",
    body: [
      "wakhal gee ereida taotharakpa\nkaoshing mapei sing adugi panthungfam khara:",
      "lupkhini wakhal gee erolnungda\ntaoduna asum chatkhini\nmaangkhini erei aduna lepkhibada\nadumoinamak leihouwi",
      "kaoshing mapei khara di\nseireng gee echel amada tinduna"
    ]
  },
  {
    title: "ꯄꯨꯟꯁꯤ ꯑꯃꯥ: ꯃꯥꯡꯂꯥꯟ",
    author: "Lan Chungkham",
    category: "ꯄꯨꯟꯁꯤ",
    painting: "Amsterdam Harbor Scene",
    artist: "Lan Collection",
    image: GETTY + "still-life/amsterdam_harbor_scene_2011.3.1@lg.webp",
    body: [
      "punshi ama:\nmanglaan kaya,\naningba kaya,\nkhanjaba kaya,",
      "punshi ama:\nmangfaonadaba kaya,\nningba kaiba kaya,\ntaionnaba kaya,"
    ]
  },
  {
    title: "ꯄꯨꯟꯁꯤ ꯑꯃꯥ: ꯊꯖꯕ",
    author: "Lan Chungkham",
    category: "ꯁꯩꯔꯦꯡ",
    painting: "View of the Grand Canal",
    artist: "Lan Collection",
    image: GETTY + "intro/View-of-the-Grand-Canal@lg.webp",
    body: [
      "punshi ama:\nthajaba kaya,\nhongba naidaba kaya,\nwakhal kaya",
      "punshi ama:\nthajarudaba kaya,\nahongba kaya,\nseireng kaya"
    ]
  },
  {
    title: "ꯋꯥꯈꯜ ꯅꯪꯕꯨ",
    author: "Lan Chungkham",
    category: "ꯉꯥꯢꯍꯥꯛꯇ",
    painting: "Madonna of the Cherries",
    artist: "Lan Collection",
    image: GETTY + "intro/Madonna-of-the-Cherries@lg.webp",
    body: [
      "wakhal nangbu ngaihakta pothakho\nkhallukhinu hayeng gisu\nningsingluranu ngarang dusu",
      "ngasi haiba ngasi se\nchatkhisanu makaa laamna\nwakhal nangbu ngaihakta pothakho"
    ]
  },
  {
    title: "ꯃꯪꯂꯥꯟ ꯄꯔꯤꯡ ꯂꯩꯇꯕ",
    author: "Lan Chungkham",
    category: "ꯃꯥꯡꯂꯥꯟ",
    painting: "Portrait of Sisters",
    artist: "Lan Collection",
    image: GETTY + "still-life/Portrait-of-Sisters-Zenaide-and-Charlotte-Bonaparte@lg.webp",
    body: [
      "paring leitaba wakhal gee epaak adugi\nerolnungda lottuna leiriba\nmanglaan kaya, wari kaya, wakhallon kaya"
    ]
  },
  {
    title: "ꯃꯤꯑꯣꯢꯕꯒꯤ ꯋꯥꯈꯜꯅ",
    author: "Lan Chungkham",
    category: "ꯄꯨꯟꯁꯤ",
    painting: "Bouquet of Flowers in a Vase",
    artist: "Lan Collection",
    image: GETTY + "still-life/Bouquet-of-Flowers-in-a-Vase@lg.webp",
    body: [
      "meeoiba gee wakhalna lamba fangdaba\npunshigi wahanthok khara su",
      "lottuna leiramkhigani\nmaalangda, erolnungda\natiyada, leichil lakta"
    ]
  },
  {
    title: "ꯄꯨꯟꯁꯤꯒꯤ ꯁꯛꯇꯥꯛꯋꯥ",
    author: "Lan Chungkham",
    category: "ꯋꯥꯍꯟꯊꯣꯛ",
    painting: "Study of the Model Joseph",
    artist: "Lan Collection",
    image: GETTY + "intro/Study-of-the-Model-Joseph@lg.webp",
    body: [
      "punshi gi saktaakwaa kayagi\nwahanthok kaya ama\nwahanthok sing adugisu\nwahanthok khara,",
      "tapna-tapna oihallakee\nwahanthokna thallaba meeoibagi punshi"
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
