"use client";
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleSwarm() {
  const ref = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    const count = 3000;
    const positions = new Float32Array(count * 3);
    const seeded = (index: number) => {
      const value = Math.sin(index * 999.91) * 10000;
      return value - Math.floor(value);
    };
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (seeded(i + 1) - 0.5) * 20;
      positions[i * 3 + 1] = (seeded(i + 2) - 0.5) * 20;
      positions[i * 3 + 2] = (seeded(i + 3) - 0.5) * 10;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    
    // Rotate the entire swarm slowly
    ref.current.rotation.x = state.clock.elapsedTime * 0.05;
    ref.current.rotation.y = state.clock.elapsedTime * 0.03;

    // Scroll effect - map scroll Y to vertical offset
    const scrollY = window.scrollY;
    ref.current.position.y = scrollY * 0.005; // Move particles based on scroll
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.03}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.4}
        />
      </Points>
    </group>
  );
}

export default function ThreeBackground() {
  return (
    <div id="canvas-container">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <color attach="background" args={['#050505']} />
        <ambientLight intensity={0.5} />
        <ParticleSwarm />
      </Canvas>
    </div>
  );
}
