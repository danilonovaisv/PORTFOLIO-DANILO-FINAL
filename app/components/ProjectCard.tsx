'use client';

import React, { useEffect, useMemo, useRef, RefObject } from 'react';
import { useRouter } from 'next/navigation';
import { motion, Variants, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { View, PerspectiveCamera, useTexture, shaderMaterial } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { damp, damp3 } from 'maath/easing';
import { Project } from '@/content/projects';
import { Vector3 } from 'three';
import * as THREE from 'three';

const imageLayouts: Record<Project['layout'], string> = {
  small: 'aspect-[4/5]',
  medium: 'aspect-video',
  wide: 'aspect-[2/1]',
  rectangle: 'aspect-[3/2]',
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.1,
      duration: 0.75,
      ease: 'easeOut',
    },
  }),
};

const GrayscaleFabric = shaderMaterial(
  { map: null, grayscale: 1 },
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  `
    uniform sampler2D map;
    uniform float grayscale;
    varying vec2 vUv;

    void main() {
      vec4 color = texture2D(map, vUv);
      float gray = dot(color.rgb, vec3(0.2126, 0.7152, 0.0722));
      vec3 mixed = mix(vec3(gray), color.rgb, 1.0 - grayscale);
      gl_FragColor = vec4(mixed, color.a);
    }
  `
);

type ProjectCardProps = {
  project: Project;
  index: number;
  className?: string;
  trackRef: RefObject<HTMLDivElement>;
};

type ProjectSceneProps = {
  project: Project;
  trackRef: RefObject<HTMLDivElement>;
  index: number;
};

const Project3DImage = ({ textureUrl }: { textureUrl: string }) => {
  const texture = useTexture(textureUrl);
  const meshRef = useRef<THREE.Mesh>(null);
  const hoverState = useRef(false);
  const grayscaleVal = useRef(1);
  const targetScale = useRef(new Vector3(1, 1, 1));
  const material = useMemo(() => new GrayscaleFabric(), []);

  useEffect(() => {
    material.uniforms.map.value = texture;
    material.uniforms.grayscale.value = 1;
    material.toneMapped = false;
    return () => {
      material.dispose();
    };
  }, [material, texture]);

  const aspect = useMemo(() => {
    const image = texture.image as HTMLImageElement | undefined;
    if (!image || !image.width || !image.height) return 1;
    return image.width / image.height;
  }, [texture.image]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const baseScale = hoverState.current ? 1.08 : 1;
    const widthFactor = aspect >= 1 ? baseScale * aspect : baseScale;
    const heightFactor = aspect >= 1 ? baseScale : baseScale / aspect;
    targetScale.current.set(widthFactor, heightFactor, 1);
    damp3(meshRef.current.scale, targetScale.current, 9, delta);
    damp(grayscaleVal, 'current', hoverState.current ? 0 : 1, 10, delta);
    material.uniforms.grayscale.value = grayscaleVal.current;
    material.uniforms.map.value = texture;
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={(event) => {
        event.stopPropagation();
        hoverState.current = true;
      }}
      onPointerOut={(event) => {
        event.stopPropagation();
        hoverState.current = false;
      }}
    >
      <planeGeometry
        args={[
          aspect >= 1 ? 1.4 * aspect : 1.4,
          aspect >= 1 ? 1.4 : 1.4 / aspect,
          64,
          64,
        ]}
      />
      <primitive object={material} attach="material" />
    </mesh>
  );
};

const ProjectCardScene = ({ project, trackRef, index }: ProjectSceneProps) => {
  return (
    <View track={trackRef} index={index} visible>
      <PerspectiveCamera makeDefault position={[0, 0, 3]} fov={38} />
      <ambientLight intensity={0.8} />
      <directionalLight position={[3, 4, 2]} intensity={0.8} />
      <Project3DImage textureUrl={project.imageUrl} />
    </View>
  );
};

const ProjectCard = ({ project, index, trackRef, className = '' }: ProjectCardProps) => {
  const router = useRouter();
  const articleRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(articleRef, { amount: 0.25, once: true });

  const handleSelect = () => {
    router.push(`/portfolio/${project.slug}`);
  };

  return (
    <motion.article
      ref={articleRef}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      whileHover={{ scale: 1.02, boxShadow: '0px 25px 45px rgba(15, 23, 42, 0.18)' }}
      onClick={handleSelect}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          handleSelect();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Abrir estudo de caso ${project.title}`}
      viewport={{ once: true, margin: '-10%' }}
      className={`relative z-10 flex cursor-pointer flex-col gap-8 rounded-[2.5rem] bg-white/80 p-8 shadow-[0_30px_120px_rgba(15,23,42,0.15)] transition-all duration-500 ${className}`}
    >
      <div
        ref={trackRef}
        className={`relative w-full overflow-hidden rounded-[2rem] border border-slate-200/70 bg-slate-100/60 ${imageLayouts[project.layout]}`}
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-slate-100/70" />
      </div>

      <div className="flex flex-col gap-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.5em] text-slate-400">
          {project.category.toUpperCase()}
        </span>
        <h3 className="text-3xl font-light leading-tight text-slate-900 md:text-4xl">
          {project.title}
        </h3>
        <p className="text-sm uppercase tracking-[0.35em] text-slate-500">
          {project.client}
        </p>
      </div>

      <motion.span
        whileHover={{ x: 8 }}
        className="flex items-center justify-between rounded-full border border-slate-200/80 px-5 py-3 text-sm font-semibold uppercase tracking-[0.4em] text-slate-600"
        aria-hidden="true"
      >
        <span>ver estudo</span>
        <ArrowUpRight className="h-4 w-4" />
      </motion.span>
    </motion.article>
  );
};

export default ProjectCard;
export { ProjectCardScene };
