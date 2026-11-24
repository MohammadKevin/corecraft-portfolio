import { stackGroups } from "@/data/stack";
import { SceneHead } from "./SceneHead";

export function Stack() {
  return (
    <section id="stack" className="scene scene--stack" aria-labelledby="stack-title">
      <div className="scene-inner">
        <SceneHead id="stack" />

        <div className="scene-lead stack-lead">
          <h2 className="scene-title" id="stack-title">
            A battle-tested stack built for <em>reliability and scale.</em>
          </h2>
        </div>

        <div className="stack-grid">
          {stackGroups.map((group, groupIndex) => (
            <div className="stack-col" key={group.label} style={{ "--i": groupIndex } as React.CSSProperties}>
              <h3>{group.label}</h3>
              <ul>
                {group.items.map((item, itemIndex) => (
                  <li
                    key={item}
                    style={{ "--j": itemIndex } as React.CSSProperties}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
