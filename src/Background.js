import React from 'react'
import { useLoader } from 'react-three-fiber'
import { TextureLoader } from 'three'

export default function Background() {
  const [map] = useLoader(TextureLoader, ['/texture.jpg'])

  return (
    <mesh position={[0, 0, -30]} scale={[50, 50, 1]}>
      <planeBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshBasicMaterial map={map} attach="material" />
    </mesh>
  )
}
