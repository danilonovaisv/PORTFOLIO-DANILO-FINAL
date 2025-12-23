'use client';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { ShaderMaterial } from 'three';

export default function BackgroundVeil(){
 const ref=useRef<ShaderMaterial>(null);
 useFrame(({mouse})=>{
  if(ref.current) ref.current.uniforms.uMouse.value=mouse;
 });
 return(
  <mesh position={[0,0,-10]}>
   <planeGeometry args={[100,100]}/>
   <shaderMaterial ref={ref} transparent uniforms={{uMouse:{value:{x:0,y:0}}}}
    vertexShader={`varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`}
    fragmentShader={`uniform vec2 uMouse;varying vec2 vUv;void main(){float d=distance(vUv,uMouse*0.5+0.5);float a=smoothstep(0.6,0.2,d);gl_FragColor=vec4(0.02,0.03,0.12,a);}`}
   />
  </mesh>
 );
}