'use client';
import { useFrame,useThree } from '@react-three/fiber';
import { useRef } from 'react';
import { Vector3 } from 'three';

export default function Ghost(){
 const ref=useRef<any>(null);
 const {mouse}=useThree();
 const target=new Vector3();
 useFrame(({clock})=>{
  if(!ref.current)return;
  target.set(mouse.x*8,mouse.y*5,0);
  ref.current.position.lerp(target,0.05);
  ref.current.material.emissiveIntensity=4.5+Math.sin(clock.getElapsedTime()*1.5)*0.6;
 });
 return(
  <mesh ref={ref}>
   <sphereGeometry args={[2.2,40,40]}/>
   <meshStandardMaterial transparent opacity={0.85} color="#0a102f" emissive="#2f6bff" emissiveIntensity={4.5}/>
  </mesh>
 );
}