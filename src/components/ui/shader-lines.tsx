"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { m } from "motion/react"
import type { MotionValue } from "motion/react"

interface ShaderAnimationProps {
  /** Framer Motion MotionValue<number> para controle de opacidade via scroll */
  opacity?: MotionValue<number>
}

export function ShaderAnimation({ opacity }: ShaderAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current

    const vertexShader = `
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `

    // Ghost Design System palette mapped to GLSL vec3:
    //   #040013 (Void Black)   → vec3(0.016, 0.000, 0.075)
    //   #0048ff (Brand Primary) → vec3(0.000, 0.282, 1.000)
    //   #4fe6ff (Ghost Accent)  → vec3(0.310, 0.902, 1.000)
    const fragmentShader = `
      precision highp float;
      uniform vec2  resolution;
      uniform float time;

      float random(in float x) {
        return fract(sin(x) * 1.0e4);
      }
      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453);
      }

      void main(void) {
        vec3 bg          = vec3(0.016, 0.000, 0.075);
        vec3 bluePrimary = vec3(0.000, 0.282, 1.000);
        vec3 ghostCyan   = vec3(0.310, 0.902, 1.000);

        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);

        // Mosaic quantization for spectral / pixel-grid aesthetic
        vec2 mosaicScale  = vec2(4.0, 2.0);
        vec2 screenPixels = vec2(256.0, 256.0);
        uv.x = floor(uv.x * screenPixels.x / mosaicScale.x) / (screenPixels.x / mosaicScale.x);
        uv.y = floor(uv.y * screenPixels.y / mosaicScale.y) / (screenPixels.y / mosaicScale.y);

        float t         = time * 0.06 + random(uv.x) * 0.4;
        float lineWidth = 0.0008;

        // Slow chromatic shift between Ghost Blue and Ghost Cyan
        float blend    = 0.5 + 0.5 * sin(time * 0.25);
        vec3 lineColor = mix(bluePrimary, ghostCyan, blend);

        vec3 color = bg;
        for (int j = 0; j < 3; j++) {
          for (int i = 0; i < 5; i++) {
            float intensity = lineWidth * float(i * i)
              / abs(fract(t - 0.01 * float(j) + float(i) * 0.01) * 1.0 - length(uv));
            // Each layer slightly dimmer to keep subtlety
            color += intensity * lineColor * (1.0 - float(j) * 0.25);
          }
        }

        gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
      }
    `

    const camera = new THREE.Camera()
    camera.position.z = 1

    const scene    = new THREE.Scene()
    const geometry = new THREE.PlaneGeometry(2, 2)
    const uniforms = {
      time:       { value: 1.0 },
      resolution: { value: new THREE.Vector2() },
    }

    const material = new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader })
    scene.add(new THREE.Mesh(geometry, material))

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const canvas = renderer.domElement
    canvas.style.width  = "100%"
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
    // fixed inset-0 -z-50: global background layer, controlled via opacity prop
    <m.div
      ref={containerRef}
      aria-hidden="true"
      data-testid="shader-lines-canvas"
      style={{ opacity }}
      className="fixed inset-0 -z-50 pointer-events-none overflow-hidden bg-[#040013]"
    />
  )
}
