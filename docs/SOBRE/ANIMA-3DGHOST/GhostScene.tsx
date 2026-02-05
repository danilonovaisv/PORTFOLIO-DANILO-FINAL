
import React, { ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { 
  Environment, 
  ScrollControls, 
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

// Fix: Use React.Component explicitly to ensure proper inheritance of props and state in TypeScript
class ThreeErrorBoundary extends React.Component<ThreeErrorBoundaryProps, ThreeErrorBoundaryState> {
  public state: ThreeErrorBoundaryState = { hasError: false };

  constructor(props: ThreeErrorBoundaryProps) {
    super(props);
  }

  static getDerivedStateFromError(): ThreeErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    // Fix: Accessing this.props and this.state which are now correctly recognized through React.Component
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

const GhostScene: React.FC = () => {
  return (
    <Canvas 
      shadows 
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 6], fov: 35 }}
    >
      <color attach="background" args={['transparent' as any]} />
      
      <ambientLight intensity={0.5} />
      
      {/* Standard cinematic light */}
      <spotLight 
        position={[10, 10, 10]} 
        angle={0.15} 
        /* Fix: Changed '平衡umbra' to 'penumbra' to resolve TypeScript error */
        penumbra={1} 
        intensity={1.5} 
        castShadow 
      />
      
      <pointLight position={[-5, 5, -5]} intensity={1} />
      
      <Environment preset="city" />

      <ScrollControls pages={4} damping={0.15}>
        <ThreeErrorBoundary fallback={null}>
          <GhostModel />
        </ThreeErrorBoundary>
      </ScrollControls>

      {/* Subtle floor shadow */}
      <ContactShadows 
        position={[0, -2.5, 0]} 
        opacity={0.2} 
        scale={15} 
        blur={2} 
        far={4} 
      />
    </Canvas>
  );
};

export default GhostScene;
