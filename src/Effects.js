import React from 'react'
import { ChromaticAberration, EffectComposer, DepthOfField, Bloom, Noise, Vignette } from 'react-postprocessing'
import { BlendFunction } from 'postprocessing'

export default function Effects() {
  return (
    <EffectComposer>
      <Noise opacity={0.02} />
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL} // blend mode
        offset={[0.0025, 0.0003]} // color offset
      />
      <Vignette eskil={false} offset={0.1} darkness={1.1} />
    </EffectComposer>
  )
}
