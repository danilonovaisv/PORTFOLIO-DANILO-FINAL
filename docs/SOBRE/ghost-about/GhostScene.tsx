
import React, { ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { 
  Environment, 
  ScrollControls, 
  Sparkles, 
  ContactShadows
} from '@react-three/drei';
import GhostModel from './GhostModel';

interface ThreeErrorBoundaryProps {
  children?: ReactNode;
  fallback: ReactNode;
}

interface ThreeErrorBoundaryState {
  hasError: boolean;
}

class ThreeErrorBoundary extends React.Component<ThreeErrorBoundaryProps, ThreeErrorBoundaryState> {
  constructor(props: ThreeErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

const AmbientLight = 'ambientLight' as any;
const DirectionalLight = 'directionalLight' as any;
const PointLight = 'pointLight' as any;
const Fog = 'fog' as any;

const GhostScene: React.FC = () => {
  return (
    <Canvas 
      shadows 
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }} // Alpha true permite ver o que está atrás do canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
    >
      {/* Background transparente para mostrar o Overlay que está na camada de baixo */}
      
      <AmbientLight intensity={0.5} />
      
      <DirectionalLight 
        position={[2, 5, 2]} 
        intensity={1.5} 
        castShadow
      />
      
      <PointLight position={[-5, 2, 2]} intensity={1} />
      
      <Environment preset="city" />
      
      <Sparkles 
        count={60} 
        scale={10} 
        size={1.5} 
        speed={0.3} 
        opacity={0.2} 
        color="#ffffff" 
      />

      <ScrollControls pages={4} damping={0.1}>
        <ThreeErrorBoundary fallback={null}>
          <GhostModel />
        </ThreeErrorBoundary>
      </ScrollControls>

      <ContactShadows 
        position={[0, -2.2, 0]} 
        opacity={0.2} 
        scale={10} 
        blur={2} 
        far={4} 
      />
    </Canvas>
  );
};

export default GhostScene;
