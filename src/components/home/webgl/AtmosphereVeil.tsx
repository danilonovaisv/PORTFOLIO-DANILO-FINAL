import { Vector3 } from 'three';

interface AtmosphereVeilProps {
    ghostPosRef: React.MutableRefObject<Vector3>;
}

export default function AtmosphereVeil({ ghostPosRef: _ghostPosRef }: AtmosphereVeilProps) {
    return (
        <mesh position={[0, 0, -5]}>
            <planeGeometry args={[20, 20]} />
            <meshBasicMaterial color="#0a0a2e" transparent opacity={0.3} />
        </mesh>
    );
}
