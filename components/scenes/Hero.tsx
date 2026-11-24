import { profile } from "@/data/profile";

const GITHUB = profile.socials.find((social) => social.label === "GitHub");
const LINKEDIN = profile.socials.find((social) => social.label === "LinkedIn");
const WHATSAPP = profile.socials.find((social) => social.label === "WhatsApp");

export function Hero() {
  return (
    <section id="hero" className="scene scene--hero" aria-labelledby="hero-title">
      <div className="hero-ui-top">
        <p className="hero-intro-label">
          <span>BACKEND &amp; FULLSTACK</span>
          <span className="accent">SOFTWARE ENGINEER</span>
        </p>
        <p className="hero-availability">
          <span className="square" aria-hidden="true" />
          AVAILABLE FOR NEW PROJECTS
        </p>
      </div>

      <div className="hero-visual" data-hero-visual aria-hidden="true">
        <span className="hero-word" data-hero-word>
          <span className="hero-word-inner">{profile.heroWord}</span>
        </span>

        {/* TODO(asset): replace with a 1600x2000 transparent cutout when available. */}
        <div className="hero-photo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero-kevin.webp"
            srcSet="/images/hero-kevin-sm.webp 432w, /images/hero-kevin.webp 864w"
            sizes="(max-width: 639px) 78vw, (max-width: 1023px) 56vw, 52vw"
            width={864}
            height={1156}
            alt="Potret Mohammad Kevin Arif Rudianto"
            fetchPriority="high"
            decoding="async"
          />
        </div>
      </div>

      <div className="hero-ui">
        <div className="hero-ui-bottom">
          <div className="hero-copy">
            <p className="hero-hello">Hello, I&apos;m</p>
            <h1 className="hero-name" id="hero-title">
              {profile.displayName}
              <span className="hero-name-dot" aria-hidden="true" />
            </h1>
            <p className="hero-fullname">{profile.fullName}</p>
            <p className="hero-role">Backend &amp; Fullstack Engineer</p>
            <p className="hero-lede">
              Backend &amp; Fullstack Developer building reliable APIs, POS systems and
              digital archives.
            </p>

            <a className="btn btn-ink hero-cta" href="#work" data-goto="work">
              View selected work <span aria-hidden="true">↓</span>
            </a>

            <p className="hero-location">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z" />
                <rect x="9.5" y="8" width="5" height="5" />
              </svg>
              MALANG, INDONESIA
            </p>
          </div>

          <div className="hero-stats">
            <ul>
              {profile.stats.map((stat) => (
                <li key={stat.label}>
                  <b data-count={stat.value} data-pad={stat.value === "07" ? 2 : 0}>
                    {stat.value}
                  </b>
                  <span>{stat.label.toUpperCase()}</span>
                  <i className="sr-only">{stat.detail}</i>
                </li>
              ))}
            </ul>
            <a
              className="hero-cv"
              href={profile.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              ↓ DOWNLOAD CV
            </a>
          </div>
        </div>

        <div className="hero-bar">
          <p className="hero-socials">
            {[GITHUB, LINKEDIN, WHATSAPP].map((social, index) =>
              social ? (
                <span key={social.label}>
                  {index > 0 ? (
                    <i className="hero-bar-dot" aria-hidden="true">
                      .
                    </i>
                  ) : null}
                  <a href={social.url} target="_blank" rel="noopener noreferrer">
                    {social.label.toUpperCase()}
                  </a>
                </span>
              ) : null,
            )}
          </p>
          <a className="hero-scroll" href="#about" data-goto="about">
            SCROLL TO DISCOVER <span aria-hidden="true">↓</span>
          </a>
          <p className="hero-selected">SELECTED WORK / 2024–2026</p>
        </div>
      </div>
    </section>
  );
}
