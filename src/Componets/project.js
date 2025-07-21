'use client';
// import { useState, useEffect, useRef } from 'react';
import "./page.css";

export default function Project(props) {
  return (
    <div className="projectView">
      <h1>{props.info.title}</h1>
        <div className="projectItem">
            <img
            className = 'projectImg'
              src={props.info.import}
              alt="Example"
              // style={{ objectFit: 'contain' }} // or 'cover' depending on how you want it to scale
            />
        </div>
        <div className="projectDesc">{props.info.desc}</div>
        <div className="closeBtn" onClick={props.close}>Close</div>
    </div>
  );
}
