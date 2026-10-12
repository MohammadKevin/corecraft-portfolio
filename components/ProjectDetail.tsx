import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import Reveal from "@/components/Reveal";
import { GithubIcon } from "@/components/icons/SocialIcons";
import { profile } from "@/data/profile";
import type { Project } from "@/lib/types";

/**
 * ProjectDetail: the case-study layout for `/work/[slug]`.
 *
 * Server component — it only composes `Reveal` and `MagneticButton` for the
 * animated parts, so none of the page copy ships as client JS.
 */
export default function ProjectDetail({
  project,
  previous,
  next,
}: {
  project: Project;
  previous: Project;
  next: Project;
}) {
  const [leadImage, ...restImages] = project.gallery;
  const clientOrStudio = project.client ?? project.studio;

  return (
    <article className="pb-24 pt-32 md:pt-40">
      <div className="page-container">
        <Reveal>
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors duration-200 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to selected work
          </Link>
        </Reveal>

        {/* ---------------------------------------------------------------- */}
        {/* Header                                                            */}
        {/* ---------------------------------------------------------------- */}
        <header className="mt-10 max-w-4xl">
          <Reveal>
            <p className="label-eyebrow text-muted">/{project.category}</p>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight text-ink md:text-6xl">
              {project.title}
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 text-base leading-relaxed text-muted md:text-lg">
              {project.summary}
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <ul className="mt-8 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-medium tracking-tight text-muted"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </Reveal>
        </header>

        {/* ---------------------------------------------------------------- */}
        {/* Metadata + actions                                                */}
        {/* ---------------------------------------------------------------- */}
        <Reveal delay={0.1}>
          <div className="mt-14 grid grid-cols-1 gap-10 border-y border-line py-10 md:grid-cols-4">
            <div>
              <h2 className="label-eyebrow text-muted">Year</h2>
              <p className="mt-2 text-base text-ink">{project.year}</p>
            </div>

            <div className="md:col-span-2">
              <h2 className="label-eyebrow text-muted">Role</h2>
              <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-base text-ink">
                {project.role.map((role) => (
                  <li key={role}>{role}</li>
                ))}
              </ul>
            </div>

            {clientOrStudio ? (
              <div>
                <h2 className="label-eyebrow text-muted">
                  {project.client ? "Client" : "Studio"}
                </h2>
                <p className="mt-2 text-base text-ink">{clientOrStudio}</p>
              </div>
            ) : null}
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            {project.liveUrl ? (
              <MagneticButton
                href={project.liveUrl}
                variant="solid"
                newTab
                ariaLabel={`Open the live demo of ${project.title} in a new tab`}
              >
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                Live Demo
              </MagneticButton>
            ) : null}

            {project.sourceUrl ? (
              <MagneticButton
                href={project.sourceUrl}
                variant="outline"
                newTab
                ariaLabel={`Open the source code of ${project.title} in a new tab`}
              >
                <GithubIcon className="h-4 w-4" />
                Source Code
              </MagneticButton>
            ) : null}

            <MagneticButton
              href="#contact"
              variant={project.liveUrl || project.sourceUrl ? "outline" : "solid"}
              ariaLabel={`Contact ${profile.firstName} about a project`}
            >
              Contact Me
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </MagneticButton>
          </div>
        </Reveal>

        {/* ---------------------------------------------------------------- */}
        {/* Lead image                                                        */}
        {/* ---------------------------------------------------------------- */}
        {leadImage ? (
          <Reveal delay={0.1}>
            <figure className="mt-16">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-bg-alt">
                <Image
                  src={leadImage.src}
                  alt={leadImage.alt}
                  fill
                  priority
                  sizes="(max-width: 1440px) 100vw, 1440px"
                  className="object-cover"
                />
              </div>
              {leadImage.caption ? (
                <figcaption className="mt-3 text-sm text-muted">
                  {leadImage.caption}
                </figcaption>
              ) : null}
            </figure>
          </Reveal>
        ) : null}

        {/* ---------------------------------------------------------------- */}
        {/* Timeline                                                          */}
        {/* ---------------------------------------------------------------- */}
        {project.timeline?.length ? (
          <section aria-labelledby="timeline-heading" className="mt-24">
            <Reveal>
              <p className="label-eyebrow text-muted">/Process</p>
              <h2
                id="timeline-heading"
                className="mt-4 text-3xl font-extrabold tracking-tight text-ink md:text-4xl"
              >
                How it came together
              </h2>
            </Reveal>

            <ol className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
              {project.timeline.map((step, index) => (
                <Reveal key={step.phase} delay={Math.min(index, 3) * 0.06}>
                  <li className="border-t border-line pt-6">
                    <p className="label-eyebrow text-muted">{step.period}</p>
                    <h3 className="mt-3 text-lg font-semibold tracking-tight text-ink">
                      {step.phase}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {step.detail}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </section>
        ) : null}

        {/* ---------------------------------------------------------------- */}
        {/* Gallery — remaining images in alternating two columns            */}
        {/* ---------------------------------------------------------------- */}
        {restImages.length ? (
          <section aria-labelledby="gallery-heading" className="mt-24">
            <Reveal>
              <p className="label-eyebrow text-muted">/Gallery</p>
              <h2
                id="gallery-heading"
                className="mt-4 text-3xl font-extrabold tracking-tight text-ink md:text-4xl"
              >
                Selected screens
              </h2>
            </Reveal>

            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
              {restImages.map((image, index) => (
                <Reveal
                  key={image.src}
                  delay={Math.min(index, 3) * 0.06}
                  className={index % 3 === 0 ? "md:col-span-2" : undefined}
                >
                  <figure>
                    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-bg-alt">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                    {image.caption ? (
                      <figcaption className="mt-3 text-sm text-muted">
                        {image.caption}
                      </figcaption>
                    ) : null}
                  </figure>
                </Reveal>
              ))}
            </div>
          </section>
        ) : null}

        {/* ---------------------------------------------------------------- */}
        {/* Previous / next navigation                                        */}
        {/* ---------------------------------------------------------------- */}
        <nav
          aria-label="More projects"
          className="mt-24 grid grid-cols-1 gap-4 border-t border-line pt-10 md:grid-cols-2"
        >
          <Link
            href={`/work/${previous.slug}`}
            className="group flex flex-col gap-2 rounded-2xl border border-line p-6 transition-colors duration-200 hover:border-ink focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            <span className="inline-flex items-center gap-2 text-xs text-muted">
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              Previous
            </span>
            <span className="text-lg font-semibold tracking-tight text-ink">
              {previous.title}
            </span>
          </Link>

          <Link
            href={`/work/${next.slug}`}
            className="group flex flex-col items-end gap-2 rounded-2xl border border-line p-6 text-right transition-colors duration-200 hover:border-ink focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            <span className="inline-flex items-center gap-2 text-xs text-muted">
              Next
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            <span className="text-lg font-semibold tracking-tight text-ink">
              {next.title}
            </span>
          </Link>
        </nav>
      </div>
    </article>
  );
}
