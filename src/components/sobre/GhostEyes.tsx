'use client';

import React, { useEffect, useState } from 'react';
import styles from './GhostEyes.module.css';

const GhostEyes: React.FC = () => {
  // Estado para armazenar a direção do olhar (-1, 0, ou 1)
  const [lookDir, setLookDir] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const { clientX, clientY } = event;

      // Lógica para replicar a grade 3x3 do original
      // Divide a tela em três terços verticais e horizontais
      let x = 0;
      let y = 0;

      // Define X (-1: esquerda, 0: centro, 1: direita)
      if (clientX < innerWidth / 3) x = -1;
      else if (clientX > (innerWidth * 2) / 3) x = 1;

      // Define Y (-1: cima, 0: centro, 1: baixo)
      if (clientY < innerHeight / 3) y = -1;
      else if (clientY > (innerHeight * 2) / 3) y = 1;

      setLookDir({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Limpeza do evento quando o componente desmontar
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    // Inline style necessário para CSS custom properties dinâmicas (--target-x, --target-y)
    <div
      className={styles.ghostContainer}
      style={
        {
          '--target-x': lookDir.x,
          '--target-y': lookDir.y,
        } as React.CSSProperties
      }
      aria-hidden="true"
    >
      <svg viewBox="0 0 14 14" className={styles.svgIcon}>
        <defs>
          <rect
            id="pixel-dot-rect"
            x="0.175"
            y="0.175"
            width="0.7"
            height="0.7"
            rx="0.2"
          />
          <pattern
            id="pixel-dot-pattern"
            viewBox="0 0 1 1"
            width="1"
            height="1"
            patternUnits="userSpaceOnUse"
          >
            {/* CORPO: Azul Elétrico */}
            <use fill="#0048ff" href="#pixel-dot-rect" />
          </pattern>
          <mask id="pixel-dot-mask">
            <rect fill="white" width="14" height="14" />
            <path
              transform="translate(0 0.5)"
              fill="none"
              stroke="black"
              d="M 0 0 h5M 9 0h5 M 0 1h3 M 11 1h3 M 0 2h2 M 12 2h2M 0 3h1 M 13 3h1M 0 4h1 M 13 4h1 M 0 5h1 M 13 5h1 M 4 12h1 M 9 12h1 M 0 13h1 M 3 13h3 M8 13h3 M 13 13h1"
            />
          </mask>
        </defs>

        <rect
          mask="url(#pixel-dot-mask)"
          fill="url(#pixel-dot-pattern)"
          width="14"
          height="14"
        />

        {/* GRUPO DOS OLHOS: Controlado pela classe .eyeGroup e variáveis CSS */}
        <g className={styles.eyeGroup}>
          {/* Olho Esquerdo */}
          <g transform="translate(2 3)">
            {/* Fundo do olho (Azul Escuro/Dark) */}
            <path
              transform="translate(0 0.5)"
              fill="none"
              stroke="#040013"
              d="M 1 0 h2 M 0 1h4 M 0 2h4 M 0 3h4 M 1 4h2"
            />
            {/* Pupila (Roxo) */}
            <g fill="#8705f2" className="dot">
              <use transform="translate(1 1)" href="#pixel-dot-rect" />
              <use transform="translate(2 1)" href="#pixel-dot-rect" />
              <use transform="translate(1 2)" href="#pixel-dot-rect" />
              <use transform="translate(2 2)" href="#pixel-dot-rect" />
            </g>
          </g>

          {/* Olho Direito */}
          <g transform="translate(8 3)">
            {/* Fundo do olho (Azul Escuro/Dark) */}
            <path
              transform="translate(0 0.5)"
              fill="none"
              stroke="#040013"
              d="M 1 0 h2 M 0 1h4 M 0 2h4 M 0 3h4 M 1 4h2"
            />
            {/* Pupila (Roxo) */}
            <g fill="#8705f2" className="dot">
              <use transform="translate(1 1)" href="#pixel-dot-rect" />
              <use transform="translate(2 1)" href="#pixel-dot-rect" />
              <use transform="translate(1 2)" href="#pixel-dot-rect" />
              <use transform="translate(2 2)" href="#pixel-dot-rect" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default GhostEyes;
