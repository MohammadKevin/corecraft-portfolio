import { processSteps } from "@/data/process";
import { SceneHead } from "./SceneHead";

export function Process() {
  return (
    <section id="process" className="scene scene--process" aria-labelledby="process-title">
      <div className="scene-inner">
        <SceneHead id="process" />

        <div className="scene-lead">
          <h2 className="scene-title" id="process-title">
            A process built on <em>constraints.</em>
          </h2>
          <p className="body-muted">
            Schema first, contract second, build third — ship only when uptime is the
            default.
          </p>
        </div>

        <div className="process">
          <div className="process-track" aria-hidden="true">
            <span className="process-fill" />
          </div>
          <ol className="process-steps">
            {processSteps.map((step) => (
              <li className="process-step" key={step.number}>
                <span className="process-marker" aria-hidden="true" />
                <span className="process-num">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
