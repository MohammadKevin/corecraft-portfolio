import { credentials, groupCredentials } from "@/data/credentials";
import { SceneHead } from "./SceneHead";

export function Credentials() {
  const groups = groupCredentials();

  return (
    <section
      id="credentials"
      className="scene scene--credentials"
      aria-labelledby="credentials-title"
    >
      <div className="scene-inner">
        <SceneHead id="credentials" />

        <div className="scene-lead cred-lead">
          <h2 className="scene-title" id="credentials-title">
            <em>{credentials.length} credentials.</em>
          </h2>
          <p className="body-muted">
            Audited problem-solving and software credentials — grouped by issuer.
          </p>
        </div>

        <div className="cred-groups">
          {groups.map(([issuer, rows]) => (
            <section className="cred-group" key={issuer}>
              <h3>
                {issuer}
                <span>{String(rows.length).padStart(2, "0")}</span>
              </h3>
              <ul>
                {rows.map((cert) => (
                  <li key={cert.id} className="cred-row">
                    <span className="cred-date">{cert.date}</span>
                    <span className="cred-name">{cert.title}</span>
                    {cert.url ? (
                      <a
                        className="cred-verify"
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Verify ${cert.title} at ${cert.issuer}`}
                      >
                        Verify ↗
                      </a>
                    ) : (
                      <span className="cred-verify is-award">Awarded</span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
