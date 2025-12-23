import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useHelper } from '@react-three/drei';
import GhostModel from './GhostModel'; // Assuming GhostModel is defined elsewhere

const Hero: React.FC = () => {
    return (
        <div className="hero-container">
            {/* WebGL Ghost Canvas */}
            <Canvas>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <GhostModel renderOrder={1} depthWrite={false} depthTest={false} />
                <OrbitControls />
            </Canvas>

            {/* Text Content */}
            <div className="hero-text" style={{ zIndex: 2 }}>
                <h1>Design, não é só estética.</h1>
                <p>[É intenção, é estratégia, é experiência.]</p>
                <button>get to know me better</button>
            </div>

            {/* Background Overlay */}
            <div className="hero-overlay" style={{ zIndex: 1 }}></div>
        </div>
    );
};

export default Hero;