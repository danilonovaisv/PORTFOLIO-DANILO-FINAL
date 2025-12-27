import * as THREE from 'three';
import { useVideoTexture, useScroll, useCursor } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';
import { BRAND } from '@/config/brand';

export default function VideoHeroScene() {
  const meshRef = useRef<THREE.Mesh>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hovered, setHovered] = useState(false);
  const scroll = useScroll();

  useCursor(hovered);

  // Use Brand Video as a proper video texture to ensure play() exists
  const texture = useVideoTexture(BRAND.video.manifesto, {
    crossOrigin: 'anonymous',
    muted: true,
    loop: true,
    start: true,
    autoplay: true,
    playsInline: true,
  }) as THREE.VideoTexture;
  texture.generateMipmaps = false;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  // texture.toneMapped = false; // Property might not exist on type, can ignore or cast "any" if needed, but toneMapped is usually on material. Texture usually doesn't have toneMapped in types?
  // It's on Texture in recent Three versions. If error persists, remove it or cast.
  // Actually, 'toneMapped' is a property of Material, not Texture usually. 'encoding' was on texture.
  // The user snippet had `texture.toneMapped = false`.
  // I will check if I can set it on the material instead. `meshBasicMaterial map={texture} toneMapped={false}`.
  // So I'll remove it from here.

  useEffect(() => {
    const video = texture.image as HTMLVideoElement | undefined;
    if (!video) return;

    videoRef.current = video;
    // Safety: ensure desired flags (drei already sets most)
    video.muted = true;
    video.loop = true;
    video.playsInline = true;

    // Some browsers block autoplay until interaction; ignore failures
    video.play().catch(() => {});
  }, [texture]);

  // Controle de scroll e animação loop
  useFrame((_state, _delta) => {
    if (!meshRef.current) return;

    // Safety check for scroll.range
    const progress = scroll ? scroll.range(0, 1) : 0;

    // --- TIMETABLE CALCULATION ---
    let s = 1; // Scale
    let py = 0; // Position Y
    let px = 0; // Position X
    let rz = 0; // Rotation Z
    let ry = 0; // Rotation Y
    let rx = 0; // Rotation X

    // Interpolation based on stages
    // 0 -> 10%
    if (progress <= 0.1) {
      const p = progress / 0.1;
      s = THREE.MathUtils.lerp(1, 1.2, p);
      py = THREE.MathUtils.lerp(0, -0.2, p);
      rz = THREE.MathUtils.lerp(0, 0.05, p);
    }
    // 10 -> 30%
    else if (progress <= 0.3) {
      const p = (progress - 0.1) / 0.2;
      s = THREE.MathUtils.lerp(1.2, 1.8, p);
      py = THREE.MathUtils.lerp(-0.2, -0.6, p);
      px = THREE.MathUtils.lerp(0, 0.3, p);
      rz = THREE.MathUtils.lerp(0.05, 0.1, p);
    }
    // 30 -> 60%
    else if (progress <= 0.6) {
      const p = (progress - 0.3) / 0.3;
      s = THREE.MathUtils.lerp(1.8, 2.8, p);
      py = THREE.MathUtils.lerp(-0.6, -1.4, p);
      px = THREE.MathUtils.lerp(0.3, 0.8, p);
      rz = THREE.MathUtils.lerp(0.1, 0.15, p);
      ry = THREE.MathUtils.lerp(0, 0.1, p);
    }
    // 60 -> 80%
    else if (progress <= 0.8) {
      const p = (progress - 0.6) / 0.2;
      s = THREE.MathUtils.lerp(2.8, 3.5, p);
      py = THREE.MathUtils.lerp(-1.4, -1.8, p);
      px = THREE.MathUtils.lerp(0.8, 1.2, p);
      rz = THREE.MathUtils.lerp(0.15, 0.18, p);
      ry = THREE.MathUtils.lerp(0.1, 0.2, p);
    }
    // 80 -> 100%
    else {
      const p = (progress - 0.8) / 0.2;
      s = THREE.MathUtils.lerp(3.5, 4.2, p);
      py = THREE.MathUtils.lerp(-1.8, -2.2, p);
      px = THREE.MathUtils.lerp(1.2, 1.5, p);
      rz = THREE.MathUtils.lerp(0.18, 0.2, p);
      ry = THREE.MathUtils.lerp(0.2, 0.25, p);
      rx = THREE.MathUtils.lerp(0, -0.05, p);
    }

    // --- APPLY TRANSFORMS WITH LERP SMOOTHING ---
    // User requested "0.1" lerp factor for smoothness

    // Hover scale effect
    const hoverScale = hovered ? 1.05 : 1.0;
    const finalScale = s * hoverScale;

    meshRef.current.scale.x = THREE.MathUtils.lerp(
      meshRef.current.scale.x,
      finalScale,
      0.1
    );
    meshRef.current.scale.y = THREE.MathUtils.lerp(
      meshRef.current.scale.y,
      finalScale * 0.5625,
      0.1
    ); // 16:9 Aspect

    meshRef.current.position.x = THREE.MathUtils.lerp(
      meshRef.current.position.x,
      px,
      0.08
    );
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      py,
      0.08
    );
    meshRef.current.position.z = 0;

    // Hover rotation effect (z-twist)
    const hoverRotZ = hovered ? 0.02 : 0;

    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      rx,
      0.05
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      ry,
      0.05
    );
    meshRef.current.rotation.z = THREE.MathUtils.lerp(
      meshRef.current.rotation.z,
      rz + hoverRotZ,
      0.05
    );

    // --- VOLUME CONTROL ---
    if (videoRef.current) {
      if (progress > 0.3) {
        videoRef.current.muted = false;
        // Volume ramps from 0 to 1 between 0.3 and 0.8
        const vol = Math.min(Math.max((progress - 0.3) * 2, 0), 1);
        videoRef.current.volume = vol;
      } else {
        videoRef.current.muted = true;
      }
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      position={[0, 0, 0]}
    >
      <planeGeometry args={[7, 7]} />{' '}
      {/* Base size ~7 units width to match "65vw" approx at z=0 with standard camera */}
      {/* 
        Note: With Camera Z=5, FOV=75:
        Visible Height at Z=0 = 2 * 5 * tan(75/2) ~ 7.6
        Visible Width (Aspect 1.77) ~ 13.5
        65vw of 13.5 is ~8.7. 
        User code used lerp to 1. 
        I'll stick to a reasonable base size effectively scaled by the component.
        User's snippet used scale 1.
        If I use 1x1 plane, it's tiny. 
        I'll use args={[1, 1]} and rely on the scale factor being "relative to screen" via logic logic, 
        OR I assume the user's snippet was correct for *their* camera setup.
        User snippet: "scale.y = targetScale * 0.5625".
        If targetScale starts at 1, mesh is 1 unit wide.
        1 unit wide at Z=5 (dist) is very small.
        I will increase the base geometry size to 5, so Scale 1 = 5 units.
      */}
      <planeGeometry args={[5, 5]} />
      <meshBasicMaterial map={texture} toneMapped={false} transparent />
    </mesh>
  );
}
