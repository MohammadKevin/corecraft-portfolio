"use client";

import React, { useId, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import { useFinePointer } from "@/lib/hooks";
import { fadeUp, inView, spring } from "@/lib/motion";

/**
 * ServicesAccordion: numbered rows, one open at a time.
 *
 * Each row header is a real <button aria-expanded aria-controls>, so Enter and
 * Space work for free. On fine pointers a hover also opens the row, which is
 * the "hover gives instant, informative feedback" requirement.
 */
export default function ServicesAccordion() {
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
      className="section-pad border-t border-line bg-bg-alt"
    >
      <div className="page-container">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="max-w-2xl"
        >
          <p className="label-eyebrow text-muted">/Services</p>
          <h2
            id="services-heading"
            className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight text-ink md:text-6xl"
          >
            What I can build for you
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted md:text-lg">
            From the database schema to the interface, each engagement is scoped
            so the result keeps working long after launch.
          </p>
        </motion.div>

        <div className="mt-14 border-t border-line">
          {services.map((service, index) => {
            const isOpen = openId === service.id;
            const panelId = `${baseId}-panel-${service.id}`;
            const buttonId = `${baseId}-button-${service.id}`;

            return (
              <motion.div
                key={service.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={inView}
                transition={{ ...spring, delay: Math.min(index, 4) * 0.04 }}
                className="border-b border-line"
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
                    className="group flex w-full items-center justify-between gap-6 py-7 text-left focus-visible:outline-2 focus-visible:outline-offset-4 md:py-9"
                  >
                    <span className="flex min-w-0 items-baseline gap-5 md:gap-8">
                      <span
                        aria-hidden="true"
                        className="label-eyebrow shrink-0 text-muted"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`text-xl font-semibold tracking-tight transition-colors duration-200 md:text-3xl ${
                          isOpen ? "text-ink" : "text-ink/80 group-hover:text-ink"
                        }`}
                      >
                        {service.title}
                      </span>
                    </span>

                    <span
                      aria-hidden="true"
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ease-out-expo ${
                        isOpen
                          ? "rotate-45 border-ink bg-ink text-bg"
                          : "border-line text-muted group-hover:border-ink group-hover:text-ink"
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
                      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 gap-8 pb-10 lg:grid-cols-2 lg:gap-16">
                        <div className="lg:pl-[calc(2ch+2rem)]">
                          <p className="max-w-prose text-base leading-relaxed text-muted md:text-lg">
                            {service.description}
                          </p>

                          <ul className="mt-6 flex flex-wrap gap-2">
                            {service.stack.map((item) => (
                              <li
                                key={item}
                                className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-medium tracking-tight text-muted"
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-surface">
                          <Image
                            src={service.preview}
                            alt={`${service.title} preview`}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover"
                          />
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
