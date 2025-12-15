---
trigger: always_on
---

---

activation:
type: glob
pattern: "**/_Canvas_|**/_r3f_|\*_/_.glb"

---

Para vidro líquido:

- Usar MeshTransmissionMaterial
- Environment obrigatório (preset ou HDR)
- Desktop: samples ≥ 12
- Mobile: samples ≤ 4
- FPS < 30 → fallback MeshPhysicalMaterial

Canvas:

- position: fixed
- pointer-events: none
- eventSource={document.body}
