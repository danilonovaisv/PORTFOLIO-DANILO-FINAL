// Basic placeholder for a post-processing pass
import { forwardRef } from 'react';
import { Effect } from 'postprocessing';

class AnalogDecayEffectImpl extends Effect {
  constructor() {
    super(
      'AnalogDecayEffect',
      `
      void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
        outputColor = inputColor;
      }
    `
    );
  }
}

const AnalogDecayPass = forwardRef(function AnalogDecayPass(props: any, ref) {
  return <primitive object={new AnalogDecayEffectImpl()} ref={ref} />;
});

export default AnalogDecayPass;
