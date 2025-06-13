'use client';
import Image from "next/image";
import { useState, useEffect, useRef } from 'react';
import styles from "./page.module.css";

export default function Project(props) {
  return (
    <div className={styles.projectView}>
      <h1>{props.info.title}</h1>
        <div style={{ position: 'relative', width: '90%', height: '100%' }}>
            <Image
              src={props.info.imagePath}
              alt="Example"
              fill
              style={{ objectFit: 'contain' }} // or 'cover' depending on how you want it to scale
            />
        </div>
        <div className={styles.projectDesc}>{props.info.desc}</div>
        <div className={styles.closeBtn} onClick={props.close}>Close</div>
    </div>
  );
}
