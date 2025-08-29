# Adrian Marino — Minimalist Data Science Portfolio

A high-end, brutal-minimal React + Tailwind portfolio scaffold. All copy, projects, and images are placeholders so you can swap your own content.

## Local setup

```bash
npm i
npm run dev
```

Then open the local URL printed in your terminal.

## Where to edit

- **src/App.jsx** — All sections (Hello, Skills, Projects, Awards, Education, About, Contact)
- **Projects**: edit the `projects` array at the top of `App.jsx` (title, summary, links). To show images, replace the gray rectangle in `ProjectCard` with an `<img>`:
  ```jsx
  <img src="/your-image.jpg" alt="Project preview" className="aspect-[4/3] object-cover border border-neutral-300" />
  ```
  Put images into `public/` and reference them like `/my-image.jpg`.
- **Hello**: replace the two gray rectangles with your photos:
  ```jsx
  <img src="/me.jpg" className="w-80 md:w-96 aspect-[3/2] object-cover border border-neutral-300" />
  <img src="/dog.jpg" className="absolute -bottom-6 -right-8 w-40 md:w-48 aspect-[3/2] object-cover border border-neutral-300" />
  ```
- **Fonts**: currently set to `monospace`. If you want **Alloca Mono** or **OCR-B** equivalents, swap the body font in `src/index.css` with your chosen webfont (self-host) and keep the minimalist metrics.
- **Colors & spacing**: Tailwind utility classes in-place; keep it stark.

## Notes

- The underline progress bar under the header fills as you scroll (0 → 100%).
- Sections reveal subtly on scroll.
- Header links (Skills, Projects, Awards, Education, About, Contact) smooth-scroll to sections.

## Deploy

Any static host works (Vercel, Netlify, GitHub Pages):
```bash
npm run build
# deploy the dist/ folder
```
