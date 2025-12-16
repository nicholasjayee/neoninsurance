"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

function Particles(props: React.ComponentProps<typeof Points>) {
  const ref = useRef<THREE.Points>(null!);
  
  // Generate particles in a sphere/shield shape
  const [positions, colors] = useMemo(() => {
    const count = 2000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const color1 = new THREE.Color("#00F0FF"); // Neon Blue
    const color2 = new THREE.Color("#BC13FE"); // Neon Purple

    for (let i = 0; i < count; i++) {
      // Spherical distribution
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const r = 1.5 + Math.random() * 0.5; // Radius variation

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Mix colors
      const mixedColor = color1.clone().lerp(color2, Math.random());
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }
    return [positions, colors];
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} colors={colors} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          vertexColors
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

export default function Hero3D() {
  return (
    <div className="w-full h-[600px] absolute top-0 left-0 -z-10 opacity-60">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <fog attach="fog" args={['#050505', 5, 15]} />
        <ambientLight intensity={0.5} />
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <Particles />
        </Float>
      </Canvas>
    </div>
  );
}
