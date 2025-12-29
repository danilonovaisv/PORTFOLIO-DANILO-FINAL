import { extend } from '@react-three/fiber';
import { UnrealBloomPass } from 'three-stdlib';

extend({ UnrealBloomPass });

export default function BloomPass({ 
  intensity = 3.2, 
  threshold = 0.08, 
  radius = 0.85 
}) {
  return (
    <unrealBloomPass
      args={[undefined, intensity, threshold, radius]}
    />
  );
}