import { formalEducation, nonFormalEducation } from "@/data/education";
import { SceneHead } from "./SceneHead";

export function Education() {
  return (
    <section
      id="education"
      className="scene scene--education"
      aria-labelledby="education-title"
    >
      <div className="scene-inner">
        <SceneHead id="education" />

        <div className="scene-lead edu-lead">
          <h2 className="scene-title" id="education-title">
            A formal path and a <em>self-directed one.</em>
          </h2>
        </div>

        <div className="edu-grid">
          <div className="edu-col">
            <div className="edu-col-head">
              <h3>Pendidikan Formal</h3>
              <span className="label">Formal education</span>
            </div>
            <ol className="edu-track is-formal">
              {formalEducation.map((item) => (
                <li className="edu-item" key={`${item.institution}-${item.date}`}>
                  <span className="edu-date">{item.date}</span>
                  <h4>{item.institution}</h4>
                  <p className="edu-title">{item.title}</p>
                  <p className="edu-note">{item.note}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="edu-col">
            <div className="edu-col-head">
              <h3>Pendidikan Non-Formal</h3>
              <span className="label">Non-formal learning</span>
            </div>
            <ol className="edu-track is-nonformal">
              {nonFormalEducation.map((item) => (
                <li className="edu-item" key={`${item.institution}-${item.title}`}>
                  <span className="edu-date">{item.date}</span>
                  <h4>{item.institution}</h4>
                  <p className="edu-title">{item.title}</p>
                  <p className="edu-note">{item.note}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
