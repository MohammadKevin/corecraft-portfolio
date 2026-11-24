import { projects } from "@/data/projects";
import { resolvePublicFile } from "@/lib/media";
import type { Project } from "@/lib/types";
import { SceneHead } from "./SceneHead";
import { Book } from "@/components/fx/Book";

export function Work() {
  const resolved: Project[] = [...projects]
    .sort((a, b) => a.order - b.order)
    .map((project) => ({
      ...project,
      image: resolvePublicFile(project.image ?? project.thumbnail),
    }));

  return (
    <section id="work" className="scene scene--work" aria-labelledby="work-title">
      <div className="scene-inner work-inner">
        <SceneHead id="work" />

        <div className="work-head">
          <h2 className="scene-title work-title" id="work-title">
            Selected <em>work.</em>
          </h2>
          <p className="body-muted work-lede">
            Seven production systems, bound as one volume. Turn the pages or scroll
            through the book.
          </p>
        </div>

        <Book projects={resolved} />
      </div>
    </section>
  );
}
