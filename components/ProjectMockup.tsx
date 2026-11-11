"use client";

import React from "react";
import Image from "next/image";

const EXISTING_PROJECT_IMAGES = new Set([
  "outerco",
  "clinic-portal",
  "corecraft",
]);

export function ProjectMockup({
  slug,
  title,
  domain,
  compact = false,
  preferRealImage = false,
  imageSrc,
}: {
  slug: string;
  title: string;
  domain: string;
  compact?: boolean;
  preferRealImage?: boolean;
  imageSrc?: string;
}) {
  const showRealImage =
    preferRealImage && imageSrc && EXISTING_PROJECT_IMAGES.has(slug);

  return (
    <div className={`bw${compact ? " bw-compact" : ""}`}>
      <div className="bb">
        <i></i>
        <i></i>
        <i></i>
        <span className="mo">{domain}</span>
      </div>

      {showRealImage ? (
        <div className="relative aspect-[16/10] w-full bg-[#f3f3f5] overflow-hidden">
          <Image
            src={imageSrc}
            alt={`${title} production preview`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1200px"
            className="object-cover object-top"
          />
        </div>
      ) : (
        <MockupBody slug={slug} />
      )}
    </div>
  );
}

function MockupBody({ slug }: { slug: string }) {
  switch (slug) {
    case "worknest":
      return (
        <div className="bc">
          <div className="seats">
            {Array.from({ length: 15 }, (_, k) => (
              <i
                key={k}
                className={[2, 5, 6, 9, 12].includes(k) ? "x" : "o"}
              />
            ))}
          </div>
          <div className="mo bw-note">12 / 15 spaces free · QR check-in</div>
        </div>
      );

    case "outerco":
      return (
        <div className="bc">
          <b className="bw-heading">We sell happiness</b>
          <div className="pg4">
            <i style={{ background: "#f6c1d1" }} />
            <i style={{ background: "#cfe6c0" }} />
            <i style={{ background: "#f8dfa0" }} />
            <i style={{ background: "#e8a8a0" }} />
          </div>
          <div className="mo bw-note">Best seller · WhatsApp checkout</div>
        </div>
      );

    case "invdocs":
      return (
        <div className="bc">
          {[
            { name: "Contract_2026.pdf", badge: "RBAC" },
            { name: "Invoice_0042.pdf", badge: "locked" },
            { name: "Report_Q3.pdf", badge: "RBAC" },
            { name: "Policy.docx", badge: "shared" },
          ].map((row) => (
            <div key={row.name} className="fr">
              <span>{row.name}</span>
              <em>{row.badge}</em>
            </div>
          ))}
        </div>
      );

    case "corepos":
      return (
        <div className="bc">
          <div className="fr">
            <span>Item A ×2</span>
            <em>40.000</em>
          </div>
          <div className="fr">
            <span>Item B ×1</span>
            <em>25.000</em>
          </div>
          <div className="fr">
            <span>Scan barcode</span>
            <em>✓</em>
          </div>
          <div className="fr" style={{ fontWeight: 700 }}>
            <span>TOTAL</span>
            <em>65.000</em>
          </div>
        </div>
      );

    case "inventory-api":
      return (
        <div className="bc">
          <div className="fr">
            <span>GET /v1/stock/sku-09</span>
            <em>200 · 14ms</em>
          </div>
          <div className="fr">
            <span>POST /v1/batch-log</span>
            <em>201 · Redis HIT</em>
          </div>
          <div className="fr">
            <span>ALERT low_stock_qty</span>
            <em>&lt; 5 units</em>
          </div>
          <div className="mo bw-note">40% faster search · Multi-warehouse</div>
        </div>
      );

    case "clinic-portal":
      return (
        <div className="bc">
          <div className="fr">
            <span>Public_Schedule_2025.pdf</span>
            <em>Public</em>
          </div>
          <div className="fr">
            <span>Clinic_Internal_SOP.pdf</span>
            <em>JWT Guarded</em>
          </div>
          <div className="fr">
            <span>Pharmacy_Form_A1.pdf</span>
            <em>RBAC</em>
          </div>
          <div className="mo bw-note">Separated public &amp; internal records</div>
        </div>
      );

    default:
      return (
        <div className="bc">
          <div className="fr">
            <span>Performance</span>
            <em>100 / 100</em>
          </div>
          <div className="fr">
            <span>Next.js 16 · React 19</span>
            <em>Static</em>
          </div>
          <div className="fr">
            <span>TypeScript Strict</span>
            <em>0 errors</em>
          </div>
          <div className="mo bw-note">Corecraft Engineering Portfolio</div>
        </div>
      );
  }
}

