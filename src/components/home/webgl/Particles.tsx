interface ParticlesProps {
  count: number;
  speedRef: React.MutableRefObject<number>;
}

export default function Particles({
  count: _count,
  speedRef: _speedRef,
}: ParticlesProps) {
  return (
    <points>
      <bufferGeometry />
      <pointsMaterial size={0.05} color="white" />
    </points>
  );
}
