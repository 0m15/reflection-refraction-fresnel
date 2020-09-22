import React, { Suspense } from 'react'
import { Canvas } from 'react-three-fiber'
import Background from './Background'
import Crystals from './Crystals'
import Effects from './Effects'

export default function Scene() {
  return (
    <Canvas camera={{ fov: 50, position: [0, 0, 50] }}>
      <ambientLight intensity={2} color="yellow" />
      <pointLight intensity={0.8} position={[0, 0, 3]} />
      <Suspense fallback={null}>
        <Background />
        <Crystals />
      </Suspense>
      <Effects />
    </Canvas>
  )
}
