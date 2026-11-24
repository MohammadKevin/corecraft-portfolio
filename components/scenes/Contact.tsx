import { profile } from "@/data/profile";
import { SCENES } from "@/lib/scenes";
import { SceneHead } from "./SceneHead";
import { ContactActions } from "./ContactActions";

const WHATSAPP = profile.socials.find((social) => social.label === "WhatsApp");
const GITHUB = profile.socials.find((social) => social.label === "GitHub");
const LINKEDIN = profile.socials.find((social) => social.label === "LinkedIn");

export function Contact() {
  return (
    <section id="contact" className="scene scene--contact" aria-labelledby="contact-title">
      <div className="scene-inner">
        <SceneHead id="contact" />

        <div className="contact-block">
          <h2 className="contact-heading" id="contact-title">
            Have a project in <em>mind?</em>
          </h2>
          <p className="body-muted contact-lede">
            Let&apos;s engineer something clear, resilient, and impactful together.
          </p>

          <a className="contact-email" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>

          <ContactActions />
        </div>

        <footer className="site-footer">
          <p>
            © 2026 {profile.fullName} · Built with Next.js 16 &amp; React 19
          </p>
          <nav aria-label="Footer">
            {[GITHUB, LINKEDIN, WHATSAPP].map((social) =>
              social ? (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.label}
                </a>
              ) : null,
            )}
            <a href="#hero" data-goto="hero">
              Back to top ↑
            </a>
            <span className="footer-index" aria-hidden="true">
              {SCENES[SCENES.length - 1].number} / 10
            </span>
          </nav>
        </footer>
      </div>
    </section>
  );
}
