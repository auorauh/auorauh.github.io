'use client';
import "./page.css";

export default function Project(props) {
  const { title, import: imageSrc, video, desc, link, linkLabel } = props.info || {};
  const hasVideo = Boolean(video);
  const hasImage = Boolean(imageSrc) && !hasVideo;

  return (
    <div
      className="projectOverlay"
      role="presentation"
      onClick={props.close}
    >
      <div
        className="projectView"
        role="dialog"
        aria-modal="true"
        aria-label={title || 'Project'}
        onClick={(event) => event.stopPropagation()}
      >
        <h1 className="projectTitle">{title}</h1>
        {hasVideo ? (
          <div className="projectItem projectItem--media">
            <iframe
              className="projectVideo"
              src={video}
              title={title || 'Project video'}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        ) : null}
        {hasImage ? (
          <div className="projectItem projectItem--media">
            <img className="projectImg" src={imageSrc} alt={title || 'Project preview'} />
          </div>
        ) : null}
        {desc ? <div className="projectDesc">{desc}</div> : null}
        {link ? (
          <a
            className="projectLink"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {linkLabel || 'Watch on YouTube'}
          </a>
        ) : null}
        <button type="button" className="closeBtn" onClick={props.close}>
          Close
        </button>
      </div>
    </div>
  );
}
