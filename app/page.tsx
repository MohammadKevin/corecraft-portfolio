"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import CorecraftLoader from "@/components/CorecraftLoader";
import SiteNav from "@/components/SiteNav";
import MotionRoot from "@/components/MotionRoot";
import ServicesAccordion from "@/components/ServicesAccordion";
import WorkList from "@/components/WorkList";
import ContactActions from "@/components/ContactActions";
import { getCopy, getLocalizedCertificates, getLocalizedProjects } from "@/lib/i18n";
import { useLanguage } from "@/lib/i18n";
import { profile } from "@/data/profile";

function SectionLabel({ number, label }: { number: string; label: string }) {
  return (
    <p className="label">
      {number} — {label}
    </p>
  );
}

export default function Home() {
  const { lang } = useLanguage();
  const copy = useMemo(() => getCopy(lang), [lang]);
  const projects = useMemo(
    () =>
      [...getLocalizedProjects(lang)].sort((a, b) => a.order - b.order),
    [lang]
  );
  const certificates = useMemo(() => getLocalizedCertificates(lang), [lang]);

  const credentialGroups = useMemo(() => {
    const map = new Map<string, typeof certificates>();
    certificates.forEach((cert) => {
      const bucket = map.get(cert.issuer) ?? [];
      bucket.push(cert);
      map.set(cert.issuer, bucket);
    });
    return Array.from(map.entries());
  }, [certificates]);

  return (
    <>
      <CorecraftLoader />
      <MotionRoot />
      <SiteNav />

      <main className="home">
        {/* 01 — HERO */}
        <section className="section hero" id="hero" aria-labelledby="hero-name">
          <div className="section-inner">
            <div className="hero-main">
              <p className="label hero-label">{copy.hero.label}</p>

              <h1 className="hero-name" id="hero-name" data-reveal>
                <span className="hero-line">
                  <span>{copy.hero.lineOne}</span>
                </span>
                <span className="hero-line">
                  <span className="accent">{copy.hero.lineTwo}</span>
                </span>
              </h1>

              <p className="hero-lede" data-reveal style={{ "--d": 1 } as React.CSSProperties}>
                {copy.hero.lede}
              </p>

              <div
                className="hero-actions"
                data-reveal
                style={{ "--d": 2 } as React.CSSProperties}
              >
                <a className="btn btn-ink" href="#contact">
                  {copy.hero.ctaPrimary} <span aria-hidden="true">↗</span>
                </a>
                <a className="btn btn-outline" href="#work">
                  {copy.hero.ctaSecondary}
                </a>
              </div>
            </div>
          </div>

          <div className="hero-meta">
            <p className="label">{copy.hero.location}</p>
            <p className="label">{copy.hero.scroll} ↓</p>
          </div>
        </section>

        {/* 02 — ABOUT */}
        <section className="section" id="about" aria-labelledby="about-title">
          <div className="section-inner">
            <div className="sec-head" data-reveal>
              <SectionLabel number="02" label={copy.about.label} />
              <h2 className="section-title" id="about-title">
                <span className="heading-line">
                  <span>
                    {copy.about.headingLead}{" "}
                    <em className="serif">{copy.about.headingAccent}</em>
                  </span>
                </span>
              </h2>
            </div>

            <div className="about-grid">
              <figure className="about-figure" data-reveal>
                <div className="about-photo">
                  <Image
                    src={profile.avatar}
                    alt={copy.about.photoAlt}
                    width={640}
                    height={800}
                    priority
                    sizes="(max-width: 1023px) 320px, 380px"
                  />
                </div>
                <figcaption className="about-caption glass">
                  <b>{copy.about.captionName}</b>
                  <span>{copy.about.captionRole}</span>
                </figcaption>
              </figure>

              <div className="about-body">
                <p
                  className="about-statement"
                  data-reveal
                  style={{ "--d": 1 } as React.CSSProperties}
                >
                  {copy.about.statementBefore}
                  <em className="serif">{copy.about.statementAccent}</em>
                  {copy.about.statementAfter}
                </p>

                <p
                  className="lede"
                  data-reveal
                  style={{ "--d": 2 } as React.CSSProperties}
                >
                  {copy.about.paragraph}
                </p>

                <div
                  className="about-stats"
                  data-reveal
                  style={{ "--d": 3 } as React.CSSProperties}
                >
                  <div className="about-stat">
                    <b>
                      <span data-count="2" data-suffix="+">
                        2+
                      </span>
                    </b>
                    <span>{copy.about.stats[0].label}</span>
                  </div>
                  <div className="about-stat">
                    <b>
                      <span data-count="7" data-pad="2">
                        07
                      </span>
                    </b>
                    <span>{copy.about.stats[1].label}</span>
                  </div>
                  <div className="about-stat">
                    <b>
                      <span data-count="13">13</span>
                    </b>
                    <span>{copy.about.stats[2].label}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 03 — SERVICES */}
        <section className="section" id="services" aria-labelledby="services-title">
          <div className="section-inner">
            <div className="sec-head" data-reveal>
              <SectionLabel number="03" label={copy.services.label} />
              <h2 className="section-title" id="services-title">
                <span className="heading-line">
                  <span>
                    {copy.services.headingLead}{" "}
                    <em className="serif">{copy.services.headingAccent}</em>
                  </span>
                </span>
              </h2>
              <p className="lede">{copy.services.lede}</p>
            </div>

            <div data-reveal style={{ "--d": 1 } as React.CSSProperties}>
              <ServicesAccordion items={copy.services.items} />
            </div>
          </div>
        </section>

        {/* 04 — PROCESS */}
        <section className="section" id="process" aria-labelledby="process-title">
          <div className="section-inner">
            <div className="sec-head" data-reveal>
              <SectionLabel number="04" label={copy.process.label} />
              <h2 className="section-title" id="process-title">
                <span className="heading-line">
                  <span>
                    {copy.process.headingLead}{" "}
                    <em className="serif">{copy.process.headingAccent}</em>
                  </span>
                </span>
              </h2>
              <p className="lede">{copy.process.lede}</p>
            </div>

            <div className="process" data-reveal style={{ "--d": 1 } as React.CSSProperties}>
              <div className="process-track" aria-hidden="true">
                <span className="process-fill" />
              </div>
              {copy.process.steps.map((step) => (
                <div className="process-step" key={step.title}>
                  <span className="process-marker" aria-hidden="true" />
                  <span className="label">{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 05 — STACK */}
        <section className="section" id="stack" aria-labelledby="stack-title">
          <div className="section-inner">
            <div className="sec-head" data-reveal>
              <SectionLabel number="05" label={copy.stack.label} />
              <h2 className="section-title" id="stack-title">
                <span className="heading-line">
                  <span>{copy.stack.headingLead}</span>
                </span>
                <span className="heading-line">
                  <span>
                    <em className="serif">{copy.stack.headingAccent}</em>
                  </span>
                </span>
              </h2>
              <p className="lede">{copy.stack.lede}</p>
            </div>

            <div className="stack-grid" data-reveal>
              {copy.stack.groups.map((group) => (
                <div className="stack-col" key={group.label}>
                  <h3>{group.label}</h3>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 06 — WORK */}
        <section className="section" id="work" aria-labelledby="work-title">
          <div className="section-inner">
            <div className="sec-head" data-reveal>
              <SectionLabel number="06" label={copy.work.label} />
              <h2 className="section-title" id="work-title">
                <span className="heading-line">
                  <span>
                    {copy.work.headingLead}{" "}
                    <em className="serif">{copy.work.headingAccent}</em>
                  </span>
                </span>
              </h2>
              <p className="lede">{copy.work.lede}</p>
            </div>

            <div data-reveal style={{ "--d": 1 } as React.CSSProperties}>
              <WorkList projects={projects} />
            </div>

            <div className="work-foot">
              <Link href="/work">
                {copy.work.allLink} <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </section>

        {/* 07 — CREDENTIALS */}
        <section
          className="section"
          id="credentials"
          aria-labelledby="credentials-title"
        >
          <div className="section-inner">
            <div className="sec-head" data-reveal>
              <SectionLabel number="07" label={copy.credentials.label} />
              <h2 className="section-title" id="credentials-title">
                <span className="heading-line">
                  <span>
                    <em className="serif">{copy.credentials.headingAccent}</em>
                  </span>
                </span>
              </h2>
              <p className="lede">{copy.credentials.lede}</p>
            </div>

            <div className="cred-groups" data-reveal>
              {credentialGroups.map(([issuer, items]) => (
                <div className="cred-group" key={issuer}>
                  <div className="cred-group-head">
                    <h3>{issuer}</h3>
                    <span>{String(items.length).padStart(2, "0")}</span>
                  </div>

                  <div className="cred-head" aria-hidden="true">
                    <span className="label">
                      {copy.credentials.columns.date}
                    </span>
                    <span className="label">
                      {copy.credentials.columns.name}
                    </span>
                    <span className="label">
                      {copy.credentials.columns.issuer}
                    </span>
                    <span className="label" style={{ justifySelf: "end" }}>
                      {copy.credentials.columns.verify}
                    </span>
                  </div>

                  {items.map((cert) => (
                    <div className="cred-row" key={cert.id}>
                      <span className="cred-date">{cert.date}</span>
                      <span className="cred-name">{cert.title}</span>
                      <span className="cred-issuer">{cert.issuer}</span>
                      {cert.url ? (
                        <a
                          className="cred-verify"
                          href={cert.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {copy.credentials.verify} ↗
                        </a>
                      ) : (
                        <span className="cred-verify is-award">
                          {copy.credentials.awarded}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 08 — EXPERIENCE */}
        <section
          className="section"
          id="experience"
          aria-labelledby="experience-title"
        >
          <div className="section-inner">
            <div className="sec-head" data-reveal>
              <SectionLabel number="08" label={copy.experience.label} />
              <h2 className="section-title" id="experience-title">
                <span className="heading-line">
                  <span>{copy.experience.headingLead}</span>
                </span>
                <span className="heading-line">
                  <span>
                    <em className="serif">{copy.experience.headingAccent}</em>
                  </span>
                </span>
              </h2>
              <p className="lede">{copy.experience.lede}</p>
            </div>

            <div className="exp-list">
              {copy.experience.items.map((item) => (
                <article className="exp-item" key={item.company} data-reveal>
                  <div className="exp-year">{item.year}</div>
                  <div className="exp-body">
                    <h3>{item.company}</h3>
                    <p className="exp-role">{item.role}</p>
                    <p className="exp-loc">{item.location}</p>
                    <p className="exp-summary">{item.summary}</p>
                    <ul className="tag-row">
                      {item.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 09 — EDUCATION */}
        <section
          className="section"
          id="education"
          aria-labelledby="education-title"
        >
          <div className="section-inner">
            <div className="sec-head" data-reveal>
              <SectionLabel number="09" label={copy.education.label} />
              <h2 className="section-title" id="education-title">
                <span className="heading-line">
                  <span>{copy.education.headingLead}</span>
                </span>
                <span className="heading-line">
                  <span>
                    <em className="serif">{copy.education.headingAccent}</em>
                  </span>
                </span>
              </h2>
              <p className="lede">{copy.education.lede}</p>
            </div>

            <div className="edu-grid">
              <div data-reveal>
                <div className="edu-col-head">
                  <h3>{copy.education.formalTitle}</h3>
                  <span className="label">{copy.education.formalSub}</span>
                </div>
                <div className="edu-track">
                  {copy.education.items.formal.map((item) => (
                    <div className="edu-item" key={`${item.institution}-${item.date}`}>
                      <span className="edu-date">{item.date}</span>
                      <h4>{item.title}</h4>
                      <p className="edu-inst">{item.institution}</p>
                      <p className="edu-note">{item.note}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div data-reveal style={{ "--d": 1 } as React.CSSProperties}>
                <div className="edu-col-head">
                  <h3>{copy.education.nonFormalTitle}</h3>
                  <span className="label">{copy.education.nonFormalSub}</span>
                </div>
                <div className="edu-track is-nonformal">
                  {copy.education.items.nonFormal.map((item) => (
                    <div className="edu-item" key={`${item.institution}-${item.title}`}>
                      <span className="edu-date">{item.date}</span>
                      <h4>{item.title}</h4>
                      <p className="edu-inst">{item.institution}</p>
                      <p className="edu-note">{item.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 10 — CONTACT */}
        <section className="section" id="contact" aria-labelledby="contact-title">
          <div className="section-inner">
            <div className="sec-head" data-reveal>
              <SectionLabel number="10" label={copy.contact.label} />
            </div>

            <div className="contact-block">
              <h2 className="contact-heading" id="contact-title" data-reveal>
                {copy.contact.headingLead}{" "}
                <em className="serif">{copy.contact.headingAccent}</em>
              </h2>

              <p className="lede" data-reveal style={{ "--d": 1 } as React.CSSProperties}>
                {copy.contact.lede}
              </p>

              <a
                className="contact-email"
                href={`mailto:${profile.email}`}
                data-reveal
                style={{ "--d": 2 } as React.CSSProperties}
              >
                {profile.email}
              </a>

              <div data-reveal style={{ "--d": 3 } as React.CSSProperties}>
                <ContactActions />
              </div>
            </div>

            <footer className="site-foot">
              <p>{copy.contact.footerLeft}</p>
              <nav aria-label="Footer">
                {profile.socials.map((social) => (
                  <React.Fragment key={social.label}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {social.label}
                    </a>
                    <i aria-hidden="true">·</i>
                  </React.Fragment>
                ))}
                <button
                  type="button"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                  {copy.contact.backToTop}
                </button>
              </nav>
            </footer>
          </div>
        </section>
      </main>
    </>
  );
}
