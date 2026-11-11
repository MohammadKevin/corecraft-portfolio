import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <main className="subpage-wrap" style={{ display: "grid", placeItems: "center" }}>
      <div
        className="g nf"
        style={{
          width: "100%",
          maxWidth: "720px",
          padding: "clamp(24px, 4vw, 48px)",
          borderLeft: "6px solid var(--cb)",
        }}
      >
        <span className="mo" style={{ fontSize: "12px", color: "var(--od)", fontWeight: 700 }}>
          /404 — ROUTE NOT FOUND
        </span>

        <h1
          style={{
            margin: "12px 0",
            fontSize: "clamp(48px, 11vw, 130px)",
            lineHeight: 0.85,
            letterSpacing: "-0.06em",
            fontWeight: 800,
          }}
        >
          <span style={{ color: "transparent", WebkitTextStroke: "2px var(--ink)" }}>
            404{" "}
          </span>
          <span className="sf" style={{ fontSize: "0.52em" }}>
            missing.
          </span>
        </h1>

        <p style={{ margin: "12px 0 0", fontSize: "16px", lineHeight: 1.6, color: "var(--mu)" }}>
          The page or project case study you requested may have moved or does not exist.
        </p>

        <div className="bs" style={{ marginTop: "24px" }}>
          <Link href="/" className="bt p">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Back Home</span>
          </Link>
          <Link href="/work" className="bt g">
            <span>Browse All Work</span>
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </main>
  );
}
