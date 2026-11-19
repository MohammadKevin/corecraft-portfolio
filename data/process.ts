export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Schema",
    description:
      "Start at the data model: relational design, indexes and constraints that hold under load.",
  },
  {
    number: "02",
    title: "Contract",
    description:
      "Strict TypeScript, DTO validation and OpenAPI docs before any interface is drawn.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "Transactional isolation, predictable caching and automated API tests with Postman and Playwright.",
  },
  {
    number: "04",
    title: "Ship",
    description:
      "Deploy, monitor and iterate with uptime as the first requirement.",
  },
];

export const processStepsId: ProcessStep[] = [
  {
    number: "01",
    title: "Skema",
    description:
      "Mulai dari model data: relasi terstruktur, indeks yang tepat, dan konstrain kokoh saat beban naik.",
  },
  {
    number: "02",
    title: "Kontrak",
    description:
      "TypeScript ketat, validasi DTO, dan spesifikasi OpenAPI sebelum antarmuka digambar.",
  },
  {
    number: "03",
    title: "Bangun",
    description:
      "Isolasi transaksi database, strategi cache terprediksi, dan uji API otomatis dengan Postman serta Playwright.",
  },
  {
    number: "04",
    title: "Rilis",
    description:
      "Rilis ke produksi, pantau keandalan, dan iterasi dengan uptime sebagai prioritas utama.",
  },
];
