"use client";

import Image from "next/image";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { MutableRefObject, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import styles from "./ScrollyStudio.module.css";

const beats = [
  {
    label: "01 | Discover",
    title: "We translate your workflow into a spatial brief.",
    copy: "Team size, departments, visitor movement, storage, acoustic needs, power points, and brand tone are shaped before design begins.",
  },
  {
    label: "02 | Design",
    title: "Layouts, finishes, lighting, and services become one plan.",
    copy: "You see how cabins, open workstations, meeting rooms, ceilings, flooring, and MEP decisions fit together before site execution.",
  },
  {
    label: "03 | Deliver",
    title: "Execution stays aligned with budget, deadline, and finish quality.",
    copy: "From modular installation to final handover, KTL keeps site coordination transparent and the workspace ready for day-one use.",
  },
];

function FrameTunnel({ progressRef }: { progressRef: MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null);
  const frames = useMemo(() => Array.from({ length: 12 }, (_, index) => index), []);

  useFrame(({ clock, camera }) => {
    const progress = progressRef.current;
    const time = clock.elapsedTime;

    camera.position.z = 7.8 - progress * 1.6;
    camera.position.x = Math.sin(progress * Math.PI) * 0.7;
    camera.lookAt(0, 0, -5);

    if (!groupRef.current) return;
    groupRef.current.position.z = progress * 11;
    groupRef.current.rotation.y = (progress - 0.5) * 0.7 + Math.sin(time * 0.28) * 0.08;
    groupRef.current.rotation.x = Math.cos(time * 0.22) * 0.06;
  });

  return (
    <group ref={groupRef}>
      {frames.map((index) => (
        <mesh
          key={index}
          position={[0, 0, -index * 1.65]}
          rotation={[0, 0, index * 0.09]}
          scale={[1 + index * 0.045, 1 + index * 0.045, 1]}
        >
          <boxGeometry args={[4.9, 2.7, 0.055]} />
          <meshStandardMaterial
            color={index % 3 === 0 ? "#4f6ba6" : "#7d91bf"}
            emissive={index % 3 === 0 ? "#28395f" : "#4f6ba6"}
            emissiveIntensity={0.2}
            metalness={0.06}
            roughness={0.5}
            wireframe
          />
        </mesh>
      ))}
      <mesh position={[0, -1.7, -8]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 18, 24, 24]} />
        <meshStandardMaterial color="#4f6ba6" wireframe opacity={0.3} transparent />
      </mesh>
    </group>
  );
}

export default function ScrollyStudio() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);
  const [activeBeat, setActiveBeat] = useState(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const progress = Math.min(0.999, Math.max(0, value));
    progressRef.current = progress;
    const nextBeat = Math.min(beats.length - 1, Math.floor(progress * beats.length));
    setActiveBeat((currentBeat) => (currentBeat === nextBeat ? currentBeat : nextBeat));
  });

  const cardOneY = useTransform(scrollYProgress, [0, 1], ["16%", "-34%"]);
  const cardTwoY = useTransform(scrollYProgress, [0, 1], ["34%", "-22%"]);

  return (
    <section ref={sectionRef} className={styles.scrollyStage} data-watermark="Process">
      <div className={styles.stickyScene}>
        <Canvas camera={{ position: [0, 0, 7.8], fov: 52 }} dpr={1}>
          <color attach="background" args={["#f7fbfc"]} />
          <ambientLight intensity={0.85} />
          <directionalLight position={[4, 5, 4]} intensity={1.7} />
          <pointLight position={[-3, 1, 3]} color="#4f6ba6" intensity={3.4} />
          <FrameTunnel progressRef={progressRef} />
        </Canvas>

        <div className={styles.depthCards} aria-hidden="true">
          <motion.div className={`${styles.depthCard} ${styles.cardOne}`} style={{ y: cardOneY }}>
            <Image src="/profile-images/profile_page_05_image_02_xref_353.jpeg" alt="" fill sizes="24vw" />
          </motion.div>
          <motion.div className={`${styles.depthCard} ${styles.cardTwo}`} style={{ y: cardTwoY }}>
            <Image src="/profile-images/profile_page_10_image_01_xref_53.jpeg" alt="" fill sizes="25vw" />
          </motion.div>
        </div>

        <div className={styles.storyRail}>
          <motion.article
            key={beats[activeBeat].label}
            className={styles.storyBeat}
            initial={{ opacity: 0, y: 30, scale: 0.98, rotateX: -8 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span>{beats[activeBeat].label}</span>
            <h2>{beats[activeBeat].title}</h2>
            <p>{beats[activeBeat].copy}</p>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
