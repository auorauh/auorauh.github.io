
// import { useState, useEffect, useRef } from 'react';
import "./page.css";

export default function About(props) {
  return (
    <section className="projectView">
      <h1>64 Floors Project</h1>
        <div className="projectItem">
            <h2>64 Floors is a creative endevor where each "floor" or project is a seperate artistic project. The aim is to attempt, learn, and improve all my skills professional and artistially. Every floor is both a personal challenge and a public exhibit, posted as a step in my journey towards creative exploration. The project blends traditional art with modern tech, personal story telling and finding creativity in the mundane, showing creativity can be found in anything.</h2>
        </div>
        <div className="projectDesc">Est 2021</div>
        <div className="closeBtn" onClick={props.close}>Close</div>
    </section>
  );
}
