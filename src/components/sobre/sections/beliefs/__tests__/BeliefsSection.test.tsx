
import React from 'react';
import { render } from '@testing-library/react';
import { BeliefsSection } from '../BeliefsSection';

// Mock everything that uses browser specific APIs or complicated deps
jest.mock('framer-motion', () => ({
    useScroll: jest.fn(() => ({ scrollYProgress: { on: jest.fn(), get: () => 0 } })),
    useTransform: jest.fn(() => ({ on: jest.fn(), get: () => 0 })),
    useMotionValueEvent: jest.fn(),
    useInView: jest.fn(() => true),
    useAnimation: jest.fn(() => ({ start: jest.fn() })),
    motion: {
        div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
        header: ({ children, ...props }: any) => <header {...props}>{children}</header>,
    },
    cubicBezier: jest.fn(),
}));

jest.mock('@react-three/fiber', () => ({
    Canvas: ({ children }: any) => <div data-testid="canvas-mock">{children}</div>,
    useFrame: jest.fn(),
}));

jest.mock('@react-three/drei', () => ({
    useGLTF: jest.fn(() => ({ scene: { traverse: jest.fn() } })),
    Float: ({ children }: any) => <div data-testid="float-mock">{children}</div>,
}));

jest.mock('next/dynamic', () => () => {
    const DynamicComponent = () => <div data-testid="dynamic-mock">GhostScene</div>;
    DynamicComponent.displayName = 'LoadableComponent';
    return DynamicComponent;
});

describe('BeliefsSection', () => {
    it('renders without crashing', () => {
        const { getByText } = render(<BeliefsSection />);
        expect(getByText(/Acredito no/i)).toBeInTheDocument();
        expect(getByText(/design que/i)).toBeInTheDocument();
    });
});
