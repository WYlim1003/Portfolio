import { useEffect } from 'react';

export type Project = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  skills: string[];
  techStack?: string[];
};

export default function ProjectDetailsPanel(props: {
  project: Project;
  onClose: () => void;
}) {
  const { project, onClose } = props;

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className="panelBackdrop"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="detailsPanel" role="dialog" aria-modal="true" aria-label={`Project details: ${project.title}`}>
        <div className="detailsHeader">
          <div>
            <h3>{project.title}</h3>
            <div className="sub">{project.subtitle}</div>
          </div>
          <button type="button" className="closeBtn" onClick={onClose} aria-label="Close project details">
            Close
          </button>
        </div>

        <div className="detailsBody">
          <div>
            <div className="detailsDesc">{project.description}</div>
            <div className="chipRow" aria-label="Project skills">
              {project.skills.map((s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="detailsDesc" style={{ fontWeight: 700, marginBottom: 8 }}>
              Tech stack
            </div>
            <div className="chipRow" aria-label="Project tech stack">
              {(project.techStack ?? project.skills).map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

