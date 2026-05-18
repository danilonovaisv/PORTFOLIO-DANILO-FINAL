"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function ShaderAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current

    const vertexShader = `
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `

    const fragmentShader = `
      #define TWO_PI 6.2831853072

      precision highp float;
      uniform vec2 resolution;
      uniform float time;

      float random(in float x) {
        return fract(sin(x) * 1e4);
      }

      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
      }

      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);

        vec2 fMosaicScal = vec2(4.0, 2.0);
        vec2 vScreenSize = vec2(256.0, 256.0);
        uv.x = floor(uv.x * vScreenSize.x / fMosaicScal.x) / (vScreenSize.x / fMosaicScal.x);
        uv.y = floor(uv.y * vScreenSize.y / fMosaicScal.y) / (vScreenSize.y / fMosaicScal.y);

        float t = time * 0.06 + random(uv.x) * 0.4;
        float lineWidth = 0.0008;

        vec3 color = vec3(0.0);
        for(int j = 0; j < 3; j++){
          for(int i = 0; i < 5; i++){
            color[j] += lineWidth * float(i * i) / abs(
              fract(t - 0.01 * float(j) + float(i) * 0.01) * 1.0 - length(uv)
            );
          }
        }

        gl_FragColor = vec4(color[2], color[1], color[0], 1.0);
      }
    `

    const camera = new THREE.Camera()
    camera.position.z = 1

    const scene = new THREE.Scene()
    const geometry = new THREE.PlaneGeometry(2, 2)

    const uniforms = {
      time: { value: 1.0 },
      resolution: { value: new THREE.Vector2() },
    }

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
    })

    scene.add(new THREE.Mesh(geometry, material))

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const canvas = renderer.domElement
    canvas.style.position = "absolute"
    canvas.style.inset = "0"
    canvas.style.width = "100%"
    canvas.style.height = "100%"
    canvas.setAttribute("aria-hidden", "true")
    container.appendChild(canvas)

    const onResize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      renderer.setSize(w, h, false)
      uniforms.resolution.value.set(canvas.width, canvas.height)
    }

    onResize()
    window.addEventListener("resize", onResize, { passive: true })

    let animationId = 0
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      uniforms.time.value += 0.05
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", onResize)
      if (container.contains(canvas)) container.removeChild(canvas)
      renderer.dispose()
      geometry.dispose()
      material.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      data-testid="shader-lines-canvas"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        background: "#040013",
      }}
    />
  )
}
