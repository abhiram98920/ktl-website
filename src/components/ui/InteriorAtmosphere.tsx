"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import styles from "./InteriorAtmosphere.module.css";

export default function InteriorAtmosphere() {
  const [point, setPoint] = useState({ x: -80, y: -80 });

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      setPoint({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <>
      <div className={styles.loader} aria-hidden="true">
        <span></span>
        <p>Where space takes shape...</p>
      </div>
      <div className={styles.atmosphere} aria-hidden="true">
        <span className={styles.lineOne}></span>
        <span className={styles.lineTwo}></span>
        <span className={styles.panelOne}></span>
        <span className={styles.panelTwo}></span>
      </div>
      <div
        className={styles.cursor}
        style={{ "--x": `${point.x}px`, "--y": `${point.y}px` } as CSSProperties}
        aria-hidden="true"
      />
    </>
  );
}
