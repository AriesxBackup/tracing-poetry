# Tracing Poetry

A curated poem library blending the Accordion Productions filmstrip intro with the Getty Tracing Art scattered gallery layout.

## Features

- Dark filmstrip preloader with 3D arc animation (Accordion-style)
- Dark hero with cycling Getty artwork backgrounds
- Getty-style white scattered collection with floating paintings, ghost placeholders, and editorial serif text
- Full-screen poem reader with painting hero banner and stanza animations
- GSAP-powered scroll animations and parallax throughout
- Auto-generated layout — supports any number of poems

## Adding Poems

Edit `poems.js` and add an object to the `POEMS` array:

```js
{
  title: "Your Poem Title",
  author: "Author Name",
  category: "Theme",
  painting: "Artwork Name",
  artist: "Artist, Year",
  image: "https://url-to-artwork-image.jpg",
  body: [
    "First stanza line 1\nLine 2\nLine 3",
    "Second stanza line 1\nLine 2"
  ]
}
```

The collection layout auto-generates rows for any number of poems.

## Local Development

```bash
python -m http.server 8080
# or
npx serve .
```

Open `http://localhost:8080`

## Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect this repo to Vercel via the dashboard — it will auto-detect the static site.

## File Structure

```
├── index.html          # Main HTML
├── styles.css          # All styles
├── poems.js            # Poem data (edit this to add poems)
├── script.js           # App logic, animations, layout
├── gsap.min.js         # GSAP animation library
├── ScrollTrigger.min.js # GSAP scroll plugin
├── package.json        # Project metadata
├── vercel.json         # Vercel deployment config
└── README.md
```

## Credits

- Artwork images from [Getty Tracing Art](https://www.getty.edu/tracingart/)
- Animations powered by [GSAP](https://greensock.com/gsap/)
- Typography: Cormorant Garamond + Outfit (Google Fonts)
