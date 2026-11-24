import Image from "next/image";
import { profile } from "@/data/profile";
import { SceneHead } from "./SceneHead";

const [headlineBefore, headlineAfter] = profile.aboutHeadline.split("human-centered");

export function About() {
  return (
    <section id="about" className="scene scene--about" aria-labelledby="about-title">
      <div className="scene-inner">
        <SceneHead id="about" />

        <div className="about-grid">
          <figure className="about-figure" data-about-photo>
            <div className="about-photo">
              <Image
                src={profile.avatar}
                alt={`Foto ${profile.fullName}`}
                width={864}
                height={1156}
                sizes="(max-width: 1023px) 70vw, 34vw"
                className="about-photo-img"
                priority={false}
              />
            </div>
            <figcaption className="glass about-caption">
              <b>{profile.displayName.charAt(0) + profile.displayName.slice(1).toLowerCase()}</b>
              <span>Malang · {new Date().getFullYear()}</span>
            </figcaption>
          </figure>

          <div className="about-body">
            <h2 className="statement" id="about-title">
              {headlineBefore}
              <em>human-centered</em>
              {headlineAfter}
            </h2>
            <p className="body-muted about-text">{profile.aboutText}</p>

            <ul className="mini-stats">
              {profile.stats.map((stat) => (
                <li key={stat.label}>
                  <b data-count={stat.value} data-pad={stat.value === "07" ? 2 : 0}>
                    {stat.value}
                  </b>
                  <span>{stat.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
