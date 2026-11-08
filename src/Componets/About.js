import "./page.css";

export default function About(props) {
  return (
    <div
      className="aboutOverlay"
      onClick={props.close}
      role="presentation"
    >
      <section
        className="aboutPanel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="about-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="aboutClose" onClick={props.close}>
          Close
        </button>

        <p className="aboutEyebrow">Est. 2021</p>
        <h1 id="about-title" className="aboutTitle">64 Floors</h1>
        <p className="aboutLead">
          One building. Sixty-four creative challenges.
        </p>

        <div className="aboutBody">
          <p>
            64 Floors is a creative endeavor where each “floor” is its own
            artistic project. The aim is to attempt, learn, and improve —
            professionally and artistically — one floor at a time.
          </p>
          <p>
            Every floor is both a personal challenge and a public exhibit: a
            step in an ongoing journey of creative exploration. The project
            blends traditional art with modern tech, personal storytelling,
            and finding creativity in the mundane.
          </p>
          <p className="aboutCloser">
            Creativity can be found in anything.
          </p>
        </div>

        <div className="aboutFacts">
          <div className="aboutFact">
            <span className="aboutFactLabel">Format</span>
            <span className="aboutFactValue">64 floors</span>
          </div>
          <div className="aboutFact">
            <span className="aboutFactLabel">Started</span>
            <span className="aboutFactValue">July 2021</span>
          </div>
        </div>
      </section>
    </div>
  );
}
