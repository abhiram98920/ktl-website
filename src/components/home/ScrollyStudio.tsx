"use client";

import Image from "next/image";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { MutableRefObject, Suspense, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
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

function createOfficeTexture(color: string, accent: string) {
  if (typeof document === "undefined") return null;

  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const context = canvas.getContext("2d");

  if (!context) return null;

  context.fillStyle = color;
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.strokeStyle = accent;
  context.globalAlpha = 0.18;

  for (let index = -128; index < 256; index += 16) {
    context.beginPath();
    context.moveTo(index, 0);
    context.lineTo(index + 128, 128);
    context.stroke();
  }

  context.globalAlpha = 0.08;
  for (let index = 0; index < 128; index += 8) {
    context.fillRect(0, index, 128, 1);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2.5, 2.5);
  texture.colorSpace = THREE.SRGBColorSpace;

  return texture;
}

function materialForMesh(name: string, textures: Record<string, THREE.Texture | null>) {
  const normalized = name.toLowerCase();

  if (normalized.includes("flourescent")) {
    return new THREE.MeshStandardMaterial({
      color: "#f8fbff",
      emissive: "#dce9ff",
      emissiveIntensity: 0.7,
      roughness: 0.35,
      metalness: 0.05,
    });
  }

  if (normalized.includes("wall")) {
    return new THREE.MeshStandardMaterial({
      color: "#eef2f8",
      map: textures.wall,
      roughness: 0.86,
      metalness: 0.02,
    });
  }

  if (normalized.includes("desk") || normalized.includes("table") || normalized.includes("shelves")) {
    return new THREE.MeshStandardMaterial({
      color: "#b98f67",
      map: textures.wood,
      roughness: 0.64,
      metalness: 0.04,
    });
  }

  if (normalized.includes("bottle")) {
    return new THREE.MeshStandardMaterial({
      color: "#4f6ba6",
      map: textures.accent,
      roughness: 0.48,
      metalness: 0.1,
    });
  }

  return new THREE.MeshStandardMaterial({
    color: normalized.includes("cube") ? "#8fa2c8" : "#d7dee9",
    map: normalized.includes("cube") ? textures.fabric : textures.wall,
    roughness: 0.74,
    metalness: 0.06,
  });
}

function OfficeModel({ progressRef }: { progressRef: MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null);
  const object = useLoader(OBJLoader, "/models/ceo-office-design-simplified.obj");
  const model = useMemo(() => {
    const clone = object.clone(true);
    const textures = {
      accent: createOfficeTexture("#4f6ba6", "#ffffff"),
      fabric: createOfficeTexture("#8fa2c8", "#394f82"),
      wall: createOfficeTexture("#eef2f8", "#4f6ba6"),
      wood: createOfficeTexture("#b98f67", "#6f4b30"),
    };
    const bounds = new THREE.Box3().setFromObject(clone);
    const center = new THREE.Vector3();
    const size = new THREE.Vector3();
    bounds.getCenter(center);
    bounds.getSize(size);

    const scale = 4.8 / (Math.max(size.x, size.y, size.z) || 1);
    clone.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
    clone.scale.setScalar(scale);

    clone.traverse((child) => {
      const mesh = child as THREE.Mesh;

      if (!mesh.isMesh) return;

      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.material = materialForMesh(mesh.name, textures);
    });

    return clone;
  }, [object]);

  useFrame(({ clock, camera }) => {
    const progress = progressRef.current;
    const time = clock.elapsedTime;

    camera.position.set(2 + Math.sin(progress * Math.PI) * 0.65, 1.25 + progress * 0.25, 7.2 - progress * 1.1);
    camera.lookAt(1.15, 0.15, 0);

    if (!groupRef.current) return;
    groupRef.current.position.set(1.45, -0.46 + Math.sin(time * 0.34) * 0.035, -0.15);
    groupRef.current.rotation.y = -0.72 + progress * 1.12 + Math.sin(time * 0.24) * 0.04;
    groupRef.current.rotation.x = -0.12 + Math.cos(time * 0.18) * 0.025;
  });

  return (
    <group ref={groupRef}>
      <primitive object={model} />
    </group>
  );
}

function ModelFallback() {
  return (
    <mesh position={[1.45, -0.15, 0]}>
      <boxGeometry args={[2.2, 1.4, 1.4]} />
      <meshStandardMaterial color="#d8dde7" roughness={0.8} />
    </mesh>
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
        <Canvas camera={{ position: [2, 1.25, 7.2], fov: 48 }} dpr={[1, 1.5]} shadows>
          <color attach="background" args={["#f7fbfc"]} />
          <fog attach="fog" args={["#f7fbfc", 7, 15]} />
          <ambientLight intensity={0.9} />
          <directionalLight position={[4, 6, 4]} intensity={2.15} castShadow />
          <pointLight position={[-2.5, 2.2, 3]} color="#4f6ba6" intensity={2.8} />
          <Suspense fallback={<ModelFallback />}>
            <OfficeModel progressRef={progressRef} />
          </Suspense>
          <mesh position={[1.45, -1.12, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[7.2, 6.8]} />
            <meshStandardMaterial color="#eef2f8" roughness={0.9} />
          </mesh>
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
