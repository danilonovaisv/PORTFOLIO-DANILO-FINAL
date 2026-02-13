
import { useState, useEffect, useCallback } from 'react';
import { useThree } from '@react-three/fiber';

/**
 * Hook para alinhar o Ghost ao centro do texto ativo.
 * Retorna o offset Y (em unidades R3F) necessário para centralizar o objeto.
 * 
 * @returns {number} alignmentY - Posição Y calculada
 */
export const useGhostTextAlignment = () => {
    const { viewport, size } = useThree();
    const [alignmentY, setAlignmentY] = useState(0);

    const calculateAlignment = useCallback(() => {
        if (typeof window === 'undefined') return;

        // Busca o elemento de texto ativo (marcado via data-attribute)
        // O elemento deve ter `data-ghost-target="true"`
        const activeText = document.querySelector('[data-ghost-target="true"]');

        if (!activeText) {
            // Se não encontrar, alinha ao centro da tela por padrão (fallback)
            // Mas a regra diz: "Ghost nunca pode alinhar com viewport center antes do manifesto"
            // Se não tem texto, deve manter posição base. Retornamos 0 ou null.
            return;
        }

        const rect = activeText.getBoundingClientRect();

        // Centro Y do texto em pixels (relativo à janela)
        const textCenterYPx = rect.top + rect.height / 2;

        // Centro Y da viewport em pixels
        const viewportCenterYPx = window.innerHeight / 2;

        // Diferença em pixels (positivo = texto abaixo do centro, negativo = acima)
        const deltaYPx = viewportCenterYPx - textCenterYPx;

        // Converter pixels para unidades Three.js
        // A altura da viewport Three.js corresponde a `window.innerHeight` pixels
        // Fator de conversão: viewport.height / size.height
        const pxToR3F = viewport.height / size.height;

        const deltaYR3F = deltaYPx * pxToR3F;

        setAlignmentY(deltaYR3F);

    }, [viewport.height, size.height]);

    useEffect(() => {
        calculateAlignment();

        const handleResize = () => calculateAlignment();
        window.addEventListener('resize', handleResize);

        // Observer para detectar mudanças no DOM (troca de frases)
        const observer = new MutationObserver(calculateAlignment);
        observer.observe(document.body, {
            subtree: true,
            attributes: true,
            attributeFilter: ['data-ghost-target']
        });

        return () => {
            window.removeEventListener('resize', handleResize);
            observer.disconnect();
        };
    }, [calculateAlignment]);

    return alignmentY;
};
