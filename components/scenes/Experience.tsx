import { experience } from "@/data/experience";
import { SceneHead } from "./SceneHead";

export function Experience() {
  return (
    <section
      id="experience"
      className="scene scene--experience"
      aria-labelledby="experience-title"
    >
      <div className="scene-inner">
        <SceneHead id="experience" />

        <div className="scene-lead">
          <h2 className="scene-title" id="experience-title">
            Industry track record in <em>engineering &amp; quality.</em>
          </h2>
        </div>

        <div className="exp-list">
          {experience.map((item) => (
            <article className="exp-item" key={item.company}>
              <p className="exp-year" aria-hidden="true">
                {item.year}
              </p>
              <div className="exp-body">
                <h3>
                  {item.company}
                  <span className="exp-role"> . {item.role}</span>
                </h3>
                <p className="exp-loc">{item.location}</p>
                <p className="exp-summary">{item.summary}</p>
                <ul className="tags">
                  {item.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
