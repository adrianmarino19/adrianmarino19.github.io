import { useEffect, useRef, useState } from 'react'

// Simple reveal-on-scroll wrapper (optional delay for staggering)
function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(8px)',
        transition: 'opacity 600ms ease, transform 600ms ease',
        transitionDelay: visible ? '0ms' : `${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
}

export default function App() {
  const year = new Date().getFullYear();
  const [progress, setProgress] = useState(0); // 0..1

  const projects = [
    { id: 1, title: "Demand Forecasting — Retail", summary: "Weekly SKU sales forecasting and deployment (placeholder).", links: [{ label: "GitHub repo", href: "#" }, { label: "Deployed app", href: "#" }] },
    { id: 2, title: "Fraud Signals — Payments", summary: "Surface card-present anomalies using aggregated graph features (placeholder).", links: [{ label: "GitHub repo", href: "#" }, { label: "Case study", href: "#" }] },
    { id: 3, title: "Churn Propensity — Telco", summary: "Retention modeling and uplift testing (placeholder).", links: [{ label: "GitHub repo", href: "#" }, { label: "Deployed app", href: "#" }] },
    { id: 4, title: "NLP Insights — Job Market", summary: "Extract skills from job descriptions (LinkedIn Helper, placeholder).", links: [{ label: "GitHub repo", href: "#" }, { label: "Case study", href: "#" }] },
    { id: 5, title: "Shelf Vision — CPG", summary: "Detect OOS and planogram compliance at the shelf (placeholder).", links: [{ label: "GitHub repo", href: "#" }, { label: "Demo", href: "#" }] },
    { id: 6, title: "Customer 360 — Retail", summary: "Personas and LTV modeling (placeholder).", links: [{ label: "GitHub repo", href: "#" }, { label: "Case study", href: "#" }] }
  ];

  const awards = [
    { id: 1, title: "AWS Certified Cloud Practitioner (placeholder)" },
    { id: 2, title: "TensorFlow Developer Certificate (placeholder)" },
    { id: 3, title: "Tableau Desktop Specialist (placeholder)" },
  ];

  const experiences = [
    { year: '2024', role: 'Senior Data Scientist', org: 'Techcorp Inc', blurb: 'Leading ML initiatives for predictive analytics platform serving 10M+ users' },
    { year: '2022', role: 'Data Scientist', org: 'Startup X', blurb: 'Built recommendation system increasing user engagement by 45%' },
    { year: '2020', role: 'Data Analyst', org: 'Consulting Firm', blurb: 'Developed automated reporting systems for Fortune 500 clients' },
  ];

  // Scroll progress underline under the header nav (fills with width%)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onScrollOrResize = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      const scrolled = Math.max(0, Math.min(total, window.scrollY));
      const p = total > 0 ? scrolled / total : 0;
      setProgress(p);
    };
    onScrollOrResize();
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);
    return () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900" style={{ fontFamily: "monospace" }}>
      <Header progress={progress} />

      <main className="px-5 sm:px-8">
        <Reveal><Hello /></Reveal>
        <Reveal><Skills /></Reveal>
        {/* Staggered cards for grids */}
        <section><ProjectsGrid projects={projects} /></section>
        <section><AwardsGrid awards={awards} /></section>
        <Reveal><Education /></Reveal>
        <Reveal><About experiences={experiences} /></Reveal>
        <Reveal><Contact /></Reveal>
      </main>

      <Footer year={year} />
    </div>
  );
}

function Header({ progress }) {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200/80 bg-neutral-50/80 backdrop-blur">
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8 h-16 flex items-center justify-between">
        <a href="#top" className="text-sm tracking-widest uppercase">ADRIAN MARINO</a>
        <nav className="flex gap-6 text-sm">
          <a href="#skills" className="opacity-80 hover:opacity-100">skills</a>
          <a href="#projects" className="opacity-80 hover:opacity-100">projects</a>
          <a href="#awards" className="opacity-80 hover:opacity-100">awards</a>
          <a href="#education" className="opacity-80 hover:opacity-100">education</a>
          <a href="#about" className="opacity-80 hover:opacity-100">about</a>
          <a href="#contact" className="opacity-80 hover:opacity-100">contact</a>
        </nav>
        {/* Progress line: base track + filled bar */}
        <div className="pointer-events-none absolute left-5 right-5 -bottom-[2px] h-[2px]">
          <div className="absolute inset-0 bg-neutral-300/70" aria-hidden></div>
          <div className="h-[2px] bg-neutral-900" style={{ width: `${Math.round(progress * 100)}%` }} aria-hidden></div>
        </div>
      </div>
    </header>
  );
}

function Hello() {
  return (
    <section id="top" className="mx-auto max-w-6xl pt-20 pb-16 sm:pt-28 sm:pb-24 text-center">
      <h1 className="text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight">Hello, I am Adrian Marino</h1>
      <div className="mt-8 flex justify-center">
        <div className="relative inline-block">
          <div className="w-80 md:w-96 aspect-[3/2] bg-neutral-200 border border-neutral-300" />
          <div className="absolute -bottom-6 -right-8 w-40 md:w-48 aspect-[3/2] bg-neutral-200 border border-neutral-300" />
        </div>
      </div>
      <p className="mt-6 text-sm md:text-base leading-relaxed opacity-90">Filler text for now. Madrid · Available for select engagements. I build precise, efficient models and the lean systems around them. This is a living portfolio—content is placeholder while we nail the aesthetic.</p>
    </section>
  );
}

function ProjectsGrid({ projects }) {
  return (
    <section id="projects" className="mx-auto max-w-6xl py-16 sm:py-24 border-t border-neutral-200 scroll-mt-24">
      <div className="mb-6 flex items-end justify-between">
        <h2 className="text-xl tracking-widest uppercase">Projects</h2>
        <span className="text-xs opacity-70">+{projects.length} projects</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((p, i) => (
          <Reveal key={p.id} delay={i * 80}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>

      <a href="https://github.com/adrianmarino19" data-see-more="true" className="mt-10 block text-right text-xs opacity-70">see more here</a>
    </section>
  );
}

function ProjectCard({ project }) {
  return (
    <article className="space-y-2">
      <div className="aspect-[4/3] bg-neutral-200 border border-neutral-300" />
      <h3 className="text-sm leading-tight">{project.title}</h3>
      <p className="text-sm opacity-80">{project.summary}</p>
      <p className="text-sm">
        {project.links && project.links.map((lnk, idx) => (
          <span key={lnk.label}>
            <a href={lnk.href} className="underline text-blue-600">{lnk.label}</a>
            {idx < project.links.length - 1 ? " | " : ""}
          </span>
        ))}
      </p>
    </article>
  );
}

function AwardsGrid({ awards }) {
  return (
    <section id="awards" className="mx-auto max-w-6xl py-16 sm:py-24 border-t border-neutral-200 scroll-mt-24">
      <div className="mb-6 flex items-end justify-between">
        <h2 className="text-xl tracking-widest uppercase">Awards & Certifications</h2>
        <span className="text-xs opacity-70">{awards.length} Items</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {awards.map((a, i) => (
          <Reveal key={a.id} delay={i * 100}>
            <AwardCard award={a} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function AwardCard({ award }) {
  return (
    <article className="space-y-2">
      <div className="aspect-[4/3] bg-neutral-200 border border-neutral-300" />
      <h3 className="text-sm leading-tight">{award.title}</h3>
    </article>
  );
}

function Education() {
  return (
    <section id="education" className="mx-auto max-w-6xl py-16 sm:py-24 border-t border-neutral-200 scroll-mt-24">
      <h2 className="text-xl tracking-widest uppercase">Education</h2>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="rounded-2xl border border-neutral-200 bg-white p-5">
          <div className="text-sm">Bachelor of Science — Data Science</div>
          <div className="mt-2 text-sm opacity-80">University Name • 2021–2025 • City, Country</div>
        </div>
        <div className="rounded-2xl border border-neutral-200 bg-white p-5">
          <div className="text-sm">Master of Science — Machine Learning</div>
          <div className="mt-2 text-sm opacity-80">University Name • 2026–2028 • City, Country</div>
        </div>
      </div>
    </section>
  );
}

function About({ experiences }) {
  return (
    <section id="about" className="mx-auto max-w-6xl py-16 sm:py-24 border-t border-neutral-200 scroll-mt-24">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
        {/* Left: About text + info cards */}
        <div className="md:col-span-6">
          <h2 className="text-xl tracking-widest uppercase">About</h2>
          <p className="mt-4 text-base leading-relaxed opacity-90">
            I’m Adrian Marino, an aspiring data scientist focused on elegant, minimal solutions with measurable business impact. I value clarity, reproducibility, and high-end craft—both in models and in interfaces.
          </p>
          <p className="mt-4 text-base leading-relaxed opacity-90">
            This site is a style prototype. Copy is placeholder. Visual direction draws from luxury fashion minimalism and web brutalism: stark typography, generous spacing, grid discipline, and honest UI.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-5">
            <InfoCard label="Location" value="Madrid, Spain" />
            <InfoCard label="Status" value="Open to projects" />
            <InfoCard label="Focus" value="ML systems · Analytics" />
            <InfoCard label="Contact" value="hello@adrianmarino.dev" />
          </div>
        </div>

        {/* Right: Experience timeline */}
        <div className="md:col-span-6 md:pl-6">
          <h3 className="text-xl tracking-widest uppercase ml-4 md:ml-8 pl-5">Experience</h3>
          <ExperienceTimeline experiences={experiences} />
        </div>
      </div>
    </section>
  );
}

function ExperienceTimeline({ experiences }) {
  return (
    <div className="mt-4 ml-4 md:ml-8">
      {experiences.map((e, idx) => (
        <div key={`${e.year}-${e.role}`} className={`pb-8 ${idx !== experiences.length - 1 ? 'mb-6' : ''}`}>
          <div className="pl-5 border-l-2 border-neutral-700">
            <div className="inline-block bg-neutral-900 text-white px-2 py-1 text-[10px] tracking-widest uppercase">
              {e.year}
            </div>
            <div className="mt-3">
              <div className="text-sm font-semibold">{e.role}</div>
              <div className="text-sm opacity-80">{e.org}</div>
              <div className="mt-2 text-sm opacity-80">{e.blurb}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-4">
      <div className="text-[11px] uppercase tracking-widest opacity-60">{label}</div>
      <div className="mt-1 text-sm">{value}</div>
    </div>
  );
}

// Icons & IconLink (inline SVGs to avoid extra deps)
function IconGitHub({ className = "h-4 w-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.486 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.093.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.156-1.11-1.464-1.11-1.464-.908-.621.069-.608.069-.608 1.003.071 1.531 1.032 1.531 1.032.892 1.529 2.341 1.088 2.91.833.091-.647.35-1.088.636-1.338-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.271.098-2.65 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.338 1.909-1.295 2.748-1.026 2.748-1.026.546 1.379.202 2.397.1 2.65.64.7 1.027 1.595 1.027 2.688 0 3.849-2.338 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.744 0 .267.18.579.688.48A10.02 10.02 0 0 0 22 12.021C22 6.486 17.523 2 12 2z"/>
    </svg>
  );
}

function IconLinkedIn({ className = "h-4 w-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM.5 8h4v16h-4V8zm7 0 h3.8v2.2h.05c.53-1 1.85-2.2 3.8-2.2 4.06 0 4.8 2.67 4.8 6.15V24h-4v-7.1c0-1.69-.03-3.86-2.35-3.86-2.36 0-2.72 1.84-2.72 3.74V24h-4V8z"/>
    </svg>
  );
}

function IconMail({ className = "h-4 w-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M2 5h20v14H2V5zm10 7L4 7v12h16V7l-8 5z"/>
    </svg>
  );
}

function IconLink({ href, label, children }) {
  const external = href.startsWith('http');
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-900 hover:-translate-y-[1px] active:translate-y-0 transition-transform"
      aria-label={label}
      title={label}
    >
      <span className="sr-only">{label}</span>
      {children}
    </a>
  );
}

function Skills() {
  const categories = [
    { title: "Programming Languages", items: ["Python", "SQL"] },
    { title: "Libraries", items: ["NumPy", "Pandas", "scikit-learn", "XGBoost", "TensorFlow", "Seaborn", "spaCy", "LangChain"] },
    { title: "Tools", items: ["Git", "Bash/Zsh", "Tableau", "Google Cloud Platform"] },
    { title: "Languages", items: ["English (C2)", "Spanish (C1)"] },
  ];

  return (
    <section id="skills" className="mx-auto max-w-6xl py-16 sm:py-24 border-t border-neutral-200 scroll-mt-24">
      <h2 className="text-xl tracking-widest uppercase">Skills</h2>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {categories.map((c, i) => (
          <Reveal key={c.title} delay={i * 70}>
            <div className="rounded-2xl border border-neutral-200 bg-white p-5">
              {/* Fixed-height header ensures first list items align across cards */}
              <div className="h-12 flex flex-col justify-end">
                <div className="text-sm leading-snug break-words text-center">{c.title}</div>
                <div className="mt-2 h-px bg-neutral-200" />
              </div>
              <ul className="mt-3 space-y-2 text-sm opacity-90">
                {c.items.map((it) => (
                  <li key={it} className="flex items-center gap-2">
                    <span className="inline-block h-1 w-1 rounded-full bg-neutral-900" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl py-16 sm:py-24 border-t border-neutral-200 scroll-mt-24">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-end">
        <div className="md:col-span-8">
          <h2 className="text-xl tracking-widest uppercase">Let’s work</h2>
          <p className="mt-4 text-base opacity-90">
            For collaborations and project inquiries, send a brief with goals, constraints, and timeline. I’ll reply with next steps.
          </p>
        </div>
        <div className="md:col-span-4 md:text-right">
          <div className="flex md:justify-end gap-3">
            <IconLink href="https://github.com/adrianmarino19" label="GitHub">
              <IconGitHub />
            </IconLink>
            <IconLink href="https://www.linkedin.com/in/adrian-marino/" label="LinkedIn">
              <IconLinkedIn />
            </IconLink>
            <IconLink href="mailto:adrianmarino@alumni.ie.edu" label="Email">
              <IconMail />
            </IconLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ year }) {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 h-16 flex items-center justify-between text-xs">
        <div>© {year} Adrian Marino</div>
        <div className="opacity-70">Crafted with a brutal-minimal grid</div>
      </div>
    </footer>
  );
}
