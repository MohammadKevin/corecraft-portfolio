"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { NAV_SCENES, SCENES } from "@/lib/scenes";
import { goTo } from "@/lib/stage-api";
import { useActiveScene } from "@/lib/stage-store";
import { profile } from "@/data/profile";

function readMotion(): boolean {
  return document.documentElement.dataset.motion !== "off";
}

function subscribeMotion(callback: () => void) {
  window.addEventListener("motionchange", callback);
  return () => window.removeEventListener("motionchange", callback);
}

function MotionToggle() {
  const on = useSyncExternalStore(subscribeMotion, readMotion, () => true);

  const toggle = () => {
    const next = !on;
    document.documentElement.dataset.motion = next ? "on" : "off";
    try {
      window.localStorage.setItem("corecraft-motion", next ? "on" : "off");
    } catch {
      // storage unavailable
    }
    window.dispatchEvent(new Event("motionchange"));
  };

  return (
    <button
      type="button"
      className="motion-toggle"
      aria-pressed={on}
      onClick={toggle}
      title={on ? "Turn motion off" : "Turn motion on"}
    >
      <span className={`motion-box${on ? " is-on" : ""}`} aria-hidden="true" />
      <span>{on ? "Motion on" : "Motion off"}</span>
    </button>
  );
}

export function Nav() {
  const active = useActiveScene();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const progressRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? window.scrollY / total : 0;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
      }
      setScrolled(window.scrollY > 8);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    menuRef.current?.querySelector<HTMLElement>("a,button")?.focus();
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const navigate = (id: string) => {
    setOpen(false);
    goTo(id);
  };

  const meta = SCENES.find((scene) => scene.id === active) ?? SCENES[0];

  return (
    <>
      <i ref={progressRef} className="scroll-progress" aria-hidden="true" />

      <header className={`nav${scrolled ? " is-scrolled" : ""}`}>
        <div className="nav-inner">
          <a
            className="nav-logo"
            href="#hero"
            onClick={(event) => {
              event.preventDefault();
              navigate("hero");
            }}
          >
            <span className="nav-square" aria-hidden="true" />
            Corecraft
          </a>

          <nav className="nav-links" aria-label="Primary">
            {NAV_SCENES.map((scene) => (
              <a
                key={scene.id}
                href={`#${scene.id}`}
                className={active === scene.id ? "is-active" : ""}
                aria-current={active === scene.id ? "true" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  navigate(scene.id);
                }}
              >
                {scene.navLabel}
              </a>
            ))}
          </nav>

          <div className="nav-actions">
            <MotionToggle />
            <a className="btn btn-ink nav-cta" href={`mailto:${profile.email}`}>
              Let&apos;s Talk
            </a>
            <button
              ref={menuButtonRef}
              type="button"
              className="nav-menu-btn"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((value) => !value)}
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        ref={menuRef}
        className={`nav-panel${open ? " is-open" : ""}`}
        aria-hidden={!open}
        inert={open ? undefined : true}
      >
        <nav aria-label="Mobile">
          <ul>
            {SCENES.map((scene, index) => (
              <li key={scene.id}>
                <a
                  href={`#${scene.id}`}
                  tabIndex={open ? 0 : -1}
                  className={active === scene.id ? "is-active" : ""}
                  onClick={(event) => {
                    event.preventDefault();
                    navigate(scene.id);
                  }}
                >
                  <span className="label">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {scene.navLabel}
                </a>
              </li>
            ))}
          </ul>
          <a
            className="btn btn-ink nav-panel-cta"
            href={`mailto:${profile.email}`}
            tabIndex={open ? 0 : -1}
            onClick={() => setOpen(false)}
          >
            Let&apos;s Talk
          </a>
        </nav>
      </div>

      <p className="scene-indicator" aria-hidden="true">
        <span>{meta.number}</span> / 10 <b>{meta.label}</b>
      </p>
    </>
  );
}
