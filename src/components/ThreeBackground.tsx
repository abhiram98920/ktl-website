"use client";
import { Canvas, useFrame } from '@react-three/fiber';
import { Grid, Environment, Float } from '@react-three/drei';
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

function ArchitecturalScene() {
  const groupRef = useRef<THREE.Group>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      // Smoothly interpolate rotation based on scroll position
      const targetRotationY = scrollY * 0.001;
      const targetRotationX = Math.sin(scrollY * 0.001) * 0.2;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, 0.05);
    }
    // Gentle camera panning
    state.camera.position.x = Math.sin(state.clock.elapsedTime * 0.2) * 2;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1.5} color="#f59e0b" />
      <directionalLight position={[-10, 10, -10]} intensity={0.5} color="#ffffff" />
      
      {/* Infinite architectural grid */}
      <Grid 
        position={[0, -2, 0]} 
        infiniteGrid 
        fadeDistance={50} 
        cellColor="#e5e7eb" 
        sectionColor="#d1d5db" 
      />

      {/* Floating abstract structural elements representing interior design */}
      <group ref={groupRef}>
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          {/* Wireframe wall 1 */}
          <mesh position={[-3, 1, -2]}>
            <boxGeometry args={[4, 5, 0.1]} />
            <meshStandardMaterial color="#ffffff" transparent opacity={0.6} wireframe />
          </mesh>
          {/* Solid accent wall */}
          <mesh position={[2, 0.5, -4]} rotation={[0, -Math.PI / 4, 0]}>
            <boxGeometry args={[5, 4, 0.2]} />
            <meshStandardMaterial color="#f59e0b" transparent opacity={0.9} />
          </mesh>
          {/* Glass partition */}
          <mesh position={[0, 0, 2]} rotation={[0, Math.PI / 6, 0]}>
            <planeGeometry args={[6, 4]} />
            <meshPhysicalMaterial 
              color="#ffffff" 
              transparent 
              opacity={0.3} 
              roughness={0.1} 
              metalness={0.2} 
              side={THREE.DoubleSide} 
            />
          </mesh>
        </Float>
      </group>

      <Environment preset="city" />
    </>
  );
}

export default function ThreeBackground() {
  return (
    <Canvas
      camera={{ position: [0, 2, 10], fov: 45 }}
      style={{ background: 'transparent' }}
      gl={{ alpha: true, antialias: true }}
    >
      <ArchitecturalScene />
    </Canvas>
  );
}
