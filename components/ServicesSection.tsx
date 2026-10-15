"use client";

import React, { useId, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { services } from "@/data/services";
import { useFinePointer } from "@/lib/hooks";
import { fadeUp, fadeUpDelayed, inView, spring } from "@/lib/motion";

export default function ServicesSection() {
  const [openId, setOpenId] = useState<string>(services[0]?.id ?? "");
  const isFinePointer = useFinePointer();
  const baseId = useId();

  function toggle(id: string) {
    setOpenId((current) => (current === id ? "" : id));
  }

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="section-pad border-b border-black/[0.08] bg-bg relative"
    >
      <div className="page-container">
        {/* Monospace Sub-label */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mb-8 flex items-center justify-between"
        >
          <span className="font-mono text-xs font-semibold tracking-[0.2em] text-muted uppercase">
            /03 SERVICES & CAPABILITIES
          </span>
          <span className="font-mono text-xs text-muted">
            06 PRODUCTION OFFERINGS
          </span>
        </motion.div>

        {/* Section Heading */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="max-w-3xl mb-14"
        >
          <h2
            id="services-heading"
            className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-ink"
          >
            Capabilities designed to scale from prototype to high load.
          </h2>
          <p className="mt-4 text-base md:text-lg leading-relaxed text-muted">
            Specialized engineering engagements covering robust backend backbones,
            transactional inventory engines, and responsive modern client interfaces.
          </p>
        </motion.div>

        {/* Full-width line-row accordion list */}
        <div className="border-t border-black/[0.08]">
          {services.map((service, index) => {
            const isOpen = openId === service.id;
            const panelId = `${baseId}-panel-${service.id}`;
            const buttonId = `${baseId}-button-${service.id}`;
            const formattedIndex = String(index + 1).padStart(2, "0");

            return (
              <motion.div
                key={service.id}
                variants={fadeUpDelayed(Math.min(index, 4) * 0.04)}
                initial="hidden"
                whileInView="show"
                viewport={inView}
                className="border-b border-black/[0.08] transition-colors duration-200"
              >
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(service.id)}
                    onMouseEnter={() => {
                      if (isFinePointer) setOpenId(service.id);
                    }}
                    className="group flex w-full items-center justify-between gap-6 py-6 md:py-8 text-left focus-visible:outline-2 focus-visible:outline-offset-4"
                  >
                    <span className="flex min-w-0 items-baseline gap-4 md:gap-8">
                      <span
                        aria-hidden="true"
                        className="font-mono text-sm font-semibold tracking-wider text-muted shrink-0"
                      >
                        {formattedIndex}
                      </span>
                      <span
                        className={`text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight transition-colors duration-200 ${
                          isOpen ? "text-ink" : "text-ink/75 group-hover:text-ink"
                        }`}
                      >
                        {service.title}
                      </span>
                    </span>

                    {/* Arrow rotating into ✕ on open */}
                    <span
                      aria-hidden="true"
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ease-out ${
                        isOpen
                          ? "rotate-45 border-ink bg-ink text-white"
                          : "border-black/[0.08] bg-surface text-muted group-hover:border-ink group-hover:text-ink"
                      }`}
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      key="panel"
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={spring}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 gap-8 pb-10 pt-2 lg:grid-cols-12 lg:gap-12">
                        {/* Kiri: Deskripsi teknis mendalam dan deliverable */}
                        <div className="lg:col-span-7 flex flex-col justify-between pl-0 sm:pl-10 md:pl-14">
                          <div>
                            <p className="text-base md:text-lg leading-relaxed text-muted">
                              {service.description}
                            </p>

                            <div className="mt-6">
                              <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-ink mb-3">
                                Key Deliverables
                              </h4>
                              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                {service.deliverables.map((item) => (
                                  <li
                                    key={item}
                                    className="flex items-center gap-2 text-sm text-ink font-medium"
                                  >
                                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          <div className="mt-8 pt-6 border-t border-black/[0.06]">
                            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-muted mb-3">
                              Technology Ecosystem
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {service.stack.map((tech) => (
                                <span
                                  key={tech}
                                  className="rounded-full border border-black/[0.08] bg-surface px-3 py-1 font-mono text-xs font-medium text-ink shadow-2xs"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Kanan: Floating visual preview card */}
                        <div className="lg:col-span-5">
                          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-black/[0.08] bg-surface shadow-md">
                            <Image
                              src={service.preview}
                              alt={`${service.title} schematic architecture`}
                              fill
                              sizes="(max-width: 1024px) 100vw, 40vw"
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs font-mono">
                              <span>ARCHITECTURE SCHEMA</span>
                              <span>INDEX {formattedIndex}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
