export type UIConfig = {
  buttons: {
    collaborate: string;
    viewWork: string;
    backToTop: string;
    backToOverview: string;
    letsTalk: string;
    verify: string;
    verifyAt: string;
    preview: string;
    lihatPreview: string;
    close: string;
    closePreviewAria: string;
    caseStudy: string;
    liveDemo: string;
    live: string;
    code: string;
    prev: string;
    next: string;
    whatsapp: string;
    resume: string;
    nextProjectCaseStudy: string;
  };
  placeholders: {
    certificatePhoto: string;
    certificateDocumentPreview: string;
    verifiedIndustryCredential: string;
    presentedTo: string;
    proficiencyIntro: string;
    assessedCompetencies: string;
    issuingAuthority: string;
    issueDate: string;
    credentialId: string;
    verifiedAuthority: string;
    officialNationalArchive: string;
    official: string;
    blueprintSpec: string;
    blueprintVerified: string;
    kraftWorkLabel: string;
  };
  labels: {
    disciplinesAvailable: string;
    deliverables: string;
    industryAccreditations: string;
    productionSystemsDelivered: string;
    architectureIntegrity: string;
    timelinePresent: string;
    timelineRole: string;
  };
  clock: {
    timeZone: string;
    label: string;
    loading: string;
  };
  formatCounter: (current: number, total: number) => string;
  formatNumber: (n: number) => string;
};

export const ui = {
  buttons: {
    collaborate: "Let's collaborate",
    viewWork: "View Selected Work",
    backToTop: "Back to top",
    backToOverview: "← Back to Overview",
    letsTalk: "Let's Talk",
    verify: "Verify",
    verifyAt: "Verifikasi di",
    preview: "Preview",
    lihatPreview: "Lihat Preview",
    close: "Tutup",
    closePreviewAria: "Close certificate preview",
    caseStudy: "Case Study",
    liveDemo: "Live Demo",
    live: "Live",
    code: "Code",
    prev: "Prev",
    next: "Next",
    whatsapp: "WhatsApp",
    resume: "Resume (PDF)",
    nextProjectCaseStudy: "Next Project Case Study →",
  },
  placeholders: {
    certificatePhoto: "Foto Sertifikat",
    certificateDocumentPreview: "Certificate Document Preview",
    verifiedIndustryCredential: "Verified Industry Credential",
    presentedTo: "This is proudly presented to",
    proficiencyIntro:
      "for successfully completing the rigorous assessment and demonstrating proficiency in",
    assessedCompetencies: "Assessed Competencies",
    issuingAuthority: "Issuing Authority",
    issueDate: "Issue Date",
    credentialId: "Credential ID",
    verifiedAuthority: "Verified Authority",
    officialNationalArchive: "Official National Archive",
    official: "Official",
    blueprintSpec: "System Blueprint",
    blueprintVerified: "Corecraft Verified Specification",
    kraftWorkLabel: "Architecture Preview",
  },
  labels: {
    disciplinesAvailable: "CORE DISCIPLINES AVAILABLE",
    deliverables: "Deliverables",
    industryAccreditations: "INDUSTRY ACCREDITATIONS",
    productionSystemsDelivered: "Production Systems Delivered",
    architectureIntegrity: "100% Architecture Integrity",
    timelinePresent: "Present",
    timelineRole: "Key Responsibilities & Stack",
  },
  clock: {
    timeZone: "Asia/Jakarta",
    label: "Malang, ID (WIB):",
    loading: "--:--:--",
  },
  formatCounter: (current: number, total: number) =>
    `${String(current).padStart(2, "0")} / ${String(total).padStart(2, "0")}`,
  formatNumber: (n: number) => String(n).padStart(2, "0"),
} satisfies UIConfig;
