import Link from "next/link";
import { ArrowLeft } from "lucide-react";

/**
 * Not-found page for unknown routes and unknown project slugs.
 * Deliberately minimal: one message, one way back.
 */
export default function NotFound() {
  return (
    <section className="section-pad flex min-h-[70vh] items-center pt-40">
      <div className="page-container">
        <p className="label-eyebrow text-muted">/404</p>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-ink md:text-6xl">
          This page doesn&apos;t exist
        </h1>
        <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
          The project you were looking for may have been renamed or removed.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-2 rounded-full border border-ink bg-ink px-6 py-3 text-sm font-medium text-bg transition-colors duration-200 hover:bg-[#1E293B] focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back home
        </Link>
      </div>
    </section>
  );
}
